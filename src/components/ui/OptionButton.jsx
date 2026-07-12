import { motion } from "framer-motion";

export default function OptionButton({ label, icon, isSelected, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`flex items-center gap-3 px-6 py-3.5 rounded-full font-bold text-base transition-all duration-200 cursor-pointer shadow-3xs border-2 select-none
        ${
          isSelected
            ? "bg-primary/10 text-primary border-primary"
            : "bg-card text-foreground border-border hover:bg-muted/50"
        }`}
    >
      <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
        <img
          src={icon}
          alt={`${label} icon`}
          className="w-5 h-5 object-contain dark:invert"
        />
      </div>
      <span>{label}</span>
    </motion.button>
  );
}
