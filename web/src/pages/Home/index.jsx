import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const LANGUAGES = [
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'it', flag: '🇮🇹', label: 'Italiano' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'zh', flag: '🇨🇳', label: '中文' },
  { code: 'jp', flag: '🇯🇵', label: '日本語'},
  { code: 'kr', flag: '🇰🇷', label: '한국어'},
];

export function Home(){
  const { t, i18n } = useTranslation()
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  function handleChangeLanguage(lang) {
    i18n.changeLanguage(lang);
    setIsLangMenuOpen(false);
  }

  function toggleChineseVariant(){
    const newLang = i18n.language === 'zh' ? 'zh_tw' : 'zh';
    i18n.changeLanguage(newLang);
  }

  const currentFlag = LANGUAGES.find(l => l.code === i18n.language)?.flag || (i18n.language === 'zh_tw' ? '🇨🇳' : '🇺🇸');

  const isChineseActive = i18n.language === 'zh' || i18n.language === 'zh_tw'

  return(
    <div className='min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50'>
      <nav className="p-4 flex justify-between items-center gap-4 border-b border-gray-200">
        <h1 className="font-bold text-2xl text-blue-600">✈️ My Travel Diary</h1>

        <div className='flex items-center gap-4'>

          <div className='flex gap-2 mr-2 border-r pr-4 border-gray-300'>

            {isChineseActive && (
              <button
                onClick={toggleChineseVariant}
                className="text-xs font-bold bg-red-50 text-red-600 px-2 py-1 rounded border border-red-100 hover:bg-red-100 transition-colors mr-1"
                title="Alternar Simplificado/Tradicional"
              >
                {i18n.language === 'zh' ? '繁' : '简'}
              </button>
            )}

            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="text-2xl hover:scale-110 transition-transform flex items-center gap-1"
            >
              {currentFlag}
              <span className="text-xs text-gray-400">▼</span>
            </button>

            {isLangMenuOpen && (
              <div className="absolute top-10 right-0 bg-white border border-gray-100 shadow-xl rounded-lg p-2 flex flex-col gap-1 w-32 animate-in fade-in slide-in-from-top-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleChangeLanguage(lang.code)}
                    className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 text-left ${i18n.language === lang.code ? 'bg-blue-50 font-bold' : ''}`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="text-sm text-gray-600">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to='/login' className='font-bold text-blue-600 rounded px-4 py-2 hover:underline'>
            {t('login_btn')}
          </Link>
          <Link to='/register' className='bg-blue-600 text-white rounded font-semibold px-4 py-2 hover:bg-blue-500'>
            {t('register_btn')}
          </Link>
        </div>
      </nav>

      <section className='max-w-6xl mx-auto mt-5 p-4 flex flex-col md:flex-row items-center gap-8'>
        <div className='flex-1'>
          <h1 className='text-4xl font-bold text-gray-800'>{t('hero_title')}</h1>
          <p className='text-xl text-gray-600 mt-4'>{t('hero_description')}</p>
          <Link to='/register' className='inline-block font-bold text-white bg-blue-600 rounded-lg shadow-lg px-8 py-4 text-lg mt-8 hover:underline'>{t('register_now_btn')}</Link>
        </div>
        <div className='flex-1'>
         <img src="/traveler.jpg" alt="traveler" className='w-full rounded-xl shadow-2xl' />
        </div>
      </section>

      <section className='py-16'>
        <h2 className='text-center text-3xl font-bold mb-5'>{t('why_title')}</h2>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl'>
              <div className='text-4xl mb-4'>📔</div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>{t('card_one_title')}</h3>
              <p className='text-gray-600'>
                {t('card_one_description')}</p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl'>
              <div className='text-4xl mb-4'>⚡</div>
                <h3 className='text-xl font-bold text-gray-800 mb-2'>{t('card_two_title')}</h3>
                <p className='text-gray-600'>
                  {t('card_two_description')}</p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl'>
              <div className='text-4xl mb-4'>☁️</div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>{t('card_three_title')}</h3>
              <p className='text-gray-600'>
                  {t('card_three_description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-blue-50 py-20'>
        <h2 className='text-center text-3xl font-bold mb-12 text-gray-800'>{t('steps_title')}</h2>

        <div className='flex flex-col items-center md:flex-row md:items-start justify-center gap-12 max-w-6xl mx-auto px-4'>

          <div className='flex flex-col items-center text-center flex-1 min-w-[200px]'>
            <div className='w-16 h-16 bg-white text-blue-600 border-2 border-blue-100 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-sm transform transition-transform hover:scale-110'>
              01
            </div>
            <h3 className='text-xl font-bold text-gray-800 mb-2'>{t('step_one_title')}</h3>
            <p className='text-gray-600 text-sm md:text-base leading-relaxed'>{t('step_one_description')}</p>
          </div>


          <div className='hidden md:flex h-full items-center pt-4 text-blue-300 text-2xl'>
            ➜
          </div>


          <div className='flex flex-col items-center text-center flex-1 min-w-[200px]'>
            <div className='w-16 h-16 bg-white text-blue-600 border-2 border-blue-100 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-sm transform transition-transform hover:scale-110'>
              02
            </div>
            <h3 className='text-xl font-bold text-gray-800 mb-2'>{t('step_two_title')}</h3>
            <p className='text-gray-600 text-sm md:text-base leading-relaxed'>{t('step_two_description')}</p>
          </div>

          <div className='hidden md:flex h-full items-center pt-4 text-blue-300 text-2xl'>
            ➜
          </div>


          <div className='flex flex-col items-center text-center flex-1 min-w-[200px]'>
            <div className='w-16 h-16 bg-white text-blue-600 border-2 border-blue-100 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-sm transform transition-transform hover:scale-110'>
              03
            </div>
            <h3 className='text-xl font-bold text-gray-800 mb-2'>{t('step_three_title')}</h3>
            <p className='text-gray-600 text-sm md:text-base leading-relaxed'>{t('step_three_description')}</p>
          </div>

        </div>
      </section>

      <footer className='bg-blue-600 text-white p-6 text-center'>
          {t('footer')}
      </footer>
    </div>
  )
}
