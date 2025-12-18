# 📚 Book Management System

A comprehensive web application for managing books, orders, and users with role-based access control. Built with React, Firebase, and modern web technologies.

## 🌐 Live Demo

**[Visit Live Site](https://assignment-11-bfd3b.web.app/)**

## ✨ Features

### 📖 Book Management

- Browse and search through a collection of books
- View detailed book information including reviews and ratings
- Add books to wishlist for later purchase
- Latest books showcase on homepage

### 🛒 User Features

- User authentication with email/password and Google Sign-in
- Personal dashboard with order history
- Create and manage orders
- Wishlist management
- View and track order status
- Payment integration (Success/Failed handling)
- User profile management

### 👨‍💼 Admin & Librarian Features

- **Dashboard Home**: Overview of system statistics
- **Add Products**: Add new books to the inventory
- **Manage Books**: Edit and delete existing books
- **Manage Users**: User management and role assignment
- **Orders Management**: View and manage all orders
- **Invoices**: Generate and manage invoices

### 🎨 Additional Features

- Responsive design with Tailwind CSS and DaisyUI
- Interactive hero slider with Swiper
- Coverage and delivery map with Leaflet
- Statistics and features showcase
- Toast notifications for user actions
- Sweet alerts for confirmations
- Star ratings and reviews
- Loading states and error handling

## 🛠️ Technologies Used

### Frontend

- **React 19** - UI library
- **React Router 7** - Navigation and routing
- **Vite** - Build tool and dev server

### Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **DaisyUI** - Component library
- **Styled Components** - CSS-in-JS
- **Lucide React & React Icons** - Icon libraries

### Backend & Database

- **Firebase** - Authentication, hosting, and backend services
- **Axios** - HTTP client for API requests

### State Management & Forms

- **TanStack Query (React Query)** - Server state management
- **React Hook Form** - Form validation and handling

### UI Components & Libraries

- **Swiper** - Touch slider
- **React Leaflet** - Interactive maps
- **@smastrom/react-rating** - Star rating component
- **React Hot Toast** - Toast notifications
- **SweetAlert2** - Beautiful alert modals

## 📁 Project Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and media files
│   ├── components/      # Reusable components
│   │   ├── bookDetails/ # Book detail components
│   │   ├── books/       # Book listing components
│   │   ├── dashBoard/   # Dashboard components
│   │   ├── home/        # Homepage components
│   │   └── shared/      # Shared components
│   ├── firebase/        # Firebase configuration
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Layout components
│   ├── page/            # Page components
│   ├── providers/       # Context providers
│   ├── routes/          # Route guards and definitions
│   └── utils/           # Utility functions
├── firebase.json        # Firebase configuration
├── package.json         # Dependencies
└── vite.config.js       # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd client
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure Firebase**

Create a `.env` file in the root directory and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. **Start development server**

```bash
npm run dev
```

The application will be available at `https://github.com/chowdhoury/Assignment-11-client`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 User Roles

The application supports three user roles with different permissions:

1. **User** - Can browse books, create orders, manage wishlist
2. **Librarian** - User permissions + can manage books and orders
3. **Admin** - Full access including user management

## 🌍 Deployment

The application is deployed on Firebase Hosting. To deploy:

```bash
npm run build
firebase deploy
```

## 📦 Key Dependencies

| Package         | Version | Purpose                  |
| --------------- | ------- | ------------------------ |
| React           | 19.2.0  | UI Framework             |
| React Router    | 7.10.1  | Routing                  |
| Firebase        | 12.6.0  | Authentication & Backend |
| Tailwind CSS    | 4.1.17  | Styling                  |
| TanStack Query  | 5.90.12 | Data Fetching            |
| React Hook Form | 7.68.0  | Form Management          |
| Axios           | 1.13.2  | HTTP Client              |
| Swiper          | 12.0.3  | Carousel/Slider          |
| React Leaflet   | 5.0.0   | Maps                     |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

For any queries or support, please reach out through the application's contact form.

---

Made with ❤️ using React and Firebase
