import { FC } from "react";

interface RatingProps {
  rating: number; // Зроблено обов'язковим, щоб компонент відображав зірочки
  maxStars?: number;
}

export const RatingComponent: FC<RatingProps> = ({ rating, maxStars = 5 }) => {
  const stars = [];
  const normalizedRating = (rating / 10) * maxStars;
  for (let i = 0; i < maxStars; i++) {
    let className =
      "cursor-pointer text-lg text-gray-300 transition-colors duration-200";
    if (normalizedRating >= i + 1) {
      className += " text-yellow-400";
    } else if (normalizedRating > i && normalizedRating < i + 1) {
      className += " text-yellow-400";
    }
    stars.unshift(
      <label key={i} className={className}>
        ★
      </label>
    );
  }

  return <div className="flex flex-row-reverse">{stars}</div>;
};
