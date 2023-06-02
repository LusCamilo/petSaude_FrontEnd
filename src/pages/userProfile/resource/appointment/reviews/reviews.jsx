import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ratingAdd } from "../../../../../services/integrations/rating";
import { AiOutlineClose } from "react-icons/ai";
import Notifications from "../../../../../utils/Notifications";

export const Review = (props) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [hoveredRating, setHoveredRating] = useState("")

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

  const handleHover = (value) => {
    setHoveredRating(value);
  };

  useEffect(() => {
    console.log(rating);
  }, [rating])

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
        <div className="flex justify-center gap-x-3 w-full pt-5 mb-7">

          <input className="hidden" type="radio" id="star5" name="rating" value="1" onClick={() => handleRating(1)} />
          <label className={
            `cursor-pointer text-6xl ${rating >= 1 ? "text-amber-400" : ""}
            ${hoveredRating >= 1 ? 'text-amber-400' : ''}`}
            htmlFor="star5" title="Ruim"
            onMouseOver={() => handleHover(1)}
            onMouseLeave={() => handleHover(0)}
          >
            &#9733;
          </label>

          <input className="hidden" type="radio" id="star4" name="rating" value="2" onClick={() => handleRating(2)} />
          <label className={
            `cursor-pointer text-6xl ${rating >= 2 ? "text-amber-400" : ""}
            ${hoveredRating >= 2 ? 'text-amber-400' : ''}`}
            htmlFor="star4" title="Regular"
            onMouseOver={() => handleHover(2)}
            onMouseLeave={() => handleHover(0)}
          >
            &#9733;
          </label>

          <input className="hidden" type="radio" id="star3" name="rating" value="3" onClick={() => handleRating(3)} />
          <label className={
            `cursor-pointer text-6xl ${rating >= 3 ? "text-amber-400" : ""}
            ${hoveredRating >= 3 ? 'text-amber-400' : ''}`}
            htmlFor="star3" title="Bom"
            onMouseOver={() => handleHover(3)}
            onMouseLeave={() => handleHover(0)}
          >
            &#9733;
          </label>

          <input className="hidden" type="radio" id="star2" name="rating" value="4" onClick={() => handleRating(4)} />
          <label className={
            `cursor-pointer text-6xl ${rating >= 4 ? "text-amber-400" : ""}
            ${hoveredRating >= 4 ? 'text-amber-400' : ''}`}
            htmlFor="star2" title="Muito Bom"
            onMouseOver={() => handleHover(4)}
            onMouseLeave={() => handleHover(0)}
          >
            &#9733;
          </label>

          <input className="hidden" type="radio" id="star1" name="rating" value="5" onClick={() => handleRating(5)} />
          <label className={
            `cursor-pointer text-6xl ${rating >= 5 ? "text-amber-400" : ""}
          ${hoveredRating >= 5 ? 'text-amber-400' : ''}`}
            htmlFor="star1" title="Excelente"
            onMouseOver={() => handleHover(5)}
            onMouseLeave={() => handleHover(0)}
          >
            &#9733;
          </label>

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
            onBlur={(e) => setDescription(e.target.value)}
          />
          <p className="flex justify-end text-xl text-[#A9A9A9]">
            Resposta opcional
          </p>
        </div>
        <button type="button" onClick={() => saveComment()} className="bg-green-500">Salvar</button>
        <button type="button">Fechar</button>
      </form>
    </>
  );
};
