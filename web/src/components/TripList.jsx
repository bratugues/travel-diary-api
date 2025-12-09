import {Link} from 'react-router-dom'

export const TripList = ({trips, onDelete, onFavorite, onEdit}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trips.map(trip => (
        <div key={trip.id} className="relative group">
           <Link key={trip.id} to={`/trips/${trip.id}`} className="block group">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition relative">
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Para não abrir o Link
                    onEdit(trip);       // Envia a viagem inteira para o pai preencher o formulário
                  }}
                  className="absolute top-1 right-6 text-gray-300 hover:text-blue-500 transition z-10 p-2"
                  title="Edit Trip"
                >
                  ✎
                </button>
              <button onClick={(e) => onDelete(e, trip.id)} className="absolute top-1 right-1 text-gray-300 hover:text-red-500 transition z-10 p-2" title="Delete Trip">ⅹ</button>
              <button onClick={(e) => onFavorite(e, trip)} className={`absolute top-1 left-1 ${trip.isFavorite ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'} transition z-10 p-2`} title="Favorite Trip">★</button>
                <div className="h-48 bg-gray-200 w-full flex items-center justify-center text-gray-400 relative">
                  <img src={trip.imageUrl || "/default-trip.jpg"} alt={trip.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  {!trip.imageUrl && <div className="absolute inset-0 bg-black/10"></div>}
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
        </div>
      ))}
    </div>
  )
}
