import React, { useState, useEffect } from 'react';
import more from "../img/more.png"



export const TopContainer = (props) => {

    const [selectedFile, setSelectedFile] = useState('');

    useEffect(() => {
        setSelectedFile(props.profileBannerPhoto)
    }, [props.profileBannerPhoto])
    
    const handleFileInputChange = (event) => {
        const file = event.target.files[0]
        
        if (file) {
            props.onProfileBannerPhotoChange(file);
            setSelectedFile(URL.createObjectURL(file));
        } else {
            props.onProfileBannerPhotoChange(props.profileBannerPhoto);
            setSelectedFile(props.profileBannerPhoto);
        }
    }

    return (
        <div className="w-full">
            <input type="file" accept="image/*" name="photo" id="photoProfile" className="hidden" onChange={handleFileInputChange} />
            <label htmlFor='photoProfile' style={{backgroundImage: `url(${selectedFile})`}}
                className='
                    flex justify-center items-center bg-slate-200 w-full h-72 bg-center bg-origin-content bg-no-repeat bg-cover cursor-pointer rounded-lg hover:bg-blend-darken '>
                <img className src={more} />
            </label>
        </div>
    );

    

}




