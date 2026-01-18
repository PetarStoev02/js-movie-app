import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Bell, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/reducers/searchReducer'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value)
    dispatch(setSearchQuery(e.target.value))
  }

  const handleSearchToggle = () => {
    setShowSearch(!showSearch)
    if (showSearch) {
      setSearchValue('')
      dispatch(setSearchQuery(''))
    }
  }

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 px-4 md:px-12 py-4 transition-colors duration-500",
        isScrolled ? "bg-netflix-black" : "bg-gradient-to-b from-black/80 via-black/50 to-transparent"
      )}
    >
      <div className="flex items-center justify-between">
        {/* Left side - Logo and nav links */}
        <div className="flex items-center gap-8">
          {/* Netflix-style Logo */}
          <Link to="/" className="text-netflix-red font-bold text-2xl md:text-3xl tracking-wider">
            MOVIEFLIX
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={cn(
                "text-sm transition-colors hover:text-gray-300",
                location.pathname === '/' ? 'text-white font-semibold' : 'text-netflix-gray-light'
              )}
            >
              Home
            </Link>
            <Link
              to="/my-list"
              className={cn(
                "text-sm transition-colors hover:text-gray-300",
                location.pathname === '/my-list' ? 'text-white font-semibold' : 'text-netflix-gray-light'
              )}
            >
              My List
            </Link>
          </div>

          {/* Mobile dropdown */}
          <div className="md:hidden">
            <button className="flex items-center gap-1 text-sm text-white">
              Browse <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right side - Search and profile */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className={cn(
            "flex items-center transition-all duration-300",
            showSearch && "bg-black/90 border border-white"
          )}>
            <button
              onClick={handleSearchToggle}
              className="p-2 hover:text-gray-300 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <Input
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Titles, people, genres"
              className={cn(
                "bg-transparent border-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm transition-all duration-300",
                showSearch ? "w-48 md:w-64 opacity-100 px-2" : "w-0 opacity-0 px-0"
              )}
            />
          </div>

          {/* Notifications */}
          <button className="hover:text-gray-300 transition-colors hidden md:block">
            <Bell className="h-5 w-5" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded bg-netflix-red flex items-center justify-center">
              <span className="text-sm font-semibold">U</span>
            </div>
            <ChevronDown className="h-4 w-4 hidden md:block group-hover:rotate-180 transition-transform" />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
