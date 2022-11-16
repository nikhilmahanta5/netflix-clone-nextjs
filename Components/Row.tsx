import rowstyles from "../styles/Row.module.css";
import { useRecoilState } from 'recoil'
import { modalState, movieState } from "../atom/modalAtom";
import { Movie } from '../typings'
import { useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

const baseUrl = "https://image.tmdb.org/t/p/original/";

interface Props {
  title: string;
  movies: Movie[];
}

function Row({ title, movies }: Props) {

  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  const [modal, setModal] = useRecoilState(modalState)
  return (
    <div className={rowstyles.row}>
      <h4>{title}</h4>

      <div className={rowstyles.row_posters}>
   
        {movies.map((movie) => (
          <img
            className={rowstyles.row_poster}
            key={movie?.id}
            src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
            onClick={() => {
              setCurrentMovie(movie)
              setModal(true)
            }}
          />
        ))}
   
      </div>
    </div>
  );
}

export default Row;
