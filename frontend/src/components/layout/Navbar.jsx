import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Navbar() {
  return (
    <div className="h-20 bg-[#101B2D] border-b border-gray-700 flex items-center justify-between px-8">

      <h2 className="text-2xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-6">

        <Search className="text-gray-400 cursor-pointer" />

        <Bell className="text-gray-400 cursor-pointer" />

        <UserCircle2
          size={34}
          className="text-cyan-400 cursor-pointer"
        />

      </div>
    </div>
  );
}