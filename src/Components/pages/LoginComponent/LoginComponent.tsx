import { FC } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Input, Button, Card } from "../../UI";
import { useState } from "react";

export const LoginComponent: FC = () => {
  type FormPropsType = {
    username: string;
    password: string;
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormPropsType>();
  const customSubmit = async (FormData: FormPropsType) => {
    setIsLoading(true);
    try {
      // Імітуємо затримку для демонстрації анімації
      await new Promise((resolve) => setTimeout(resolve, 1000));

      localStorage.setItem(
        "login",
        JSON.stringify({
          username: FormData.username,
          password: FormData.password,
          login: 1,
        })
      );
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Header */}
        <div className="absolute top-8 left-8 animate-in fade-in-0 slide-in-from-top-2 duration-500">
          <Link
            to={"/"}
            className="group flex items-center gap-3 text-white font-medium transition-all duration-300 hover:text-purple-300 hover:scale-105"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </div>
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Welcome Text */}
        <div
          className="text-center mb-12 animate-in fade-in-0 slide-in-from-top-2 duration-500"
          style={{ animationDelay: "200ms", animationFillMode: "both" }}
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Sign in to your account to access your favorite movies and
            personalized recommendations
          </p>
        </div>

        {/* Login Card */}
        <div
          className="w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: "400ms", animationFillMode: "both" }}
        >
          <Card className="bg-gray-800/50 backdrop-blur-xl border border-purple-500/20 shadow-2xl shadow-purple-900/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Sign In</h2>
              <p className="text-gray-400">
                Enter your credentials to continue
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(customSubmit)}>
              <div className="space-y-5">
                <div
                  className="animate-in fade-in-0 slide-in-from-left-2 duration-300"
                  style={{ animationDelay: "600ms", animationFillMode: "both" }}
                >
                  <Input
                    label={
                      <span className="text-gray-300 font-medium flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Username
                      </span>
                    }
                    type="text"
                    placeholder="Enter your username"
                    variant="filled"
                    size="lg"
                    error={errors.username?.message}
                    className="bg-gray-700/50 border-gray-600/50 focus:border-purple-500/50 focus:ring-purple-500/20"
                    {...register("username", {
                      required: "Username is required",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters",
                      },
                    })}
                  />
                </div>

                <div
                  className="animate-in fade-in-0 slide-in-from-right-2 duration-300"
                  style={{ animationDelay: "700ms", animationFillMode: "both" }}
                >
                  <Input
                    label={
                      <span className="text-gray-300 font-medium flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                        Password
                      </span>
                    }
                    type="password"
                    placeholder="Enter your password"
                    variant="filled"
                    size="lg"
                    error={errors.password?.message}
                    className="bg-gray-700/50 border-gray-600/50 focus:border-purple-500/50 focus:ring-purple-500/20"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                </div>
              </div>

              <div
                className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
                style={{ animationDelay: "800ms", animationFillMode: "both" }}
              >
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 py-4 text-lg font-semibold"
                  isLoading={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Signing In...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>

              <div
                className="text-center animate-in fade-in-0 slide-in-from-bottom-1 duration-300"
                style={{ animationDelay: "900ms", animationFillMode: "both" }}
              >
                <p className="text-gray-400 text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/authorization/register"
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 hover:underline"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </Card>
        </div>

        {/* Footer */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
          style={{ animationDelay: "1000ms", animationFillMode: "both" }}
        >
          <p className="text-gray-500 text-sm text-center">
            © 2024 MovieDB. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
