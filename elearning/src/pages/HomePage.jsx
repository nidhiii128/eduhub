import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCourse } from '../contexts/CourseContext';
import { ArrowRight, Play, Star, Users, Clock, Award, Zap, Target, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const { courses } = useCourse();

  const featuredCourses = courses.slice(0, 3);

  const stats = [
    { label: 'Active Students', value: '10,000+', icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Courses Available', value: '500+', icon: Play, color: 'from-pink-500 to-orange-500' },
    { label: 'Expert Instructors', value: '100+', icon: Award, color: 'from-orange-500 to-red-500' },
    { label: 'Hours of Content', value: '2,000+', icon: Clock, color: 'from-teal-500 to-cyan-500' },
  ];

  const features = [
    {
      title: 'Interactive Learning',
      description: 'Engage with high-quality video content, quizzes, and hands-on projects',
      icon: Play,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of real-world experience',
      icon: Users,
      color: 'from-pink-500 to-orange-500'
    },
    {
      title: 'Certificates',
      description: 'Earn verified certificates upon completion to showcase your achievements',
      icon: Award,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Flexible Learning',
      description: 'Study at your own pace with lifetime access to course materials',
      icon: Clock,
      color: 'from-teal-500 to-cyan-500'
    },
    {
      title: 'Career Growth',
      description: 'Advance your career with in-demand skills and industry recognition',
      icon: Target,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Global Community',
      description: 'Connect with learners worldwide and build your professional network',
      icon: Globe,
      color: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 text-white py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fadeInUp">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Zap className="h-16 w-16 text-yellow-400 animate-bounce" />
                <div className="absolute inset-0 h-16 w-16 bg-yellow-400/20 rounded-full animate-ping"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight animate-slideInLeft">
              Master New Skills with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-orange-300 animate-gradient">
                Expert-Led Courses
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto animate-slideInRight">
              Join thousands of learners advancing their careers with our comprehensive online courses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideInUp">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-pulse-slow"
                  >
                    Start Learning Today
                  </Link>
                  <Link
                    to="/courses"
                    className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 transform hover:scale-105"
                  >
                    Browse Courses
                  </Link>
                </>
              ) : (
                <Link
                  to={user?.role === 'teacher' ? '/teacher' : '/dashboard'}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 inline-flex items-center"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 animate-bounce-x" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index} 
                  className="text-center group animate-fadeInUp"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-2xl`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-10 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-4">
              Featured Courses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular courses taught by industry experts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <div 
                key={course.id}
                className="animate-slideInUp"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fadeInUp">
            <Link
              to="/courses"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5 animate-bounce-x" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-spin-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-200/20 to-red-200/20 rounded-full blur-3xl animate-spin-slow-reverse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-4">
              Why Choose EduFlow?
            </h2>
            <p className="text-lg text-gray-600">Experience learning like never before</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group animate-slideInUp border border-gray-100"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-2xl`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full animate-pulse"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fadeInUp">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-white/90 mb-8 animate-fadeInUp delay-200">
            Join thousands of successful learners who have advanced their careers with EduFlow
          </p>
          <div className="animate-fadeInUp delay-400">
            <Link
              to="/signup"
              className="inline-flex items-center bg-white text-purple-600 px-10 py-4 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              Start Your Journey Today
              <ArrowRight className="ml-3 h-6 w-6 animate-bounce-x" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;