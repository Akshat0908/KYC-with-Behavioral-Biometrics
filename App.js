import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ScanningFingerprintAnimation.css';

const ScanningFingerprintAnimation = () => {
  return (
    <div className="scan">
      <div className="fingerprint"></div>
      <motion.h3
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, times: [0, 0.2, 0.8, 1], repeat: Infinity }}
      >
        Scanning...
      </motion.h3>
    </div>
  );
}

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.form}
    >
      <motion.input
        style={styles.input}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        whileFocus={{ scale: 1.05, borderColor: '#2ecc71' }}
      />
      <motion.input
        style={styles.input}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        whileFocus={{ scale: 1.05, borderColor: '#2ecc71' }}
      />
      <motion.button 
        type="submit" 
        style={styles.button}
        whileHover={{ scale: 1.05, backgroundColor: '#2980b9' }}
        whileTap={{ scale: 0.95 }}
      >
        Login
      </motion.button>
    </motion.form>
  );
};

const ParticleBackground = () => {
  return (
    <div style={styles.particleContainer}>
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            ...styles.particle,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [behaviorData, setBehaviorData] = useState([]);
  const [anomalyScore, setAnomalyScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const interval = setInterval(collectBehaviorData, 1000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const collectBehaviorData = () => {
    const newData = {
      mouseSpeed: Math.random(),
      typingRhythm: Math.random(),
    };
    setBehaviorData(prev => [...prev.slice(-50), newData]);
  };

  const handleLogin = (username, password) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({ username });
      setIsLoading(false);
    }, 5000);  // Increased to 5 seconds for a longer animation
  };

  const handleCreateProfile = () => {
    setIsLoading(true);
    setTimeout(() => {
      alert('Profile created successfully');
      setIsLoading(false);
    }, 5000);
  };

  const handleMonitorBehavior = () => {
    setIsLoading(true);
    setTimeout(() => {
      const score = Math.random() * 2 - 1;
      setAnomalyScore(score);
      setIsLoading(false);
    }, 5000);
  };

  return (
    <div style={styles.container}>
      <ParticleBackground />
      <motion.div 
        style={styles.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          style={styles.header}
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.h1 
            style={styles.title}
            animate={{ color: ['#2c3e50', '#3498db', '#2c3e50'] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            BiometriKYC
          </motion.h1>
          <p style={styles.subtitle}>Revolutionizing KYC with Advanced Behavioral Biometrics</p>
        </motion.div>
        
        <AnimatePresence>
          {!user ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <LoginForm onLogin={handleLogin} />
            </motion.div>
          ) : (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div style={styles.userInfo}>
                <p>Welcome, {user.username}!</p>
              </div>
              <div style={styles.behaviorVisualization}>
                {behaviorData.map((data, index) => (
                  <motion.div
                    key={index}
                    style={{
                      ...styles.behaviorBar,
                      height: `${data.mouseSpeed * 100}%`,
                      backgroundColor: `hsl(${data.typingRhythm * 360}, 100%, 50%)`
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${data.mouseSpeed * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                ))}
              </div>
              <div style={styles.buttonGroup}>
                <motion.button 
                  onClick={handleCreateProfile} 
                  disabled={isLoading} 
                  style={styles.button}
                  whileHover={{ scale: 1.05, backgroundColor: '#27ae60' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Profile
                </motion.button>
                <motion.button 
                  onClick={handleMonitorBehavior} 
                  disabled={isLoading} 
                  style={styles.button}
                  whileHover={{ scale: 1.05, backgroundColor: '#27ae60' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Monitor Behavior
                </motion.button>
              </div>
              {anomalyScore !== null && (
                <motion.div 
                  style={styles.anomalyScore}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p>Anomaly Score: {anomalyScore.toFixed(4)}</p>
                  <motion.p 
                    style={anomalyScore < -0.5 ? styles.alert : {}}
                    animate={{ scale: anomalyScore < -0.5 ? [1, 1.1, 1] : 1 }}
                    transition={{ duration: 0.5, repeat: anomalyScore < -0.5 ? Infinity : 0 }}
                  >
                    {anomalyScore < -0.5 ? "Potential anomaly detected!" : "Behavior appears normal."}
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {error && <p style={styles.error}>{error}</p>}
        {isLoading && <ScanningFingerprintAnimation />}
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(45deg, #3498db, #2ecc71)',
  },
  particleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  particle: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  content: {
    width: '100%',
    maxWidth: '800px',
    padding: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    zIndex: 2,
    backdropFilter: 'blur(10px)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '3em',
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  subtitle: {
    color: '#34495e',
    fontSize: '1.2em',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '300px',
    margin: '0 auto',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '25px',
    border: '2px solid #3498db',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  userInfo: {
    textAlign: 'right',
    marginBottom: '20px',
    color: '#333',
  },
  behaviorVisualization: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '200px',
    width: '100%',
    marginBottom: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  behaviorBar: {
    width: '1.8%',
    transition: 'height 0.5s ease',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  anomalyScore: {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  alert: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  error: {
    color: '#e74c3c',
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default App;