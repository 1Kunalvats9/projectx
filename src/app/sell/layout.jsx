import Navbar from "@/components/Navbar";
export default function Layout({ children }) {
    return (
      <div className="w-full min-h-[100vh]">
        <Navbar />
        <div className="w-full h-full flex items-start justify-start">
            {children}
        </div>
      </div>
    );
}