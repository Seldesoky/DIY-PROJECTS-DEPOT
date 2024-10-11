import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import ProjectList from './pages/ProjectList.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Landing from './pages/Landing.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AddProject from './pages/AddProject.jsx';
import EditProject from './pages/EditProject.jsx';

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<ProjectList />} /> 
        <Route path="/projects/:id" element={<ProjectDetail />} />

        {/* Protected Routes */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add-project" 
          element={
            <ProtectedRoute>
              <AddProject />
            </ProtectedRoute>
        } 
      />
      <Route 
          path="/projects/edit/:id" 
          element={
            <ProtectedRoute>
              <EditProject />
            </ProtectedRoute>
        } 
      />
      </Routes>
    </div>
  );
}

export default App;
