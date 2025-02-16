// import React from 'react'
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import "./row.css";
function Rows({ title, fetchUrl, isLargeRow }) {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const base_Url = "https://image.tmdb.org/t/p/original"; //constant holding the base URL for image resources from The Movie Database (TMDb) API. When displaying movie posters or images from the TMDb API, you might append an image path to this base URL to construct the full image URL.
  // For example, you could append an image path like "/someImagePath.jpg" to form the complete URL: https://image.tmdb.org/t/p/original/someImagePath.jpg.

  //React useEffect hook combined with an asynchronous operation (fetching data from an API) using axios.
  useEffect(() => {
    //The useEffect hook will trigger a request to the URL stored in fetchUrl, using axios to make the GET request.
    (async () => {
      try {
        const request = await axios.get(fetchUrl); //This line uses the axios library to make an HTTP GET request to the URL stored in the fetchUrl variable.
        console.log(request);
        setMovie(request.data.results); //update the state with the results from the API request.
      } catch (error) {
        //This block catches any errors that might occur during the API request (for example, if the network fails or the API is unreachable) and logs them to the console.
        console.log(error);
      }
    })();
  }, [fetchUrl]); //dependency array [fetchUrl]. This means the useEffect hook will run whenever fetchUrl changes.

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          //   const urlParams = new URLSearchParams(new URL(url).search);
          //   const videoId = urlParams.get("v");
          //   console.log(videoId);
          //   setTrailerUrl(videoId);
          console.log(url);
          const urlparams = new URLSearchParams(new URL(url).search); // extracting the video id by parsind whts returned from the movie-trailer
          console.log(urlparams);
          console.log(urlparams.get("v"));
          setTrailerUrl(urlparams.get("v")); // seting the newly extracted video id starts with (v=jkhk1233)
        })
        .catch((error) => console.log(error));
    }
  };
  const opts = {
    //this is to mean options, the measures are the sizes of the videos
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1, //this means it is on for autoplay
    },
  };
  return (
    <>
      <div className="row">
        <h1>{title}</h1>
        <div className="row__posters">
          {movie?.map((movie, index) => (
            <img
              onClick={
                () => handleClick(movie) //handle the movie
              }
              key={index}
              src={`${base_Url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`} //displays the side of the movie
              alt={movie.title}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`} //it takes only if it is large
            />
          ))}
        </div>

        <div style={{ padding: "10px" }}>
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
          {/* //line 71,the first curley brace is javascript, the second curley brace is we are writing another function in css style,line 72 if trailerUrl is there, play the video on youtube */}
        </div>
      </div>
    </>
  );
}

export default Rows;

