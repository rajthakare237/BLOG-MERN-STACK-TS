# BlogSphere - MERN Stack Blogging Platform

![BlogSphere Banner](https://drive.google.com/file/d/13iFKrjYLuaDPoRxXdBQHmSDenIci-WtL/view?usp=drive_link)

A full-stack blogging platform with curated news feeds, built using the MERN stack (MongoDB, Express, React, Node.js) with Redux state management and JWT authentication.

## Features

- 🚀 User authentication (JWT)
- ✍️ Create/Edit/Delete blog posts
- 📰 Curated news feeds (Science, Geopolitics, Space)
- 🔄 Redux with Redux Persist for state management
- 🖼️ Image uploads via Cloudinary
- 📱 Responsive design
- 🔍 RSS feed parsing (xml2js)
- ⚡ Vite-powered frontend
- 🔐 Secure password hashing (bcrypt)

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Redux Toolkit + Redux Thunk
- React Router 6
- Axios for API calls
- React Icons & FontAwesome
- Vite build tool

**Backend:**
- Node.js + Express
- MongoDB + Mongoose ODM
- JWT Authentication
- Cloudinary Integration
- CORS middleware
- XML/RSS parsing (xml2js)

## Prerequisites

- Node.js (v18+)
- MongoDB Atlas account
- Cloudinary account
- Google Drive API credentials (for news curation)

## Installation Guide

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/blog-mern-app.git
cd blog-mern-app
```

### 2. Start Backend
```bash
cd backend
npm install
npm start
```

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the `backend` folder and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

