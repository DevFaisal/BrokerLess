import React from "react";
import { Button } from "../Index";

function AlertDialog({ title, message, onConfirm, onCancel }) {
  return (
    <main className="fixed top-0 left-0 p-4 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col gap-4 items-center w-96">
        <h1 className="text-2xl font-bold text-black w-80 text-center">
          {title}
        </h1>
        <p className="text-xs font-light text-gray-500 w-80 text-center">
          {message}
        </p>
        <div className="flex gap-4 justify-center w-full items-center">
          <Button
            className={
              "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            }
            onClick={() => onConfirm(true)}
          >
            <span>Yes</span>
          </Button>
          <Button onClick={() => onCancel(false)}>
            <span>No</span>
          </Button>
        </div>
      </div>
    </main>
  );
}

export default AlertDialog;
