import arrowIcon from "../assets/arrow-right.svg";

export default function NextButton({ disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`mt-12 p-4
        ${
          disabled
            ? "text-white cursor-not-allowed opacity-40"
            : "text-white hover:scale-110 cursor-pointer"
        }`}
    >
      <img src={arrowIcon} alt="Next Step" className="w-10 h-10" />
    </button>
  );
}
