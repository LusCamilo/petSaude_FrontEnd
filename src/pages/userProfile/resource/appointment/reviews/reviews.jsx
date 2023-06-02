import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ratingAdd } from "../../../../../services/integrations/rating";
import { AiOutlineClose } from "react-icons/ai";
import Notifications from "../../../../../utils/Notifications";
import RatingStars from 'react-rating-stars-component';

const saveComment = async (object) => {
  const allInfos = {
    score: object.score,
    description: object.description,
    // veterinaryId: object.props.idVet,
  };
  sessionStorage.setItem("ratingUser", JSON.stringify(allInfos))

  // const result = await ratingAdd(allInfos);
  // console.log(result.response);
}



export const Review = () => {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value)
    saveComment({ description: description, score: value });
  };


  return (
    <>
      <form
        className="w-full pt-10"
      >
        <div className="h-2 w-full"></div>
        <div className="w-full flex flex-col">
          <label
            htmlFor="comment"
            className="text-gray-700 font-bold mb-2 flex flex-col justify-center w-full"
          >
            <h2 className="flex justify-center text-4xl">
              Avaliação do Veterinário
            </h2>
            <p className="flex justify-center text-2xl text-[#A9A9A9]">
              Opinião referente à consulta
            </p>
          </label>
        </div>
        <div className="flex justify-center gap-x-3 w-full pt-5 mb-7">
          <RatingStars
            count={5}
            size={40}
            activeColor="#ffd700"
            isHalf={true}
            value={rating}
            onChange={handleRating}
          />
        </div>
        <div className="mb-3 w-full">
          <label
            htmlFor="comment"
            className="flex justify-start text-gray-700 font-bold mb-2"
          >
            Comentários adicionais
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={3}
            className="shadow resize-none appearance-none border border-black rounded w-full h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pt-2"
            onBlur={(e) => {
              setDescription(e.target.value);
              saveComment({ description: e.target.value, score: rating });
            }}
          />
          <p className="flex justify-end text-xl text-[#A9A9A9]">
            Resposta opcional
          </p>
        </div>
      </form>
    </>
  );
};
