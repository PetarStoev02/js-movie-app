# MovieFlix - Netflix Clone

A Netflix-inspired movie streaming UI built with React, Tailwind CSS, and shadcn/ui. Browse movies, search for your favorites, and save them to your personal list.

## Features

### Netflix-Style UI
- **Dark Theme**: Sleek black and red Netflix color palette
- **Hero Section**: Featured movie billboard with gradient overlays
- **Horizontal Carousels**: Browse movies by category with smooth scrolling
- **Hover Effects**: Movie cards expand on hover to show details
- **Responsive Design**: Works on desktop, tablet, and mobile

### Movie Discovery
- **Multiple Categories**: Trending, Action, Sci-Fi, Classics, Comedy, Horror, Drama
- **Real-Time Search**: Expandable search bar in the navbar
- **Movie Details Modal**: Click any movie to see full info (rating, plot, cast, etc.)

### My List
- **Save Movies**: Add movies to your personal list with one click
- **Persistent Storage**: Your list is saved in localStorage
- **Easy Management**: View and remove movies from your list

## Tech Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool and dev server
- **OMDb API** - Movie data from [omdbapi.com](https://www.omdbapi.com/)

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/petarstoev02/js-movie-app.git
cd js-movie-app/movie-list
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your OMDb API key
VITE_OMDB_API_KEY=your_api_key_here
VITE_OMDB_BASE_URL=https://www.omdbapi.com/
```

4. Get your free OMDb API key:
   - Visit [OMDb API](https://www.omdbapi.com/apikey.aspx)
   - Select the "FREE" plan (1,000 requests/day)
   - Enter your email and activate via the confirmation link

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
movie-list/
├── src/
│   ├── api/
│   │   ├── config.js              # API configuration (env vars)
│   │   └── moviesAPI.jsx          # Movie fetching functions
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── button.jsx
│   │   │   ├── input.jsx
│   │   │   ├── dialog.jsx
│   │   │   ├── tabs.jsx
│   │   │   └── skeleton.jsx
│   │   ├── layout/
│   │   │   └── Navbar.jsx         # Netflix-style navbar
│   │   ├── hero/
│   │   │   └── HeroSection.jsx    # Featured movie billboard
│   │   ├── carousel/
│   │   │   └── MovieCarousel.jsx  # Horizontal movie carousel
│   │   └── movie/
│   │       ├── MovieCard.jsx      # Movie card with hover
│   │       └── MovieModal.jsx     # Movie details modal
│   ├── pages/
│   │   ├── HomePage.jsx           # Main browse page
│   │   └── MyListPage.jsx         # User's saved movies
│   ├── reducers/
│   │   ├── myListReducer.jsx      # My List state (localStorage)
│   │   └── searchReducer.jsx      # Search query state
│   ├── lib/
│   │   └── utils.js               # Utility functions (cn)
│   ├── App.jsx                    # Main app with routes
│   ├── rootReducer.jsx            # Combined Redux reducers
│   ├── store.jsx                  # Redux store
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Tailwind + custom styles
├── .env.example                   # Environment variables template
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
├── vite.config.js                 # Vite configuration
└── package.json
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OMDB_API_KEY` | Your OMDb API key | Yes |
| `VITE_OMDB_BASE_URL` | OMDb API base URL | No (defaults to https://www.omdbapi.com/) |

## Usage

### Browse Movies
- Scroll through different movie categories on the home page
- Use the left/right arrows to navigate carousels

### Search
- Click the search icon in the navbar
- Type to search for movies in real-time
- Results appear in a grid below

### View Movie Details
- Click on any movie poster to open the details modal
- See rating, plot, cast, director, awards, and more

### My List
- Click "Add to My List" in the movie modal
- Or use the + button on movie cards
- View your saved movies at `/my-list`
- Remove movies by clicking the trash icon

## Building for Production

```bash
npm run build
```

The production build will be created in the `dist` directory.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is open source and available under the MIT License.

---

**Built with React, Tailwind CSS, and shadcn/ui**
