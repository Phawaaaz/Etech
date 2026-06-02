import { useState } from "react";
import avatar from "./assets/avatar.svg";
import textIcon from "./assets/text-icon.svg";
import audioIcon from "./assets/audio-icon.svg";
import imageIcon from "./assets/image-icon.svg";
import interactiveIcon from "./assets/interactive-icon.svg";
import videoIcon from "./assets/video-icon.svg";
import arrowIcon from "./assets/arrow-right.svg";

const formatOptions = [
  { id: "text", label: "Text", icon: textIcon },
  { id: "audio", label: "Audio", icon: audioIcon },
  { id: "image", label: "Image", icon: imageIcon },
  { id: "interactive", label: "Interactive Mode", icon: interactiveIcon },
  { id: "video", label: "Video", icon: videoIcon },
];

function App() {
  return (
    <div className="min-h-screen text-white flex items-center justify-center relative font-sans p-6">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <Header />
        <main className="w-full flex flex-col items-center mt-20">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between w-full absolute top-0 left-0 p-6">
      <div className="bg-black text-white font-bold text-xl px-4 py-2 rounded-lg border border-gray-800 tracking-wider">
        E-A.I
      </div>
      <button className="h-12 w-12 rounded-full overflow-hidden border-2 border-transparent hover:border-gray-500 transition-all">
        <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
      </button>
    </header>
  );
}

const OptionButton = ({ label, icon, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 
      ${
        isSelected
          ? "bg-blue-100 text-black border-2 border-blue-500 scale-105"
          : "bg-white text-black border-2 border-transparent hover:bg-gray-200 hover:scale-105"
      }`}
  >
    <img src={icon} alt={`${label} icon`} className="w-6 h-6 object-contain" />
    <span>{label}</span>
  </button>
);

const NextButton = ({ disabled }) => (
  <button
    disabled={disabled}
    className={`mt-12  transition-all duration-300  
      ${
        disabled
          ? "bg-gray-800 text-gray-600 cursor-not-allowed opacity-40"
          : "bg-black text-white hover:bg-gray-900 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-110 cursor-pointer"
      }`}
  >
    <img src={arrowIcon} alt="Next Step" className="w-10 h-10" />
  </button>
);

function Dashboard() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight text-center">
        What do you need?
      </h1>

      <div className="flex flex-wrap justify-center gap-12 max-w-2xl">
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

      <NextButton disabled={!selectedOption} />
    </div>
  );
}

export default App;
