import React from "react";
import "./headerStyles.css"
import logo from "../logo.png"

export default function Header() { 
    return (
        <div key={'header'} className="header">
            <a href="/"><img src={logo} alt="" /></a>
            <div>
                <a href="/categories">CATEGORIES</a>
            </div>
        </div>
    )
    
}

