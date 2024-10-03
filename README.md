# Gold Deposit Management System

## Overview
This project is a mobile application for managing gold deposit requests, including submission, evaluation, and status updates.

## Technologies Used
- React Native
- TypeScript
- Axios
- JSON-Server for API simulation

## Getting Started

### 1. Setting Up JSON-Server
1. Install JSON-Server:
   ```bash
   npm install -g json-server
   ```
2. Create a `db.json` file with your data structure.
3. Start JSON-Server:
   ```bash
   json-server --watch db.json --port 3000
   ```

### 2. Changing the API Link
Modify the API base URL in `../services/api`:
```javascript
const BASE_URL = 'http://192.168.1.3:3000'; // Your json-server URL
```

### 3. Running the App
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the application:
   ```bash
   npm start
   ```

## Features
- User login and registration
- Submit gold deposit requests
- Evaluate and update request statuses
