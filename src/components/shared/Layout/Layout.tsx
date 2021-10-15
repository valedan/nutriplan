import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="pt-16 bg-gray-50 h-screen">
      <Navbar />
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Layout;
