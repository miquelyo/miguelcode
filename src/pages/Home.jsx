import {
  Link
} from 'react-router-dom'

export default function Home() {
  return (
    <div className="
      min-h-screen
      bg-[#f4f7f5]
      flex flex-col items-center justify-center
      px-6
      text-center
    ">

      <p className="text-sm text-gray-500 mb-3">
        Personal Operating System
      </p>

      <h1 className="text-6xl font-semibold tracking-tight mb-6">
        MiguelCode.
      </h1>

      <p className="text-gray-500 max-w-[500px] mb-8">
        Your premium productivity, finance, meal,
        and document management workspace.
      </p>

      <Link
        to="/login"
        className="
          h-14 px-8
          rounded-2xl
          bg-[#111111]
          text-white
          flex items-center justify-center
          font-medium
        "
      >

        Get Started

      </Link>

    </div>
  )
}