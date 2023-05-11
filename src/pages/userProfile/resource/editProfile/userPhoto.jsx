import React, { useState, useEffect } from 'react';
import more from "../img/more.png"


export const UserPhoto = (props) => {

    const [selectedFile, setSelectedFile] = useState('');

    useEffect(() => {
        setSelectedFile(props.profilePhoto)
    }, [props.profilePhoto])

    const handleFileInputChange = (event) => {
        console.log(event.target.files[0])
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
            <div>
                <input type="file" accept="image/*" name="photo" id="photoUser" className="hidden" onChange={handleFileInputChange} />
                <div className="flex items-center gap-x-3">
                    <label htmlFor='photoUser' onChange={handleFileInputChange} className='h-24 md:h-40 w-24 md:w-40 bg-no-repeat bg-cover flex cursor-pointer bg-slate-200 justify-center items-center rounded-full' style={{ backgroundImage: `url(${selectedFile})` }}>
                        <img src={more} className="" />
                    </label>
                    <span>
                        <h2 className='text-2xl md:text-6xl font-sans'>{`@${props.nome}`}</h2>
                        <p className='text-1xl md:text-4xl font-sans opacity-50'>{props.completName}</p>
                    </span>
                </div>
            </div>
        </div>
    );
}
