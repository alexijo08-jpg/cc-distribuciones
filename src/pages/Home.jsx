import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 text-sm font-semibold text-sky-700">
            Bienvenido a C&C Distribuciones
          </span>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            Catálogos profesionales para tu negocio.
          </h2>
          <p className="mt-6 max-w-2xl text-slate-600">
            Encuentra productos de limpieza, oficina, ferretería, alimentos y más en una plataforma diseñada para distribuidores exigentes.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/catalogos"
              className="inline-flex items-center justify-center rounded-2xl bg-navy px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-navy/20 transition hover:bg-slate-900"
            >
              Ver catálogos
            </Link>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Contacto comercial
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-inner shadow-slate-200/70">
          <img
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1000&q=80"
            alt="Movil de empresa de distribución mostrando catálogo"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
