import React from "react";
//import { Row, Col, Button, Container } from "react-bootstrap";
import "./CreatePost.css";
//import Card from "react-bootstrap/Card";

function CreatePost() {

	return (
		<div class="postBackground">
            <div class="formStyle">
            <div class="form-group">
                <label for="postTextArea" class="labelStyle">Post</label>
                <textarea class="form-control" rows="6" id="postTextArea">hook this up to a text variable</textarea>
            </div>
            <div class="form-group" style={{marginTop:10}}>
            <label for="tagsInput" class="labelStyle">Tags</label>
            <input type="text" class="form-control" id="tagsInput" placeholder="Enter tags" ></input>
            </div>


            </div>
            <div class="input-group mb-3 uploadBar formStyle">
            <input type="file" class="form-control" id="inputGroupFile02" ></input>
            <button class="postButtonStyle">Post</button>
            </div>
        </div>
	);
}

export default CreatePost;
