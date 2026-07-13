import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Logo({ className, to = "/" }) {
  return (
    <Link to={to} className={cn("group flex items-center gap-2", className)}>
      <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
        <GraduationCap className="size-5" strokeWidth={2.25} />
      </span>
      <span className="font-display text-xl font-semibold tracking-tight text-foreground">
        Etech
      </span>
    </Link>
  );
}
