import features from "../data/features";

export default function FeaturesSection() {
  return (
    <section id="features" className="w-full bg-slate-50 text-black py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl font-extrabold mb-16 tracking-tight text-center">
          Everything you need to learn effectively
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="bg-white p-6 rounded-2xl border border-zinc-200/60 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <h4 className="text-base font-bold text-black border-b border-zinc-100 pb-2">
                {feat.title}
              </h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
