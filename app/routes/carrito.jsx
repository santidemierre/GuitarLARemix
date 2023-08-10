import { useState, useEffect } from 'react'
import { useOutletContext } from '@remix-run/react'
import { ClientOnly } from 'remix-utils'
import styles from '~/styles/carrito.css'


export function meta() {
    return [
        { title: "GuitarLA - Carrito de compras" },
        { description: 'Venta de Guitarras, blog de música' }
    ]
  }

export function links() {
    return [
      {
          rel: 'stylesheet',
          href: styles
      }
  ]
  }

export default function Carrito() {

  const [ total, setTotal ] = useState(0)
  const { carrito, actualizarCantidad, elimiarGuitarra } = useOutletContext()

  useEffect(() => {
    const calculotTotal = carrito.reduce( (total, guitarra) => total + (guitarra.cantidad * guitarra.precio), 0)
    setTotal(calculotTotal)
  }, [carrito])
 
  return (
    <ClientOnly fallback={'Cargando...'}>
      {() => (
        <main className="contenedor">
            <h1 className="heading">Carrito de compras</h1>
        
            <div className="contenido">

                <div className="carrito">
                    <h2>Articulos</h2>
                    {carrito?.length === 0 ? 'Carrito Vacio' : (
                      carrito?.map( producto  => (
                        <div key={producto.id} className='producto'>
                          <div>
                            <img src={producto.imagen} className='imagen-carrito' alt={`Imagen del producto ${producto.imagen}`} />
                          </div>

                          <div>
                            <p className='nombre'>{producto.nombre}</p>
                            <p className='cantidad'>Cantidad:</p>
                            <select
                              value={producto.cantidad}
                              className='select'
                              onChange={ e => actualizarCantidad({
                                cantidad: +e.target.value,
                                id: producto.id
                              })}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>

                            <p className='precio'>$ <span>{producto.precio}</span></p>
                            <p className='subtotal'>Subtotal: $ <span>{producto.cantidad * producto.precio}</span></p>
                          </div>

                          <button 
                            type='button'
                            className='btn-eliminar'
                            onClick={() => elimiarGuitarra(producto.id)}
                          >X</button>

                        </div>
                      ))
                    )}
                </div>

                <aside className="resumen">
                    <h3>Resumen del pedido</h3>
                    <p>Total a pagar: $<span>{total}</span></p>
                </aside>
            </div>        
        </main>
      )}
    </ClientOnly>
  )
}
