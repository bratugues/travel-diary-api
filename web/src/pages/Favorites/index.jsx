import { useState, useEffect } from 'react'
import { Navbar } from '../../components/navbar'
import { api } from '../../services/api'
import { toast } from 'sonner'
import { TripList } from '../../components/TripList'
import { useTranslation } from 'react-i18next';

export function Favorites() {

  const { t } = useTranslation()
  const [trips, setTrips] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function loadFavTrips() {
      try {
        const response = await api.get('/trips/favorites')
        setTrips(response.data)
      } catch (error) {
        console.error(error)
        alert(t('load_trips_error_msg'))
      }
    }

    loadFavTrips()
  }, [t])


  async function handleDeleteTrip(e, id){
    e.preventDefault()
    e.stopPropagation()

    const isConfirmed = window.confirm(t('delete_trip_confirm_message'))
    if(!isConfirmed) return

    try {
      await api.delete(`trips/${id}`)
      toast.success(t('delete_trip_success_msg'))
      setTrips(prevState => prevState.filter(trip => trip.id !== id))
    } catch (error) {
      console.error(error)
      toast.error(t('delete_trip_error_msg'))
    }
  }

  async function toggleFavorite(e, trip) {
    e.preventDefault()
    e.stopPropagation()

    setTrips(prevState => prevState.filter(t => t.id !== trip.id))
    try {
      await api.patch(`/trips/${trip.id}`, {isFavorite: !trip.isFavorite})
      toast.success(t('remove_favorite_success_msg'))
    } catch (error) {
      console.log('Error while removing from favorite', error)
      toast.error(t('remove_favorite_error_msg'))
      setTrips(prevState => [...prevState, trip])
    }

  }
  const filteredTrips = trips.filter(trip => trip.title.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Navbar/>

      <main className="max-w-7xl mx-auto px-4 py-8">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">{t('my_favorite_trips')}</h2>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder={t('search_bar')}
            className="w-full p-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}/>
        </div>

        {filteredTrips.length === 0 && (
          <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">
              {search ? t('no_trips_found', { search: search }) : t('no_trips_yet')}
            </p>
            {!search && (
                <span className="text-sm text-gray-400">{t('click_new_trip_to_start')}</span>
            )}
          </div>
        )}

        <TripList
          trips={filteredTrips}            // 1. Passa a funcao filtrada;
          onDelete={handleDeleteTrip}      // 2. Passa a função sem executar;
          onFavorite={toggleFavorite}      // 3. Passa a função sem executar;
        />
      </main>
    </div>
  )
}
