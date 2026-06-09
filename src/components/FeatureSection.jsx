import features from "../data/features";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full bg-[#EBF0FA] text-black py-12 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-12 tracking-tight text-center text-black leading-tight max-w-4xl">
          Everything you need to learn effectively
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {features.map((feat) => (
            <div
              key={feat.title}
              className={`${feat.bgTint} p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col items-center text-center justify-center min-h-[220px] transition-transform duration-300 hover:-translate-y-1`}
            >
              <h4 className="text-base font-bold text-black border-b border-zinc-100 pb-2 text-xl mb-4 tracking-tight">
                {feat.title}
              </h4>
              <p className="text-zinc-700 text-sm font-medium leading-relaxed max-w-[220px]">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
