import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OptionButton from "../components/OptionButton";
import NextButton from "../components/NextButton";
import formatOptions from "../data/formatOptions";

export default function Dashboard() {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-full">
      <h1
        className="text-4xl md:text-5xl font-bold mb-12 tracking-tight text-center text-white"
        style={{ color: "white" }}
      >
        What do you need?
      </h1>

      <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
        {formatOptions.map((option) => (
          <OptionButton
            key={option.id}
            label={option.label}
            icon={option.icon}
            isSelected={selectedOption === option.id}
            onClick={() => setSelectedOption(option.id)}
          />
        ))}
      </div>

      <NextButton
        disabled={!selectedOption}
        onClick={() => navigate("/generate")}
      />
    </div>
  );
}
