const Button: React.FC = ({ children, ...props }) => {
  return (
    <button
      type="button"
      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
