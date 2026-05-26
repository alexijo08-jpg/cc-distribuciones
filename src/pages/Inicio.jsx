import { Link } from 'react-router-dom'
import { catalogos } from '../data/catalogos'

export default function Inicio() {
  return (
    <div className="space-y-10">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/80">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-900 text-white shadow-lg shadow-blue-900/20">
              <span className="text-2xl font-bold">C&C</span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Distribuidora de productos varios</p>
              <h1 className="mt-2 text-4xl font-semibold text-navy">C&C Distribuciones</h1>
            </div>
          </div>
          <div className="rounded-3xl bg-blue-900 px-6 py-4 text-white shadow-xl shadow-blue-900/20">
            <p className="text-sm uppercase tracking-[0.2em] text-sky-200">Soluciones comerciales</p>
            <p className="mt-2 text-2xl font-semibold">Calidad, servicio y surtido</p>
          </div>
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-blue-900 px-8 py-10 text-white shadow-xl shadow-blue-900/20">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-200">Bienvenido</p>
          <h2 className="mt-4 text-4xl font-semibold">Nuestra distribuidora está lista para atender tu negocio</h2>
          <p className="mt-4 text-slate-200/90">
            Explora catálogos profesionales con productos de limpieza, alimentos, oficina, ferretería y más. Todo pensado para que tu compra sea ágil, segura y confiable.
          </p>
        </div>
      </section>

      <section>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-500">Catálogos</p>
            <h3 className="mt-2 text-3xl font-semibold text-navy">Explora todos nuestros catálogos</h3>
          </div>
          <Link
            to="/catalogos"
            className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-blue-900 shadow-md shadow-slate-300 transition hover:bg-slate-100"
          >
            Ver listado completo
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {catalogos.map((catalogo) => (
            <Link
              key={catalogo.id}
              to={`/catalogo/${catalogo.id}`}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-56 overflow-hidden bg-slate-100">
                <img
                  src={catalogo.imagen}
                  alt={catalogo.nombre}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-semibold text-navy">{catalogo.nombre}</h4>
                <p className="mt-3 text-slate-600">{catalogo.descripcion}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
