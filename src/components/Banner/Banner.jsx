import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./banner.css";
const Banner = () => {
  const [movie, setmovie] = useState([]); //to see the different movie data and store
  useEffect(() => {
    (async () => { //try to get data or catch an error
      try {
        const request = await axios.get(requests.fetchNetflixOriginals); //we put the base url in axios.js, we used axios instead of fetch method.
        console.log(requests);
        setmovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str; //if the string is longer than n-1 then use .....
  }
  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}"
        )`,
        backgroundPosition: "center",
        backgroundRepeat: "non-repeat",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button play">Play</button>
          <button className="banner_button">My Lists</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner_fadeBottom" />
    </div>
  );
};

export default Banner;




