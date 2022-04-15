import "../css/Header.css";
import trollIcon from "../images/troll-face.png";

export default function Header() {
  return (
    <header>
      <img src={trollIcon} alt="" />
      <h3>Meme Generator</h3>
    </header>
  );
}
