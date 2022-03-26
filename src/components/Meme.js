import { useEffect, useState } from "react";
import "../css/Meme.css";
import ImagesCarousel from "./Images";

export default function Meme() {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("");
  var seedrandom = require("seedrandom");
  var prng = seedrandom();
  function handleGetImage(event) {
    event.preventDefault();
    setUrl(data.data.memes[Math.floor(prng() * data.data.memes.length)].url);
  }

  useEffect(() => {
    const getData = () => {
      fetch("https://api.imgflip.com/get_memes")
        .then(function (response) {
          // console.log(response)
          return response.json();
        })
        .then(function (myJson) {
          // console.log(myJson);
          setData(myJson);
          setUrl(myJson.data.memes[Math.floor(Math.random() * 100)].url);
        });
    };
    getData();
  }, []);
  //
  return (
    <main>
      <form action="">
        <input type="text" placeholder="Top Text" />
        <input type="text" placeholder="Bottom Text" />
        <button onClick={handleGetImage}>Get a new random meme image 🖼</button>
      </form>
        {url && <ImagesCarousel memes={data.data.memes} setUrl={setUrl} />}
      <img src={url} alt="" className="img-editing" />
    </main>
  );
}
