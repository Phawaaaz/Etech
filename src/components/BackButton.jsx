import arrowLeftIcon from "../assets/arrow-left.svg";

export default function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-white opacity-40 hover:scale-110 hover:opacity-100 cursor-pointer"
    >
      <img src={arrowLeftIcon} alt="Back Step" className="w-10 h-10" />
    </button>
  );
}
