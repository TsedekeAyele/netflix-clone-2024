import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios from "../../utils/axios";
import requests from "../../utils/requests";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      const request = await axios.get(requests.fetchNetflixOriginals);
        console.log(request);
      setMovie(
        request?.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    }
    fetchdata();
  }, []);
  // console.log(movie);
  function truncate(str, num) {
    return str?.length > num ? str.slice(0, num) + "..." : str;
  }

  return (
    <div>
      return (
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          objectFit: "contain",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">
            {movie?.name || movie?.original_name}
          </h1>
          {/* title?.name || not enterd above  */}
          <div className="banner_buttons">
            <button className="banner_button">PLay</button>
            <button className="banner_button">My List</button>
          </div>
          <h1 className="banner_description">
            {truncate(movie?.overview, 150)}
          </h1>
        </div>
        <div className="banner_fadeBottom" />
      </header>
      );
    </div>
  );
};

export default Banner;
