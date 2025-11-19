# Movie List App

A modern, interactive movie management application built with React and Redux. Browse popular movies, search for your favorites, and organize them into custom collections (Watched, Favorites, and Wishlist).

🌐 **Live Demo:** [https://petarstoev02.github.io/js-movie-app/](https://petarstoev02.github.io/js-movie-app/)

## Features

### 🎬 Movie Discovery
- **Popular Movies**: Browse trending and popular movies from the OMDb API
- **Search Functionality**: Real-time movie search with instant results
- **Movie Details**: View comprehensive information about each movie including posters, titles, and descriptions

### 📚 Personal Collections
- **Favorites**: Save your favorite movies for quick access
- **Watched**: Keep track of movies you've already watched
- **Wishlist**: Plan your movie nights with a curated wishlist

### 🔍 Advanced Filtering
- Filter your personal collection by:
  - All Movies
  - Watched Movies
  - Favorite Movies
  - Wishlisted Movies

### 🎨 Modern UI
- Built with Material-UI (MUI) for a polished, responsive design
- Clean and intuitive user interface
- Mobile-friendly responsive layout

## Tech Stack

- **React 18** - Modern React with hooks
- **Redux Toolkit** - State management for movies and collections
- **React Router** - Client-side routing
- **Material-UI (MUI)** - Component library for beautiful UI
- **Vite** - Fast build tool and development server
- **OMDb API** - The Open Movie Database API for movie data ([omdbapi.com](https://www.omdbapi.com/))

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/petarstoev02/js-movie-app.git
cd js-movie-app
```

2. Navigate to the movie-list directory and install dependencies:
```bash
cd movie-list
npm install
```

3. Set up your OMDb API key (required):
   - Get your free API key from [OMDb API](https://www.omdbapi.com/apikey.aspx)
   - The free tier allows 1,000 requests per day
   - Update the API key in `src/api/config.js`:
     ```javascript
     export const OMDB_API_KEY = 'your_api_key_here';
     ```
   - Or set it as an environment variable:
     ```bash
     # Create a .env file in the movie-list directory
     VITE_OMDB_API_KEY=your_api_key_here
     ```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
js-movie-app/
├── movie-list/
│   ├── src/
│   │   ├── api/                    # API integration files
│   │   │   ├── config.js           # OMDb API configuration
│   │   │   ├── moviesAPI.jsx       # Fetch popular movies
│   │   │   ├── searchMoviesAPI.jsx # Search movies
│   │   │   ├── serverAPI.jsx       # Server operations
│   │   │   └── getMoviesByListType.jsx
│   │   ├── components/
│   │   │   ├── Card/               # Movie card components
│   │   │   ├── FavoriteCards/      # Collection management
│   │   │   ├── FilterMenu/         # Filter component
│   │   │   ├── Header/             # Navigation tabs
│   │   │   └── SearchBar/          # Search functionality
│   │   ├── reducers/               # Redux reducers
│   │   │   ├── movieReducer.jsx
│   │   │   ├── favoriteMoviesReducer.jsx
│   │   │   ├── watchedMoviesReducer.jsx
│   │   │   ├── wishlistedMoviesReducer.jsx
│   │   │   ├── searchReducer.jsx
│   │   │   ├── filterReducer.jsx
│   │   │   └── tabReducer.jsx
│   │   ├── store.jsx               # Redux store configuration
│   │   ├── rootReducer.jsx         # Combined reducers
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx                # Entry point
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Usage

### Browsing Movies
1. Navigate to the "Movie List" tab
2. Browse popular movies displayed in a grid layout
3. Use the search bar to find specific movies

### Managing Collections
1. Click on any movie card to view actions
2. Add movies to:
   - **Favorites**: Click the favorite icon
   - **Watched**: Mark movies you've seen
   - **Wishlist**: Save movies for later

### Viewing Your Collection
1. Navigate to the "My Movies" tab
2. Use the filter dropdown to view:
   - All your saved movies
   - Only watched movies
   - Only favorite movies
   - Only wishlisted movies

## Building for Production

```bash
cd movie-list
npm run build
```

The production build will be created in the `dist` directory.

## Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. The live version is available at:
[https://petarstoev02.github.io/js-movie-app/](https://petarstoev02.github.io/js-movie-app/)

### Manual Deployment

To deploy manually:

1. Build the project:
```bash
cd movie-list
npm run build
```

2. Deploy the `dist` folder to your hosting service

## API Configuration

The app uses the [OMDb API](https://www.omdbapi.com/) (The Open Movie Database). To set up your API key:

1. Visit [OMDb API Key Registration](https://www.omdbapi.com/apikey.aspx)
2. Select the "FREE" plan (1,000 requests per day)
3. Enter your email address
4. Check your email and click the activation link
5. Copy your API key

Then update the API key in `src/api/config.js`:

```javascript
export const OMDB_API_KEY = 'your_api_key_here';
```

Or use an environment variable (recommended for production):

Create a `.env` file in the `movie-list` directory:
```
VITE_OMDB_API_KEY=your_api_key_here
```

**Note:** The API key is required for the app to function. Without a valid key, movie searches and listings will not work.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## License

This project is open source and available under the MIT License.

---

**Built with ❤️ using React, Redux, and Material-UI**
