import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CourseProvider } from './contexts/CourseContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import CourseViewPage from './pages/CourseViewPage';

function Layout({ children }) {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup", "/course/:id/learn"]; 

  // check if current path is in hidden routes
  const shouldHideNavbar = hideNavbarRoutes.some(route => 
    location.pathname.startsWith(route.replace(":id", ""))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {!shouldHideNavbar && <Navbar />}
      {children}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/course/:id" element={<CourseDetailPage />} />
              <Route path="/course/:id/learn" element={<CourseViewPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<StudentDashboard />} />
              <Route path="/teacher" element={<TeacherDashboard />} />
            </Routes>
          </Layout>
        </Router>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;
