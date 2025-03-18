# Global Insight - MERN Stack Blogging Platform

![image1](https://drive.google.com/uc?export=view&id=1MQVP48h4yjGDCeykR5LTCaNyh6RdVRhp)
![image2](https://drive.google.com/uc?export=view&id=1fCW5ldSRNDgSp-Evjz2hCBAMIAgff22T)
![image3](https://drive.google.com/uc?export=view&id=10rw0nOklQShUdoDzeFEIAHJbXQENCgzi)
![image4](https://drive.google.com/uc?export=view&id=1R5IvQnMTHtxCkvxk_vwD9e9B57_dxDBz)
![image5](https://drive.google.com/uc?export=view&id=1KoLeDmL8trevzOAGw8gViwJiZGkpYOiI)
![image6](https://drive.google.com/uc?export=view&id=1WlA-X41iSIfXn938zWGLCl11Pk_AOVbz)
![image7](https://drive.google.com/uc?export=view&id=1fD8BtVVhKNfHJkPo4FRKRtu-v1bi3CMR)
![image8](https://drive.google.com/uc?export=view&id=1GkFiD9gG65qeu27gbjDi3kIi4j8hZKep)
![image9](https://drive.google.com/uc?export=view&id=1lo_qbvjDRUEAMqXzZ339KO1pulbx51KK)
![image10](https://drive.google.com/uc?export=view&id=1uN9PC38jxsfXUA-ucWJ1S-IPnI8-4AGY)

A full-stack blogging platform with curated news feeds, built using the MERN stack (MongoDB, Express, React, Node.js) with Redux state management and JWT authentication.

## Features

- 🚀 User authentication (JWT)
- ✍️ Create/Edit/Delete blog posts
- 🔍 Search Functionality
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
- Redux Toolkit
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
- API credentials (for news curation)

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

