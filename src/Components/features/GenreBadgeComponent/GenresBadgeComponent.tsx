import { FC } from "react";
type genresProps = {
  genre: string;
};

export const GenresBadgeComponent: FC<genresProps> = ({ genre }) => {
  return (
    <li className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full border border-gray-600">
      {genre}
    </li>
  );
};
