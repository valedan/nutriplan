import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="pt-16">
      <Navbar />
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Layout;
