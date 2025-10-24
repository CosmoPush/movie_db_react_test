import { FC } from "react";
import { HeaderFormComponent, UserInfoComponent } from "../index.ts";
import { Button } from "../../UI";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export const HeaderComponent: FC = () => {
  const [loginAccess, setLoginAccess] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLogin = localStorage.getItem("login");
    if (storedLogin) {
      try {
        const parsed = JSON.parse(storedLogin);
        setLoginAccess(parsed.login);
      } catch (e) {
        console.error("Invalid login data", e);
      }
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-[70px] w-full bg-gradient-to-r from-gray-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-md border-b border-purple-500/20 flex items-center justify-between z-50 shadow-2xl shadow-purple-900/20 animate-in fade-in-0 slide-in-from-top-1 duration-500">
      <div className="flex items-center justify-between px-6 w-full max-w-7xl mx-auto">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-8">
          <Link
            to={"/"}
            className="group flex items-center gap-3 transition-all animate-in fade-in-0 slide-in-from-left-2 duration-700"
          >
            <div
              className="relative overflow-hidden rounded-full animate-in fade-in-0 zoom-in-95 duration-800"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              <img
                className="w-[180px] h-[50px] object-contain transition-all animate-in fade-in-0 slide-in-from-top-1 duration-600"
                style={{ animationDelay: "0.5s", animationFillMode: "both" }}
                src="src/Img/gwenIcon.png"
                alt="MovieDB"
              />
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/25 to-pink-500/25 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-700 blur-lg scale-125"
                style={{ animationDuration: "2s" }}
              ></div>
              {/* Middle glow ring */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-400 blur-md scale-110 animate-in fade-in-0 zoom-in-90"
                style={{ animationDelay: "0.2s" }}
              ></div>
              {/* Inner glow ring */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-purple-300/15 to-pink-300/15 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm scale-105 animate-in fade-in-0 zoom-in-95"
                style={{ animationDelay: "0.4s" }}
              ></div>
              {/* Core highlight */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-white/8 to-purple-200/8 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 animate-in fade-in-0 zoom-in-98"
                style={{ animationDelay: "0.6s" }}
              ></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex gap-8">
              <li>
                <Link
                  to="/"
                  className="relative text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:text-purple-300 hover:bg-purple-500/10 group"
                >
                  <span className="relative z-10">Home</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-purple-300/10 rounded-lg transition-all duration-300"></div>
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="relative text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:text-purple-300 hover:bg-purple-500/10 group"
                >
                  <span className="relative z-10">Favorites</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-purple-300/10 rounded-lg transition-all duration-300"></div>
                </Link>
              </li>
              <li>
                <Link
                  to="/sorry"
                  className="relative text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:text-purple-300 hover:bg-purple-500/10 group"
                >
                  <span className="relative z-10">Contact</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-purple-300/10 rounded-lg transition-all duration-300"></div>
                </Link>
              </li>
              <li>
                <Link
                  to="/sorry"
                  className="relative text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:text-purple-300 hover:bg-purple-500/10 group"
                >
                  <span className="relative z-10">About</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-purple-300/10 rounded-lg transition-all duration-300"></div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Search and Auth Section */}
        <div className="flex items-center gap-6">
          {/* Search Form */}
          <div className="hidden md:block">
            <HeaderFormComponent />
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center">
            {!loginAccess ? (
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-purple-500/20 hover:text-purple-300 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
                  onClick={() => navigate("/authorization/login")}
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                  onClick={() => navigate("/authorization/login")}
                >
                  Login
                </Button>
              </div>
            ) : (
              <div className="animate-in fade-in-0 slide-in-from-right-2 duration-300">
                <UserInfoComponent />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-purple-500/20 transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="px-6 py-4">
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="text-white font-medium px-4 py-3 rounded-lg transition-all duration-300 hover:text-purple-300 hover:bg-purple-500/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className="text-white font-medium px-4 py-3 rounded-lg transition-all duration-300 hover:text-purple-300 hover:bg-purple-500/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Favorites
            </Link>
            <Link
              to="/sorry"
              className="text-white font-medium px-4 py-3 rounded-lg transition-all duration-300 hover:text-purple-300 hover:bg-purple-500/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/sorry"
              className="text-white font-medium px-4 py-3 rounded-lg transition-all duration-300 hover:text-purple-300 hover:bg-purple-500/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-2 border-t border-gray-600">
              <HeaderFormComponent />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
