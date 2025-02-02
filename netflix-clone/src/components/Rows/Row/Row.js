import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "../../../utils/axios";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

// baseurl
const base_url = "https://image.tmdb.org/t/p/original/";

// function
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request?.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  //   console.log(movies);
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row_posters">
        {movies.map((movie) => {
          const imagePath = isLargeRow
            ? movie.poster_path
            : movie.backdrop_path;
          if (!imagePath) return null;
          return (
            <img
            // key not exist why?
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterlarge"}`}
              src={`${base_url}${imagePath}`}
              alt={movie.name}
            />
          );
        })}
      </div>
      <div>{trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}</div>
    </div>
  );
}

export default Row;
