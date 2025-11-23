# Esoterics - Matrix of Destiny Calculator

A Telegram Web App for calculating and visualizing esoteric numerology matrices, including the Matrix of Destiny (Матрица Судьбы) and Compatibility Matrix (Матрица Совместимости).

## 📋 Overview

This is a personal pet project that provides an interactive interface for calculating and displaying numerology-based matrices. Users can input their personal information (name, date of birth, gender) to generate detailed matrix visualizations with interpretations.

## ✨ Features

- **Matrix of Destiny Calculation**: Calculate personal destiny matrices based on name and birth date
- **Compatibility Matrix**: Compare compatibility between two people
- **Visual Matrix Representation**: Interactive, animated matrix diagrams with detailed visualizations
- **History Management**: Save, view, and manage previous matrix calculations
- **Share Functionality**: Share matrix requests with others
- **Telegram Integration**: Native Telegram Web App with theme support
- **Responsive Design**: Optimized for mobile and desktop viewing
- **Dark/Light Theme**: Automatic theme switching based on Telegram settings

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 5.4
- **UI Library**: Material-UI (MUI) 6.3
- **Styling**: Emotion (CSS-in-JS)
- **Animations**: React Spring 9.7
- **Telegram Integration**: `@vkruglikov/react-telegram-web-app`
- **Gestures**: `@use-gesture/react`
- **State Management**: React Context API

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Backend API server running (see API Configuration)

### Setup Steps
1. Clone and install: `npm install`
2. Configure API URL in `src/api.ts`
3. Run: `npm run dev`
4. Open in browser or Telegram Web App

> **Note**: This project requires a backend API. See API Configuration section for details.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── history/          # History management components
│   │   ├── home/              # Home page components
│   │   ├── matrix/            # Matrix calculation and visualization
│   │   │   ├── form/          # Input forms (date, name, gender)
│   │   │   ├── info/          # Matrix information display
│   │   │   ├── representation/# Matrix visual representations
│   │   │   └── supplies/      # Supporting components
│   │   ├── menu/              # Navigation menu
│   │   └── styled/            # Custom styled components
│   ├── contexts/              # React Context providers
│   │   ├── AvatarProvider.tsx
│   │   ├── HistoryProvider.tsx
│   │   ├── MatrixRequestsProvider.tsx
│   │   ├── TokenContext.ts
│   │   └── TgThemeProvider.tsx
│   ├── api.ts                 # API communication layer
│   ├── App.tsx                # Main application component
│   ├── main.tsx               # Application entry point
│   └── JSONTypes.ts           # TypeScript type definitions
├── public/                    # Static assets
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- A backend API server (see `src/api.ts` for API endpoints)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure the API endpoint:
   - Edit `src/api.ts` and update the `SERVER_URL` constant:
   ```typescript
   const SERVER_URL = 'http://your-backend-url/'
   ```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

### Building for Production

Build the project:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## 🔧 Configuration

### API Configuration

The API base URL is configured in `src/api.ts`. Update the `SERVER_URL` constant to point to your backend server:

```typescript
const SERVER_URL = 'http://localhost:8000/'  // Development
// or
const SERVER_URL = 'https://your-api-domain.com/'  // Production
```

### Telegram Web App

This app is designed to run as a Telegram Web App. To test locally:
1. Use Telegram's Web App testing tools
2. Or run in a regular browser (some Telegram-specific features may not work)

## 📱 Usage

1. **Calculate Matrix of Destiny**:
   - Enter your name, date of birth, and gender
   - Click submit to generate your personal matrix
   - View detailed interpretations and visualizations

2. **Calculate Compatibility Matrix**:
   - Switch to compatibility mode
   - Enter information for both people
   - View compatibility analysis

3. **Manage History**:
   - Access previously calculated matrices
   - Share, read, or delete saved calculations

## 🎨 Features in Detail

### Matrix Visualization
- Interactive circular and grid-based matrix representations
- Animated transitions and loading states
- Color-coded elements for better readability

### Form Components
- Date picker with validation
- Name input with formatting
- Gender selection
- Compatibility mode with dual inputs

### History System
- Persistent storage of matrix requests
- Quick access to previous calculations
- Share functionality for easy distribution

## 🔐 Authentication

The app uses JWT token-based authentication:
- Access tokens for API requests
- Automatic token refresh on expiration
- Token management via React Context

## 📝 Notes

- This is a **personal pet project** and not intended for commercial use
- The backend API is required for full functionality
- Some features depend on Telegram Web App environment
- Matrix calculations are performed server-side

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

This project is for personal use only.

## 🙏 Acknowledgments

- Built with React, TypeScript, and Vite
- UI components from Material-UI
- Telegram Web App integration via `@vkruglikov/react-telegram-web-app`

---

**Note**: This project requires a backend API server to function properly. Ensure your backend is running and properly configured before using the application.
