import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
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

export function Navbar() {
  const navigate = useNavigate()

  const { i18n, t } = useTranslation()
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  function handleLogout(){
    localStorage.removeItem('token')
    toast.success(t('see_you_soon'))
    navigate('/')
  }


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

  return (
    <nav className='bg-white shadow-sm border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 h-16 flex items-center justify-between'>
        <Link to='/dashboard'>
          <div className='flex items-center gap-2'>
            <span className='text-2xl'>✈️</span>
            <h1 className='text-xl font-bold text-blue-600'>My Travel Diary</h1>
          </div>
        </Link>

        <div className='flex items-center gap-4'>


            <div className='flex items-center gap-2 mr-2 border-r pr-4 border-gray-300 relative'>

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

            <button onClick={() => navigate('/trips/favorites')} className='text-gray-500 hover:text-yellow-600 font-medium transition-colors'>
                {t('favorites')}
            </button>

            <button onClick={handleLogout} className='text-gray-500 hover:text-red-600 font-medium transition-colors'>
                {t('logout_btn')}
            </button>
        </div>
      </div>
    </nav>
  )
}

// importar useNavigate de react-router-dom
// criar funcao handleLogout que remove item (token) do localStorage e navigate para login
// retorna: front end (nav, div, div com span e h1 dentro, botao de sair usando o handleLogout no onClick)
