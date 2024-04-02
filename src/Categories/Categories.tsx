import React, { useEffect, useState } from "react";

import "./categoriesStyles.css"
import Header from "../Header/Header.tsx";
import { useNavigate } from "react-router-dom";


// const tagList = ["happy", "sad", "funny", "inspirational", "love", "loss", "fear", "hope"]


export default function Categories () {
   
    const [tagsList, setTags] = useState([]);

    useEffect(() => {
        fetchData()
    }, []);

    const navigate = useNavigate();
    let ran = false;

    function goto (tag: string): void {     
        navigate('/categories/aphorisms', { state: { tag } });
    }

   

    async function fetchData () {
        if (ran) return
        else ran = true;

        const response = await fetch("https://api.quotable.io/tags");
        const result = await response.json();
        console.log(result);

        const mappedTags = result.map((item: any) => ({
            id: item._id,
            name: item.name,
        }));
    
        setTags(mappedTags)
    
    }

    

    
    return (
        <>
            <div className="categoriesPage">
                <Header />

                <div className="categoryHolder">
                    {tagsList.map((tagsList, i) => {
                        return (
                            <button className="holder" onClick={() => goto(tagsList.name)}>
                                <h2>{tagsList.name}</h2>
                            </button>
                        )
                    })}
                </div>

            </div>
        </>
    )
}

