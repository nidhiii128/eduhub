import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCourse } from '../contexts/CourseContext';
import { BookOpen, Clock, Trophy, Play, TrendingUp, Sparkles, Target, Award } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { courses, enrollments, getCourseProgress } = useCourse();

  const enrolledCourses = enrollments.map(enrollment => {
    const course = courses.find(c => c.id === enrollment.courseId);
    return course ? { ...course, ...enrollment } : null;
  }).filter(Boolean);

  const totalHoursCompleted = enrolledCourses.reduce((total, course) => {
    if (course) {
      const hours = parseInt(course.duration.split(' ')[0]);
      return total + (hours * (course.progress / 100));
    }
    return total;
  }, 0);

  const completedCourses = enrolledCourses.filter(course => course && course.progress === 100).length;

  const stats = [
    {
      label: 'Enrolled Courses',
      value: enrolledCourses.length,
      icon: BookOpen,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      label: 'Completed',
      value: completedCourses,
      icon: Trophy,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      label: 'Hours Learned',
      value: Math.round(totalHoursCompleted),
      icon: Clock,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    },
    {
      label: 'Avg Progress',
      value: `${enrolledCourses.length > 0 
        ? Math.round(enrolledCourses.reduce((sum, course) => sum + (course?.progress || 0), 0) / enrolledCourses.length)
        : 0}%`,
      icon: TrendingUp,
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'from-teal-50 to-cyan-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <div className="flex items-center mb-4">
            <div className="relative mr-4">
              <img
                src={user?.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                alt={user?.name}
                className="w-16 h-16 rounded-full ring-4 ring-purple-200 animate-pulse"
              />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="h-6 w-6 text-orange-400 animate-spin" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 mt-2 font-medium">Continue your learning journey</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                className={`bg-gradient-to-r ${stat.bgColor} rounded-2xl shadow-lg p-6 border border-white/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 animate-slideInUp`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center">
                  <div className={`p-4 bg-gradient-to-r ${stat.color} rounded-xl shadow-lg transform hover:scale-110 hover:rotate-12 transition-all duration-300`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">{stat.label}</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* My Courses */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-purple-100 animate-slideInUp">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center">
              <Target className="h-8 w-8 text-purple-600 mr-3 animate-pulse" />
              My Courses
            </h2>
            <Link
              to="/courses"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5"
            >
              Browse More Courses
            </Link>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="text-center py-16 animate-fadeInUp">
              <div className="relative mb-6">
                <BookOpen className="h-20 w-20 text-purple-300 mx-auto animate-bounce" />
                <Sparkles className="h-8 w-8 text-orange-400 absolute top-0 right-1/2 transform translate-x-8 animate-spin" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-3">No courses enrolled yet</h3>
              <p className="text-gray-500 mb-8 text-lg">Start your learning journey by enrolling in a course</p>
              <Link
                to="/courses"
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 inline-flex items-center"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course, index) => (
                course && (
                  <div 
                    key={course.id} 
                    className="border border-purple-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white/50 backdrop-blur-sm transform hover:scale-105 hover:-translate-y-1 animate-slideInUp"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-40 object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-purple-600 transition-colors duration-300">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 font-medium">by {course.instructor}</p>
                      
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">Progress</span>
                          <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {Math.round(course.progress)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg animate-pulse-slow"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <Link
                        to={`/course/${course.id}/learn`}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:-translate-y-0.5"
                      >
                        <Play className="h-4 w-4 mr-2 animate-bounce" />
                        {course.progress === 0 ? 'Start Course' : 'Continue Learning'}
                      </Link>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;