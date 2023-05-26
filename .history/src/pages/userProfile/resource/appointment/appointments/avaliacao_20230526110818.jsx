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
		<form onSubmit={() => {
			//handleSubmit(submitForm)
		}}>
	  <div className="bg-white w-full ">
		<div>
		  <label
			htmlFor="comment"
			className="block text-gray-700 font-bold mb-2 "
		  >
			Quão bom foi o atendimento?
			{/* <Rating
			onClick={handleRating}
			transition
			size={50}
			fillColorArray={[
			  "#f17a45",
			  "#f19745",
			  "#f1a545",
			  "#f1b345",
			  "#f1d045"
			]}
		  /> */}
		  <div className="flex flex-row">
			<Rating onClick={handleRating} transition size={50} />
		  </div>
			{rating}
		  </label>
		</div>
		<div className="mb-3">
		  <label
			htmlFor="comment"
			className="block text-gray-700 font-bold mb-2"
		  >
			Assunto do comentário
		  </label>
		  <textarea
			id="comment"
			rows={3}
			className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			onBlurCapture={(e)=>setRDescription(e)}
		  />
		</div>
		<div className="flex justify-between">
		  <button
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			type="button"
			onClick={props}
		  >
			Fechar
		  </button>
		  <button
			className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
			type="button"
			onClick={()=>{
				submitForm()
			}}
		  >
			Enviar
		  </button>
		</div>
	  </div>
	</form>
	);
}
