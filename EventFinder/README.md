# EventFinder - React Native App

A native Android application built with Expo React Native that helps users discover local events based on their current location or chosen location.

## Features

- **Location-based Event Discovery**: Uses GPS to find events near your current location
- **Event Filtering**: Filter events by type (Music, Sports, Art, Theater)
- **Interactive Map**: View events on an OpenStreetMap with custom markers
- **Distance Calculation**: Shows distance from your location to each event
- **Modern UI**: Clean, minimalist design with intuitive navigation
- **Free AI-powered Search**: Simulated AI event discovery (expandable to real web scraping)

## Technology Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **React Native Maps**: Map integration with OpenStreetMap
- **Expo Location**: GPS and location services
- **Free Solutions**: No API keys required for basic functionality

## Project Structure

```
EventFinder/
├── App.tsx                 # Main application component
├── components/
│   ├── MapViewComponent.tsx     # Interactive map with event markers
│   ├── FilterComponent.tsx      # Event type filter buttons
│   └── EventListComponent.tsx   # Scrollable list of events
├── services/
│   ├── LocationService.ts       # GPS and location utilities
│   └── EventScraper.ts         # Event data fetching (simulated AI)
├── assets/                 # App icons and images
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   cd EventFinder
   npm install
   ```

2. **Install Expo CLI** (if not already installed):
   ```bash
   npm install -g @expo/cli
   ```

3. **Start Development Server**:
   ```bash
   npm start
   ```

4. **Run on Android**:
   ```bash
   npm run android
   ```

## Usage

1. **Grant Location Permission**: The app will request location access on first launch
2. **View Events**: Events appear on both the map and in the list below
3. **Filter Events**: Tap event type buttons to show/hide specific categories
4. **Explore Map**: Zoom and pan the map to see events in different areas
5. **Event Details**: Tap on any event card to see full details

## Event Types & Colors

- 🔴 **Music** (Red): Concerts, festivals, live performances
- 🔵 **Sports** (Teal): Games, tournaments, athletic events  
- 🟡 **Art** (Blue): Exhibitions, galleries, art shows
- 🟢 **Theater** (Green): Plays, performances, drama

## Development Notes

- **Location Services**: Uses Expo Location for GPS functionality
- **Maps**: Integrated with OpenStreetMap (free alternative to Google Maps)
- **Event Data**: Currently uses simulated data; can be extended with real web scraping
- **AI Integration**: Placeholder for future AI-powered event discovery
- **Permissions**: Configured for Android location access in app.json

## Future Enhancements

- Real web scraping integration for live event data
- AI-powered event recommendations
- User favorites and event reminders
- Social sharing features
- Event categories expansion
- Search functionality

## Building for Production

To build an APK for Android:

```bash
expo build:android
```

## License

ISC License - Free for personal and commercial use.
