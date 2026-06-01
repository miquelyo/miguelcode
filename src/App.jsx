import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Flow from './pages/Flow'
import Vault from './pages/Vault'
import Documents from './pages/Documents'
import MealPlanner from './pages/MealPlanner'
import Portfolio from './pages/Portfolio'

import ProtectedRoute from './components/auth/ProtectedRoute'
import GuestRoute from './components/auth/GuestRoute'

export default function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route
        path="/"
        element={<Navigate to="/portfolio" replace />}
      />

      <Route
        path="/portfolio"
        element={<Portfolio />}
      />

      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      {/* PRIVATE */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/flow"
        element={
          <ProtectedRoute>
            <Flow />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vault"
        element={
          <ProtectedRoute>
            <Vault />
          </ProtectedRoute>
        }
      />

      <Route
        path="/documents"
        element={
          <ProtectedRoute>
            <Documents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/meal-planner"
        element={
          <ProtectedRoute>
            <MealPlanner />
          </ProtectedRoute>
        }
      />

      {/* CATCH-ALL: redirect unknown routes to portfolio */}
      <Route
        path="*"
        element={<Navigate to="/portfolio" replace />}
      />

    </Routes>
  )
}
