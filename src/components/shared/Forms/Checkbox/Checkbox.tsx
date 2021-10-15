// Can add support for labels if needed - see Input

const Checkbox = ({ className, id, ...props }: React.ComponentProps<"input">) => {
  return (
    <input type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" {...props} />
  );
};

export default Checkbox;
