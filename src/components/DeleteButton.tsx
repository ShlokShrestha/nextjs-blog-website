"use client";
import React from "react";

const DeleteButton = (props: any) => {
  const { onClick } = props;
  return (
    <button onClick={onClick} className="bg-red-500 text-white p-3 rounded">
      Delete BUtton
    </button>
  );
};

export default DeleteButton;
