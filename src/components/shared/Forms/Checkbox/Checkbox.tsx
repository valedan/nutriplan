interface Props extends React.ComponentProps<"input"> {
  label?: string;
  hint?: string;
}

const Checkbox = ({ className, id, label, hint, ...props }: Props) => {
  return (
    <input type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" {...props} />
  );
};

export default Checkbox;
