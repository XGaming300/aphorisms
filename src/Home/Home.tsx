import React, { useEffect, useState } from "react";

import "./homeStyles.css"
import Header from "../Header/Header.tsx";


export interface Quote {
    id: string;
    content: string;
    author: string;
}


export interface QuotableQuote {
    author: string;
    authorSlug: string;
    content: string;
    dateAdded: string;
    dateModified: string;
    length: number;
    tags: string[];
    _id: string;
}


export default function Home() {
    const [quotes, setQuotes] = useState<Quote[]>([]);

    useEffect(() => {
        fetchData()
    }, []);

    
    async function fetchData () {
        const response = await fetch("https://api.quotable.io/quotes/random?limit=20");
        const result = await response.json();

        const mappedQuotes = result.map((item: any) => ({
            id: item._id,
            content: item.content,
            author: item.author
        }));

        setQuotes(mappedQuotes)

        // localStorage.setItem('quotes', JSON.stringify(mappedQuotes));
        // const quotesString = localStorage.getItem('quotes');
        // const quotesParsed = JSON.parse(quotesString);

    }

    if (!quotes) return (<></>);


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

   
    return (
        <div className="homePage">
            <Header />

            <div className="bestAphorism">
                {quotes.map((quote) => {

                    if (!localStorage.getItem('id')) localStorage.setItem("id", JSON.stringify([]));

                    if (JSON.parse(localStorage.getItem('id')).includes(quote.id)) {

                        return (
                            <div key={quote.id} className="item">
                                <div className="textHolder">
                                    <h2>"{quote.content}"</h2>
                                    <h3>- {quote.author}</h3>
                                </div>
                                <div className="likeButtonHolder">
                                    <button id={"likeButton" + quote.id} className="material-symbols-outlined hide" onClick={() => handleLike("like", quote.id)}>favorite</button>
                                    <button id={"dislikeButton" + quote.id} className="material-symbols-outlined fill " onClick={() => handleLike("dislike", quote.id)}>favorite</button>
                                </div>
                            </div>

                        );
                    } else {
                        return (
                            <div key={quote.id} className="item">
                                 <div className="textHolder">
                                    <h2>"{quote.content}"</h2>
                                    <h3>- {quote.author}</h3>
                                </div>
                                <div className="likeButtonHolder">
                                    <button id={"likeButton" + quote.id} className="material-symbols-outlined " onClick={() => handleLike("like", quote.id)}>favorite</button>
                                    <button id={"dislikeButton" + quote.id} className="material-symbols-outlined hide fill " onClick={() => handleLike("dislike", quote.id)}>favorite</button>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>

        </div>
    )
    
}

