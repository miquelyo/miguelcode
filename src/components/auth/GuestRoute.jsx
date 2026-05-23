import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function GuestRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    // Return loading placeholder or null while session is being verified
    return (
      <div className="min-h-screen bg-[#f4f7f5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#111111]/10 border-t-[#111111] rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium font-sans">Verifying session...</p>
        </div>
      </div>
    )
  }

  if (user) {
    // Already authenticated? Send them to dashboard
    return <Navigate to="/dashboard" replace />
  }

  // Not authenticated? Render guest-only content
  return children
}
