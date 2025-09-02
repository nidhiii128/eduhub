import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourse } from '../contexts/CourseContext';
import { useAuth } from '../contexts/AuthContext';
import { ChevronLeft, ChevronRight, CheckCircle, Clock, ArrowLeft, Play, Award, Sparkles } from 'lucide-react';

const CourseViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, enrollments, markLessonComplete, getCourseProgress } = useCourse();
  const { isAuthenticated } = useAuth();

  const course = courses.find(c => c.id === id);
  const enrollment = enrollments.find(e => e.courseId === id);
  
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  if (!course || !enrollment || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 flex items-center justify-center">
        <div className="text-center animate-fadeInUp">
          <div className="text-purple-300 mb-6">
            <Play className="h-20 w-20 mx-auto animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            {!isAuthenticated ? 'Please login to access this course' : 'Course not found or not enrolled'}
          </h2>
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

  const currentLesson = course.lessons[currentLessonIndex];
  const isCurrentLessonCompleted = enrollment.completedLessons.includes(currentLesson.id);
  const progress = getCourseProgress(course.id);

  const handleMarkComplete = () => {
    markLessonComplete(course.id, currentLesson.id);
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 h-screen">
          {/* Video Player */}
          <div className="lg:col-span-3 bg-black flex flex-col">
            {/* Top Bar */}
            <div className="bg-gradient-to-r from-gray-800 via-purple-800 to-pink-800 text-white p-4 flex items-center justify-between animate-slideInDown">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-gray-300 hover:text-white transition-all duration-200 hover:bg-white/10 px-3 py-2 rounded-lg transform hover:scale-105"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </button>
              <h1 className="text-lg font-bold truncate mx-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {course.title}
              </h1>
              <div className="text-sm bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-bold">
                {Math.round(progress)}% Complete
              </div>
            </div>

            {/* Video */}
            <div className="flex-1 flex items-center justify-center bg-black relative">
              <div className="w-full max-w-4xl aspect-video relative">
                <iframe
                  src={currentLesson.videoUrl}
                  title={currentLesson.title}
                  className="w-full h-full rounded-lg"
                  frameBorder="0"
                  allowFullScreen
                />
                {/* Video overlay effects */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                    Lesson {currentLessonIndex + 1}
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Info & Controls */}
            <div className="bg-gradient-to-r from-gray-800 via-purple-800 to-pink-800 text-white p-6 animate-slideInUp">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    {currentLesson.title}
                  </h2>
                  <p className="text-gray-300 mt-1">{currentLesson.description}</p>
                </div>
                <div className="flex items-center text-sm bg-purple-600/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                  <Clock className="h-4 w-4 mr-2 text-purple-300" />
                  <span className="text-purple-200 font-medium">{currentLesson.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handlePrevLesson}
                    disabled={currentLessonIndex === 0}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </button>
                  <button
                    onClick={handleNextLesson}
                    disabled={currentLessonIndex === course.lessons.length - 1}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>

                <button
                  onClick={handleMarkComplete}
                  disabled={isCurrentLessonCompleted}
                  className={`flex items-center px-8 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                    isCurrentLessonCompleted
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white cursor-default animate-pulse-slow'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-2xl hover:-translate-y-1'
                  }`}
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  {isCurrentLessonCompleted ? 'Completed' : 'Mark Complete'}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Course Content */}
          <div className="lg:col-span-1 bg-white/90 backdrop-blur-lg border-l border-purple-200 overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 flex items-center">
                <Sparkles className="h-5 w-5 text-orange-500 mr-2 animate-spin" />
                Course Content
              </h3>
              
              {/* Progress Bar */}
              <div className="mb-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">Progress</span>
                  <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg animate-pulse-slow"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                {progress === 100 && (
                  <div className="flex items-center justify-center mt-4 text-green-600 animate-bounce">
                    <Award className="h-5 w-5 mr-2" />
                    <span className="font-bold">Course Completed!</span>
                  </div>
                )}
              </div>

              {/* Lessons List */}
              <div className="space-y-3">
                {course.lessons.map((lesson, index) => {
                  const isCompleted = enrollment.completedLessons.includes(lesson.id);
                  const isCurrent = index === currentLessonIndex;
                  
                  return (
                    <div
                      key={lesson.id}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-102 hover:shadow-lg animate-slideInRight ${
                        isCurrent 
                          ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 shadow-lg' 
                          : 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border border-purple-100'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => setCurrentLessonIndex(index)}
                    >
                      <div className="flex items-start">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 mt-1 transition-all duration-300 ${
                          isCompleted 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white animate-pulse' 
                            : isCurrent 
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-bounce'
                              : 'bg-gray-200 text-gray-600'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <span className="text-xs font-bold">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-bold transition-colors duration-300 ${
                            isCurrent ? 'text-purple-700' : 'text-gray-800 hover:text-purple-600'
                          }`}>
                            {lesson.title}
                          </h4>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {lesson.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewPage;