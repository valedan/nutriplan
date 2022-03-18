import Spinner from "./Spinner";

interface Props {
  message?: string;
}

export default function LoadingScreen({ message = "Loading..." }: Props) {
  return (
    <div className="flex flex-col items-center mt-32 w-full">
      <Spinner />
      <p className="text-grey-700 mt-4">{message}</p>
    </div>
  );
}
