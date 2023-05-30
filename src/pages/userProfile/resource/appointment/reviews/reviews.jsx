import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useForm } from "react-hook-form";
import { ratingAdd } from "../../../../../services/integrations/rating";
<<<<<<< HEAD
import { AiOutlineClose } from "react-icons/ai";
import Notifications from "../../../../../utils/Notifications";
=======
>>>>>>> 52a4ff7c6a93202de2da88126748a4fbe97982f0

export const Review = (props) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const submitForm = async () => {
    const allInfos = {
      score: rating,
      description: description,
      veterinaryId: props.idVet,
    };
  
    const result = await ratingAdd(allInfos);
    console.log(result);
  };

  const saveComment = async () => {
    console.log("Save");
    const allInfos = {
      score: rating,
      description: description,
      veterinaryId: props.idVet,
    };

    console.log(allInfos);
  
    const result = await ratingAdd(allInfos);
    console.log(result.response);
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <>
      <form
        className="w-full"
        onSubmit={handleSubmit(submitForm)}
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
        <div className="inline w-full pt-5 mb-7">
          <input type="radio" id="star5" name="rating" value="1" onClick={() => handleRating(1)} />
          <label htmlFor="star5" title="Excelente">&#9733;</label>
          <input type="radio" id="star4" name="rating" value="2" onClick={() => handleRating(2)} />
          <label htmlFor="star4" title="Muito bom">&#9733;</label>
          <input type="radio" id="star3" name="rating" value="3" onClick={() => handleRating(3)} />
          <label htmlFor="star3" title="Bom">&#9733;</label>
          <input type="radio" id="star2" name="rating" value="4" onClick={() => handleRating(4)} />
          <label htmlFor="star2" title="Regular">&#9733;</label>
          <input type="radio" id="star1" name="rating" value="5" onClick={() => handleRating(5)} />
          <label htmlFor="star1" title="Ruim">&#9733;</label>
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
            className="shadow appearance-none border border-black rounded w-full h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pt-2"
            onBlur={(e) => setDescription(e.target.value)}
          />
          <p className="flex justify-end text-xl text-[#A9A9A9]">
            Resposta opcional
          </p>
        </div>
        <button type="button" onClick={()=>saveComment()} className="bg-green-500">Salvar</button>
        <button type="button">Fechar</button>
      </form>
    </>
  );
};
