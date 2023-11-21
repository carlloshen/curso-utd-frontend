import { useNavigate } from "react-router-dom";
import Body from "../components/Body";

function NotFound() {
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate("/");
  };

  return (
    <Body>
      <div className="h-[calc(100vh-73px-20px-16px-20px)] flex flex-col justify-center">
        <h1 className="text-3xl font-extrabold mb-6">404 NOT FOUND</h1>
        <p className="text-2xl font-extralight mb-6">
          Please check your URL and try again
        </p>
        <div>
          <button
            type="button"
            onClick={handleReturn}
            className="text-xl text-center p-2 w-52 rounded-lg border border-gray-300 shadow-sm hover:bg-indigo-500 hover:ring-indigo-500 hover:border-white"
          >
            Go Back
          </button>
        </div>
      </div>
    </Body>
  );
}

export default NotFound;
