import { FC } from "react";
import { RatingComponent } from "../StarRatingComponent/RatingComponent";

type movieInfoType = {
  overview: string;
  rating: number;
  votes: number;
  release_date: string;
};

export const GeneralMovieInfoComponent: FC<movieInfoType> = ({
  overview,
  release_date,
  rating,
  votes,
}) => {
  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed">
        {overview}
      </p>
      <p className="text-xs text-gray-400">Released: {release_date}</p>
      <div className="flex items-center justify-between">
        <RatingComponent rating={rating} />
        <span className="text-xs text-gray-400">{votes} votes</span>
      </div>
    </div>
  );
};
