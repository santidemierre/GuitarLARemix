import { useState, useEffect } from 'react'

import {
    Meta,
    Links,
    Outlet,
    Scripts, // Sirve para eliminar el flash al cambiar de página
    LiveReload, // Sirve para que se realicen los cambios al recargar
} from '@remix-run/react'

import styles from '~/styles/index.css'
import Header from '~/components/header'
import Footer from './components/footer'

export function meta() {
    return [
        { charset: "utf-8" },
        { title: "GuitarLA - Remix" },
        { name: "viewport", content: "width=device-width,initial-scale=1" },
    ]
}

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },        
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: 'true'
        },
        {
            rel: 'stylesheet',
            href:'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
        },
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}


export default function App() {

    // getItem() es para obtener un valor
    const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
    const [carrito,setCarrito] = useState(carritoLS)

    useEffect(() => {
        // setItem es para agregar a localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }, [carrito]) // Cada vez que carrito cambie useEffect se va a efecutar

    const agregarCarrito = guitarra => {
        if(carrito.some(guitarraState => guitarraState.id === guitarra.id)) {
            // Iterar sobre el arreglo, e identificar el elemento duplicado
            const carritoActualizado = carrito.map( guitarraState => {
                if(guitarraState.id === guitarra.id) {
                    // Reescribir la cantidad
                    guitarraState.cantidad = guitarra.cantidad 
                }
                return guitarraState
            })

            // Añadir al carrito
            setCarrito(carritoActualizado)
        } else {
            // Registro nuevo, agregar al carrito
            setCarrito([...carrito, guitarra])
        }
    }

    const actualizarCantidad = guitarra => {
        const carritoActualizado = carrito.map(guitarraState => {
            if(guitarraState.id === guitarra.id) {
                guitarraState.cantidad = guitarra.cantidad
            }
            return guitarraState
        })
        setCarrito(carritoActualizado)
    }

    const elimiarGuitarra = id => {
        const carritoActualizado = carrito.filter( guitarraState => guitarraState.id !== id)
        setCarrito(carritoActualizado)
    }

    return (
        <Document>
            <Outlet 
                context={{
                    agregarCarrito,
                    carrito,
                    actualizarCantidad,
                    elimiarGuitarra
                }}
            />
        </Document>
    )
}

function Document({children}) {
    return (
        <html lang='es'>
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Header />
                {children}
                <Footer />

                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}