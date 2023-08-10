import { useLoaderData } from '@remix-run/react'
import { getPost } from '~/models/posts.server'
import { formatearFecha } from "~/utils/helpers" 
import styles from '~/styles/blog.css'

export function meta() {
    return [
        {title: "GuitarLA - Nuestro Blog"},
        {description: "GuitarLA - Blog de música y venta de guitarras"}
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
    const {postUrl} = params
    
    const post = await getPost(postUrl)
    if(post.data.length === 0) {
        throw new Response('', {
            status: 404,
            statusText: "Entrada no encontrada"
        })
    }

    return post
}

export default function Post() {

    const post = useLoaderData()
    const { contenido, imagen, titulo, publishedAt } = post.data[0].attributes

  return (
    <article className='contenedor post-individual'>
      <img src={imagen.data.attributes.url} alt={`Imagen Blog ${titulo}`} />

        <div className="contenido">
            <p className="fecha">{formatearFecha(publishedAt)}</p>
            <h3 className="titulo">{titulo}</h3>
            <p className="texto">{contenido}</p>
        </div>
    </article>
  )
}
