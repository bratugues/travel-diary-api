import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from "../../../components/navbar"
import { api } from "../../../services/api"
import { toast } from 'sonner'

export function Dashboard() {

  const [trips, setTrips] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTrip, setNewTrip] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: ''
  })
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function loadTrips() {
      try {
        const response = await api.get('/trips')

        setTrips(response.data)
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        alert('Error while loading trips...')
      }
    }

    loadTrips()
  }, [])

  async function handleCreateTrip(e){
    e.preventDefault()

    const response = await api.post('/trips', newTrip)
    toast.success('Trip created successfully!')

    setTrips([...trips, response.data])
    setIsModalOpen(false)
    setNewTrip({title: '', description: '', startDate: '', endDate: ''})
  }

  async function handleDeleteTrip(e, id){
    e.preventDefault()
    e.stopPropagation()

    const isConfirmed = window.confirm('Are you sure you want to delete this trip?')
    if(!isConfirmed) return

    try {
      await api.delete(`trips/${id}`)
      toast.success('Trip deleted successfully!')
      setTrips(prevState => prevState.filter(trip => trip.id !== id))
    } catch (error) {
      console.error(error)
      toast.error('Error while deleting trip...')
    }
  }

  const filteredTrips = trips.filter(trip => trip.title.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Navbar/>

      <main className="max-w-7xl mx-auto px-4 py-8">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">My trips</h2>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition font-bold shadow-md">+ New Trip</button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for a trip..."
            className="w-full p-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}/>
        </div>

        {filteredTrips.length === 0 && (
          <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">
              {search ? `No trips found matching "${search}"` : "You haven't created any trips yet."}
            </p>
            {!search && (
                <span className="text-sm text-gray-400">Click "New Trip" to start!</span>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map(trip =>
            <Link key={trip.id} to={`/trips/${trip.id}`} className="block group">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition relative">
              <button onClick={(e) => handleDeleteTrip(e, trip.id)} className="absolute top-1 right-1 text-black-300 hover:text-red-500 transition z-10 p-2" title="Delete Trip">ⅹ</button>
                <div className="h-48 bg-gray-200 w-full flex items-center justify-center text-gray-400">
                  <div>✈️</div>
                </div>

                <div className="p-4">
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

      {isModalOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 m-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">New Trip</h2>
            <form onSubmit={handleCreateTrip} className='space-y-4'>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Title</label>
                <input placeholder='Ex.: Paris 2025' className='w-full border rounded p-2' value={newTrip.title} onChange={e => setNewTrip({...newTrip, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <input placeholder='Ex.: Trip to visit girlfriend' className='w-full border rounded p-2' value={newTrip.description} onChange={e => setNewTrip({...newTrip, description: e.target.value})} />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Start</label>
                  <input type='date' className='w-full border rounded p-2' value={newTrip.startDate} onChange={e => setNewTrip({...newTrip, startDate: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">End</label>
                  <input type='date' className='w-full border rounded p-2' value={newTrip.endDate} onChange={e => setNewTrip({...newTrip, endDate: e.target.value})} />
                </div>
              </div>

              <div className='flex justify-end gap-2 mt-6'>
                <button type='button' className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded' onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold' type='submit'>Create Trip</button>
              </div>
            </form>
          </div>
        </div>




      )}



    </div>
  )
}
