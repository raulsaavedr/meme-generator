import { useEffect, useState } from "react";
import "../css/Meme.css";
import Canvas from "./Canvas";
import ImagesCarousel from "./Images";

export default function Meme() {
  const [memesData, setMemesData] = useState([]);
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    urlImg: "",
    width: 0,
    height: 0,
    name: "",
    img: null
  });

  var seedrandom = require("seedrandom");
  var prng = seedrandom();
  function handleGetImage(event) {
    event.preventDefault();
    setMeme(prevState => {
      const randomNum = Math.floor(prng() * memesData.length);
      console.log(memesData[randomNum].width, memesData[randomNum].height)
      return {
        ...prevState,
        urlImg: memesData[randomNum].url,
        width: memesData[randomNum].width,
        height: memesData[randomNum].height,
      }
    });
  }
  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setMeme(prevState => {
      return {
        ...prevState,
        [name]: type === "checkbox" ? checked : value
      }
    })
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
        setMeme(prevState => {
          const randomNum = Math.floor(Math.random() * myJson.data.memes.length);
          return {
            ...prevState,
            urlImg: myJson.data.memes[randomNum].url,
            width: myJson.data.memes[randomNum].width,
            height: myJson.data.memes[randomNum].height,            
            }
        });
      });
  }, []);

  return (
    <main>
      <form>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Top Text"
          name="topText"
        />
        <input
          onChange={handleChange}
          type="text" 
          placeholder="Bottom Text"
          name="bottomText"
        />
        <button onClick={handleGetImage}>Get a New random meme image 🖼</button>
      </form>
      {meme.urlImg && <ImagesCarousel memes={memesData} setMeme={setMeme} />}
      <div className="meme">
        <Canvas meme={meme} setMeme={setMeme}/>
      </div>
    </main>
  );
}
