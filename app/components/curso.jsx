
export default function Curso({curso}) {

    const { titulo, contenido, imagen } = curso

  return (
    <section className="curso">

      <style jsx={true}>{`
        .curso {          
          background-image: linear-gradient(to right, rgb(0 0 0 / .65), rgb(0 0 0 / .7)), url(${imagen.data.attributes.url})
        }
      `}</style>

      <div className="contenedor curso-grid">
        <div className="contenido">
          <div className="heading">{titulo}</div>
          <p className="texto">{contenido}</p>
        </div>        
        
      </div>
    </section>
  )
}
