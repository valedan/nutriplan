interface Props extends React.ComponentProps<"select"> {
  label?: string;
  hint?: string;
}

const Select = ({ className, id, label, hint, children, ...props }: Props) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        <select
          id={id}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          {...props}
        >
          {children}
        </select>
      </div>
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
    </div>
  );
};

export default Select;
