import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { catalogos as initialCatalogos } from '../data/catalogos'

export const useCatalogStore = create(
  persist(
    (set) => ({
      catalogos: initialCatalogos,
      seleccionado: null,
      scrollPosition: 0,
      setSeleccionado: (id) => set({ seleccionado: id }),
      setScrollPosition: (position) => set({ scrollPosition: position }),
      addCatalogo: (catalogo) => set((state) => ({ catalogos: [...state.catalogos, catalogo] })),
      updateCatalogo: (id, cambios) =>
        set((state) => ({
          catalogos: state.catalogos.map((item) => (item.id === id ? { ...item, ...cambios } : item))
        })),
      deleteCatalogo: (id) =>
        set((state) => ({ catalogos: state.catalogos.filter((item) => item.id !== id) })),
      addProducto: (catalogoId, producto) =>
        set((state) => ({
          catalogos: state.catalogos.map((item) =>
            item.id === catalogoId
              ? { ...item, productos: [...item.productos, producto] }
              : item
          )
        })),
      updateProducto: (catalogoId, index, producto) =>
        set((state) => ({
          catalogos: state.catalogos.map((item) => {
            if (item.id !== catalogoId) return item
            const productos = [...item.productos]
            productos[index] = producto
            return { ...item, productos }
          })
        })),
      deleteProducto: (catalogoId, index) =>
        set((state) => ({
          catalogos: state.catalogos.map((item) => {
            if (item.id !== catalogoId) return item
            return { ...item, productos: item.productos.filter((_, idx) => idx !== index) }
          })
        }))
    }),
    {
      name: 'cc-distribuciones-catalogos'
    }
  )
)
