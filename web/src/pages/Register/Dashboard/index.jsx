import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from "../../../components/navbar"
import { api } from "../../../services/api"
import { toast } from 'sonner'
import { TripList } from '../../../components/TripList'

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
  const [tripImage, setTripImage] = useState(null)
  const [previewTripImage, setPreviewTripImage] = useState(null)
  const [isEditingId, setIsEditingId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadTrips() {
      try {
        const response = await api.get(`/trips?search=${search}`)
        setTrips(response.data)
      } catch (error) {
        console.error(error)
        alert('Error while loading trips...')
      } finally {
        setIsLoading(false)
      }
    }

    loadTrips()
  }, [search])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <p className="text-gray-500 text-xl animate-pulse">Loading trips...</p>
        </div>
      </div>
    )
  }

  async function handleSaveTrip(e){
    e.preventDefault()

    const data = new FormData()
    data.append('title', newTrip.title)
    data.append('content', newTrip.content)
    data.append('startDate', newTrip.startDate)
    data.append('endDate', newTrip.endDate)

    if(newTrip.description){
      data.append('description', newTrip.description)
    }

    if(tripImage){
      data.append('image', tripImage)
    }
    try {
      if (isEditingId) {
        const response = await api.patch(`/trips/${isEditingId}`, data)
        setTrips(prev => prev.map(t => t.id === isEditingId ? response.data : t))
        toast.success('Trip updated!')
      } else{
        const response = await api.post('/trips', data)
        setTrips([...trips, response.data])
        toast.success('Trip created successfully!')
      }

      handleCloseModal()
    } catch (error) {
      console.log(error)
      toast.error("Error while saving")
    }
  }

  async function handleEditTrip(trip){
    setIsEditingId(trip.id)

    setNewTrip({
      title: trip.title,
      description: trip.description || '',
      startDate: trip.startDate.split('T')[0],
      endDate: trip.endDate.split('T')[0],
    })

    setIsModalOpen(true)
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

  async function handleTripFileChange(e){
    const file = e.target.files[0]
    if(file){
      setTripImage(file)
      setPreviewTripImage(URL.createObjectURL(file))
    }
  }

  async function toggleFavorite(e, trip) {
    e.preventDefault()
    e.stopPropagation()
    const newValue = !trip.isFavorite

    setTrips(prevState => prevState.map(t => t.id === trip.id ? {...t, isFavorite: newValue} : t))
    try {
      await api.patch(`/trips/${trip.id}`, {isFavorite: newValue})
    } catch (error) {
      console.log('Error while adding to favorite', error)
      setTrips(prevState => prevState.map(t => t.id === trip.id ? {...t, isFavorite: !newValue} : t))
    }

  }

  async function handleCloseModal(){
    setIsModalOpen(false)
    setNewTrip({title: '', description: '', startDate: '', endDate: ''})
    setTripImage(null)
    setPreviewTripImage(null)
    setIsEditingId(null)
  }
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

        {isLoading && (
          <div className="flex items-center justify-center py-20">
          <p className="text-gray-500 text-xl animate-pulse">Loading trips... 🌍</p>
          </div>
        )}

        {!isLoading && trips.length === 0 && (
          <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">
              {search ? `No trips found matching "${search}"` : "You haven't created any trips yet."}
            </p>
            {!search && (
                <span className="text-sm text-gray-400">Click "New Trip" to start!</span>
            )}
          </div>
        )}

        {!isLoading && trips.length > 0 &&
        <TripList
          trips={trips}            // 1. Passa a funcao filtrada;
          onDelete={handleDeleteTrip}      // 2. Passa a função sem executar;
          onFavorite={toggleFavorite}      // 3. Passa a função sem executar;
          onEdit={handleEditTrip}          // 4. Passa a função sem executar;
        />}
      </main>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 m-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">{isEditingId ? 'Update trip' : 'New Trip'}</h2>
            <form onSubmit={handleSaveTrip} className='space-y-4'>
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
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image (Optional)</label>

                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer bg-gray-50 border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm font-medium">
                      📷 Upload Cover
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleTripFileChange}
                      />
                    </label>

                    {previewTripImage ? (
                      <div className="h-12 w-20 rounded overflow-hidden border border-gray-200">
                        <img src={previewTripImage} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">No image selected</span>
                    )}
                  </div>
                </div>
              </div>

              <div className='flex justify-end gap-2 mt-6'>
                <button type='button' className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded' onClick={(handleCloseModal)}>Cancel</button>
                <button className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold' type='submit'>{isEditingId ? 'Update trip' : 'Create trip'}</button>
              </div>
            </form>
          </div>
        </div>




      )}



    </div>
  )
}
