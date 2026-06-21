import { useState, useEffect, useMemo } from 'react'
import { FileCode, FileUp, Image, Search, Grid, FolderKanban, FileText, Lock } from 'lucide-react'
import logoShort from './assets/logo_loeram_short.png'
import logoFavicon from './assets/logo_loeram_favicon.png'
import { LSS_THEME_STORAGE_KEY, LSS_THEME_DARK, LSS_THEME_LIGHT } from './utils/themeStorage'
import './App.css'

const apps = [
  {
    id: 'lss-diot',
    name: 'Generador de DIOT',
    description: 'Genera archivo de carga masiva para la DIOT, en ambas versiones, 2024 y anteriores y 2025 en adelante.',
    path: '/lss-diot/index.html',
    icon: FileUp,
    category: 'Contabilidad y Fiscal',
  },
  {
    id: 'lss-cfdi-reader',
    name: 'Lector de CFDIs',
    description: 'Visualizador de CFDIs del SAT. Carga archivos XML, muestra la información en tabla y permite exportar a Excel.',
    path: '/lss-cfdi-reader/index.html',
    icon: FileCode,
    category: 'Contabilidad y Fiscal',
  },
  {
    id: 'lss-img-compressor',
    name: 'Compresor de imágenes',
    description: 'Optimiza tus imágenes reduciendo su peso y convirtiéndolas a JPG con total privacidad en lote.',
    path: '/lss-img-compressor/index.html',
    icon: Image,
    category: 'Multimedia y Utilidades',
  },
  {
    id: 'lss-pdf-compressor',
    name: 'Compresor de PDFs',
    description: 'Reduce el tamaño de tus archivos PDF optimizando imágenes, fuentes y metadatos.',
    path: '/lss-pdf-compressor/index.html',
    icon: FileText,
    category: 'Multimedia y Utilidades',
  },
  {
    id: 'lss-password-gen',
    name: 'Generador de Contraseñas',
    description: 'Crea contraseñas seguras y aleatorias con opciones de personalización e indicador de nivel de seguridad local.',
    path: '/lss-password-gen/index.html',
    icon: Lock,
    category: 'Multimedia y Utilidades',
  },
] as const

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas')
  const [groupByCategory, setGroupByCategory] = useState(false)

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

  // Obtener categorías únicas dinámicamente
  const categories = useMemo(() => {
    const cats = apps.map((app) => app.category)
    return ['Todas', ...Array.from(new Set(cats))]
  }, [])

  // Filtrar aplicaciones en base a búsqueda y filtros
  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory =
        selectedCategory === 'Todas' || app.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  // Agrupar aplicaciones filtradas por categoría
  const groupedApps = useMemo(() => {
    const groups: { [key: string]: typeof apps[number][] } = {}
    filteredApps.forEach((app) => {
      if (!groups[app.category]) {
        groups[app.category] = []
      }
      groups[app.category].push(app)
    })
    return groups
  }, [filteredApps])

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
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Panel de Aplicaciones</h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
            Selecciona una herramienta para comenzar a trabajar.
          </p>
        </div>

        {/* Panel de Filtros y Búsqueda */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-neutral-800 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
          {/* Buscador */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Buscar aplicación..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#63048C] focus:ring-offset-1 dark:focus:ring-offset-neutral-800 transition-colors"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-400" />
          </div>

          {/* Filtros de Categorías */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#63048C] text-white shadow-sm'
                    : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Agrupador y Controles de Vista */}
          <div className="flex items-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-neutral-100 dark:border-neutral-700 justify-end">
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Agrupar:</span>
            <div className="flex rounded-lg border border-neutral-300 dark:border-neutral-600 overflow-hidden bg-neutral-50 dark:bg-neutral-900 p-0.5">
              <button
                type="button"
                onClick={() => setGroupByCategory(false)}
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  !groupByCategory
                    ? 'bg-white dark:bg-neutral-800 text-[#63048C] dark:text-[#b855e8] shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                }`}
                title="Vista de cuadrícula simple"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setGroupByCategory(true)}
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  groupByCategory
                    ? 'bg-white dark:bg-neutral-800 text-[#63048C] dark:text-[#b855e8] shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                }`}
                title="Vista agrupada por categoría"
              >
                <FolderKanban className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Listado de aplicaciones */}
        {filteredApps.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-sm">
            <p className="text-neutral-400 dark:text-neutral-550 font-medium text-base">
              No se encontraron aplicaciones con los filtros seleccionados.
            </p>
          </div>
        ) : groupByCategory ? (
          /* Renderizado agrupado por categorías */
          <div className="space-y-8 animate-fade-in">
            {Object.entries(groupedApps).map(([category, appList]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-700/60 pb-1 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#63048C] dark:bg-[#b855e8] rounded-full" />
                  {category}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {appList.map((app) => (
                    <AppCard key={app.id} app={app} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Renderizado estándar (Grid simple) */
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
            {filteredApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-700 bg-white/60 dark:bg-neutral-800/60 py-4 mt-auto">
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

/* Sub-componente de Tarjeta de Aplicación */
function AppCard({ app }: { app: typeof apps[number] }) {
  return (
    <a
      href={app.path}
      className="group flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 shadow-sm hover:shadow-lg hover:border-[#63048C] dark:hover:border-[#9d3dd4] transition-all duration-200 text-left"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#63048C]/15 dark:bg-[#63048C]/30 text-[#63048C] dark:text-[#b855e8] group-hover:bg-[#63048C]/25 dark:group-hover:bg-[#63048C]/40 transition-colors">
          <app.icon className="h-6 w-6" />
        </div>
        <div>
          <h2 className="font-semibold text-neutral-800 dark:text-neutral-100 group-hover:text-[#63048C] dark:group-hover:text-[#b855e8] transition-colors">
            {app.name}
          </h2>
          <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
            {app.category}
          </span>
        </div>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1">
        {app.description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#63048C] dark:text-[#b855e8] group-hover:gap-2 transition-all font-semibold">
        Ir a la app
        <ArrowIcon className="h-4 w-4" />
      </span>
    </a>
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
