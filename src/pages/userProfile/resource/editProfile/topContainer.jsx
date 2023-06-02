import React, { useState, useEffect } from 'react';
import { IoMdAdd } from "react-icons/io";



export const TopContainer = (props) => {

	const [selectedFile, setSelectedFile] = useState('');

	useEffect(() => {
		setSelectedFile(props.profileBannerPhoto)
	}, [props.profileBannerPhoto])

	const handleFileInputChange = (event) => {
		const file = event.target.files[0]

		console.log("Mudado");

		if (file) {
			console.log("Deu");
			props.onProfileBannerPhotoChange(file);
			setSelectedFile(URL.createObjectURL(file));
		} else {
			console.log("não deu");
			props.onProfileBannerPhotoChange(props.profileBannerPhoto);
			setSelectedFile(props.profileBannerPhoto);
		}

		console.log("Sim");
	}

	return (
		<div className="w-full">
			<input type="file" accept="image/*" name="photo" id="photoProfile" className="hidden" onChange={handleFileInputChange} />
			<label htmlFor='photoProfile' style={{backgroundImage: `url(${selectedFile})`}}
			       className='flex justify-center items-center bg-slate-200 w-full h-96 bg-center bg-origin-content bg-no-repeat bg-cover cursor-pointer rounded-lg hover:bg-blend-darken '>
				<IoMdAdd className="text-8xl text-white" alt="Add icon" />
			</label>
		</div>
	);



}




