import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ErrorCardProps {
  message: string;
  // size: "small" | "large";
}

const ErrorCard: React.FC<ErrorCardProps> = ({ message }) => {
  return (
    <div className="flex flex-row justify-center items-center gap-2 p-2 w-max h-14 bg-red-300 text-red-800 font-bold rounded-lg border-red-700 border-2">
      <ErrorOutlineIcon className="text-red-700" />
      {message}
    </div>
  );
};

export default ErrorCard;
