import arrowLeft from "../assets/arrow-left.svg";

export default function BackButton({ onClick }) {
  return (
    <button onClick={onClick}>
      <img src={arrowLeft} />
    </button>
  );
}
