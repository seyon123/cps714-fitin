import React, { useState } from "react";
import "./CreatePost.css";
import { TagsInput } from "react-tag-input-component";
import { Line } from "rc-progress";
import { useAuth } from "../contexts/AuthContext";
import { storage, db } from "../firebase";
import { doc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AiFillCamera, AiFillPicture, AiFillCloseCircle } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import imageCompression from "browser-image-compression";
import { Image } from "react-bootstrap";

function CreatePost() {
	const { currentUser } = useAuth();
	const [tags, setTags] = useState([]);
	const [postText, setPostText] = useState("");
	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState(null);
	const [progress, setProgress] = useState(0);

	function uploadContent() {
		document.getElementById("imageUpload").click();
	}

	const handleFileChange = async (e) => {
		const options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1920,
			useWebWorker: true,
		};

		const compressedFile = await imageCompression(e.target.files[0], options);

		setFile(compressedFile);
		var filePath = e.target.value.toString().split("\\");
		var name = filePath[filePath.length - 1];
		if (name.length > 20) name = name.split(".")[0].substring(0, 20) + "...." + name.split(".")[name.split(".").length - 1];
		setFileName(`${name}`);
	};

	const handleTrash = () => {
		setFileName(null);
		setFile(null);
		setProgress(0);
	};

	function resetCreatePost() {
		setTags([]);
		setPostText("");
		setFile(null);
		setFileName(null);
		setProgress(0);
	}

	async function postContent() {
		// Upload file and metadata to the object 'images/mountains.jpg'
		const storageRef = ref(storage, `images/${currentUser?.uid}/${Math.floor(Math.random() * (9999 - 1000)) + 1000}-${fileName}`);
		const uploadTask = file && uploadBytesResumable(storageRef, file);

		// Listen for state changes, errors, and completion of the upload.
		file &&
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("Upload is " + progress + "% done");
					switch (snapshot.state) {
						case "paused":
							console.log("Upload is paused");
							break;
						case "running":
							console.log("Upload is running");
							setProgress(progress);
							break;
						default:
							break;
					}
				},
				(error) => {
					// A full list of error codes is available at
					// https://firebase.google.com/docs/storage/web/handle-errors
					switch (error.code) {
						case "storage/unauthorized":
							// User doesn't have permission to access the object
							break;
						case "storage/canceled":
							// User canceled the upload
							break;
						// ...
						case "storage/unknown":
							// Unknown error occurred, inspect error.serverResponse
							break;
						default:
							break;
					}
				},
				() => {
					// Upload completed successfully, now we can get the download URL
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						console.log("File available at", downloadURL);
						await addDoc(collection(db, `posts`), {
							userRef: doc(db, `users`, currentUser.uid),
							tags: tags,
							description: postText,
							timestamp: serverTimestamp(),
							image: downloadURL,
						});
						resetCreatePost();
					});
				}
			);
		!file &&
			postText &&
			(await addDoc(collection(db, `posts`), {
				userRef: doc(db, `users`, currentUser.uid),
				tags: tags,
				description: postText,
				timestamp: serverTimestamp(),
			}));
		resetCreatePost();
	}
	return (
		<div className="postBackground pb-1 mt-3">
			<div className="formStyle">
				<div className="form-group inputArea">
					<label htmlFor="postTextArea" className="labelStyle">
						Create Post
					</label>
					{file && <Image className="rounded postImage my-2" src={URL.createObjectURL(file)} alt={fileName} />}
					{progress > 0 && <Line percent={progress} strokeWidth={2} trailWidth={2} trailColor="#141414" strokeColor="#0088ff" />}
					<textarea className="form-control" rows="6" placeholder="Write about your workout..." id="postTextArea" value={postText} onChange={(e) => setPostText(e.target.value)}></textarea>
				</div>
				<div className="inputArea">
					<label htmlFor="tagsInput" className="labelStyle2">
						Add Tags
					</label>
					<TagsInput id="tagsInput w-100" className="form-control" value={tags} onChange={setTags} />
				</div>
			</div>
			<div className=" mx-4 my-2" id="uploadBar">
				<div className="photosButtonStyle">
					<AiFillCamera className="me-2" role="button" color="white" size="30px" onClick={() => uploadContent()} />
					<AiFillPicture role="button" color="white" size="30px" onClick={() => uploadContent()} />
					<span className="ms-2 text-white">
						{fileName && (
							<>
								{fileName} <AiFillCloseCircle role="button" onClick={handleTrash} color="white" size="20px" />
							</>
						)}
					</span>
				</div>
				<BsFillArrowRightCircleFill role="button" color="white" size="30px" onClick={postContent} />
			</div>

			<input type="file" style={{ display: "none" }} accept="image/*" className="iconFormat" id="imageUpload" onChange={handleFileChange}></input>
		</div>
	);
}

export default CreatePost;
