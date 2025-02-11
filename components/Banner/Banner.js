import React from "react";
import axios from "axios";
import Banner from "../Banner/banner.css"
import { useState, useEffect } from "react";
import requests from "../../src/utils/requests";
const Banner = () => {
  const [movie, setMovie] = useState([]); 
  useEffect(() => {
    fetch(`https:api.themoviedb.org/3${requests.fetchNetflixOriginals}`) 
    //go to requests.js and feth /discover/tv?api_key=${API_KEY}&with_networks=213 from request concatinate and give me one url
      .then((req) => req.json())
      .then((data) => {
        const randomMovie =
          data.results[Math.floor(Math.random() * data.results.length)];
        setMovie(randomMovie);
      });
  }, []);
  console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  } //if the words are greater than 150 then truncate it to 150 and add a three dots at the end
  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`, // The .jpg file in the immage, Fallback if backdrop_path is undefined
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button play">Play</button>
          <button className="banner_button play">My List</button>
        </div>

        <h1 className="banner_description">{truncate(movie.overview, 150)}</h1> 
      </div>
      <div className="banner_fadeBottom"></div>
    </div>
  );
};

export default Banner;



