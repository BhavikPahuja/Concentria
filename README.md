# 🚀 Concentria Server API

A robust Node.js/TypeScript backend server providing authentication, user management, and logging capabilities with Redis caching and MongoDB storage.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [API Endpoints](#-api-endpoints)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Usage Examples](#-usage-examples)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)

## ✨ Features

### 🔐 Authentication & Security

- **User Registration** with email verification via OTP
- **JWT-based Authentication** (Access & Refresh tokens)
- **Password Reset** functionality with OTP verification
- **Secure password hashing** using bcrypt
- **Input validation** using Zod schemas
- **CORS protection** with configurable origins

### 📧 Email Services

- **OTP delivery** via Gmail SMTP
- **Password reset emails**
- **Account verification emails**
- **Resend OTP functionality**

### 💾 Data Management

- **MongoDB Atlas** integration for user data
- **Redis Cloud** for temporary data (OTP storage)
- **Comprehensive logging** with Winston
- **Request/Response logging middleware**

### 🛡️ Middleware & Validation

- **Error handling** middleware
- **Request logging** with timestamps
- **Input validation** using Zod
- **Authentication middleware** for protected routes

## 🛠️ Tech Stack

| Category             | Technology         |
| -------------------- | ------------------ |
| **Runtime**          | Node.js            |
| **Language**         | TypeScript         |
| **Framework**        | Express.js         |
| **Database**         | MongoDB Atlas      |
| **Cache**            | Redis Cloud        |
| **Authentication**   | JWT (jsonwebtoken) |
| **Email**            | Nodemailer (Gmail) |
| **Validation**       | Zod                |
| **Logging**          | Winston            |
| **Password Hashing** | bcrypt             |

## 📡 API Endpoints

### Authentication Routes (`/auth`)

| Method | Endpoint                    | Description               | Body                                                           |
| ------ | --------------------------- | ------------------------- | -------------------------------------------------------------- |
| `POST` | `/auth/register`            | Register new user         | `{ email, password, fullName, countryCode, phoneNumber, tnc }` |
| `POST` | `/auth/verify-otp`          | Verify registration OTP   | `{ otp, uniqueKey }`                                           |
| `POST` | `/auth/login`               | User login                | `{ email, password }`                                          |
| `GET`  | `/auth/refresh-token`       | Refresh access token      | Requires refresh token cookie                                  |
| `POST` | `/auth/resend-otp`          | Resend registration OTP   | `{ email }`                                                    |
| `POST` | `/auth/forgot-password`     | Request password reset    | `{ email }`                                                    |
| `POST` | `/auth/reset-password`      | Reset password with OTP   | `{ email, newPassword, otp }`                                  |
| `POST` | `/auth/resend-password-otp` | Resend password reset OTP | `{ email }`                                                    |

### Logging Routes (`/api`)

| Method   | Endpoint    | Description              | Body                                           |
| -------- | ----------- | ------------------------ | ---------------------------------------------- |
| `POST`   | `/api/logs` | Create new log entry     | `{ type, timestamp, url?, filename?, extra? }` |
| `GET`    | `/api/logs` | Retrieve logs (last 100) | -                                              |
| `DELETE` | `/api/logs` | Delete all logs          | -                                              |

## 🔧 Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Redis Cloud account
- Gmail account with App Password

### Local Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/BhavikPahuja/Concentria.git
cd Concentria/server
```

2. **Install dependencies**

```bash
npm install
```

3. **Create environment file**

```bash
cp .env.example .env
```

4. **Configure environment variables** (see [Environment Variables](#-environment-variables))

5. **Build the project**

```bash
npm run build
```

6. **Start development server**

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 🌍 Environment Variables

Create a `.env` file with the following variables:

```bash
# Environment Configuration
NODE_ENV=development
PORT=5000

# Database Configuration (MongoDB Atlas)
DB_HOST=mongodb+srv://username:password@cluster.mongodb.net/
DB_USER=your_mongodb_username
DB_NAME=concentria_dev
DB_PASS=your_mongodb_password

# Email Configuration (Gmail with App Password)
EMAIL=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password

# JWT Secrets (Generate strong secrets for production)
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key

# Token Expiry Times
ACCESS_TOKEN_EXPIRE_TIME=5m
REFRESH_TOKEN_EXPIRE_TIME=30d

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Redis Configuration (Redis Cloud)
REDIS_CLIENT_HOST=your-redis-host.cloud.redislabs.com
REDIS_CLIENT_PORT=12345
REDIS_PASSWORD=your-redis-password
REDIS_USERNAME=default
```

### Required External Services

#### 1. MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster
3. Get connection string
4. Update `DB_HOST` in `.env`

#### 2. Redis Cloud Setup

1. Create account at [Redis Cloud](https://redis.com/try-free/)
2. Create a new database
3. Get host, port, and password
4. Update Redis variables in `.env`

#### 3. Gmail Setup

1. Enable 2-Factor Authentication
2. Generate App Password
3. Update `EMAIL` and `EMAIL_PASSWORD` in `.env`

## 🚀 Deployment

### Deploy to Render

1. **Push to GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Create Render Web Service**

- Go to [Render Dashboard](https://dashboard.render.com/)
- Click "New +" → "Web Service"
- Connect your GitHub repository
- Configure:
  - **Build Command**: `npm install && npm run build`
  - **Start Command**: `npm start`
  - **Environment**: Add all environment variables

3. **Set Environment Variables**
   Copy all variables from your `.env` file to Render's environment variables section.

### Deploy to Other Platforms

**Heroku:**

```bash
heroku create your-app-name
heroku config:set NODE_ENV=production
# Add all other environment variables
git push heroku main
```

**DigitalOcean App Platform:**

- Upload code via GitHub integration
- Set environment variables in dashboard
- Configure build and run commands

## 📖 Usage Examples

### Registration Flow

```javascript
// 1. Register user
POST /auth/register
{
  "email": "user@example.com",
  "password": "securePassword123",
  "fullName": "John Doe",
  "countryCode": "+1",
  "phoneNumber": "1234567890",
  "tnc": true
}
// Response: { message: "OTP sent for verification", uniqueKey: "register:uuid" }

// 2. Verify OTP
POST /auth/verify-otp
{
  "otp": "123456",
  "uniqueKey": "register:uuid-from-step-1"
}
// Response: { message: "OTP verified successfully" }

// 3. Login
POST /auth/login
{
  "email": "user@example.com",
  "password": "securePassword123"
}
// Response: { accessToken: "jwt-token" }
```

### Password Reset Flow

```javascript
// 1. Request password reset
POST /auth/forgot-password
{
  "email": "user@example.com"
}

// 2. Reset password with OTP
POST /auth/reset-password
{
  "email": "user@example.com",
  "newPassword": "newSecurePassword123",
  "otp": "654321"
}
```

### Logging

```javascript
// Create log
POST /api/logs
{
  "type": "error",
  "timestamp": "2025-01-18T10:30:00.000Z",
  "url": "/api/user/profile",
  "filename": "userController.js",
  "extra": {
    "userId": "12345",
    "error": "Database connection failed",
    "stack": "Error stack trace..."
  }
}

// Get logs
GET /api/logs
// Response: Array of log objects (last 100)
```

## 📁 Project Structure

```
server/
├── controllers/          # Route controllers
│   ├── authController.ts  # Authentication logic
│   ├── logController.ts   # Logging logic
│   └── redisClient.ts     # Redis connection
├── middlewares/           # Express middlewares
│   ├── authMiddleware.ts  # JWT verification
│   ├── errorHandler.ts    # Error handling
│   ├── requestLogger.ts   # Request logging
│   ├── responseLogger.ts  # Response logging
│   └── validateRequest.ts # Input validation
├── models/               # Database models
│   ├── logModel.ts       # Log schema
│   ├── otpModel.ts       # OTP schema
│   └── userModel.ts      # User schema
├── routes/               # API routes
│   ├── authRoutes.ts     # Authentication endpoints
│   ├── emailVerification.ts # Email utilities
│   └── logRoutes.ts      # Logging endpoints
├── services/             # Business logic
│   └── authService.ts    # Auth service functions
├── types/                # TypeScript types
│   ├── authInterfaces.ts # Auth interfaces
│   ├── env.d.ts         # Environment types
│   └── express.d.ts     # Express extensions
├── utils/                # Utility functions
│   ├── customError.ts    # Custom error class
│   ├── dateTimeUtils.ts  # Date/time helpers
│   ├── generateToken.ts  # JWT token generation
│   ├── logger.ts         # Winston logger
│   └── operateDB.ts      # Database operations
├── validators/           # Input validation schemas
│   └── authValidator.ts  # Zod validation schemas
├── app.ts               # Express app configuration
├── config.ts            # Environment configuration
├── server.ts            # Server entry point
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Security**: Separate access and refresh tokens
- **Input Validation**: Zod schema validation
- **CORS Protection**: Configurable allowed origins
- **Environment Variables**: Sensitive data protection
- **Request Logging**: Comprehensive audit trail
- **Error Handling**: Secure error responses

## 📝 Scripts

```bash
# Development
npm run dev          # Start with hot reload

# Production
npm run build        # Compile TypeScript
npm start           # Start production server

# Utilities
npm test            # Run tests (not implemented)
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🐛 Troubleshooting

### Common Issues

**Build Errors on Render:**

- Ensure all TypeScript types are in `dependencies`, not `devDependencies`
- Verify environment variables are set correctly

**Redis Connection Issues:**

- Check Redis Cloud credentials
- Verify IP whitelist settings
- Ensure Redis client configuration matches your Redis Cloud setup

**MongoDB Connection Issues:**

- Verify MongoDB Atlas connection string
- Check IP whitelist in MongoDB Atlas
- Ensure database user has proper permissions

**Email Issues:**

- Use Gmail App Password, not regular password
- Enable 2-Factor Authentication first
- Check Gmail security settings

## 📞 Support

For support and questions:

- Create an issue on GitHub
- Email: bhavikpahujacodes@gmail.com

---

Built with ❤️ by [Bhavik Pahuja](https://github.com/BhavikPahuja)
