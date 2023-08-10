import { useState } from 'react'
import { useLoaderData, useOutletContext } from '@remix-run/react'
import { getGuitarra } from '~/models/guitarras.server'
import styles from '~/styles/guitarras.css'

export function meta({data}) {
  return [
      { title: `GuitarLA - ${data.data[0].attributes.nombre}` },
      { description: `Venta de Guitarras, guitarra ${data.data[0].attributes.nombre}` }
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

export async function loader({params}) {

  const { guitarraUrl } = params
  
  const guitarra = await getGuitarra(guitarraUrl)

  return guitarra
}

// La funcion puede nombrarse como yo quiera
function GuitarraUrl() {

  const {agregarCarrito} = useOutletContext()

  const [cantidad, setCantidad] = useState(0)

  const guitarra = useLoaderData()
  const { nombre, descripcion, precio, imagen } = guitarra.data[0].attributes

  const handleSubmit = e => {
    e.preventDefault();

    if(cantidad < 1) {
      alert("Debes seleccionar una cantidad")
      return
    }

    // Para poder colocarlo en localstorage
    const guitarraSeleccionada = {
      id: guitarra.data[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad
    }

    agregarCarrito(guitarraSeleccionada)
  }

  return (
    <main className='contenedor guitarras'>
      <img className='imagen' src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} />

      <div className='contenido'>
        <h3>{nombre}</h3>
        <p className='texto'>{descripcion} </p>
        <p className='precio'>${precio}</p>

        <form 
          className='formulario'
          onSubmit={handleSubmit}
        >
          <label htmlFor="cantidad">Selecciona la Cantidad</label>

          <select 
            id="cantidad"
            onChange={e => setCantidad(parseInt(e.target.value))} // Lo paso a string con parseInt
          >
            <option value="0">-- Seleccione --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          <input 
            value="Agregar al Carrito"
            type='submit'
          />
        </form>
      </div>
    </main>
  )
}

export default GuitarraUrl
