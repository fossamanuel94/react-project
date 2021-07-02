import React from 'react'
import "../App.css";
import {Link} from 'react-router-dom'
import listSB from './SideBarList'


export default function SideBar() {

    console.log(listSB)

    return (
        <div className="side-bar justify-content-center">
            <ul className="list-group list-group-flush list-group-item-mine">
                {listSB.map(cate=>{
                    return(
                        <li className="list-group-item list-group-item-dark" style={{color:'white'}} key={cate.id_categorie}>
                            <div className="row">
                                <div className="col">
                                    <Link to={`/categorie-post/${cate.id_categorie}`} style={{color:'white'}}>
                                        <h6>{cate.categorie_name}</h6>
                                    </Link>
                                </div>
                                <div className="col">
                                    <h5>{cate.icon_categorie}</h5>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

/*<div className="row" key={item.id}>
                        <div className="col">
                            <button className="btn btn-outline-light">{item.username}</button>
                        </div>
                    </div> */