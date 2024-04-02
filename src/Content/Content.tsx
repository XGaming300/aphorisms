import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./contentStyles.css"
import Header from "../Header/Header.tsx"; 


export default function Content() {
    const { state } = useLocation();
    const { tag } = state;

    const [items, setItems] = useState([]);
    let ran = false;

    
    useEffect(() => {
        fetchData()
    }, []);

    
    async function fetchData () {
        if (ran) return
        else ran = true;

        let link = "https://api.quotable.io/quotes?tags=" + tag.toLowerCase();
        const response = await fetch(link);
        const result = await response.json();

        const mappedItems = result.results.map((item: any) => ({
            id: item._id,
            content: item.content,
            author: item.author
        }));
    
        setItems(mappedItems)
    }

    function handleLike(action: string, element: string) {
        let likeButton = document.getElementById("likeButton" + element)
        let dislikeButton = document.getElementById("dislikeButton" + element)

        if (!localStorage.getItem('id')) localStorage.setItem("id", JSON.stringify([]));


        if (action === "like") {
            likeButton?.classList.add("hide")
            dislikeButton?.classList.remove("hide")

            const getIds = localStorage.getItem('id');
            const idList = JSON.parse(getIds);

            if (idList) {
                idList.push(element)
                localStorage.setItem("id", JSON.stringify(idList));
            }

        } else {
            likeButton?.classList.remove("hide")
            dislikeButton?.classList.add("hide")

            const getIds = localStorage.getItem('id');
            const idList = JSON.parse(getIds);

            if (idList) {
                idList.pop(idList.indexOf(element))
                localStorage.setItem("id", JSON.stringify(idList));
            } 
        }

    }

    if (!items || !items.length) return (
        <div className="contentPage">

            <Header />

            <div className="col">

                <div className="title">
                    <h2>{ tag }</h2>
                    <div></div>
                </div>

                <h4 className="noItems">NO ITEMS</h4>
                <a href="/categories" className="noItemsButton">GO BACK</a>
            </div>
        </div>
    );

    return (
        <>
            <div className="contentPage">

                <Header />

                <div className="col">

                    <div className="title">
                        <h2>{ tag }</h2>
                        <div></div>
                    </div>

                    <div className="itemsHolder">
                        {items.map((item) => {

                            if (JSON.parse(localStorage.getItem('id')).includes(item.id)) {
                                return (
                                    <div key={item._id} className="item">
                                        <div className="textHolder">
                                            <h2>"{item.content}"</h2>
                                            <h3>- {item.author}</h3>
                                        </div>
                                        <div className="likeButtonHolder">
                                            <button id={"likeButton" + item.id} className="material-symbols-outlined hide" onClick={() => handleLike("like", item.id)}>favorite</button>
                                            <button id={"dislikeButton" + item.id} className="material-symbols-outlined fill" onClick={() => handleLike("dislike", item.id)}>favorite</button>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={item._id} className="item">
                                        <div className="textHolder">
                                            <h2>"{item.content}"</h2>
                                            <h3>- {item.author}</h3>
                                        </div>
                                        <div className="likeButtonHolder">
                                            <button id={"likeButton" + item.id} className="material-symbols-outlined" onClick={() => handleLike("like", item.id)}>favorite</button>
                                            <button id={"dislikeButton" + item.id} className="material-symbols-outlined fill hide" onClick={() => handleLike("dislike", item.id)}>favorite</button>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

