import React from "react";



export const ListItem = (props) => {

    return (
      <button className="flex flex-row align-middle items-center justify-start gap-3 border-2 border-t-white border-r-white border-l-white border-b-black mt-2 w-full p-3">
        <div className="w-1/4 h-full">
          <img src={props.image} alt="" className="w-full h-full"/>
        </div>
        <div className="flex flex-col gap-2 justify-center h-4/5">
          <p className="text-lg font-semibold">{props.Name}</p>
          <div className="text-md flex flex-row gap-2 -mt-4">
              <p className="flex flex-row aling-text-row">{props.bairro}</p> |
              <p className="flex flex-row">{props.formacao}</p>
          </div>
        </div>
      </button>
    );
  }