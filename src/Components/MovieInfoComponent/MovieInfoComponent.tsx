import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getOneMovie} from "../../services/getMovies.ts";
import {ErrorComponent} from "../ErrorComponent/ErrorComponent.tsx";
import {MovieWholeInfoComponent} from "../MovieWholeInfoComponent/MovieWholeInfoComponent.tsx";
import {IOneMovie} from "../../Models/IOneMovie.ts";

export const MovieInfoComponent = () => {
    const {id} = useParams<{id:string}>();
    console.log(id);
    const [movie, setMovie] = useState<IOneMovie>()
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadMovie = async () => {
            if (!id) return;

            setLoading(true);
            try {
                const res = await getOneMovie(id);
                setMovie(res);
            } catch (error) {
                console.error("Error loading movie:", error);
            } finally {
                setLoading(false);
            }
        };

        loadMovie();
    }, [id]);

    // Skeleton component for detailed movie information
    const MovieDetailSkeleton = ({ index }: { index: number }) => (
        <div
            className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pt-[70px] px-4 py-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
            style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
            }}
        >
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl border border-gray-600 p-6 animate-pulse">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Poster skeleton */}
                    <div className="lg:w-1/3">
                        <div className="w-full h-[450px] bg-gray-700 rounded-xl"></div>
                    </div>

                    {/* Content skeleton */}
                    <div className="lg:w-2/3 space-y-4">
                        <div className="flex items-start justify-between">
                            <div className="h-9 bg-gray-700 rounded w-3/4"></div>
                            <div className="h-10 w-10 bg-gray-700 rounded-full"></div>
                        </div>

                        <div className="h-5 bg-gray-700 rounded w-1/2"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="flex">
                                    <div className="h-4 bg-gray-700 rounded w-24"></div>
                                    <div className="h-4 bg-gray-700 rounded w-32 ml-2"></div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <div className="h-4 bg-gray-700 rounded w-20"></div>
                            <div className="space-y-1">
                                <div className="h-3 bg-gray-700 rounded w-full"></div>
                                <div className="h-3 bg-gray-700 rounded w-full"></div>
                                <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional sections skeleton */}
                <div className="mt-8 space-y-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-gray-700 rounded-lg p-4">
                            <div className="h-6 bg-gray-600 rounded w-48 mb-3"></div>
                            <div className="space-y-1">
                                {Array.from({ length: 3 }).map((_, j) => (
                                    <div key={j} className="h-3 bg-gray-600 rounded w-full"></div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="text-center">
                        <div className="h-10 bg-gray-700 rounded-full w-48 mx-auto"></div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <div className="h-10 bg-gray-700 rounded-full w-40 mx-auto"></div>
                </div>
            </div>
        </div>
    );

    // Loading animation component
    const MovieDetailLoadingSpinner = () => (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pt-[70px] px-4 py-8 flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
                    <div className="absolute inset-0 rounded-full h-16 w-16 border-2 border-purple-300 opacity-20 animate-pulse"></div>
                </div>
                <div className="text-center space-y-2">
                    <span className="text-gray-400 text-xl animate-pulse block">Loading movie...</span>
                    <span className="text-gray-500 text-sm animate-pulse">Please wait</span>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {loading ? (
                <MovieDetailLoadingSpinner />
            ) : movie ? (
                <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
                    <MovieWholeInfoComponent movie={movie}/>
                </div>
            ) : (
                <div className="animate-in fade-in-0 slide-in-from-top-2 duration-300">
                    <ErrorComponent/>
                </div>
            )}
        </div>
    );
};