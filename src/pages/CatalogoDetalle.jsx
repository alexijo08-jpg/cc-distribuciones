import { useMemo, useRef, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useCatalogStore } from '../store/useCatalogStore'

export default function CatalogoDetalle() {
  const { id } = useParams()
  const [busqueda, setBusqueda] = useState('')
  const touchStartX = useRef(0)
  const navigate = useNavigate()
  const catalogos = useCatalogStore((state) => state.catalogos)
  const catalogo = useMemo(() => catalogos.find((item) => item.id === id), [catalogos, id])

  const handleTouchStart = (event) => {
    const touch = event.touches[0]
    touchStartX.current = touch.clientX
  }

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - touchStartX.current
    if (deltaX > 80) {
      navigate('/catalogos')
    }
  }

  if (!catalogo) {
    return (
      <div className="rounded-3xl border border-red-200 bg-white p-8 text-center text-red-700 shadow-xl shadow-red-100/80">
        <h2 className="text-2xl font-semibold">Catálogo no encontrado</h2>
        <p className="mt-3 text-slate-600">Verifica que la ruta sea correcta o regresa al inicio.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-navy px-5 py-3 text-white hover:bg-slate-900">
          Volver al inicio
        </Link>
      </div>
    )
  }

  const productosFiltrados = catalogo.productos.filter((producto) => {
    const texto = `${producto.nombre} ${producto.descripcion}`.toLowerCase()
    return texto.includes(busqueda.toLowerCase())
  })

  return (
    <div
      className="space-y-10"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Catálogo</p>
            <h1 className="mt-3 text-4xl font-semibold text-navy">{catalogo.nombre}</h1>
            <p className="mt-4 max-w-2xl text-slate-600">{catalogo.descripcion}</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-2xl bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
          >
            Volver al inicio
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
        <label className="block text-sm font-semibold text-slate-700">Buscar productos</label>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
          <input
            type="text"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscar por nombre o descripción"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-200 sm:max-w-xl"
          />
          <p className="text-sm text-slate-500">
            {productosFiltrados.length} producto{productosFiltrados.length === 1 ? '' : 's'} encontrado{productosFiltrados.length === 1 ? '' : 's'}
          </p>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-navy">Productos</h2>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
            {productosFiltrados.length} disponibles
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {productosFiltrados.map((producto) => (
            <article
              key={producto.nombre}
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-56 overflow-hidden bg-slate-100">
                <img
                  src={producto.foto}
                  alt={producto.nombre}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-navy">{producto.nombre}</h3>
                <p className="mt-3 text-slate-600">{producto.descripcion}</p>
                <p className="mt-5 text-lg font-semibold text-slate-900">${producto.precio.toFixed(2)}</p>
              </div>
            </article>
          ))}
          {productosFiltrados.length === 0 && (
            <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
              No se encontraron productos con esa búsqueda.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
