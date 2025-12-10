import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="h-screen bg-gray-50 flex flex-col gap-4 items-center justify-center text-center">

      <h1 className="text-9xl font-extrabold text-blue-600">404</h1>

      <h2 className="text-2xl font-bold text-gray-800">Ops, page not found.</h2>

      <p className="text-gray-500 mb-4">
        The page you are looking for doesn't exist or was moved.
      </p>

      <Link
        to="/dashboard"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition font-medium"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}
