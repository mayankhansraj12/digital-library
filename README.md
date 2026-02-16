# Digital Library - Physical Catalog System

A robust MERN (MongoDB, Express, React, Node.js) application designed to serve as a digital catalog for a physical library. It allows members to browse the collection and check real-time availability of books before visiting, while administrators manage the inventory.

## 🚀 Project Overview

**Purpose:** To streamline the library experience by providing an online catalog where users can check if a book is "Available" on the shelf or currently "Borrowed".

-   **Frontend**: React (Vite), Tailwind CSS, Lucide Icons.
-   **Backend**: Node.js, Express, MongoDB.
-   **Security**: JWT Authentication, Role-Based Access Control (RBAC).

## ✨ Key Features

### 👤 For Members (Public/User)
-   **Browse Catalog**: View the complete collection of books with cover images and descriptions.
-   **Real-Time Availability**: Instantly see if a book is **Available** or **Borrowed**.
-   **Search**: Find specific titles or authors (coming soon).
-   **Responsive Design**: optimized for mobile and desktop browsing.

### 🛡️ For Administrators
-   **Inventory Management**: Add, Edit, and Delete books.
-   **Status Control**: Manually update book status (mark as Borrowed/Returned) when members visit the physical desk.
-   **Secure Admin Mode**: Dedicated controls visible only to logged-in admins.

## 🛠️ Setup Instructions

### Prerequisites
-   Node.js (v14+)
-   MongoDB Connection String

### 1. Server Setup
```bash
cd server
npm install
# Create .env file with PORT, MONGO_URI, and JWT_SECRET
npm run dev
```

### 2. Client Setup
```bash
cd client
npm install
# Create .env with VITE_API_URL
npm run dev
```

### 3. Database Seeding (Optional)
To populate the library with popular books:
```bash
cd server
node seed.js
```

## 🔒 Environment Variables

**Server (.env)**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

**Client (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

## 📚 API Documentation
API documentation is available via Swagger UI at `http://localhost:5000/api-docs` when the server is running.

## 🏗️ Architecture
-   **MVC Pattern**: Organized server structure (Models, Views/Routes, Controllers).
-   **RESTful API**: Standardized endpoints for book and user management.
-   **Scalable**: Built with modularity in mind for future feature expansion (e.g., reservation system, fine tracking).
