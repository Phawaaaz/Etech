import React, { useState } from "react";

export default function Settings() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  const toggleDarkMode = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground p-4 md:p-8 flex flex-col font-sans select-text">
      <div className="max-w-3xl w-full mx-auto text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-4">Settings</h1>
        <p className="text-lg text-muted-foreground font-medium mb-10">
          Manage your account settings and application preferences.
        </p>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm flex flex-col gap-6">
          <div className="flex justify-between items-center border-b border-border/50 pb-4">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Email Notifications</h3>
              <p className="text-sm text-muted-foreground">Receive weekly digest and course reminders.</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary cursor-pointer" />
          </div>

          <div className="flex justify-between items-center border-b border-border/50 pb-4">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Dark Mode</h3>
              <p className="text-sm text-muted-foreground">Toggle dark theme for the application.</p>
            </div>
            <input 
              type="checkbox" 
              checked={isDark} 
              onChange={toggleDarkMode} 
              className="w-4 h-4 accent-primary cursor-pointer" 
            />
          </div>

          <div className="flex justify-between items-center pb-2">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Account Type</h3>
              <p className="text-sm text-muted-foreground">You are currently on the Free tier.</p>
            </div>
            <button className="text-sm font-bold text-primary hover:underline cursor-pointer">Upgrade</button>
          </div>
        </div>
      </div>
    </div>
  );
}
