import { useNavigate } from "react-router-dom";
import useLoginForm from "../hooks/useLoginForm";
import Logo from "@/components/ui/Logo";

export default function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = (loginData) => {
    console.log(
      "Authentication pipeline payload successfully verified:",
      loginData
    );
  };

  const {
    loginData,
    emailError,
    handleInputChange,
    handleLoginSubmit,
    isFormValid,
    submitting,
  } = useLoginForm(handleLoginSuccess);

  return (
    <div className="bg-background text-foreground flex min-h-screen items-center justify-center p-4 font-sans select-text relative overflow-hidden w-full">
      {/* Ambient background decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-8 bg-card border border-border p-8 sm:p-10 rounded-3xl shadow-sm relative z-10">
        
        <div className="flex flex-col items-center select-none">
          <div className="mb-4">
            <Logo />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-zinc-950 uppercase">Welcome Back</h2>
          <p className="mt-2 text-sm text-muted-foreground font-medium">Enter your details to sign in.</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold uppercase tracking-wider text-muted-foreground text-left mb-1.5 select-none">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={loginData.email}
                onChange={handleInputChange}
                disabled={submitting}
                className={`block w-full rounded-2xl border border-border/80 bg-zinc-50 px-4 py-3 text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 sm:text-sm font-semibold transition-all shadow-3xs ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                placeholder="name@email.com"
              />
              {emailError && (
                <span className="text-red-500 font-bold text-xs tracking-wide mt-2 block text-left animate-fadeIn">
                  ⚠️ {emailError}
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5 select-none">
                <label htmlFor="password" className="block text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Password
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={loginData.password}
                onChange={handleInputChange}
                disabled={submitting}
                className={`block w-full rounded-2xl border border-border/80 bg-zinc-50 px-4 py-3 text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 sm:text-sm font-semibold transition-all shadow-3xs ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between select-none">
            <button
              type="button"
              onClick={() => navigate("/sign-up")}
              disabled={submitting}
              className={`text-sm font-bold text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-colors cursor-pointer bg-transparent border-none outline-none ${
                submitting ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
              }`}
            >
              Create account
            </button>
            <div className="text-sm">
              <button
                type="button"
                disabled={submitting}
                className={`font-bold text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors cursor-pointer bg-transparent border-none outline-none ${
                  submitting ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
                }`}
              >
                Forgot password?
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={!isFormValid || submitting}
              className={`group relative flex w-full justify-center px-4 py-3.5 text-sm font-bold uppercase tracking-widest transition-all duration-250 hover:-translate-y-0.5 active:translate-y-0 rounded-full shadow-sm select-none cursor-pointer border-none ${
                !isFormValid || submitting
                  ? "bg-muted text-muted-foreground/60 cursor-not-allowed border border-transparent"
                  : "bg-primary text-primary-foreground hover:bg-primary/95 hover:shadow-md"
              }`}
            >
              {submitting ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
