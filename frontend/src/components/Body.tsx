import { Props } from "../types/type";

function Body({children}: Props) {
  return (
    <>
      <div className="w-full flex justify-center">
        <div className=" relative w-[90vw] py-5 rounded-lg flex flex-col shadow-lg text-center justify-center items-center mt-4">
            {children}
        </div>
      </div>
    </>
  );
}

export default Body;
