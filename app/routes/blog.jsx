import { useLoaderData } from '@remix-run/react' // Lo que retorne de loader() voy a acceder con useLoaderData 
import { getPosts } from '~/models/posts.server' // Me traigo la funcion que obtiene la info de strapi
import ListadoPosts from '../components/listado-posts'
import styles from '~/styles/blog.css'

export function meta() {
  return [
      { title: "GuitarLA - Nuestro Blog de Guitarras" },
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
  const posts = await getPosts()
  return posts.data
}

function Blog() {

  const posts = useLoaderData()

  return (
    <main className='contenedor'>
      <ListadoPosts 
        posts={posts}
      />      
    </main>
  )
}

export default Blog
