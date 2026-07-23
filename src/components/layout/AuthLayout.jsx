import SignBrandHeader from "./SignBrandHeader";

export default function AuthLayout({
  children,
  maxWidth = "max-w-xl",
  showCard = true,
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative w-full overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <SignBrandHeader />

      <div
        className={`w-full ${maxWidth} mx-auto my-auto px-4 py-20 flex flex-col items-center justify-center min-h-[85vh] animate-fadeIn font-sans z-10`}
      >
        {showCard ? (
          <div className="w-full bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm flex flex-col backdrop-blur-md">
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
