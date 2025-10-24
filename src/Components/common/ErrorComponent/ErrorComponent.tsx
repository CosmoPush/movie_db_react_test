import { FC } from "react";

export const ErrorComponent: FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="mt-2.5 bg-gray-800 bg-opacity-80 px-2.5 py-1.5 rounded-full text-center text-5xl text-purple-400 drop-shadow-sm tracking-wider border border-gray-600">
        no movies found
      </h2>
      <img src="src/Img/question.png" alt="" className="mt-4" />
    </div>
  );
};
