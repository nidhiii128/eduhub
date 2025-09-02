import React, { useState } from 'react';
import { X, BookOpen, Sparkles } from 'lucide-react';

const CreateCourseModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'Beginner',
    price: '',
    duration: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would create the course via API
    console.log('Creating course:', formData);
    onClose();
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      level: 'Beginner',
      price: '',
      duration: ''
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  const levelColors = {
    'Beginner': 'from-green-500 to-emerald-500',
    'Intermediate': 'from-yellow-500 to-orange-500',
    'Advanced': 'from-red-500 to-pink-500'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fadeIn">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block align-bottom bg-white/90 backdrop-blur-lg rounded-3xl px-6 pt-6 pb-6 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-purple-200 animate-slideInUp">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="relative mr-3">
                <BookOpen className="h-8 w-8 text-purple-600 animate-bounce" />
                <Sparkles className="h-4 w-4 text-orange-400 absolute -top-1 -right-1 animate-spin" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                Create New Course
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-all duration-200 hover:bg-gray-100 p-2 rounded-lg transform hover:scale-110"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-slideInLeft">
              <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">
                Course Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/80 transform focus:scale-105"
                placeholder="Enter course title"
              />
            </div>

            <div className="animate-slideInRight">
              <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/80 transform focus:scale-105"
                placeholder="Describe what students will learn"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="animate-slideInLeft">
                <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/80 transform focus:scale-105"
                  placeholder="e.g., Programming"
                />
              </div>

              <div className="animate-slideInRight">
                <label htmlFor="level" className="block text-sm font-bold text-gray-700 mb-2">
                  Level
                </label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/80 transform focus:scale-105"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="animate-slideInLeft">
                <label htmlFor="price" className="block text-sm font-bold text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/80 transform focus:scale-105"
                  placeholder="99"
                />
              </div>

              <div className="animate-slideInRight">
                <label htmlFor="duration" className="block text-sm font-bold text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/80 transform focus:scale-105"
                  placeholder="8 hours"
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-6 animate-slideInUp">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-bold hover:bg-gray-300 transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-3 px-6 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                Create Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourseModal;