import React from 'react'

export default function Card() {
    return (
        <div className="card mt-4 ml-4" style={{width:'18rem'}}>
            <img src="https://as01.epimg.net/argentina/imagenes/2021/06/22/futbol/1624313588_705198_1624325682_noticia_normal_recorte1.jpg" className="card-img-top" alt="..."></img>
            <div className="card-body">
                <h5 className="card-title">Argentina 1-0 Paraguay</h5>
                <p className="card-text">El equipo de Scaloni logro el triunfo y aseguro el paso a cuartos de final de la Copa America</p>
            </div>
        </div>
    )
}
