import steps from "../data/howItWorkSteps";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full bg-white text-black pt-55 px-6 pb-10 font-sans"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h3 className="text-5xl md:text-6xl font-black mb-12 tracking-tight text-center text-black">
          How It Works
        </h3>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-4 w-full">
          {steps.map((step, index) => (
            <div key={step.num} className="flex items-center w-full lg:w-auto">
              <div className="flex items-start gap-5 max-w-sm mx-auto lg:mx-0">
                <div className="w-20 h-20 shrink-0 rounded-2xl bg-[#F0EEFF] flex items-center justify-center border border-purple-100/40 shadow-sm">
                  <span className="text-3xl">{step.icon}</span>
                </div>

                <div className="flex flex-col items-start text-left pt-1">
                  <h4 className="text-xl font-extrabold text-black mb-1.5 tracking-tight">
                    {step.num}. {step.title}
                  </h4>
                  <p className="text-zinc-600 text-sm font-medium leading-relaxed max-w-[240px]">
                    {step.desc}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block text-zinc-400 font-extrabold text-xl select-none lg:ml-8 xl:ml-12 tracking-widest pointer-events-none">
                  •••➔
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
