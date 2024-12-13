# Photo Gallery App

A simple and responsive photo gallery app built with React that uses the Unsplash API to fetch and display images. The app supports infinite scrolling, lazy loading, and error handling for a smooth user experience.

## Features:

- **Infinite Scrolling**: Automatically loads more photos as you scroll.
- **Lazy Loading**: Images load only when they are in the viewport.
- **Error Handling**: Displays an error message if the API request fails.
- **Caching**: Saves fetched images in session storage to prevent redundant API calls.
- **Hover Effects**: Subtle hover animations on images for a better user experience.
- **Staggered Animation**: Photos appear with a smooth staggered animation as you scroll down.

## Installation

1. Clone the repository

```bash
git clone https://github.com/Achyuth072/photo-gallery.git
```

2. Navigate to the project directory

```bash
cd photo-gallery
```

3. Install dependencies

```bash
npm install
```

4. Create a `.env` file in the root directory and add your Unsplash API key:

```bash
REACT_APP_UNSPLASH_ACCESS_KEY=your-unsplash-access-key
```

5. Start the development server

```bash
npm start
```