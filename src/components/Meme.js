import { useEffect, useState } from "react";
import "../css/Meme.css";
import ImagesCarousel from "./Images";

export default function Meme() {
  const [memesData, setMemesData] = useState([]);
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    urlImg: "",
  });

  var seedrandom = require("seedrandom");
  var prng = seedrandom();
  function handleGetImage(event) {
    event.preventDefault();
    setMeme(prevState => ({
      ...prevState,
      urlImg: memesData[Math.floor(prng() * memesData.length)].url
    }));
  }

  function handleChangeInputTop(event) {
    // console.log(event.target.value);
    setMeme(prevState => ({
      ...prevState,
      topText: event.target.value,
    }));
  }

  function handleChangeInputBottom(event) {
    // console.log(event.target.value);
    setMeme(prevState => ({
      ...prevState,
      bottomText: event.target.value,
    }));
  }

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(function (response) {
        // console.log(response)
        return response.json();
      })
      .then(function (myJson) {
        // console.log(myJson);
        setMemesData(myJson.data.memes);
        setMeme(prevState => ({
          ...prevState,
          urlImg: (myJson.data.memes[
            Math.floor(Math.random() * myJson.data.memes.length)]
            .url
          )
        }));
      });
  }, []);

  return (
    <main>
      <form>
        <input onChange={handleChangeInputTop} type="text" placeholder="Top Text" />
        <input onChange={handleChangeInputBottom} type="text" placeholder="Bottom Text" />
        <button onClick={handleGetImage}>Get a New random meme image 🖼</button>
      </form>
      {meme.urlImg && <ImagesCarousel memes={memesData} setMeme={setMeme} />}
      <div className="meme">
        <img src={meme.urlImg} alt="" className="meme-image" />
        <h2 className="meme-text top">{meme.topText}</h2>
        <h2 className="meme-text bottom">{meme.bottomText}</h2>
      </div>
      <button className="save-img-btn"> Save meme!</button>
      {/* <p>{meme.topText}</p>
      <p>{meme.bottomText}</p> */}
    </main>
  );
}
