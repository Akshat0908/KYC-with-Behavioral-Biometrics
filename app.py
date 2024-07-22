from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import numpy as np
import jwt
from functools import wraps
from datetime import datetime, timedelta
import bcrypt
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///biometric_kyc.db'
app.config['SECRET_KEY'] = 'your_very_secure_secret_key'
app.config['JWT_EXPIRATION_DELTA'] = timedelta(hours=1)
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    behavioral_profile = db.Column(db.PickleType)
    last_login = db.Column(db.DateTime)
    is_locked = db.Column(db.Boolean, default=False)

class BehaviorLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    behavior_data = db.Column(db.JSON, nullable=False)
    anomaly_score = db.Column(db.Float)

isolation_forest = IsolationForest(contamination=0.1, random_state=42)
scaler = StandardScaler()

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            return f(data['user_id'], *args, **kwargs)
        except:
            return jsonify({'message': 'Invalid or expired token!'}), 401
    return decorated

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': 'Username already exists'}), 400
    
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    new_user = User(username=data['username'], password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    app.logger.info(f"Login attempt for user: {data['username']}")
    user = User.query.filter_by(username=data['username']).first()
    if not user:
        app.logger.warning(f"Login failed: User not found - {data['username']}")
        return jsonify({'message': 'User not found'}), 401
    if user.is_locked:
        app.logger.warning(f"Login failed: Account locked - {data['username']}")
        return jsonify({'message': 'Account is locked'}), 401
    if not bcrypt.checkpw(data['password'].encode('utf-8'), user.password_hash):
        app.logger.warning(f"Login failed: Incorrect password - {data['username']}")
        return jsonify({'message': 'Incorrect password'}), 401
    
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.utcnow() + app.config['JWT_EXPIRATION_DELTA']
    }, app.config['SECRET_KEY'], algorithm="HS256")
    user.last_login = datetime.utcnow()
    db.session.commit()
    app.logger.info(f"Login successful for user: {data['username']}")
    return jsonify({'token': token})

@app.route('/create_profile', methods=['POST'])
@token_required
def create_profile(user_id):
    data = request.json
    user = User.query.get(user_id)
    behavioral_data = np.array(data['behavior_data'])
    scaled_data = scaler