# 💧 Vavet — Drink Water Reminder App

A beautiful, production-ready hydration tracking app built with React + Vite. Glassmorphic design with deep blue aesthetics, smooth animations, and full offline functionality via localStorage.

---

## Features

- **Daily Water Tracking** — Log drinks in ml/oz with quick presets (Sip, Glass, Bottle, Large) or custom amounts
- **Animated Water Circle** — Stunning circular progress with real water waves and bubble physics
- **Streak Tracking** — Daily goal streaks with fire badge
- **History & Charts** — Weekly bar chart, 30-day activity grid, day-by-day breakdown
- **Smart Reminders** — Browser notifications with configurable interval and quiet hours
- **Personalized Goals** — Weight-based recommendations (35ml/kg) or fully custom
- **Onboarding Flow** — 3-step setup: welcome, profile, goal
- **Glassmorphic UI** — Frosted glass cards, gradient mesh background, subtle animated orbs
- **Full Offline Support** — All data stored in localStorage, zero backend needed
- **Responsive** — Optimized for mobile (375–430px) but works on any screen

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18.3 | UI framework |
| Vite | 5.3 | Build tool & dev server |
| Framer Motion | 11 | Animations & transitions |
| date-fns | 3.6 | Date formatting & manipulation |
| Lucide React | 0.416 | Icon system |
| Tailwind CSS | 3.4 | Utility styling |

---

## Project Structure

```
vavet/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── DrinkLog.jsx        # Today's drink entries list
│   │   ├── Navigation.jsx      # Bottom tab bar
│   │   ├── Onboarding.jsx      # First-run setup wizard
│   │   ├── QuickAdd.jsx        # Quick add buttons + custom input
│   │   ├── StatsStrip.jsx      # Stats metric cards
│   │   ├── Toast.jsx           # Toast notification system
│   │   └── WaterCircle.jsx     # Animated circular progress
│   ├── context/
│   │   └── AppContext.jsx      # Global state provider
│   ├── hooks/
│   │   ├── useLocalStorage.js  # Persistent state hook
│   │   ├── useReminders.js     # Browser notification scheduling
│   │   ├── useToast.js         # Toast queue management
│   │   └── useWaterTracker.js  # Core tracking logic
│   ├── pages/
│   │   ├── Home.jsx            # Main tracking screen
│   │   ├── History.jsx         # Charts & history
│   │   └── Settings.jsx        # All settings
│   ├── styles/
│   │   └── globals.css         # Global styles, animations, glass effects
│   ├── App.jsx                 # Root component
│   └── main.jsx                # Entry point
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Converting to a Mobile App

### Option 1 — Capacitor (Recommended for iOS/Android)

```bash
npm install @capacitor/core @capacitor/cli
npx cap init vavet com.yourname.vavet
npm run build
npx cap add ios
npx cap add android
npx cap sync
npx cap open ios      # Opens Xcode
npx cap open android  # Opens Android Studio
```

### Option 2 — PWA (Progressive Web App)

Add to `vite.config.js`:
```js
import { VitePWA } from 'vite-plugin-pwa'

plugins: [
  react(),
  VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'Vavet',
      short_name: 'Vavet',
      description: 'Drink Water Reminder',
      theme_color: '#0d1f3c',
      icons: [...]
    }
  })
]
```

### Option 3 — Tauri (Desktop)

```bash
npm install @tauri-apps/cli
npx tauri init
npx tauri dev
npx tauri build
```

---

## Notification Permissions

The app uses the **Web Notifications API** for reminders. Users must grant permission when enabling reminders in Settings. Works in:
- Chrome / Edge (all platforms)
- Firefox
- Safari 16.4+ (iOS/macOS)

---

## Customization

### Colors
Edit `tailwind.config.js` → `theme.extend.colors.ocean` for the blue palette.

### Preset Drink Amounts
Edit `src/components/QuickAdd.jsx` → `PRESET_AMOUNTS` array.

### Reminder Messages
Edit `src/hooks/useReminders.js` → `REMINDER_MESSAGES` array.

### Goal Calculation Formula
Edit `src/hooks/useWaterTracker.js` → `recommendedGoal` (currently 35ml × weight in kg).

---

## License

MIT — free to use, modify, and distribute.
