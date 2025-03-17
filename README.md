# BlogSphere - MERN Stack Blogging Platform

![Home](https://drive.google.com/uc?export=view&id=13iFKrjYLuaDPoRxXdBQHmSDenIci-WtL)
![Image 1](https://drive.google.com/uc?export=view&id=1_oVkuG-nJEoLaLet_EKmOwH7jdf-gPW7)  
![Image 2](https://drive.google.com/uc?export=view&id=1fUCBDRUypvuc3uY9AHN3SnJgWOZiqd8g)  
![Image 3](https://drive.google.com/uc?export=view&id=1dKfDajV9coCcyuFK8D8qfWYXqs7Lq0ns)  

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

## APP Demo

### 🔗 View All Screenshots  
[Google Drive - Full Demo](https://drive.google.com/drive/folders/1RUxxeq_0_4M30x2CdKEkF4e6LomN4L-H?usp=drive_link)


## Installation Guide

### 1. Clone Repository
```bash
git clone https://github.com/rajthakare237/BLOG-MERN-STACK-TS.git
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

