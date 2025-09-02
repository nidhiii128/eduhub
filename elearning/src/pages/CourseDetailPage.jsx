import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourse } from '../contexts/CourseContext';
import { useAuth } from '../contexts/AuthContext';
import { Star, Clock, Users, Play, BookOpen, CheckCircle, Award, Sparkles, TrendingUp } from 'lucide-react';

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, enrollInCourse, isEnrolled } = useCourse();
  const { isAuthenticated } = useAuth();

  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center animate-fadeInUp">
          <div className="text-purple-300 mb-6">
            <BookOpen className="h-20 w-20 mx-auto animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Course not found</h2>
          <button
            onClick={() => navigate('/courses')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    enrollInCourse(course.id);
  };

  const handleStartLearning = () => {
    navigate(`/course/${course.id}/learn`);
  };

  const levelColors = {
    'Beginner': 'from-green-500 to-emerald-500',
    'Intermediate': 'from-yellow-500 to-orange-500',
    'Advanced': 'from-red-500 to-pink-500'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-purple-100 animate-slideInLeft">
              <div className="relative overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {course.students > 1000 && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Trending
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <span className={`bg-gradient-to-r ${levelColors[course.level]} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse-slow`}>
                    {course.level}
                  </span>
                  <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold">
                    {course.category}
                  </span>
                </div>

                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-6">
                  {course.title}
                </h1>

                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex items-center space-x-8 mb-8">
                  <div className="flex items-center bg-yellow-50 px-4 py-2 rounded-xl">
                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="font-bold text-yellow-600">{course.rating}</span>
                  </div>
                  <div className="flex items-center bg-purple-50 px-4 py-2 rounded-xl">
                    <Users className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="font-bold text-purple-600">{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center bg-pink-50 px-4 py-2 rounded-xl">
                    <Clock className="h-5 w-5 text-pink-500 mr-2" />
                    <span className="font-bold text-pink-600">{course.duration}</span>
                  </div>
                </div>

                <div className="border-t border-purple-100 pt-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <Sparkles className="h-6 w-6 text-orange-500 mr-2 animate-spin" />
                    What you'll learn
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.objectives?.map((objective, index) => (
                      <div 
                        key={index} 
                        className="flex items-start p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 animate-slideInUp hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0 animate-pulse" />
                        <span className="text-gray-700 font-medium">{objective}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {course.requirements && (
                  <div className="border-t border-purple-100 pt-8 mt-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Requirements</h3>
                    <div className="space-y-3">
                      {course.requirements.map((requirement, index) => (
                        <div 
                          key={index} 
                          className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 animate-slideInUp"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-4 mt-2 flex-shrink-0 animate-pulse"></span>
                          <span className="text-gray-700 font-medium">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl mt-8 p-8 border border-purple-100 animate-slideInLeft delay-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Play className="h-6 w-6 text-purple-600 mr-2 animate-pulse" />
                Course Content
              </h3>
              <div className="space-y-4">
                {course.lessons.map((lesson, index) => (
                  <div 
                    key={lesson.id} 
                    className="flex items-center p-6 border border-purple-200 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 group transform hover:scale-102 hover:shadow-lg animate-slideInUp"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl mr-4 text-sm font-bold group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">{lesson.title}</h4>
                      <p className="text-gray-600">{lesson.description}</p>
                    </div>
                    <div className="flex items-center text-sm text-purple-600 bg-purple-50 px-3 py-2 rounded-lg">
                      <Clock className="h-4 w-4 mr-1" />
                      {lesson.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 sticky top-24 border border-purple-100 animate-slideInRight">
              <div className="text-center mb-8">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-2 animate-pulse">
                  ${course.price}
                </div>
                <p className="text-gray-600 font-medium">One-time payment</p>
              </div>

              {enrolled ? (
                <button
                  onClick={handleStartLearning}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-6 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:-translate-y-1 animate-pulse-slow"
                >
                  <Play className="h-5 w-5 mr-2 animate-bounce" />
                  Continue Learning
                </button>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-4 px-6 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:-translate-y-1"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  {isAuthenticated ? 'Enroll Now' : 'Login to Enroll'}
                </button>
              )}

              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between py-4 border-b border-purple-100">
                  <span className="text-gray-600 font-medium">Instructor</span>
                  <span className="font-bold text-purple-600">{course.instructor}</span>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-purple-100">
                  <span className="text-gray-600 font-medium">Duration</span>
                  <span className="font-bold text-pink-600">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-purple-100">
                  <span className="text-gray-600 font-medium">Lessons</span>
                  <span className="font-bold text-orange-600">{course.lessons.length}</span>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-purple-100">
                  <span className="text-gray-600 font-medium">Level</span>
                  <span className={`font-bold bg-gradient-to-r ${levelColors[course.level]} bg-clip-text text-transparent`}>
                    {course.level}
                  </span>
                </div>
                <div className="flex items-center justify-between py-4">
                  <span className="text-gray-600 font-medium">Certificate</span>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-yellow-500 mr-2 animate-bounce" />
                    <span className="font-bold text-yellow-600">Yes</span>
                  </div>
                </div>
              </div>

              {/* Bonus Features */}
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                  <Sparkles className="h-5 w-5 text-orange-500 mr-2 animate-spin" />
                  Course Includes
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Lifetime access
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Mobile and TV access
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Certificate of completion
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    30-day money-back guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;