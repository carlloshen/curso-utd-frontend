import { Formik, Form, Field, ErrorMessage } from "formik";
import { NewData } from "../types/type";
import { request } from "../config/AxiosHelper";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Body from "../components/Body";

type data = NewData;

const initialValues: data = {
  nome: "",
  sobrenome: "",
  cpf: "",
  email: "",
  funcao: "ESTAGIARIO",
};

function AddFuncionario() {
  const navigate = useNavigate();

  const submit = async (values: data) => {
    try {
      const dados = await request({
        method: "POST",
        url: "/funcionario",
        data: values,
      });

      dados.status === 200 ? alert(dados.data.message) : null;
      navigate("/funcionarios/list");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        alert(error.response.data.message);
      }
    }
  };

  const validation = Yup.object().shape({
    nome: Yup.string()
      .min(3, "no mínimo 3 caracteres")
      .max(30, "Max 30 caracteres")
      .required("Campo Obrigatório"),
    sobrenome: Yup.string()
      .min(3, "no mínimo 3 caracteres")
      .max(30, "Max 30 caracteres")
      .required("Campo obrigatório"),
    cpf: Yup.string()
      .min(11, "Digite todos os números")
      .required("Campo obrigatório"),
    email: Yup.string().required("Campo Obrigatório"),
  });

  return (
    <Body>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Cadastro de Funcionarios
      </h2>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, functions) => {
          submit(values);
          functions.setSubmitting(false);
        }}
        validationSchema={validation}
      >
        <Form className="text-x p-4 flex flex-col gap-3 ">
          <div className="flex">
            <div className="flex flex-col m-2 w-full">
              <label
                className="block text-sm font-medium text-gray-700 text-left mb-2"
                htmlFor="nome"
              >
                Nome
              </label>
              <Field
                id="nome"
                name="nome"
                placeholder="Nome"
                className="rounded-md text-sm placeholder:text-stone-400 border-gray-300 shadow-sm focus:outline-none"
              />
              <ErrorMessage name="nome" />
            </div>
            <div className="flex flex-col m-2 w-full">
              <label
                className="block text-sm font-medium text-gray-700 text-left mb-2"
                htmlFor="sobrenome"
              >
                Sobrenome
              </label>
              <Field
                id="sobrenome"
                name="sobrenome"
                placeholder="Sobrenome"
                className="rounded-md text-sm placeholder:text-stone-400 border-gray-300 shadow-sm focus:outline-none"
              />
              <ErrorMessage name="sobrenome" />
            </div>
          </div>
          <div className="flex flex-col m-2">
            <label
              className="block text-sm font-medium text-gray-700 text-left mb-2"
              htmlFor="cpf"
            >
              CPF
            </label>
            <Field
              id="cpf"
              name="cpf"
              placeholder="CPF"
              className="rounded-md text-sm placeholder:text-stone-400 border-gray-300 shadow-sm focus:outline-none"
            />
            <ErrorMessage name="cpf" />
          </div>
          <div className="flex flex-col m-2">
            <label
              className="block text-sm font-medium text-gray-700 text-left mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <Field
              id="email"
              name="email"
              placeholder="Email"
              className="rounded-md text-sm placeholder:text-stone-400 border-gray-300 shadow-sm focus:outline-none"
            />
            <ErrorMessage name="email" />
          </div>
          <div className="flex flex-col m-2 ">
            <label
              className="block text-sm font-medium text-gray-700 text-left mb-2"
              htmlFor="funcao"
            >
              Funcao
            </label>
            <Field
              as="select"
              id="funcao"
              name="funcao"
              className="rounded-md text-sm placeholder:text-stone-400 border-gray-300 shadow-sm focus:outline-none"
            >
              <option value="ESTAGIARIO">Estagiario</option>
              <option value="DEVELOPER">Developer</option>
              <option value="DESIGN">Design</option>
              <option value="QA">QA</option>
            </Field>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-xl text-center p-2 w-52 rounded-lg border border-gray-300 shadow-sm hover:bg-indigo-500 hover:ring-indigo-500 hover:border-white"
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </Body>
  );
}

export default AddFuncionario;
