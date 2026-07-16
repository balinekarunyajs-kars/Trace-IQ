import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="flex bg-[#08111F] text-white min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <Dashboard />

      </div>

    </div>
  );
}

export default App;