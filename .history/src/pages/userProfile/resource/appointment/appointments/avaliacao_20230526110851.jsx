import React, { useState } from "react";
import Modal from "react-modal";

export const RatingModal = (props) => {
	const [comment, setComment] = useState("");



	const handleCommentChange = (event) => {
		setComment(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		onRequestClose();
	};

	return (
		,.
	);
}
