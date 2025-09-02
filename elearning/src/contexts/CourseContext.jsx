import React, { createContext, useContext, useState } from 'react';

const CourseContext = createContext(undefined);

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};

const mockCourses = [
  {
    id: '1',
    title: 'React Fundamentals',
    description: 'Learn the basics of React including components, props, state, and hooks.',
    instructor: 'Sarah Johnson',
    duration: '8 hours',
    level: 'Beginner',
    rating: 4.8,
    students: 1205,
    price: 79,
    thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Frontend Development',
    requirements: ['Basic HTML, CSS, and JavaScript knowledge'],
    objectives: ['Understand React components', 'Master state management', 'Build interactive UIs'],
    lessons: [
      {
        id: '1-1',
        title: 'Introduction to React',
        duration: '15 min',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Overview of React and its ecosystem'
      },
      {
        id: '1-2',
        title: 'Components and JSX',
        duration: '25 min',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Creating your first React components'
      },
      {
        id: '1-3',
        title: 'Props and State',
        duration: '30 min',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Managing data in React applications'
      }
    ]
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    description: 'Master advanced JavaScript concepts including async/await, closures, and ES6+ features.',
    instructor: 'Mike Chen',
    duration: '12 hours',
    level: 'Advanced',
    rating: 4.9,
    students: 892,
    price: 99,
    thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Programming',
    requirements: ['Intermediate JavaScript knowledge'],
    objectives: ['Master async programming', 'Understand closures', 'Use modern ES6+ features'],
    lessons: [
      {
        id: '2-1',
        title: 'Async/Await Patterns',
        duration: '35 min',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Modern asynchronous programming techniques'
      },
      {
        id: '2-2',
        title: 'Closures and Scope',
        duration: '40 min',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Understanding lexical scope and closures'
      }
    ]
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    description: 'Learn essential design principles, user research, and prototyping techniques.',
    instructor: 'Emily Davis',
    duration: '6 hours',
    level: 'Beginner',
    rating: 4.7,
    students: 1567,
    price: 59,
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Design',
    requirements: ['No prior experience needed'],
    objectives: ['Understand design principles', 'Create user personas', 'Build wireframes'],
    lessons: [
      {
        id: '3-1',
        title: 'Design Fundamentals',
        duration: '20 min',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Core principles of effective design'
      },
      {
        id: '3-2',
        title: 'User Research Methods',
        duration: '30 min',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Understanding your target audience'
      }
    ]
  },
  {
    id: '4',
    title: 'Python for Data Science',
    description: 'Comprehensive introduction to Python programming for data analysis and machine learning.',
    instructor: 'Dr. Alex Rodriguez',
    duration: '15 hours',
    level: 'Intermediate',
    rating: 4.9,
    students: 2341,
    price: 129,
    thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Data Science',
    requirements: ['Basic programming knowledge'],
    objectives: ['Master Python syntax', 'Learn data manipulation with Pandas', 'Create visualizations'],
    lessons: [
      {
        id: '4-1',
        title: 'Python Basics',
        duration: '45 min',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Variables, functions, and control structures'
      },
      {
        id: '4-2',
        title: 'Data Structures',
        duration: '50 min',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Lists, dictionaries, and sets in Python'
      }
    ]
  },
  {
    id: '5',
    title: 'Digital Marketing Mastery',
    description: 'Complete guide to digital marketing including SEO, social media, and content marketing.',
    instructor: 'Lisa Thompson',
    duration: '10 hours',
    level: 'Beginner',
    rating: 4.6,
    students: 3456,
    price: 89,
    thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Marketing',
    requirements: ['No prior experience needed'],
    objectives: ['Understand SEO fundamentals', 'Create effective social media campaigns', 'Develop content strategies'],
    lessons: [
      {
        id: '5-1',
        title: 'SEO Fundamentals',
        duration: '40 min',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Search engine optimization basics'
      },
      {
        id: '5-2',
        title: 'Social Media Strategy',
        duration: '35 min',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Building effective social media presence'
      }
    ]
  },
  {
    id: '6',
    title: 'Mobile App Development',
    description: 'Build native mobile apps using React Native for iOS and Android platforms.',
    instructor: 'James Wilson',
    duration: '20 hours',
    level: 'Advanced',
    rating: 4.8,
    students: 987,
    price: 149,
    thumbnail: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Mobile Development',
    requirements: ['React knowledge', 'JavaScript proficiency'],
    objectives: ['Build cross-platform apps', 'Implement native features', 'Deploy to app stores'],
    lessons: [
      {
        id: '6-1',
        title: 'React Native Setup',
        duration: '30 min',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Setting up development environment'
      },
      {
        id: '6-2',
        title: 'Navigation Systems',
        duration: '45 min',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Implementing navigation in mobile apps'
      }
    ]
  }
];

export const CourseProvider = ({ children }) => {
  const [courses] = useState(mockCourses);
  const [enrollments, setEnrollments] = useState([]);

  const enrollInCourse = (courseId) => {
    if (!isEnrolled(courseId)) {
      const newEnrollment = {
        courseId,
        progress: 0,
        completedLessons: [],
        enrolledAt: new Date()
      };
      setEnrollments(prev => [...prev, newEnrollment]);
    }
  };

  const markLessonComplete = (courseId, lessonId) => {
    setEnrollments(prev => prev.map(enrollment => {
      if (enrollment.courseId === courseId) {
        const completedLessons = [...enrollment.completedLessons];
        if (!completedLessons.includes(lessonId)) {
          completedLessons.push(lessonId);
        }
        
        const course = courses.find(c => c.id === courseId);
        const progress = course ? (completedLessons.length / course.lessons.length) * 100 : 0;
        
        return {
          ...enrollment,
          completedLessons,
          progress
        };
      }
      return enrollment;
    }));
  };

  const isEnrolled = (courseId) => {
    return enrollments.some(enrollment => enrollment.courseId === courseId);
  };

  const getCourseProgress = (courseId) => {
    const enrollment = enrollments.find(e => e.courseId === courseId);
    return enrollment ? enrollment.progress : 0;
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        enrollments,
        enrollInCourse,
        markLessonComplete,
        isEnrolled,
        getCourseProgress
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};