import Logo from "@/components/ui/Logo";

export default function SignBrandHeader() {
  return (
    <div className="flex items-center justify-between w-full absolute top-0 left-0 p-6 z-20">
      <Logo />
    </div>
  );
}
