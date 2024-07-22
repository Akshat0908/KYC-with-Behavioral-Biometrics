# KYC-with-Behavioral-Biometrics
A cutting-edge KYC solution leveraging advanced user behavior analysis to enhance security and detect anomalies through behavioral biometrics.

Table of Contents

Introduction
Features
Technologies Used
Setup Instructions
Usage
API Endpoints
File Structure
Images
Contributing
License
Introduction

This project is a modern KYC system that uses behavioral biometrics to enhance security. By analyzing user behavior patterns such as mouse speed and typing rhythm, the system can detect potential anomalies and provide an additional layer of security.

Features

User Authentication: Secure login system with JWT authentication.
Behavior Data Collection: Continuous collection of user behavior data.
Behavioral Analysis: Detection of anomalies in user behavior.
User Profile Management: Create and monitor user profiles based on behavior data.
Visualizations: Real-time visual representation of behavioral data.
Technologies Used

Frontend: React, Framer Motion, Axios
Backend: Flask, JWT, SQLAlchemy
Database: SQLite
Tools: VS Code, Postman
Setup Instructions

Prerequisites
Node.js and npm
Python 3.7+
Flask
Git

Logging In
Use the login form to authenticate. Upon successful login, the user's behavior data will be collected and monitored for anomalies.


<img width="1440" alt="Screenshot 2024-07-22 at 11 23 26 PM" src="https://github.com/user-attachments/assets/cee0caff-45fa-4b14-aa9d-4f74302a8b7f">


Creating and Monitoring Profiles
Create Profile: Collects and saves user behavior data to create a profile.
Monitor Behavior: Analyzes the current behavior data and calculates an anomaly score.

<img width="1439" alt="Screenshot 2024-07-22 at 11 29 19 PM" src="https://github.com/user-attachments/assets/40e253eb-33d8-4e03-b8d3-e61620b36476">

File Structure

behavioral-kyc/
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── routes.py
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginForm.js
│   │   │   ├── BehaviorVisualization.js
│   │   │   └── ...
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── package.json
│   └── ...
└── README.md






