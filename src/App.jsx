// import { useState } from "react";
import "./App.css";
import avatar from "./assets/avatar.svg";

function App() {
  return (
    <>
      <section id="center">
        <div>
          <Header />
        </div>
      </section>
    </>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="bg-black text-white font-bold text-xl px-4 py-2 rounded-lg border border-gray-800">
        E-A.I
      </div>
      <button className="h-12 w-12 rounded-full overflow-hidden border-2 border-transparent hover:border-gray-500 transition-all">
        <img src={avatar} alt="Avatar" />
      </button>
    </header>
  );
}

export default App;
