import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, BookOpen, User, LogOut, Home, Users, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Courses', href: '/courses', icon: BookOpen },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <BookOpen className="h-8 w-8 text-purple-600 group-hover:text-pink-600 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12" />
                <Sparkles className="h-4 w-4 text-orange-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                EduFlow
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-purple-50 transform hover:scale-105"
              >
                {item.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={user?.role === 'teacher' ? '/teacher' : '/dashboard'}
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-purple-50 transform hover:scale-105"
                >
                  Dashboard
                </Link>
                <div className="relative group">
                  <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-purple-50 transition-all duration-200">
                    <img
                      src={user?.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                      alt={user?.name}
                      className="h-8 w-8 rounded-full ring-2 ring-purple-200 group-hover:ring-purple-400 transition-all duration-200"
                    />
                    <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                  </div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-purple-100">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 w-full text-left transition-all duration-200"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-purple-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-purple-50 transform hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-purple-600 p-2 rounded-lg hover:bg-purple-50 transition-all duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-lg border-t border-purple-100 rounded-b-xl">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-purple-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <>
                  <Link
                    to={user?.role === 'teacher' ? '/teacher' : '/dashboard'}
                    className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-purple-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-lg text-base font-medium w-full text-left transition-all duration-200 hover:bg-purple-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-purple-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white block px-3 py-2 rounded-lg text-base font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;