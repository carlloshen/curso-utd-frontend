import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg cursor-pointer" onClick={handleReturn}>
          Emplooyer Management
        </div>
        <div className="flex space-x-4">
          <Link
            to="/funcionarios/list"
            className="text-white font-semibold  py-2 border border-l-0 border-r-0 border-t-0 border-gray-800 hover:border-white "
          >
            Listar Funcionarios
          </Link>
          <Link
            to="/funcionarios/add"
            className="text-white font-semibold  py-2 border border-l-0 border-r-0 border-t-0 border-gray-800 hover:border-white "
          >
            Cadastrar Funcionarios
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
