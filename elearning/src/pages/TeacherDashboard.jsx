import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCourse } from '../contexts/CourseContext';
import { Plus, BookOpen, Users, TrendingUp, Edit, Eye, Sparkles, Award, DollarSign } from 'lucide-react';
import CreateCourseModal from '../components/CreateCourseModal';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { courses } = useCourse();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filter courses created by this teacher (in a real app, this would be from the backend)
  const teacherCourses = courses.filter(course => course.instructor === user?.name);

  const totalStudents = teacherCourses.reduce((total, course) => total + course.students, 0);
  const avgRating = teacherCourses.length > 0 
    ? teacherCourses.reduce((sum, course) => sum + course.rating, 0) / teacherCourses.length 
    : 0;
  const totalRevenue = teacherCourses.reduce((sum, course) => sum + (course.price * course.students), 0);

  const stats = [
    {
      label: 'My Courses',
      value: teacherCourses.length,
      icon: BookOpen,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      label: 'Total Students',
      value: totalStudents.toLocaleString(),
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      label: 'Avg Rating',
      value: avgRating.toFixed(1),
      icon: Award,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50'
    },
    {
      label: 'Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
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
        <div className="flex items-center justify-between mb-8 animate-fadeInUp">
          <div className="flex items-center">
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
                Teacher Dashboard
              </h1>
              <p className="text-gray-600 mt-2 font-medium">Manage your courses and track student progress</p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center transform hover:scale-105 hover:-translate-y-1 animate-pulse-slow"
          >
            <Plus className="h-5 w-5 mr-2 animate-bounce" />
            Create Course
          </button>
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
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 flex items-center">
            <BookOpen className="h-8 w-8 text-purple-600 mr-3 animate-pulse" />
            My Courses
          </h2>

          {teacherCourses.length === 0 ? (
            <div className="text-center py-16 animate-fadeInUp">
              <div className="relative mb-6">
                <BookOpen className="h-20 w-20 text-purple-300 mx-auto animate-bounce" />
                <Sparkles className="h-8 w-8 text-orange-400 absolute top-0 right-1/2 transform translate-x-8 animate-spin" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-3">No courses created yet</h3>
              <p className="text-gray-500 mb-8 text-lg">Create your first course to start teaching</p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                Create Your First Course
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-purple-200">
                    <th className="text-left py-4 px-6 font-bold text-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 rounded-tl-xl">Course</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700 bg-gradient-to-r from-purple-50 to-pink-50">Students</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700 bg-gradient-to-r from-purple-50 to-pink-50">Rating</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700 bg-gradient-to-r from-purple-50 to-pink-50">Revenue</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 rounded-tr-xl">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teacherCourses.map((course, index) => (
                    <tr 
                      key={course.id} 
                      className="border-b border-purple-100 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 animate-slideInUp"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <td className="py-6 px-6">
                        <div className="flex items-center">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-16 h-16 rounded-xl object-cover mr-4 shadow-lg hover:scale-110 transition-transform duration-300"
                          />
                          <div>
                            <p className="font-bold text-gray-800 hover:text-purple-600 transition-colors duration-300">{course.title}</p>
                            <p className="text-sm bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">{course.level}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <span className="font-bold text-green-600">{course.students.toLocaleString()}</span>
                      </td>
                      <td className="py-6 px-6">
                        <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-lg w-fit">
                          <span className="font-bold text-yellow-600">{course.rating}</span>
                          <span className="text-yellow-400 ml-1">★</span>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <span className="font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                          ${(course.price * course.students).toLocaleString()}
                        </span>
                      </td>
                      <td className="py-6 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="p-3 text-purple-600 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-xl transition-all duration-300 transform hover:scale-110 hover:rotate-12">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-3 text-green-600 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 rounded-xl transition-all duration-300 transform hover:scale-110 hover:rotate-12">
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <CreateCourseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default TeacherDashboard;