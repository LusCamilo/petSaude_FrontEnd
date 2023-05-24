import React, { useState, useEffect } from 'react';
import { IoMdAdd } from "react-icons/io";


export const UserPhoto = (props) => {

	const [selectedFile, setSelectedFile] = useState('');

	useEffect(() => {
		setSelectedFile(props.profilePhoto)
	}, [props.profilePhoto])

	const handleFileInputChange = (event) => {
		const file = event.target.files[0]
		if (file) {
			props.onProfilePhotoChange(file);
			setSelectedFile(URL.createObjectURL(file));
		} else {
			props.onProfilePhotoChange(props.profilePhoto);
			setSelectedFile(props.profilePhoto);
		}

	}

	return (
		<div>
			<input type="file" accept="image/*" name="photo" id="photoUser" className="hidden" onChange={handleFileInputChange} />
				<div className="flex items-center gap-x-3">
					<label htmlFor='photoUser' onChange={handleFileInputChange} className='h-24 md:h-48 w-24 md:w-48 bg-no-repeat bg-cover flex cursor-pointer bg-slate-200 justify-center items-center rounded-full' style={{ backgroundImage: `url(${selectedFile})` }}>
					    <IoMdAdd className="text-8xl text-white" alt="Add icon" />
					</label>
					<span className='flex flex-col w-fit gap-1'>
                        <h2 className='text-2xl md:text-5xl font-semibold w-full'>{`@${props.nome}`}</h2>
                        <p className='text-1xl md:text-3xl w-full text-[#A9A9A9]'>{props.completName}</p>
                    </span>
				</div>
		</div>
	);
}
