
import React, { useState } from "react";
//import { Row, Col, Button, Container } from "react-bootstrap";
import "./CreatePost.css";
//import Card from "react-bootstrap/Card";
import { TagsInput } from "react-tag-input-component";

function CreatePost() {

    const [selected, setSelected] = useState(["papaya"]);
    function uploadContent(e) {
        e.preventDefault();
        document.getElementById("imageUpload").click()
      }

	return (
		<div className="postBackground">
            <div className="formStyle">
                <div className="form-group">
                    <label for="postTextArea" className="labelStyle">Post</label>
                    <textarea class="form-control inputArea" rows="6" id="postTextArea">hook this up to a text variable</textarea>
                </div>
                <div className="form-group" style={{marginTop:10}}>
                <label for="tagsInput" class="labelStyle">Tags</label>
                <TagsInput
                    id="tagsInput"
                    className="form-control"
                    value={selected}
                    onChange={setSelected}
                    name="fruits"
                />
                </div>
            </div>
            <div className="input-group mb-3 uploadBar formStyle">
            <img src="camera.png" style={{display:"block", height:"30px",width:"auto",marginRight:"10px"}} onClick={uploadContent}/>
            <img src="pictures.png" style={{display:"block", height:"30px",width:"auto"}} onClick={uploadContent}/>
            <input type="file" style={{visibility: "hidden"}} className="iconFormat" id="imageUpload" ></input>
            <button className="postButtonStyle">Post</button>
            </div>
        </div>
	);
}

export default CreatePost;
