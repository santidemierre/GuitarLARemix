import imagen from '../../public/img/nosotros.jpg'
import styles from '~/styles/nosotros.css'

export function meta() {
  return [
      { title: "GuitarLA - Sobre Nosotros" },
      { description: 'Venta de Guitarras, blog de música' }
  ]
}

export function links() {
  return [
      {
          rel: 'stylesheet',
          href: styles
      },
      {
        rel: 'preload',
        href: imagen,
        as: 'image'
      }
  ]
}

function Nosotros() {
  return (
    <main className="contenedor nosotros main">
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
        <img src={imagen} alt='Imagen de nosotros' />

        <div>
          <p>Sed facilisis pulvinar hendrerit. Aliquam imperdiet augue sed est congue rutrum. Maecenas non mauris dui. Phasellus eu risus lobortis, vehicula quam id, tempus metus. Sed congue sagittis magna sed auctor. Sed eget tincidunt ex. Mauris sit amet felis eget neque rhoncus sagittis vel non orci.</p>
          <p> Phasellus rutrum fermentum ipsum et consequat. Morbi aliquam volutpat est condimentum scelerisque. Nullam faucibus nisi ac laoreet eleifend. Integer orci ex, ultricies vel ante quis, mattis fringilla libero. Aenean neque ipsum, ullamcorper in hendrerit ac, ullamcorper eget sapien. Cras egestas viverra purus, non feugiat nibh finibus vitae. Vestibulum pharetra leo vel leo lobortis, non tempus sem porttitor. Integer lobortis lacus vitae justo tincidunt pellentesque.</p>
        </div>
      </div>
    </main>
  )
}

export default Nosotros
