import googleLogo from "../../assets/svg/Google.svg";
import React from "react";
function handleGoogleButtonClick(e) {
    e.preventDefault()
    console.log('teste')
}

export function AuthHeader(props) {
    return (
        <div className='flex flex-col items-center lg:w-3/4 xl:w-2/3 w-full h-fit lg:gap-8 gap-5'>
            <span className='flex flex-col w-96 xl:w-5/6 justify-center items-center gap-1'>
                <h1 className='xl:text-4xl text-3xl font-bold text-center'>{props.title}</h1>
                <h3 className='xl:text-2xl lg:text-xl text-lg lg:mt-0 mt-[-6px] font-normal text-[#A9A9A9] text-center'>{props.subtitle}</h3>
            </span>
            {props.firebaseFeature ? firebaseFeature() : <></>}
        </div>
    )
}

function firebaseFeature() {
    return (
        <>
            <button onClick={handleGoogleButtonClick}>
                <img src={googleLogo} alt='Google Button' className='lg:w-20 md:w-16 w-14'/>
            </button>
            <span className='flex justify-center items-center gap-4 lg:text-xl text-base font-normal text-[#A9A9A9] w-full grow text-center
                    before:grow before:h-0.5 before:block before:bg-gray-300
                    after:grow after:h-0.5 after:block after:bg-gray-300'>
                Ou use o e-mail
            </span>
        </>
    )
}
