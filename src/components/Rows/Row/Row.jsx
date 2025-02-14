// import React from 'react'
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import "./row.css";
function Rows({ title, fetchUrl, isLargeRow }) {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const base_Url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(fetchUrl);
        console.log(request);
        setMovie(request.data.results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [fetchUrl]);

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
          {/* //the first curley brace is javascript, the second curley brace is we are writing another function in css styes, if trailerUrl is there, play the video on youtube */}
        </div>
      </div>
    </>
  );
}

export default Rows;

// import React from 'react'
// import { useEffect, useState } from "react";
// import "./row.css";
// import axios from "../../../utils/axios"
// import movieTrailer from 'movie-trailer';
// import YouTube from 'react-youtube';

// const Row = ({ title, fetchUrl, isLargeRow }) => {
// const [movies, setMovies] = useState([]); //This line creates a piece of state called movies, which will hold the list of movies fetched from the API. Initially, it's set to an empty array []. The setMovies function is used to update the state later on.
// const base_url = "https://image.tmdb.org/t/p/original"; //This is a constant URL that will be used to construct the full image path for displaying movie posters

//   useEffect(() => {
//     (async () => {
//       try {
//         console.log(fetchUrl);
//         const request = await axios.get(fetchUrl);
//         console.log(request);
//         setMovies(request.data.results); //result is 20 arrey data.
//       } catch (error) {
//         console.log("error", error);
//       }
//     })();
//   }, [fetchUrl]);

//   return (
//     <div className="row">
//       <h1>{title}</h1>

//       <div className="row_posters">
//         {movies?.map((movie, i) => (
//           <img
//             key={i}
//             src={`${base_url}${
//               isLargeRow ? movie.poster_path : movie.backdrop_path
//             }`}
//             alt={movie.name}
//             className={`row_poster ${isLargeRow && "row_posterLarge"}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Row;
