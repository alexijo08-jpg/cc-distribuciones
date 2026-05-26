import { NavLink, Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Catalogos from './Catalogos'
import CatalogoDetalle from './pages/CatalogoDetalle'
import Admin from './pages/Admin'

const linkClass = ({ isActive }) =>
  isActive
    ? 'text-white bg-sky-600 shadow-md rounded-xl px-4 py-2 transition'
    : 'text-slate-200 hover:text-white px-4 py-2 rounded-xl transition'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-navy text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10 text-white shadow-lg shadow-slate-950/20">
                <span className="text-2xl font-bold">C&C</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sky-300">C&C Distribuciones</p>
                <h1 className="text-3xl font-semibold">Distribuidora de productos varios</h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <nav className="flex flex-wrap items-center gap-3">
              <NavLink to="/" className={linkClass} end>
                Inicio
              </NavLink>
              <NavLink to="/catalogos" className={linkClass}>
                Catálogos
              </NavLink>
            </nav>
            <NavLink
              to="/admin"
              className="text-sm text-slate-200/80 transition hover:text-white"
            >
              Admin
            </NavLink>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogos" element={<Catalogos />} />
          <Route path="/catalogo/:id" element={<CatalogoDetalle />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  )
}
