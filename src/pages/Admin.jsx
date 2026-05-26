import { useEffect, useMemo, useState } from 'react'
import { useCatalogStore } from '../store/useCatalogStore'

const defaultCatalogForm = {
  nombre: '',
  descripcion: '',
  imagen: ''
}

const defaultProductForm = {
  nombre: '',
  descripcion: '',
  precio: '',
  foto: ''
}

function normalizeId(nombre) {
  return nombre
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export default function Admin() {
  const catalogos = useCatalogStore((state) => state.catalogos)
  const addCatalogo = useCatalogStore((state) => state.addCatalogo)
  const updateCatalogo = useCatalogStore((state) => state.updateCatalogo)
  const deleteCatalogo = useCatalogStore((state) => state.deleteCatalogo)
  const addProducto = useCatalogStore((state) => state.addProducto)
  const updateProducto = useCatalogStore((state) => state.updateProducto)
  const deleteProducto = useCatalogStore((state) => state.deleteProducto)

  const [catalogForm, setCatalogForm] = useState(defaultCatalogForm)
  const [catalogEditId, setCatalogEditId] = useState('')
  const [selectedCatalogId, setSelectedCatalogId] = useState('')
  const [productForm, setProductForm] = useState(defaultProductForm)
  const [productEditIndex, setProductEditIndex] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!selectedCatalogId && catalogos.length > 0) {
      setSelectedCatalogId(catalogos[0].id)
    }
  }, [catalogos, selectedCatalogId])

  const selectedCatalog = useMemo(
    () => catalogos.find((catalogo) => catalogo.id === selectedCatalogId) || null,
    [catalogos, selectedCatalogId]
  )

  const handleCatalogSubmit = (event) => {
    event.preventDefault()
    const nombre = catalogForm.nombre.trim()
    if (!nombre) {
      setMessage('El nombre del catálogo es obligatorio.')
      return
    }

    if (catalogEditId) {
      updateCatalogo(catalogEditId, {
        nombre,
        descripcion: catalogForm.descripcion,
        imagen: catalogForm.imagen || 'https://images.unsplash.com/photo-1511689987-87c9e3d9ddf1?auto=format&fit=crop&w=1200&q=80'
      })
      setMessage('Catálogo actualizado correctamente.')
      setCatalogEditId('')
    } else {
      let id = normalizeId(nombre)
      let suffix = 1
      while (catalogos.some((item) => item.id === id)) {
        id = `${normalizeId(nombre)}-${suffix}`
        suffix += 1
      }
      addCatalogo({
        id,
        nombre,
        descripcion: catalogForm.descripcion,
        imagen: catalogForm.imagen || 'https://images.unsplash.com/photo-1511689987-87c9e3d9ddf1?auto=format&fit=crop&w=1200&q=80',
        productos: []
      })
      setSelectedCatalogId(id)
      setMessage('Catálogo creado correctamente.')
    }

    setCatalogForm(defaultCatalogForm)
  }

  const handleCatalogEdit = (catalogo) => {
    setCatalogEditId(catalogo.id)
    setCatalogForm({
      nombre: catalogo.nombre,
      descripcion: catalogo.descripcion,
      imagen: catalogo.imagen
    })
    setMessage('Editando catálogo seleccionado.')
  }

  const handleCatalogDelete = (id) => {
    deleteCatalogo(id)
    if (id === selectedCatalogId) {
      setSelectedCatalogId(catalogos.find((item) => item.id !== id)?.id || '')
    }
    if (catalogEditId === id) {
      setCatalogEditId('')
      setCatalogForm(defaultCatalogForm)
    }
    setMessage('Catálogo eliminado.')
  }

  const handleProductSubmit = (event) => {
    event.preventDefault()
    if (!selectedCatalog) {
      setMessage('Selecciona un catálogo antes de administrar productos.')
      return
    }

    const nombre = productForm.nombre.trim()
    const precio = parseFloat(productForm.precio)
    if (!nombre || Number.isNaN(precio)) {
      setMessage('Nombre de producto y precio válido son obligatorios.')
      return
    }

    const productoPayload = {
      nombre,
      descripcion: productForm.descripcion,
      precio,
      foto:
        productForm.foto ||
        'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&q=80'
    }

    if (productEditIndex !== null) {
      updateProducto(selectedCatalog.id, productEditIndex, productoPayload)
      setMessage('Producto actualizado correctamente.')
      setProductEditIndex(null)
    } else {
      addProducto(selectedCatalog.id, productoPayload)
      setMessage('Producto agregado correctamente.')
    }

    setProductForm(defaultProductForm)
  }

  const handleProductEdit = (index) => {
    const producto = selectedCatalog.productos[index]
    if (!producto) return
    setProductEditIndex(index)
    setProductForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio.toString(),
      foto: producto.foto
    })
    setMessage('Editando producto seleccionado.')
  }

  const handleProductDelete = (index) => {
    if (!selectedCatalog) return
    deleteProducto(selectedCatalog.id, index)
    if (productEditIndex === index) {
      setProductEditIndex(null)
      setProductForm(defaultProductForm)
    }
    setMessage('Producto eliminado.')
  }

  return (
    <div className="space-y-10">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/80">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Administración</p>
            <h1 className="mt-3 text-4xl font-semibold text-navy">Panel de administración</h1>
            <p className="mt-3 text-slate-600">
              Gestiona catálogos y productos desde este panel. Los cambios se guardan en el navegador.
            </p>
          </div>
          <div className="rounded-3xl bg-blue-900 px-6 py-4 text-white shadow-xl shadow-blue-900/20">
            <p className="text-sm uppercase tracking-[0.2em] text-sky-200">Acceso rápido</p>
            <p className="mt-2 text-lg font-semibold">/admin</p>
          </div>
        </div>
      </header>

      <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
          <h2 className="text-2xl font-semibold text-navy">Gestionar catálogos</h2>
          <p className="mt-3 text-slate-600">Crea, edita o elimina catálogos de productos.</p>

          <form className="mt-8 space-y-5" onSubmit={handleCatalogSubmit}>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Nombre del catálogo</label>
              <input
                value={catalogForm.nombre}
                onChange={(event) => setCatalogForm({ ...catalogForm, nombre: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-200"
                placeholder="Ej: Limpieza"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Descripción</label>
              <textarea
                value={catalogForm.descripcion}
                onChange={(event) => setCatalogForm({ ...catalogForm, descripcion: event.target.value })}
                rows={3}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-200"
                placeholder="Breve descripción del catálogo"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">URL de imagen</label>
              <input
                value={catalogForm.imagen}
                onChange={(event) => setCatalogForm({ ...catalogForm, imagen: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-200"
                placeholder="https://..."
              />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button className="inline-flex items-center justify-center rounded-2xl bg-blue-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-950">
                {catalogEditId ? 'Guardar cambios' : 'Crear catálogo'}
              </button>
              {catalogEditId && (
                <button
                  type="button"
                  onClick={() => {
                    setCatalogEditId('')
                    setCatalogForm(defaultCatalogForm)
                    setMessage('Edición cancelada.')
                  }}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Cancelar edición
                </button>
              )}
            </div>
          </form>

          <div className="mt-10 space-y-4">
            <h3 className="text-xl font-semibold text-navy">Catálogos existentes</h3>
            <div className="grid gap-4">
              {catalogos.map((catalogo) => (
                <div key={catalogo.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-navy">{catalogo.nombre}</p>
                      <p className="mt-1 text-sm text-slate-600">{catalogo.descripcion}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleCatalogEdit(catalogo)}
                        className="rounded-2xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-950"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCatalogDelete(catalogo.id)}
                        className="rounded-2xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-navy">Gestionar productos</h2>
              <p className="mt-3 text-slate-600">Agrega, edita o elimina productos del catálogo seleccionado.</p>
            </div>
            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
              <span className="font-semibold">Catálogo activo:</span>{' '}
              {selectedCatalog ? selectedCatalog.nombre : 'Ninguno'}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-slate-700">Seleccionar catálogo</label>
            <select
              value={selectedCatalogId}
              onChange={(event) => {
                setSelectedCatalogId(event.target.value)
                setProductEditIndex(null)
                setProductForm(defaultProductForm)
              }}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-200"
            >
              {catalogos.map((catalogo) => (
                <option key={catalogo.id} value={catalogo.id}>
                  {catalogo.nombre}
                </option>
              ))}
            </select>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleProductSubmit}>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Nombre del producto</label>
              <input
                value={productForm.nombre}
                onChange={(event) => setProductForm({ ...productForm, nombre: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-200"
                placeholder="Ej: Detergente líquido concentrado"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Descripción</label>
              <textarea
                value={productForm.descripcion}
                onChange={(event) => setProductForm({ ...productForm, descripcion: event.target.value })}
                rows={3}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-200"
                placeholder="Descripción breve del producto"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700">Precio</label>
                <input
                  type="number"
                  step="0.01"
                  value={productForm.precio}
                  onChange={(event) => setProductForm({ ...productForm, precio: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-200"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700">URL de imagen</label>
                <input
                  value={productForm.foto}
                  onChange={(event) => setProductForm({ ...productForm, foto: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-200"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button className="inline-flex items-center justify-center rounded-2xl bg-blue-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-950">
                {productEditIndex !== null ? 'Guardar producto' : 'Agregar producto'}
              </button>
              {productEditIndex !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setProductEditIndex(null)
                    setProductForm(defaultProductForm)
                    setMessage('Edición de producto cancelada.')
                  }}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Cancelar edición
                </button>
              )}
            </div>
          </form>

          <div className="mt-10">
            <h3 className="text-xl font-semibold text-navy">Productos en el catálogo</h3>
            <div className="mt-6 grid gap-4">
              {selectedCatalog ? (
                selectedCatalog.productos.map((producto, index) => (
                  <div
                    key={`${producto.nombre}-${index}`}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <p className="font-semibold text-navy">{producto.nombre}</p>
                        <p className="mt-1 text-sm text-slate-600">{producto.descripcion}</p>
                        <p className="mt-2 text-sm font-semibold text-slate-900">${producto.precio.toFixed(2)}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleProductEdit(index)}
                          className="rounded-2xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-950"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleProductDelete(index)}
                          className="rounded-2xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-600 shadow-sm">
                  Selecciona un catálogo para ver sus productos.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {message && (
        <div className="rounded-3xl border border-blue-200 bg-blue-50 px-6 py-4 text-blue-900 shadow-sm">
          {message}
        </div>
      )}
    </div>
  )
}
