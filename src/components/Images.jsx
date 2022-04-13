import "../css/Images.css";

function ImagesCarousel(props) {

  const images = props.memes.map((meme) => {
    return <img
      key={meme.id}
      onClick={() => props.setMeme(prevState => ({
        ...prevState,
        urlImg: meme.url
      }))}
      src={meme.url}
      className="images"
      alt="" />;
  });
  return <div className="images-carousel">{images}</div>;
}

export default ImagesCarousel;
