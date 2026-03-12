import { useState, useEffect } from 'react'
import { FileCode, FileUp } from 'lucide-react'
import logoShort from './assets/logo_loeram_short.png'
import logoFavicon from './assets/logo_loeram_favicon.png'
import { LSS_THEME_STORAGE_KEY, LSS_THEME_DARK, LSS_THEME_LIGHT } from './utils/themeStorage'
import './App.css'

const apps = [
  {
    id: 'lss-diot',
    name: 'Generador de DIOT',
    description: 'Genera archivo de carga masiva para la DIOT, en ambas versiones, 2024 y anteriores y 2025 en adelante',
    path: '/lss-diot/index.html',
    icon: FileUp,
  },
  {
    id: 'lss-cfdi-reader',
    name: 'Lector de CFDIs',
    description: 'Visualizador de CFDIs del SAT. Carga archivos XML, muestra la información en tabla y permite exportar a Excel.',
    path: '/lss-cfdi-reader/index.html',
    icon: FileCode,
  },
] as const

function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return true
    const stored = localStorage.getItem(LSS_THEME_STORAGE_KEY)
    if (stored) return stored === LSS_THEME_DARK
    return true // tema oscuro por defecto en este proyecto
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem(LSS_THEME_STORAGE_KEY, LSS_THEME_DARK)
    } else {
      root.classList.remove('dark')
      localStorage.setItem(LSS_THEME_STORAGE_KEY, LSS_THEME_LIGHT)
    }
  }, [dark])

  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      link.type = 'image/png'
      document.head.appendChild(link)
    }
    link.href = logoFavicon
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Header */}
      <header className="border-b border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logoShort}
              alt="Loeram"
              className="h-9 w-auto object-contain"
            />
            <h1 className="text-xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-100">
              LSS Apps
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            title={dark ? 'Modo claro' : 'Modo oscuro'}
            aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {dark ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* Main: app grid */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10">
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
          Selecciona una aplicación para continuar.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <a
              key={app.id}
              href={app.path}
              className="group flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 shadow-sm hover:shadow-lg hover:border-[#63048C] dark:hover:border-[#9d3dd4] transition-all duration-200 text-left"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#63048C]/15 dark:bg-[#63048C]/30 text-[#63048C] dark:text-[#b855e8] group-hover:bg-[#63048C]/25 dark:group-hover:bg-[#63048C]/40 transition-colors">
                  <app.icon className="h-6 w-6" />
                </div>
                <h2 className="font-semibold text-neutral-800 dark:text-neutral-100">
                  {app.name}
                </h2>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {app.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#63048C] dark:text-[#b855e8] group-hover:gap-2 transition-all">
                Ir a la app
                <ArrowIcon className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-700 bg-white/60 dark:bg-neutral-800/60 py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <a
            href="https://www.loeramsoft.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-[#63048C] dark:hover:text-[#b855e8] transition-colors"
          >
            Loeram Software Solutions
          </a>
        </div>
      </footer>
    </div>
  )
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  )
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  )
}

export default App
