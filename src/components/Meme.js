import { useEffect, useState } from "react";
import "../css/Meme.css"

export default function Meme() {
    const [data, setData] = useState([]);
    const [url, setUrl] = useState("https://i.imgflip.com/2d3al6.jpg");
    
    function handleGetImage(event) {
        event.preventDefault();
        setUrl(data.data.memes[Math.floor(Math.random() * 100)].url);
        console.log(url);
    }

    const getData = () => {
        fetch('https://api.imgflip.com/get_memes')
            .then(function (response) {
                // console.log(response)
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                setData(myJson)
            });
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <main>
            <form action="">
                <input type="text" placeholder="Top Text" />
                <input type="text" placeholder="Bottom Text" />
                <button onClick={handleGetImage}>Get a new meme image  🖼</button>
            </form>
            <img src={url} alt="" />
        </main>
    );
}