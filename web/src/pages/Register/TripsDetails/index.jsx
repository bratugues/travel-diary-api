import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Navbar } from '../../../components/navbar'
import { api } from '../../../services/api'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next';

export function TripDetails() {
  const { tripId } = useParams()
  const [ trip, setTrip ] = useState(null)
  const [entries, setEntries] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newEntryTitle, setNewEntryTitle] = useState('')
  const [newEntryContent, setNewEntryContent] = useState('')
  const [newEntryDate, setNewEntryDate] = useState('')
  const [newEntryImage, setNewEntryImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [editingEntry, setEditingEntry] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const { t } = useTranslation()


  useEffect(() => {
    async function loadData() {
      try {
        const [tripResponse, entriesResponse] = await Promise.all([
          await api.get(`/trips/${tripId}`),
          await api.get(`/trips/${tripId}/entries`)
        ])

        setTrip(tripResponse.data)
        setEntries(entriesResponse.data)
      } catch (error) {
        alert('Error while loading trip details')
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [tripId])

  async function handleSaveEntry(e){
    e.preventDefault()
    setIsSaving(true)
    const data = new FormData()

    data.append('title', newEntryTitle)
    data.append('content', newEntryContent)
    data.append('date', new Date(newEntryDate).toISOString())

    if(newEntryImage){
      data.append('image', newEntryImage)
    }

    try {
      if(editingEntry){
        await api.patch(`/entries/${editingEntry.id}`,{
          title: newEntryTitle,
          content: newEntryContent,
          date: new Date(newEntryDate)
        })

        toast.success('Entry updated!')

        setEntries(prev => prev.map(item =>
          item.id === editingEntry.id ? {...item, title: newEntryTitle, content: newEntryContent, date: newEntryDate, imageUrl: previewImage} : item
        ))
      } else{
        const response = await api.post(`/trips/${tripId}/entries`, data)
        toast.success(t('create_entry_success_msg'))
        setEntries(prevState => [response.data, ...prevState])
      }

      handleCloseModal()
    } catch (error) {
      console.error(error)
      toast.error(t('create_entry_error_msg'))
    } finally{
      setIsSaving(false)
    }
  }

  async function handleDeleteEntry(id){
    const isConfirm = window.confirm(t('delete_entry_confirm_msg'))
    if (!isConfirm) return;
    try {
      await api.delete(`/entries/${id}`)
      setEntries(prevState => prevState.filter(entry => entry.id !== id))
      toast.success(t('delete_entry_success_msg'))
    } catch (error) {
      console.error(error)
      alert(t('delete_error_msg'))
    }
  }
  function handleFileChange(e){
    const file = e.target.files[0]
    if(file){
      setNewEntryImage(file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <p className="text-gray-500 text-xl animate-pulse">{t('loading_trip')}</p>
        </div>
      </div>
    )
  }

  function handleOpenEditModal(entry){
    setEditingEntry(entry)
    setNewEntryTitle(entry.title || '')
    setNewEntryContent(entry.content || '')

    if(entry.date){
      setNewEntryDate(entry.date.slice(0, 10))
    }

    if(entry.imageUrl){
      setPreviewImage(entry.imageUrl)
    } else{
      setPreviewImage(null)
    }

    setIsModalOpen(true)
  }

  function handleCloseModal(){
    setIsModalOpen(false)
    setEditingEntry(null)
    setNewEntryTitle('')
    setNewEntryContent('')
    setNewEntryDate('')
    setNewEntryImage(null)
    setPreviewImage(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8">

        {trip && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{trip.title}</h1>
                <p className="text-gray-500 mt-2 flex items-center gap-2">
                  📅 {new Date(trip.startDate).toLocaleDateString()}
                  <span>{t('to')}</span>
                  {new Date(trip.endDate).toLocaleDateString()}
                </p>
              </div>

              <Link to="/dashboard" className="text-blue-600 hover:underline">
                &larr; {t('back_btn')}
              </Link>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{t('logbook')}</h2>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-bold shadow-md">
            {t('new_entry')}
          </button>
        </div>

        <div className="space-y-6">
          {entries.length === 0 && (
            <p className="text-gray-500 text-center py-10">{t('no_entries_yet')}</p>
          )}

          {entries.map(entry => (
            <div key={entry.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">

              {entry.imageUrl && (
                <div className="md:w-1/3 h-64 md:h-auto bg-gray-100">
                  <img
                    src={entry.imageUrl}
                    alt={entry.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className={`p-6 ${entry.imageUrl ? 'md:w-2/3' : 'w-full'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-600 font-medium">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                  <div className='flex gap-2'>
                    <button onClick={() => handleOpenEditModal(entry)} className="text-blue-400 hover:text-blue-600 transition" title="Edit memory"> ✏️ </button>
                  <button title='delete memory' onClick={() => handleDeleteEntry(entry.id)}>🗑️</button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{entry.title}</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {entry.content}
                </p>
              </div>
            </div>
          ))}
        </div>

      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{editingEntry ? t('edit_entry_title') : t('new_entry_title')}</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEntry} className="p-6 space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('title')}</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder={t('entry_title_placeholder')}
                  value={newEntryTitle}
                  onChange={e => setNewEntryTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('date')}</label>
                <input
                  type="date"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newEntryDate}
                  onChange={e => setNewEntryDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('description')}</label>
                <textarea
                  required
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder={t('entry_description_placeholder')}
                  value={newEntryContent}
                  onChange={e => setNewEntryContent(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('photo')}</label>

                <div className="flex items-center gap-4">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition border border-gray-300 flex items-center gap-2">
                    {t('photo_btn')}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>

                  {previewImage && (
                    <div className="h-12 w-12 rounded-lg overflow-hidden border border-gray-200">
                      <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                  )}
                  {previewImage && <span className="text-xs text-green-600 font-medium">{t('selected')}</span>}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? t('saving') : (editingEntry ? t('save_entry_btn') : t('create_entry_btn'))}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}
