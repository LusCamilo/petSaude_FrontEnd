import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useForm } from "react-hook-form";
import { ratingAdd } from "../../../../../services/integrations/rating";
import { AiOutlineClose } from "react-icons/ai";

export const Review = (props) => {
  const { register, handleSubmit, formState: errors, setValue } = useForm();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [description, setRDescription] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const submitForm = async () => {
    let allInfos;
    allInfos = {
      score: rating,
      description: description.target.value,
      veterinaryId: props.vetId,
    };

    let rating = await ratingAdd(allInfos);

    closeModal();
  };

  const handleRating = (rate) => {
    console.log(rate);
    setRating(rate);
  };

  return (
    <>
      <form
        className="w-full"
        onSubmit={() => {
          handleSubmit(submitForm);
        }}
      >
        <div className="h-2 w-full"></div>
        <div className="w-full flex flex-col">
            <label
                htmlFor="comment"
                className="text-gray-700 font-bold mb-2 flex flex-col justify-center w-full"
            >
                <h2 className="flex justify-center text-4xl">
                    {/* {" "}  */}
                    Avaliação do Veterinário
                </h2>
                <p className="flex justify-center text-2xl text-[#A9A9A9]">
                    Opinão referente a consulta
                </p>
            </label>
        </div>
        <div class="inline w-full pt-5 mb-7">
            <input type="radio" id="star5" name="rating" value="5" />
            <label for="star5" title="Excelente">&#9733;</label>
            <input type="radio" id="star4" name="rating" value="4" />
            <label for="star4" title="Muito bom">&#9733;</label>
            <input type="radio" id="star3" name="rating" value="3" />
            <label for="star3" title="Bom">&#9733;</label>
            <input type="radio" id="star2" name="rating" value="2" />
            <label for="star2" title="Regular">&#9733;</label>
            <input type="radio" id="star1" name="rating" value="1" />
            <label for="star1" title="Ruim">&#9733;</label>
        </div>
        {/* <div className="inline pt-5 pb-5 ">
            <Rating className="inline w-full" onClick={handleRating} transition size={25} />
            {rating}
        </div> */}
        <div className="mb-3 w-full">
          <label
            htmlFor="comment"
            className="flex justify-start text-gray-700 font-bold mb-2"
          >
            Comentarios adicionais
          </label>
          <textarea
            id="comment"
            rows={3}
            className="shadow appearance-none border border-black rounded w-full h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pt-2"
            onBlurCapture={(e) => setRDescription(e)}
          />
          <p className="flex justify-end text-xl text-[#A9A9A9]">
            Resposta opcional
          </p>
        </div>
      </form>
    </>
  );
};
