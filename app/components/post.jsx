import { Link } from "@remix-run/react"
import { formatearFecha } from "~/utils/helpers" 

export default function post({post}) {
    
    const { contenido, imagen, titulo, url, publishedAt } = post

  return (
    <article className="post">
        <img src={imagen.data.attributes.formats.small.url} alt={`Imagen Blog ${titulo}`} />

        <div className="contenido">
            <h3 className="titulo">{titulo}</h3>
            <p className="fecha">{formatearFecha(publishedAt)}</p>
            <p className="resumen">{contenido}</p>
            <Link className="enlace" to={`/posts/${url}`}>Leer Post</Link>
        </div>
    </article>
  )
}
