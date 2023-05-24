import React from 'react'
import Praised from "../../assets/svg/PraisedDoctors.svg"

export const PraisedDoctors = () => {
	return (
		<section>
			<div className='flex flex-col justify-center items-center  pb-20 '>
				<h2 className="text-3xl sm:text-5xl text-center font-semibold pt-14 sm:pt-20 md:w-1/3 ">Médicos melhor avaliados! </h2>
				<div className='md:flex flex-row justify-center sm:flew-col gap-32 pt-14 md:pt-20 md:p-20 w-full'>
					<div className='hidden md:flex flex-col justify-center border-4 border-black bg-white sm:w-1/5 h-full text-center drop-shadow-lg rounded-lg p-5 mt-14 md:mt-0 '>

						<img className='flex w-80' src={Praised} alt='Praied doctor' />
						<div className=' bg-white'>
							<h3 className='text-2xl pt-5 flex flex-row gap-5'>Avaliação
								<p>3/5</p>
							</h3>

							<p className='text-xl text-left items-center pt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
						</div>

					</div>
					<div className='flex flex-col justify-center border-4 border-black bg-white w-3/4 md:w-1/5 h-full text-center drop-shadow-lg rounded-lg p-5 sm:mt-14 md:mt-0 ml-14 md:ml-0'>

						<img className='flex w-80' src={Praised} alt='Praised doctor' />
						<div className=' bg-white'>
							<h3 className='text-xl md:text-2xl pt-5 flex flex-row gap-5'>Avaliação
								<p>3/5</p>
							</h3>

							<p className='text-xl text-left items-center pt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
						</div>

					</div>
					<div className='hidden md:flex flex-col justify-center border-4 border-black bg-white md:w-1/5 h-full text-center drop-shadow-lg rounded-lg p-5 mt-14 md:mt-0'>

						<img className='flex w-80' src={Praised} alt='Praied doctor' />
						<div className=' bg-white'>
							<h3 className='text-2xl pt-5 flex flex-row gap-5'>Avaliação
								<p>3/5</p>
							</h3>

							<p className='text-xl text-left items-center pt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
						</div>

					</div>
				</div>
			</div>
		</section>
	);
}
