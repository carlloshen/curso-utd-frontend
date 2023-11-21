import { useState, useEffect } from "react";
import { GetData } from "../types/type";
import { request } from "../config/AxiosHelper";
import { useId } from "../config/Context/DadosContext";
import {  useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { MdDeleteOutline, MdEditDocument } from "react-icons/md";
import Body from "../components/Body";

function ListarFuncionarios() {
  const [content, setContent] = useState<GetData[]>([]);
  const { adicionarId } = useId();
  const navigate = useNavigate();
  useEffect(() => {
    const dados = async () => {
      const data = await request({
        method: "GET",
        url: "/funcionario",
        data: "",
      });

      const dat = data.data;
      setContent(dat);
    };
    dados();
  }, []);

  const handleEdit = (element: string) => {
    adicionarId(element);
    navigate("/funcionarios/edit");
  };

  const handleDelete = async (element: string) => {
    try {
      const result = await request({
        method: "DELETE",
        url: `/funcionario/${element}`,
        data: "",
      });
      console.log(result.data);
      result.status === 200 ? alert(result.data) : null;
      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <Body>
      <h2 className="text-2xl mb-10 leading-6 font-medium text-gray-900">
        Lista de Funcionarios
      </h2>
      <div className="block overflow-x-auto w-full bg-transparent">
        <table className="w-full ">
          <thead>
            <tr className="border border-solid border-l-0 border-r-0">
              <th className="py-3 px-6 font-medium text-xs uppercase tracking-wider">
                Nome
              </th>
              <th className="py-3 px-6 font-medium text-xs uppercase tracking-wider">
                Sobrenome
              </th>
              <th className="py-3 px-6 font-medium text-xs uppercase tracking-wider">
                Email
              </th>
              <th className="py-3 px-6 font-medium text-xs uppercase tracking-wider">
                Cpf
              </th>
              <th className="py-3 px-6 font-medium text-xs uppercase tracking-wider">
                Funcao
              </th>
              <th className="py-3 px-6 font-medium text-xs uppercase tracking-wider">
                Ativo
              </th>
              <th
                colSpan={2}
                className="py-3 px-6 font-medium text-xs uppercase tracking-wider"
              >
                Ações
              </th>

              {/* <th className="py-3 px-6 font-medium text-xs uppercase tracking-wider">Editar</th>
              <th className="py-3 px-6 font-medium text-xs uppercase tracking-wider">Deletar</th> */}
            </tr>
          </thead>
          <tbody className="w-full divide-y divide-gray-400">
            {content.map((element, key) => (
              <tr key={key}>
                <td className="px-6 py-1 text-md whitespace-nowrap">
                  {element.nome}
                </td>
                <td className="px-6 py-1 text-md whitespace-nowrap">
                  {element.sobrenome}
                </td>
                <td className="px-6 py-1 text-md whitespace-nowrap">
                  {element.email}
                </td>
                <td className="px-6 py-1 text-md whitespace-nowrap">
                  {element.cpf.replace(element.cpf.slice(2, 9), "*".repeat(7))}
                </td>
                <td className="px-6 py-1 text-md whitespace-nowrap">
                  {element.funcao}
                </td>
                <td className="px-6 py-1 text-md whitespace-nowrap">
                  {element.ativo}
                </td>
                <td>
                  <button>
                    <MdEditDocument
                      className="text-xl hover:text-green-400"
                      value={element.id}
                      onClick={() => handleEdit(element.id)}
                    />
                  </button>
                </td>
                <td>
                  <button
                    value={element.id}
                    onClick={() => handleDelete(element.id)}
                  >
                    <MdDeleteOutline
                      className="text-xl hover:text-red-700"
                      value={element.id}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Body>
  );
}

export default ListarFuncionarios;
