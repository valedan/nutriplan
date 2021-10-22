import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="pt-16 bg-gray-100 min-h-screen h-screen overflow-hidden flex-1 flex-col">
      <Navbar />
      <div className="p-4 h-full overflow-hidden">{children}</div>
    </div>
  );
};

export default Layout;
