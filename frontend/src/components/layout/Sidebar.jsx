import {
  LayoutDashboard,
  ShieldAlert,
  CreditCard,
  SearchCheck,
  BarChart3,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Investigations", icon: SearchCheck },
  { name: "Security Events", icon: ShieldAlert },
  { name: "Transactions", icon: CreditCard },
  { name: "Analytics", icon: BarChart3 },
  { name: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-[#101B2D] border-r border-gray-700 flex flex-col">

      <div className="p-6">
        <h1 className="text-3xl font-bold text-cyan-400">
          TraceIQ
        </h1>

        <p className="text-gray-400 text-sm">
          From Alerts to Answers
        </p>
      </div>

      <nav className="flex-1 px-4">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-cyan-500 hover:text-white transition mb-2"
            >
              <Icon size={20} />

              {item.name}
            </button>
          );
        })}

      </nav>
    </div>
  );
}