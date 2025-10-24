import { Link } from "react-router";
export const SorryComponent = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-evenly pt-[90px] bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <h2 className="text-2xl text-white">Sorry this page will come soon</h2>
      <Link
        className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
        to={"/"}
      >
        Home page
      </Link>
      <img src="src/Img/sorryPic.png" alt="" className="max-w-md" />
    </div>
  );
};
