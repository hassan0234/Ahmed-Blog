import { Navbar } from "@/components/clients/navigation/navbar";

const Layout = ({ children }: any) => {
  return (
    <div className="container max-w-[1400px] font-sans">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
