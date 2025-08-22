# 🍽️ Cafe Management System

A full-stack web application for managing cafe operations including user authentication, product management, order processing, and billing system.

## ✨ Features

- 🔐 **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin/User)
  - Secure login/logout system

- 📊 **Dashboard & Analytics**
  - Real-time statistics (Categories, Products, Bills)
  - Visual data representation
  - Responsive design

- 🍽️ **Product Management**
  - Add/Edit/Delete products
  - Category-based organization
  - Price and description management

- 📋 **Order & Billing System**
  - Create and manage orders
  - Generate bills with PDF export
  - Payment method tracking

- 👥 **User Management**
  - User registration and profiles
  - Password change functionality
  - Role-based permissions

## 🛠️ Technology Stack

### Frontend
- **Angular 17** - Modern web framework
- **Angular Material** - UI component library
- **TypeScript** - Type-safe JavaScript
- **SCSS** - Advanced CSS styling
- **FlexLayout** - Responsive layout system

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MySQL** - Relational database
- **JWT** - JSON Web Token authentication
- **Nodemailer** - Email functionality
- **HTML-PDF** - PDF generation

### Database
- **MySQL** - Primary database
- **Connection pooling** - Optimized database connections

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- Angular CLI (v17 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Amarjeetydv/cafe-management-system.git
   cd cafe-management-system
   ```

2. **Backend Setup**
   ```bash
   cd BACKEND-CAFE-NODEJS
   npm install
   
   # Create .env file with your database credentials
   echo "PORT=8080" > .env
   echo "DB_PORT=3306" >> .env
   echo "DB_HOST=localhost" >> .env
   echo "DB_USERNAME=your_username" >> .env
   echo "DB_PASSWORD=your_password" >> .env
   echo "DB_NAME=cafe_management" >> .env
   
   # Start the backend server
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   
   # Start the Angular development server
   npm start
   ```

4. **Database Setup**
   - Create a MySQL database named `cafe_management`
   - Import the `table.sql` file from the backend directory
   - Update the `.env` file with your database credentials

### Environment Variables

Create a `.env` file in the `BACKEND-CAFE-NODEJS` directory:

```env
PORT=8080
DB_PORT=3306
DB_HOST=localhost
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=cafe_management
```

## 📱 Usage

### Access the Application
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8080

### Default Users
- **Admin**: Full access to all features
- **User**: Limited access (Dashboard, Orders, Bills)

### Key Features Walkthrough
1. **Login/Register** - Create account or sign in
2. **Dashboard** - View system statistics
3. **Manage Categories** - Organize product categories
4. **Manage Products** - Add/edit cafe menu items
5. **Process Orders** - Handle customer orders
6. **Generate Bills** - Create and export bills

## 🏗️ Project Structure

```
cafe-management-system/
├── frontend/                 # Angular frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── dashboard/   # Dashboard component
│   │   │   ├── layouts/     # Layout components
│   │   │   ├── material-component/ # Main features
│   │   │   ├── services/    # API services
│   │   │   └── shared/      # Shared components
│   │   └── assets/          # Static assets
│   └── package.json
├── BACKEND-CAFE-NODEJS/     # Node.js backend application
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── connection.js        # Database connection
│   └── server.js            # Server entry point
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /user/signup` - User registration
- `POST /user/login` - User authentication
- `POST /user/changePassword` - Password change

### Categories
- `GET /category/get` - Get all categories
- `POST /category/add` - Add new category
- `PUT /category/update` - Update category
- `DELETE /category/delete/:id` - Delete category

### Products
- `GET /product/get` - Get all products
- `POST /product/add` - Add new product
- `PUT /product/update` - Update product
- `DELETE /product/delete/:id` - Delete product

### Bills
- `GET /bill/get` - Get all bills
- `POST /bill/generateReport` - Generate bill report
- `POST /bill/getPdf` - Get PDF bill

### Dashboard
- `GET /dashboard/details` - Get dashboard statistics

## 🎨 UI Components

- **Material Design** - Modern, responsive interface
- **Responsive Layout** - Works on all device sizes
- **Custom Dialogs** - Enhanced form components
- **Interactive Tables** - Sortable, searchable data
- **Loading States** - User feedback during operations

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Role-based Access Control** - Admin/User permissions
- **Input Validation** - Server-side validation
- **SQL Injection Protection** - Parameterized queries
- **CORS Configuration** - Cross-origin security

## 📊 Database Schema

### Tables
- **users** - User accounts and authentication
- **category** - Product categories
- **product** - Menu items and products
- **bill** - Order bills and transactions

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Install dependencies: `npm install --production`
3. Start the server: `npm start`

### Frontend Deployment
1. Build the application: `ng build --prod`
2. Deploy the `dist/` folder to your web server
3. Configure API endpoint URLs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 👨‍💻 Author

**Amrjeet Yadav** - [GitHub Profile](https://github.com/Amarjeetydv) | [Portfolio](https://amarjeet-portfolio-blue.vercel.app/)

## 🙏 Acknowledgments

- Angular Material for UI components
- Express.js community for backend framework
- MySQL for database management
- All contributors and supporters

## 📞 Support

If you have any questions or need help:
- Create an issue on GitHub
- Contact: testingamarjeet56@gmail.com

---

⭐ **Star this repository if you find it helpful!**
