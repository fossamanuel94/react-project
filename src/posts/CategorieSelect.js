import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function CategorieSelect(props) {

    const [categories, setCategories] = useState([])
    const [categorie, setCategorie] = useState("")


    const getCategories =()=>{
        return axios.get("http://localhost:8080/categories/get-categories")
    }

    useEffect(()=>{
        const result=getCategories()
        result.then(res=>{
            setCategories(res.data.data)
        })
    },[])

    useEffect(()=>{
        props.selectCateg(categorie)
    },[categorie])

    return (
        <select className="categorie-select" onChange={(e)=>{
            setCategorie(e.target.value)}}>
            {categories.map((categorie)=>{
                return(
                    <option key={categorie.id_categorie} value={categorie.id_categorie}>{categorie.categorie}</option>
                )
            })}
        </select>
    )
}
