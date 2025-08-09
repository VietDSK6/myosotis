# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Myosotis - Alzheimer Support System

Myosotis is a web application designed to support Alzheimer's patients and their families with care management, memory aids, and communication tools.

## Features

### Authentication System ✅
- **User Registration** - Create new accounts with email/password
- **User Login** - Secure authentication with JWT tokens
- **Protected Routes** - Route protection for authenticated users
- **Session Management** - Automatic token refresh and logout
- **Form Validation** - Client-side validation with Zod schemas

### Core Technologies
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Router v7** - Client-side routing
- **Zustand** - State management
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Axios** - HTTP client with interceptors
- **React Query** - Server state management

## Project Structure

```
src/
├── app/                    # Application core
│   ├── main.tsx           # App entry point
│   ├── router.tsx         # Route configuration
│   └── AppWithAuth.tsx    # Auth-wrapped app component
├── features/              # Feature-based modules
│   └── auth/              # Authentication feature
│       ├── types.ts       # TypeScript interfaces
│       ├── validation.ts  # Zod schemas
│       ├── api.ts         # API functions
│       ├── store.ts       # Zustand store
│       ├── hooks.ts       # Custom hooks
│       ├── LoginForm.tsx  # Login form component
│       ├── RegisterForm.tsx # Register form component
│       ├── LoginPage.tsx  # Login page
│       ├── RegisterPage.tsx # Register page
│       ├── components/    # Shared auth components
│       │   └── ProtectedRoute.tsx
│       └── index.ts       # Export barrel
├── pages/                 # Page components
│   ├── DashboardPage.tsx  # Protected dashboard
│   └── ForgotPasswordPage.tsx
└── assets/               # Static assets
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy the environment template and configure your API URL:
```bash
cp .env.example .env.local
```

Update `.env.local` with your backend API URL:
```
VITE_API_URL=http://localhost:8080
```

### 3. Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Authentication API Integration

The auth system expects these backend endpoints (currently without JWT tokens for PoC):

### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "phone": "0123456789", // optional
  "full_name": "Full Name",
  "date_of_birth": "2025-08-08", // optional, yyyy-mm-dd
  "gender": "male", // optional, "male" or "female"
  "address": "Address", // optional
  "avatar_url": "url", // optional
  "emergency_contact": "Emergency contact" // optional
}

Response:
{
  "http_code": 201,
  "success": true,
  "message": null,
  "metadata": null,
  "data": {
    "id": 38,
    "email": "user@example.com",
    "phone": "0123456789",
    "created_at": "2025-08-08 07:29:17.690494",
    "updated_at": null,
    "profile": {
      "full_name": "Full Name",
      "date_of_birth": "2025-08-08",
      "gender": "male",
      "phone": "0123456789",
      "address": "Address",
      "avatar_url": "url",
      "emergency_contact": "Emergency contact",
      "id": 38,
      "user_id": 38,
      "created_at": "2025-08-08 07:29:17.690494"
    },
    "emergency_contacts": null
  }
}
```

### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "http_code": 200,
  "success": true,
  "message": null,
  "metadata": null,
  "data": {
    "user_id": 36,
    "email": "user@example.com",
    "full_name": "Full Name",
    "message": "Login successful"
  }
}
```

**Note:** Currently no JWT tokens are implemented for PoC. User authentication state is maintained in frontend state management only.

## Available Routes

- `/` - Redirects to dashboard
- `/login` - Login page
- `/register` - Registration page
- `/forgot-password` - Password recovery (placeholder)
- `/dashboard` - Protected dashboard (requires auth)

## Development Features

### Form Validation
- Email format validation
- Password minimum length (8 characters)
- Required fields: email, password, full_name for registration
- Optional fields: phone, date_of_birth, gender, address, avatar_url, emergency_contact
- Real-time error messages in Vietnamese
- Accessible form controls with ARIA labels

### State Management
- Persistent auth state with Zustand persist middleware
- No token management (for PoC - will be added later)
- Loading states and error handling
- User profile data storage
- Optimistic UI updates

### Security Features
- Form validation on frontend (backend validation required)
- No sensitive data logging
- User state persistence without tokens (PoC only)
- Protected routes with redirect

### User Experience
- Loading spinners during async operations
- Error messages in Vietnamese
- Responsive design with Tailwind CSS
- Smooth transitions and hover effects

## Next Steps

The authentication system is complete and ready for integration. Future development should focus on:

1. **Dashboard Features** - Patient profiles, medication tracking, appointment scheduling
2. **Memory Aids** - Photo albums, reminders, daily routines
3. **Family Communication** - Messaging, updates, care coordination
4. **Healthcare Integration** - Doctor notes, medical records, prescriptions

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run TypeScript check
npm run lint
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8080` |
| `VITE_APP_NAME` | Application name | `Myosotis` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
