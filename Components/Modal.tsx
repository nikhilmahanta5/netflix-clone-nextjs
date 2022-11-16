import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import MuiModal from "@mui/material/Modal";
import { useRecoilValue, useRecoilState } from "recoil";
import { modalState, movieState } from "../atom/modalAtom";
import { FaPlay } from "react-icons/fa";
import { ThumbUpIcon } from "@heroicons/react/outline";
import { Element, Genre, Movie } from "../typings";
import toast, { Toaster } from "react-hot-toast";

function Modal() {
  const baseUrl = "https://image.tmdb.org/t/p/original/";

  const [modal, setModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [movie, setMovie] = useRecoilState(movieState);

  const [genres, setGenres] = useState<Genre[]>([]);

  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);

  const toastStyle = {
    background: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "15px",
    borderRadius: "9999px",
    maxWidth: "1000px",
  };

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  const handleClose = () => {
    setModal(false);
    setMovie(null);
    toast.dismiss();
  };

  return (
    <MuiModal
      open={modal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden  rounded-md scrollbar-hide"
    >
      <>
        <Toaster position="bottom-center" />
        <button
          className=" absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[white] rounded-full cursor-pointer "
          onClick={handleClose}
        >
          <XIcon className="h-6 w-6 " />
        </button>

        <div className="absolute bottom-10 flex w-full items-center justify-between px-10"></div>
        <img className=" w-full " src = {`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}/>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 ">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400"></p>
              <p className="font-light text-white">
                {movie?.release_date || movie?.first_air_date}
              </p>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6 text-white">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div className="text-white">
                  <span>Genres:</span>{" "}
                  {genres.map((genre) => genre.name).join(", ")}
                </div>

                <div className="text-white">
                  <span className="text-white">Original language:</span>{" "}
                  {movie?.original_language}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
}

export default Modal;
