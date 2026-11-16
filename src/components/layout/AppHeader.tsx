import { ChartPie } from "lucide-react";

const Header = () => {
  return (
    <header className="flex h-16 w-full shrink-0 items-center border-b border-[#EBF0FC] bg-white px-8">
      {/* Left: Logo and Menu */}

      <div className="flex items-center gap-3">
        <ChartPie size={24} />

        <span className="text-lg font-bold text-[#10245C]">
          Machbarkeitsapp
        </span>
      </div>
    </header>
  );
};

export default Header;
