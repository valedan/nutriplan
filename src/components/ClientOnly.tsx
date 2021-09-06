import { useEffect, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className: string;
}

const ClientOnly = ({ children, ...delegated }: Props) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
};

export default ClientOnly;
