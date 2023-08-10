import { useLoaderData } from '@remix-run/react' // Lo que retorne de loader() voy a acceder con useLoaderData 
import { getGuitarras } from "~/models/guitarras.server" // Me traigo la funcion que obtiene las guitarras de strapi
import ListadoGuitarras from '../components/listado-guitarras'
import styles from '~/styles/guitarras.css'

export function meta() {
  return [
      { title: "GuitarLA - Nuestras Guitarras" },
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

// Loader esta retornando el resultado de las guitarras
export async function loader() {
  const guitarras = await getGuitarras()
  return guitarras.data
}

function Tienda() {

  const guitarras = useLoaderData()

  return (
    <main className='contenedor main'>
      <ListadoGuitarras 
        guitarras={guitarras}
      />
    </main>
  )
}

export default Tienda
