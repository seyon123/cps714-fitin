import React, { useState } from "react";
import "./CreatePost.css";
import { TagsInput } from "react-tag-input-component";
import { AiFillCamera, AiFillPicture } from "react-icons/ai";

function CreatePost() {
	const [tags, setTags] = useState([]);
	const [postText, setPostText] = useState("");

	function uploadContent(e) {
		e.preventDefault();
		document.getElementById("imageUpload").click();
	}
	function postContent(e) {
		alert("Post Text: " + postText + ", post Tags: [" + tags + "].");
	}
	return (
		<div className="postBackground pb-1 mt-3">
			<div className="formStyle">
				<div className="form-group inputArea">
					<label htmlFor="postTextArea" className="labelStyle">
						Post
					</label>
					<textarea className="form-control" rows="6" id="postTextArea" value={postText} onChange={(event) => setPostText(event.target.value)}></textarea>
				</div>
				<div className="form-group inputArea" style={{ marginTop: 10 }}>
					<label htmlFor="tagsInput" className="labelStyle">
						Tags
					</label>
					<TagsInput id="tagsInput" className="form-control" value={tags} onChange={setTags} />
				</div>
			</div>
			<div className="inputArea formStyle">
				<div className="uploadBar formStyle" id="uploadBar">
					<button className="photosButtonStyle" onClick={uploadContent}>
						<AiFillCamera color="white" size="30px" style={{ marginRight: "10px" }} />
						<AiFillPicture color="white" size="30px" />
					</button>
					<button className="postButtonStyle" onClick={postContent}>
						Post
					</button>
				</div>
			</div>
			<input type="file" style={{ display: "none" }} className="iconFormat" id="imageUpload"></input>
		</div>
	);
}

export default CreatePost;
