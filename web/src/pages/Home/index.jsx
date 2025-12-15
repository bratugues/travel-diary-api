import { Link } from 'react-router-dom'
export function Home(){
  return(
    <div className='min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50'>
      <nav className="p-4 flex justify-between items-center gap-4 border-b border-gray-200">
        <h1 className="font-bold text-2xl text-blue-600">✈️ My Travel Diary</h1>
        <div className='flex gap-2'>
          <Link to='/login' className='font-bold text-blue-600 rounded px-4 py-2 hover:underline'>Login</Link>
          <Link to='/register' className='bg-blue-600 text-white rounded font-semibold px-4 py-2 hover:bg-blue-500'>Register</Link>
        </div>
      </nav>

      <section className='max-w-6xl mx-auto mt-5 p-4 flex flex-col md:flex-row items-center gap-8'>
        <div className='flex-1'>
          <h1 className='text-4xl font-bold text-gray-800'>Record every memory of your next adventure</h1>
          <p className='text-xl text-gray-600 mt-4'>Travel Diary helps you organize photos, dates, and notes from your trips in one secure and accessible place.</p>
          <Link to='/register' className='inline-block font-bold text-white bg-blue-600 rounded-lg shadow-lg px-8 py-4 text-lg mt-8 hover:underline'>Register now!</Link>
        </div>
        <div className='flex-1'>
         <img src="/traveler.jpg" alt="traveler" className='w-full rounded-xl shadow-2xl' />
        </div>
      </section>

      <section className='py-16'>
        <h2 className='text-center text-3xl font-bold mb-5'>Why choose My Travel Diary?</h2>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl'>
              <div className='text-4xl mb-4'>📔</div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>Your Personal Space</h3>
              <p className='text-gray-600'>
                A dedicated digital diary just for you. Keep your travel memories organized and distinct from social media noise.</p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl'>
              <div className='text-4xl mb-4'>⚡</div>
                <h3 className='text-xl font-bold text-gray-800 mb-2'>Instant Search</h3>
                <p className='text-gray-600'>
                  Find any memory in milliseconds. Our optimized filtering system helps you locate that specific trip by title or description instantly.</p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl'>
              <div className='text-4xl mb-4'>☁️</div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>Always With You</h3>
              <p className='text-gray-600'>
                  Whether on your phone or laptop, your photos and notes are safely backed up in the cloud, accessible from anywhere in the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-blue-50 py-20'>
        <h2 className='text-center text-3xl font-bold mb-12 text-gray-800'>Simple steps to start your journey</h2>

        <div className='flex flex-col items-center md:flex-row md:items-start justify-center gap-12 max-w-6xl mx-auto px-4'>

          <div className='flex flex-col items-center text-center flex-1 min-w-[200px]'>
            <div className='w-16 h-16 bg-white text-blue-600 border-2 border-blue-100 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-sm transform transition-transform hover:scale-110'>
              01
            </div>
            <h3 className='text-xl font-bold text-gray-800 mb-2'>Create Free Account</h3>
            <p className='text-gray-600 text-sm md:text-base leading-relaxed'>Join us in seconds. No credit card required.</p>
          </div>


          <div className='hidden md:flex h-full items-center pt-4 text-blue-300 text-2xl'>
            ➜
          </div>


          <div className='flex flex-col items-center text-center flex-1 min-w-[200px]'>
            <div className='w-16 h-16 bg-white text-blue-600 border-2 border-blue-100 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-sm transform transition-transform hover:scale-110'>
              02
            </div>
            <h3 className='text-xl font-bold text-gray-800 mb-2'>Log Your First Trip</h3>
            <p className='text-gray-600 text-sm md:text-base leading-relaxed'>Upload a cover photo and name your adventure.</p>
          </div>

          <div className='hidden md:flex h-full items-center pt-4 text-blue-300 text-2xl'>
            ➜
          </div>


          <div className='flex flex-col items-center text-center flex-1 min-w-[200px]'>
            <div className='w-16 h-16 bg-white text-blue-600 border-2 border-blue-100 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-sm transform transition-transform hover:scale-110'>
              03
            </div>
            <h3 className='text-xl font-bold text-gray-800 mb-2'>Keep It Forever</h3>
            <p className='text-gray-600 text-sm md:text-base leading-relaxed'>Your memories are now safe, organized, and accessible anytime.</p>
          </div>

        </div>
      </section>

      <footer className='bg-blue-600 text-white p-6 text-center'>
          Made with ♡ by Erick Lobo
      </footer>
    </div>

  )
}
