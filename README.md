# Blog Application

A full-stack blog application built with Django REST Framework backend and React.js frontend. This application allows users to manage blog posts and authors with full CRUD (Create, Read, Update, Delete) operations.

## 🚀 Features

- **Posts Management**: Create, read, update, and delete blog posts
- **Authors Management**: Manage author profiles with contact information
- **Responsive Design**: Beautiful and modern UI that works on all devices
- **Real-time Updates**: Seamless interaction between frontend and backend
- **RESTful API**: Well-structured API endpoints for all operations

## 🛠️ Technology Stack

### Backend

- **Django 5.2.1**: Python web framework
- **Django REST Framework**: For building RESTful APIs
- **SQLite**: Database (default, can be changed to PostgreSQL/MySQL)
- **django-cors-headers**: For handling Cross-Origin Resource Sharing

### Frontend

- **React 18.2.0**: JavaScript library for building user interfaces
- **React Router DOM**: For client-side routing
- **Axios**: For making HTTP requests to the backend
- **Modern CSS**: Custom styling with gradients and animations

## 📁 Project Structure

```
blog-application/
├── Backend/
│   ├── api/                 # Django project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── ...
│   ├── blog/                # Main Django app
│   │   ├── models.py        # Database models (Post, Author)
│   │   ├── views.py         # API views
│   │   ├── serializers.py   # DRF serializers
│   │   ├── urls.py          # URL routing
│   │   └── ...
│   ├── manage.py
│   └── db.sqlite3
├── Frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API service functions
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites

- Python 3.8+ installed
- Node.js 14+ and npm installed
- Git installed

### Backend Setup (Django)

1. **Navigate to the Backend directory:**

   ```bash
   cd Backend
   ```

2. **Create a virtual environment:**

   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**

   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install required packages:**

   ```bash
   pip install django djangorestframework django-cors-headers
   ```

5. **Run database migrations:**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create a superuser (optional):**

   ```bash
   python manage.py createsuperuser
   ```

7. **Start the Django development server:**

   ```bash
   python manage.py runserver
   ```

   The backend will be available at `http://localhost:8000`

### Frontend Setup (React)

1. **Open a new terminal and navigate to the Frontend directory:**

   ```bash
   cd Frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the React development server:**

   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

## 🎯 Usage

1. **Access the application** by opening `http://localhost:3000` in your browser
2. **Create authors** first by clicking "Create Author" in the navigation
3. **Create blog posts** by clicking "Create Post" and selecting an author
4. **View, edit, and delete** posts and authors using the provided interface

## 📚 API Endpoints

### Posts

- `GET /api/posts/` - List all posts
- `POST /api/posts/` - Create a new post
- `GET /api/posts/{id}/` - Retrieve a specific post
- `PUT /api/posts/{id}/` - Update a specific post
- `DELETE /api/posts/{id}/` - Delete a specific post

### Authors

- `GET /api/authors/` - List all authors
- `POST /api/authors/` - Create a new author
- `GET /api/authors/{id}/` - Retrieve a specific author
- `PUT /api/authors/{id}/` - Update a specific author
- `DELETE /api/authors/{id}/` - Delete a specific author

## 🎨 Features Overview

### Posts

- **Title**: The main heading of the blog post
- **Content**: The full text content of the post
- **Author**: Associated author (foreign key relationship)

### Authors

- **First Name**: Author's first name
- **Last Name**: Author's last name
- **Email**: Contact email address
- **Phone Number**: Contact phone number

## 🔄 Development Workflow

1. **Backend Development**: Make changes to Django models, views, or serializers
2. **Frontend Development**: Update React components or add new features
3. **Testing**: Test the application thoroughly before deployment
4. **Database Changes**: Run migrations when models are updated

## 🚀 Deployment

### Backend Deployment

- Configure production settings in `settings.py`
- Set up a production database (PostgreSQL recommended)
- Configure static files serving
- Deploy to platforms like Heroku, DigitalOcean, or AWS

### Frontend Deployment

- Build the production version: `npm run build`
- Deploy to platforms like Netlify, Vercel, or serve with nginx

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure `django-cors-headers` is installed and configured
2. **Port Conflicts**: Ensure ports 3000 and 8000 are available
3. **Database Issues**: Run migrations if you encounter database errors
4. **Module Not Found**: Ensure all dependencies are installed

### Getting Help

- Check the console for error messages
- Ensure both backend and frontend servers are running
- Verify API endpoints are accessible at `http://localhost:8000/api/`

---

**Happy Blogging! 📝✨**
