import Header from "@/components/header";
import {Outlet} from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">
        <a href="mailto:chaitanya.work23@gmail.com" className="text-white underline">Contact Me</a>
      </div>
    </div>
  );
};

export default AppLayout;
