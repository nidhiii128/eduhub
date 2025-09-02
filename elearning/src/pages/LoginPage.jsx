import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative max-w-md w-full space-y-8">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 animate-slideInUp">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <BookOpen className="h-16 w-16 text-purple-600 animate-bounce" />
                <Sparkles className="h-6 w-6 text-orange-400 absolute -top-2 -right-2 animate-spin" />
                <div className="absolute inset-0 h-16 w-16 bg-purple-400/20 rounded-full animate-ping"></div>
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 font-medium">Sign in to continue your learning journey</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl animate-shake">
                {error}
              </div>
            )}

            <div className="animate-slideInLeft">
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/80 transform focus:scale-105"
                placeholder="Enter your email"
              />
            </div>

            <div className="animate-slideInRight">
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 pr-12 bg-white/50 backdrop-blur-sm hover:bg-white/80 transform focus:scale-105"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-purple-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-purple-600" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-4 px-6 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:-translate-y-1 animate-slideInUp"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5 animate-bounce-x" />
                </div>
              )}
            </button>

            <div className="text-center animate-fadeInUp">
              <span className="text-gray-600">Don't have an account? </span>
              <Link to="/signup" className="text-purple-600 hover:text-pink-600 font-bold transition-colors duration-200">
                Sign up
              </Link>
            </div>
          </form>

          <div className="mt-8 border-t border-purple-100 pt-6 animate-fadeInUp">
            <div className="text-xs text-gray-500 space-y-2 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
              <p className="font-bold text-purple-600">Demo Accounts:</p>
              <p>Student: student@demo.com / password</p>
              <p>Teacher: teacher@demo.com / password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;