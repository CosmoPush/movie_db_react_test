import { useEffect, useState } from "react";
import { Link } from "react-router";

export const UserInfoComponent = () => {
  const [username, setUsername] = useState<string>();
  useEffect(() => {
    const storedLogin = localStorage.getItem("login");
    if (storedLogin) {
      const parse = JSON.parse(storedLogin);
      setUsername(parse.username);
    }
  }, []);

  return (
    <div className="flex gap-4 items-center w-3/5 justify-end">
      <Link to={"/sorry"}>
        <img
          src="src/Img/gwen.jpg"
          alt=""
          className="w-12 h-12 object-cover rounded-full"
        />
      </Link>
      <Link
        to={"/sorry"}
        className="text-gray-800 hover:text-blue-600 transition-colors duration-200"
      >
        {username}
      </Link>
    </div>
  );
};
