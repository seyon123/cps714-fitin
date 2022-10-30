
import React, {useState} from "react";
import "./CreatePost.css";
import { TagsInput } from "react-tag-input-component";

function CreatePost() {
    const [tags, setTags] = useState([]);
    const [postText, setPostText] = useState("");
    
    function uploadContent(e) {
        e.preventDefault();
        document.getElementById("imageUpload").click()
    }
    function postContent(e) {
        console.log("GO!");
        alert("Post Text: "+ postText + ", post Tags: ["+ tags + "].");
    }
	return (
		<div className="postBackground pb-1">
            <h1>{postText}</h1>
            <div className="formStyle">
                <div className="form-group inputArea">
                    <label for="postTextArea" className="labelStyle">Post</label>
                    <textarea 
                        class="form-control" 
                        rows="6" id="postTextArea" 
                        value={postText}
                        onChange={(event)=>setPostText(event.target.value)}>
                    </textarea>
                </div>
                <div className="form-group inputArea" style={{marginTop:10}}>
                    <label for="tagsInput" class="labelStyle">Tags</label>
                    <TagsInput
                        id="tagsInput"
                        className="form-control"
                        value={tags}
                        onChange={setTags}
                    />
                </div> 
            </div>
            <div className="inputArea formStyle">
                <div className="uploadBar formStyle" id="uploadBar">
                        <button className="photosButtonStyle" onClick={uploadContent}>
                            <img src="camera.png" style={{height:"30px",width:"auto",marginRight:"15px"}}/>
                            <img src="pictures.png" style={{height:"30px",width:"auto"}}/>
                        </button>
                        <button className="postButtonStyle" onClick={postContent}>
                            Post
                        </button>
                </div>
            </div>
            <input type="file" style={{display: "none"}} className="iconFormat" id="imageUpload" ></input>
        </div>
	);
}

export default CreatePost;
