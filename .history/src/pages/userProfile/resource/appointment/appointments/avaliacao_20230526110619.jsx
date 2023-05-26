import React, { useState } from "react";
import Modal from "react-modal";

export const RatingModal = () {
	const [comment, setComment] = useState("");



	const handleCommentChange = (event) => {
		setComment(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		onRequestClose();
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className="modal"
			overlayClassName="modal-overlay"
		>
			<div className="modal-content">
				<h2 className="text-2xl font-bold mb-4">Comentário</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 font-bold mb-2">
							Comentário
						</label>
						<textarea
							className="form-textarea rounded-md shadow-sm w-full"
							placeholder="Seu comentário"
							value={comment}
							onChange={handleCommentChange}
						/>
					</div>
					<div className="flex justify-end">
						<button
							className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
							onClick={onRequestClose}
						>
							Cancelar
						</button>
						<button
							className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
							type="submit"
						>
							Salvar
						</button>
					</div>
				</form>
			</div>
		</Modal>
	);
}
