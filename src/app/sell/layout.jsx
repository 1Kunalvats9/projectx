import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }) {
    return (
      <div className="w-full min-h-[100vh]">
        <Navbar />
        <div className="w-full h-full flex items-start justify-start">
            {children}
            <div className="hidden lg:flex">
                <Sidebar />
            </div>
        </div>
      </div>
    );
}