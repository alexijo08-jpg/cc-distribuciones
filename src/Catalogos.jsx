import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { catalogos } from './data/catalogos'
import { useCatalogStore } from './store/useCatalogStore'

export default function Catalogos() {
  const navigate = useNavigate()
  const setSeleccionado = useCatalogStore((state) => state.setSeleccionado)

  const categorias = useMemo(
    () => catalogos.map((catalogo) => ({ id: catalogo.id, nombre: catalogo.nombre })),
    []
  )

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-navy">Catálogos C&C Distribuciones</h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Explora nuestras secciones de productos y selecciona el catálogo que mejor se adapte a tu negocio.
            </p>
          </div>
          <div className="grid gap-2 rounded-3xl bg-slate-100 p-5 text-slate-700 shadow-inner shadow-slate-200/80 sm:grid-cols-2 md:grid-cols-3 lg:w-auto">
            {categorias.map((categoria) => (
              <span key={categoria.id} className="rounded-2xl bg-white px-4 py-3 text-sm font-medium shadow-sm">
                {categoria.nombre}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {catalogos.map((catalogo) => (
          <article key={catalogo.id} className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-64 overflow-hidden bg-slate-100">
              <img
                src={catalogo.imagen}
                alt={catalogo.nombre}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-navy">{catalogo.nombre}</h3>
              <p className="mt-4 text-slate-600">{catalogo.descripcion}</p>
              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setSeleccionado(catalogo.id)
                    navigate(`/catalogo/${catalogo.id}`)
                  }}
                  className="inline-flex items-center justify-center rounded-2xl bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
                >
                  Ver productos
                </button>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                  {catalogo.productos.length} productos
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
