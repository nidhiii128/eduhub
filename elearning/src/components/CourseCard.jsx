import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Users, BookOpen, TrendingUp } from 'lucide-react';

const CourseCard = ({ course }) => {
  const levelColors = {
    'Beginner': 'from-green-500 to-emerald-500',
    'Intermediate': 'from-yellow-500 to-orange-500',
    'Advanced': 'from-red-500 to-pink-500'
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden group border border-gray-100">
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-4 left-4">
          <span className={`bg-gradient-to-r ${levelColors[course.level]} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse-slow`}>
            {course.level}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            {course.category}
          </span>
        </div>
        
        {/* Trending indicator for popular courses */}
        {course.students > 1000 && (
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
          {course.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        <div className="flex items-center mb-4">
          <span className="text-sm text-gray-500 font-medium">by {course.instructor}</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
              <Clock className="h-4 w-4 mr-1 text-purple-500" />
              {course.duration}
            </div>
            <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
              <Users className="h-4 w-4 mr-1 text-pink-500" />
              {course.students.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-bold text-yellow-600">{course.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ${course.price}
          </div>
          <Link
            to={`/course/${course.id}`}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300 inline-flex items-center transform hover:scale-105 hover:-translate-y-0.5"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;