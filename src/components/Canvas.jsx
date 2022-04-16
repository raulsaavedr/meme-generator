
import React, { useState, useRef, useEffect } from 'react'
import "../css/Canvas.css"
const Canvas = props => {

  const canvasRef = useRef(null)
  const [canvasStyle, setCanvasStyle] = useState();
  const [spinnerStyle, setSpinnerStyle] = useState();
  const [blobImg, setBlobImg] = useState();
  const { meme, setMeme, ...otherProps } = props;
  const { topText, bottomText, urlImg, width, height, img } = meme;
  useEffect(() => {
    const memeImage = new Image();
    memeImage.setAttribute("crossorigin", "anonymous");
    memeImage.src = urlImg;
    memeImage.onload = () => setMeme((prevState) => ({
      ...prevState,
      img: memeImage
    }))
  }, [urlImg, setMeme])
  useEffect(() => {
    if (width && height && !img) {
      setSpinnerStyle({});
      setCanvasStyle({ display: "none" });
    }
    else if (canvasRef && img) {
      setSpinnerStyle({ display: "none" });
      setCanvasStyle({});
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const {x, y} = {x: canvas.width/2, y: canvas.height/8};
      const ctxTopText =  topText ? topText.toUpperCase() : "";
      const ctxBottomText = bottomText ? bottomText.toUpperCase() : "";     
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0);
      // Adding custom text
      ctx.lineWidth  = 8;
      ctx.font = `${Math.round(height / 16)}pt Impacto`;
      ctx.strokeStyle = 'black';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.lineJoin = 'round';
      ctx.strokeText(ctxTopText, x, y, canvas.width - 10);
      ctx.strokeText(ctxBottomText, x, canvas.height - y/3, canvas.width - 10);      
      ctx.fillText(ctxTopText, x, y, canvas.width - 10);
      ctx.fillText(ctxBottomText, x, canvas.height - y/3, canvas.width - 10);
    }

  }, [topText, bottomText, width, height, urlImg, img])
  function handleDownloadImage(event){
    setBlobImg(canvasRef.current ? canvasRef.current.toDataURL(): "")
  }
  return (
    <>
      <svg style={spinnerStyle} className="spinner" width="64px" height="64px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="50" cy="50" r="40" stroke="gray" fill="none" strokeWidth="6" strokeLinecap="round">
        </circle>
      </svg>
      <canvas ref={canvasRef} style={canvasStyle} width={width} height={height} {...otherProps} />
      <a className="save-img-btn-container nostyle" href={blobImg} target="_blank" rel="noreferrer" download={`${meme.name} - Meme Generator.png`}>
        <button onClick={handleDownloadImage}> Save meme!</button>
      </a>
    </>
  )
}

export default Canvas