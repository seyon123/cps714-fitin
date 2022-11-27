import React from "react";
import "./SocialSearchBar.css";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";

function SocialSearchBar({ posts }) {
	const [searchTerm, setSearchTerm] = useState("");
	let navigate = useNavigate();

	return (
		<div className="w-100 mt-3 searchBar position-relative">
			<input
				className="form-control"
				type="text"
				placeholder=" Search for a post..."
				value={searchTerm}
				onChange={(event) => {
					setSearchTerm(event.target.value);
				}}
			/>
			{searchTerm ? (
				<AiFillCloseCircle size={25} className="searchIcon d-flex align-items-center position-absolute" onClick={() => setSearchTerm("")} />
			) : (
				<FaSearch size={25} className="searchIcon d-flex align-items-center position-absolute" />
			)}
			<div className="resultsContainer mt-2 rounded">
				{posts
					.filter((post) => {
						if (searchTerm === "") {
							return "";
						} else if (post.description.toLowerCase().includes(searchTerm.toLowerCase()) || post.tags.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
							return post;
						}
						return null;
					})
					.map((post, key) => {
						return (
							<div
								key={key}
								className="resultItem d-flex align-content-center align-items-center"
								onClick={() => {
									navigate(`/posts/${post?.id}`);
								}}
							>
								{post?.image ? <Image width="40px" className="resultImage m-1 rounded-1" src={post?.image} alt={post?.description} /> : <Image width="40px" className="resultImage m-1 rounded-1" src={"noImage.jpg"} alt={post?.description} /> }
								<p>{post?.description}</p>
							</div>
						);
					})}
			</div>
		</div>
	);
}
export default SocialSearchBar;
