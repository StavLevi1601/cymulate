# Phishing Simulation Project 🎣

A comprehensive web application for conducting phishing awareness tests using modern technologies. This project allows organizations to assess and improve their security awareness through controlled phishing simulations.

## ✨ Features

- 🔒 **Secure Authentication**
  - JWT-based authentication
  - User registration and login

- 📧 **Phishing Simulation**
  - Custom email templates
  - Automated email sending
  - Click tracking
  - Real-time status updates

## 🛠 Tech Stack

### Frontend
- React with TypeScript
- SASS for styling
- React Hook Form for form management
- Axios for API requests

### Backend
- NestJS framework
- MongoDB for database
- Mailtrap for email testing
- JWT authentication

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- pnpm package manager
- MongoDB instance
- Mailtrap account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/StavLevi1601/cymulate-phishing.git
cd cymulate-phishing
```

2. **Install dependencies**
```bash
# Install server dependencies
cd server
pnpm install

# Install client dependencies
cd ../client
pnpm install
```

3. **Environment Setup**
```bash
# Server (.env)
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_password

# Client (.env)
VITE_BACKEND_URL=http://localhost:4444
```

4. **Run the application**
```bash
# Start server (from server directory)
pnpm start:dev

# Start client (from client directory)
pnpm dev
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication

### Phishing Simulation Endpoints
- `POST /phishing/send` - Send phishing email
- `GET /phishing/track/:id` - Track email clicks
- `GET /phishing/attempts` - List all attempts

## 🖥 Screenshots

### auth Page
![image](https://github.com/user-attachments/assets/54214df5-4f34-4085-9159-f28c4fefdc15)
![image](https://github.com/user-attachments/assets/d98c03d0-57df-4c14-9bd6-fbb3ab9c055f)


### Dashboard
![image](https://github.com/user-attachments/assets/c6ac7d56-6468-4802-8b5a-a61ecbe0be3b)
![image](https://github.com/user-attachments/assets/1b35997b-21d8-402c-b683-570f2f1b2b6c)
![image](https://github.com/user-attachments/assets/1a6165e7-5596-4322-bf81-1e3de7cb250f)


### Email Template
![image](https://github.com/user-attachments/assets/fb0a49d3-0e08-4548-a635-35673813a517)
![image](https://github.com/user-attachments/assets/fb485b55-c929-4459-8c0f-73acf557985c)

![image](https://github.com/user-attachments/assets/7938b51b-ca3e-4549-96d3-74a49fb563f1)
![image](https://github.com/user-attachments/assets/476cd228-87d0-4ecd-a198-04310e842531)


## 📝 Development Notes

### Project Structure
```
├── client/                # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── validations/
│   │   └── utils/
│   │
├── server/               # NestJS backend
│   ├── src/
│   │   ├── auth/
│   │   ├── phishing/
│   │   └── users/
```
