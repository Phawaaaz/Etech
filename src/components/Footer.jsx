export default function Footer() {
  return (
    <footer className="w-full bg-[#0A0F1D] text-left text-gray-400 text-xs border-t border-zinc-900/60 py-14 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-items-start">
        <div className="md:col-span-6 flex flex-col gap-3">
          <h4 className="text-sm font-black text-white tracking-wider text-left select-none">
            E-A.I
          </h4>
          <p className="max-w-sm leading-relaxed text-zinc-500 font-medium">
            An AI powered platform that generates high quality, structured
            courses on any technical topic.
          </p>
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <span className="font-extrabold text-white text-xs mb-1 select-none tracking-wide">
            Product
          </span>
          <a
            href="#features"
            className="hover:text-white transition-colors font-medium"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors font-medium"
          >
            How it works
          </a>
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <span className="font-extrabold text-white text-xs mb-1 select-none tracking-wide">
            Company
          </span>
          <a
            href="#about"
            className="hover:text-white transition-colors font-medium"
          >
            About Us
          </a>
          <a
            href="#contact"
            className="hover:text-white transition-colors font-medium"
          >
            Contact
          </a>
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <span className="font-extrabold text-white text-xs mb-1 select-none tracking-wide">
            Legal
          </span>
          <a
            href="#privacy"
            className="hover:text-white transition-colors font-medium"
          >
            Privacy Policy
          </a>
          <a
            href="#terms"
            className="hover:text-white transition-colors font-medium"
          >
            Terms of Service
          </a>
          <a
            href="#cookies"
            className="hover:text-white transition-colors font-medium"
          >
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
}
