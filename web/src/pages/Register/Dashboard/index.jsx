import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from "../../../components/navbar"
import { api } from "../../../services/api"

export function Dashboard() {

  const [trips, setTrips] = useState([])

  useEffect(() => {
    async function loadTrips() {
      const token = localStorage.getItem('token')

      try {
        const response = await api.get('/trips', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setTrips(response.data)
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        alert('Error while loading trips...')
      }
    }

    loadTrips()
  }, [])



  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>

      <main className="max-w-7xl mx-auto px-4 py-8">

        <div class="cabecalho" className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">My trips</h2>
          <button className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition font-bold shadow-md">+ New Trip</button>
        </div>

        <div class="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map(trip =>
            <Link key={trip.id} to={`/trips/${trip.id}`} className="block">
              <div class="card" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                <div class="foto-da-viagem" className="h-48 bg-gray-200 w-full flex items-center justify-center text-gray-400">
                  ✈️
                </div>

                <div class="card-content" className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">{trip.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{new Date(trip.startDate).toLocaleDateString()}</p>
                  {trip.description && (
                    <p className="text-gray-600 mt-3 text-sm line-clamp-2">
                      {trip.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}
