import { FC } from "react";

type posterType = {
  preview: string;
  title: string;
};
type previewProps = {
  poster: posterType;
};
export const PosterPreviewComponent: FC<previewProps> = ({ poster }) => {
  return (
    <div className="w-full">
      {poster.preview ? (
        <img
          src={"https://image.tmdb.org/t/p/w300" + poster.preview}
          alt={poster.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <img
          className="w-full h-48 object-cover bg-gray-200"
          src="src/Img/question.png"
          alt="No poster available"
        />
      )}
      <p className="p-3 text-sm font-medium text-white line-clamp-2">
        {poster.title}
      </p>
    </div>
  );
};
