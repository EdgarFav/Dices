# 🎲 Dices - Fun Random Games

A fun and interactive mobile/web application built with React, Ionic, and TypeScript that offers three entertaining random games: coin flip, dice roller, and magic 8-ball.

## ✨ Features

### 🪙 Coin Flip (Head/Tails)
- Interactive coin flipping animation with realistic sound effects
- Visual representation of coin states
- Perfect for making quick decisions

### 🎲 Dice Roller
- 3D animated dice with realistic physics
- Random number generation (1-6)
- Sound effects for enhanced experience
- Smooth rotation animations

### 🔮 Magic 8-Ball
- Interactive magic 8-ball for answers to your questions
- Multiple response options with animations
- Classic fortune-telling experience
- Mystical sound effects

## 🚀 Technology Stack

- **Frontend Framework:** React 18.2.0
- **Mobile Framework:** Ionic 7.0.0 with Capacitor 5.5.1
- **Language:** TypeScript 4.1.3
- **UI Components:** Material-UI (MUI) 5.14.15
- **State Management:** React Hooks
- **Internationalization:** i18next 23.6.0
- **Build Tool:** React Scripts 5.0.0
- **Styling:** SCSS/SASS 1.85.1
- **Animation:** React Magic Motion 1.0.9
- **Component Library:** Arsa 1.0.32

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher recommended)
- **npm** or **yarn** package manager
- **Git** for version control

## 🔧 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/EdgarFav/Dices.git
cd Dices
```

2. **Install dependencies:**
```bash
npm install --legacy-peer-deps
```

Note: The `--legacy-peer-deps` flag is used to resolve peer dependency conflicts.

## 🏃 Running the Application

### Development Mode

Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000` in your default browser.

Alternative start command with Craco:
```bash
npm run startCraco
```

### Production Build

Build the application for production:
```bash
npm run build
```

The optimized build will be created in the `build/` directory.

## 📱 Mobile Development

### Android

1. **Build and copy assets:**
```bash
npm run compile
```

2. **Add Android platform (first time only):**
```bash
npm run addAndroid
```

3. **Build for Android:**
```bash
npm run android
```

4. **Run on Android device:**
```bash
npm run android-r
```

5. **Open Android Studio:**
```bash
npm run appAndroid
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

This will run tests in watch mode using the React Testing Library.

## 🔍 Linting

Check code quality and style:
```bash
npm run lint
```

This runs ESLint on TypeScript and TSX files in the `src/` directory.

## 📁 Project Structure

```
Dices/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, sounds, and media files
│   ├── components/     # Reusable React components
│   │   ├── arsa-header/
│   │   └── arsa-settings/
│   ├── pages/          # Page components
│   │   ├── Home.tsx           # Dice roller page
│   │   ├── head-tails/        # Coin flip page
│   │   ├── eight-ball/        # Magic 8-ball page
│   │   ├── LayoutTabs/        # Tab layout wrapper
│   │   └── 404/               # Not found page
│   ├── services/       # Business logic and services
│   ├── theme/          # Theme configuration
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   ├── routes.ts       # Route definitions
│   └── index.tsx       # Application entry point
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── capacitor.config.ts # Capacitor configuration
└── README.md          # This file
```

## 🎮 How to Use

1. **Launch the application** - The app starts with a beautiful loading animation
2. **Choose your game** - Select from three tabs at the bottom:
   - **Flip** - Coin flip game
   - **Casino** - Dice roller
   - **Help** - Magic 8-ball
3. **Interact** - Tap the floating action button to activate each game
4. **Enjoy** - Watch the animations and get your random results!

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server |
| `npm run startCraco` | Start with Craco configuration |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run lint` | Run ESLint |
| `npm run compile` | Build and copy Ionic assets |
| `npm run android` | Build Android app |
| `npm run android-r` | Run on Android device |
| `npm run android-build` | Build Android without opening |
| `npm run addAndroid` | Add Android platform |
| `npm run appAndroid` | Build and open Android Studio |

## 🌐 Internationalization

The application supports multiple languages using i18next. Language settings are stored locally and persist across sessions.

## 🎨 Theming

The app includes a dark/light theme switcher. Theme preferences are saved to local storage for persistence.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**EdgarFav**

## 🐛 Known Issues

- Some peer dependencies require `--legacy-peer-deps` flag during installation
- Make sure to use Node.js version 14 or higher for best compatibility

## 🔮 Future Enhancements

- Add more game types
- Multiplayer support
- Game statistics and history
- Custom dice faces
- More 8-ball responses
- PWA offline support improvements

## 📞 Support

For support, please open an issue in the GitHub repository.

---

Made with ❤️ using React and Ionic
