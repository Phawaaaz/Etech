import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEtech } from "../context/EtechContext";

export default function ResultView() {
  const { result, loading } = useEtech();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !result) navigate("/");
  }, [result, loading, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
        <p className="text-xl font-semibold text-zinc-700">E-A.I is generating...</p>
      </div>
    );
  }

  if (!result) return null;

  const { format, content, topic, level } = result.data;

  return (
    <div className="w-full max-w-3xl px-4 pb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-zinc-500 uppercase tracking-widest font-semibold">
            {format} · {level}
          </p>
          <h1 className="text-3xl font-bold text-zinc-900">{topic}</h1>
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-sm font-semibold px-4 py-2 rounded-full border border-zinc-300 hover:bg-zinc-100 transition"
        >
          Start Over
        </button>
      </div>

      {format === "text" && <TextResult content={content} />}
      {format === "audio" && <AudioResult content={content} />}
      {format === "image" && <ImageResult content={content} />}
      {format === "interactive" && <InteractiveResult content={content} />}
      {format === "video" && <VideoResult content={content} />}
    </div>
  );
}

function TextResult({ content }) {
  return (
    <div className="prose prose-zinc max-w-none bg-white rounded-2xl p-8 shadow-sm border border-zinc-100">
      {content.split("\n").map((line, i) => {
        if (line.startsWith("## "))
          return <h2 key={i} className="text-2xl font-bold mt-6 mb-2">{line.replace("## ", "")}</h2>;
        if (line.startsWith("### "))
          return <h3 key={i} className="text-xl font-semibold mt-4 mb-1">{line.replace("### ", "")}</h3>;
        if (line.startsWith("**") && line.endsWith("**"))
          return <p key={i} className="font-bold mt-3">{line.replaceAll("**", "")}</p>;
        if (line.startsWith("- "))
          return <li key={i} className="ml-4 list-disc">{line.replace("- ", "")}</li>;
        if (line.trim() === "") return <br key={i} />;
        return <p key={i} className="text-zinc-700 leading-relaxed">{line}</p>;
      })}
    </div>
  );
}

function AudioResult({ content }) {
  const speak = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => window.speechSynthesis.cancel();

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-100">
      <p className="text-zinc-700 leading-relaxed whitespace-pre-line mb-8">{content}</p>
      <div className="flex gap-4">
        <button
          onClick={speak}
          className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-zinc-800 transition"
        >
          ▶ Play Audio
        </button>
        <button
          onClick={stop}
          className="px-6 py-3 border border-zinc-300 text-zinc-700 rounded-full font-semibold hover:bg-zinc-100 transition"
        >
          ■ Stop
        </button>
      </div>
    </div>
  );
}

function ImageResult({ content }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-zinc-100">
      <img
        src={content}
        alt="AI generated educational illustration"
        className="w-full rounded-xl object-cover"
      />
    </div>
  );
}

function InteractiveResult({ content }) {
  return (
    <div className="flex flex-col gap-6">
      {content.map((item, i) => (
        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100">
          <p className="font-bold text-zinc-900 mb-4">
            Q{i + 1}. {item.question}
          </p>
          <div className="flex flex-col gap-2 mb-4">
            {item.options.map((opt, j) => (
              <div
                key={j}
                className={`px-4 py-3 rounded-xl border text-sm font-medium cursor-default ${
                  opt === item.answer
                    ? "bg-green-50 border-green-400 text-green-800"
                    : "bg-zinc-50 border-zinc-200 text-zinc-700"
                }`}
              >
                {opt}
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-500 bg-zinc-50 rounded-lg px-4 py-2">
            💡 {item.explanation}
          </p>
        </div>
      ))}
    </div>
  );
}

function VideoResult({ content }) {
  return (
    <div className="flex flex-col gap-6">
      {content.map((scene) => (
        <div key={scene.scene} className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
              {scene.scene}
            </span>
            <h3 className="font-bold text-zinc-900 text-lg">{scene.title}</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-zinc-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Narration</p>
              <p className="text-zinc-700 text-sm leading-relaxed">{scene.narration}</p>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Visual</p>
              <p className="text-zinc-700 text-sm leading-relaxed">{scene.visual_description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
