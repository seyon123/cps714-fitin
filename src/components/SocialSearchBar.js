import React from "react";
import "./SocialSearchBar.css";
import {useState} from 'react';
function SocialSearchBar(){    
    
    const [searchTerm,setSearchTerm]=useState("")
    const dummyData= [{
            "id":"MyPost",
            "userRef":2,
            "timestamp":3,
            "tags":3,
            "image":3,
            "description":3,
            "likes":3
        },{
            "id":"YourPost",
            "userRef":2,
            "timestamp":3,
            "tags":3,
            "image":3,
            "description":3,
            "likes":3
        }]

    return(
    <div className="SearchBar">
        <input className="form-control" type="text" placeholder=" Search for a post..." onChange={(event)=>{
            setSearchTerm(event.target.value);
        }}/>   
        
        {dummyData.filter((val)=>{
            
            if(searchTerm===""){
                return ""
            }else if(val.id.toLowerCase().includes(searchTerm.toLowerCase())){
                return val
            }
            return null

        }).map((val,key)=>{
            return(
                <div className="ResultsItem">
                <p>{val.id}</p>
                </div>
            );
        })}
    </div>
    );
}
export default SocialSearchBar;