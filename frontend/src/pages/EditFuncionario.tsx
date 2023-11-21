import { Funcao, UpdateData } from "../types/type";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { request } from "../config/AxiosHelper";
import { AxiosError } from "axios";
import { useId } from "../config/Context/DadosContext";
import { useEffect, useState } from "react";
import Body from "../components/Body";
import { useNavigate } from "react-router-dom";

type data = UpdateData;

function EditFuncionario() {
  const navigate = useNavigate()
  const { id } = useId();
  const [infoFuncionario, setInfoFuncionario] = useState<UpdateData>({
    id:"",
    nome: "",
    sobrenome: "",
    email: "",
    cpf: "",
    funcao: "" as Funcao,
  });

  useEffect(() => {
    const requisicao = async () => {
      const dados = await request({
        method: "GET",
        url: `/funcionario/${id}`,
        data: "",
      });
      if (dados.data) {
        setInfoFuncionario(dados.data);
        
      }
    };

    requisicao();
  }, []);
  
  // Requisição ao banco para pegar os valores a serem editados
  const submit = async (values: data) => {
    try {
      const dados = await request({
        method: "PUT",
        url: "/funcionario",
        data: values,
      });

      dados.status === 200 ? alert(dados.data) : null;
      navigate("/")
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        alert(error.response.data.message);
      }
    }
  };

  //Initial values para o Formik
  const initialValues: data = {
    id: infoFuncionario.id,
    nome: infoFuncionario.nome,
    sobrenome: infoFuncionario.sobrenome,
    email: infoFuncionario.email,
    funcao: infoFuncionario.funcao,
    cpf: infoFuncionario.cpf?.replace(infoFuncionario.cpf.slice(2,9), "*".repeat(7)),
  };

  //Validações simples Yup element.cpf.replace(element.cpf.slice(2, 9), "*".repeat(7))
  const validation = Yup.object().shape({
    nome: Yup.string()
      .min(3, "no mínimo 3 caracteres")
      .max(30, "Max 30 caracteres")
      .required("Campo Obrigatório"),
    sobrenome: Yup.string()
      .min(3, "no mínimo 3 caracteres")
      .max(30, "Max 30 caracteres")
      .required("Campo obrigatório"),
    email: Yup.string().required("Campo Obrigatório"),
  });

  return (
    <Body>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Cadastro de Funcionarios
      </h2>
      {/*Verifico se existe initial values, sem essa verificação os campos vem vazios */}
      {initialValues.nome ? (
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
              className="rounded-md text-sm border-gray-300 shadow-sm focus:outline-none  text-gray-300"
              disabled
              readOnly
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
      </Formik>): (
        <span>Loading....</span>
      )}
          {/* <Form className="text-x p-4">
            <div className="flex flex-col m-2">
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700 text-left mb-2"
              >
                Nome
              </label>
              <div className="flex flex-col">
                <Field
                  id="nome"
                  name="nome"
                  placeholder="Nome"
                  className="rounded-md text-sm placeholder:text-stone-400 border-gray-300 shadow-sm focus:outline-none"
                />
                <ErrorMessage name="nome" />
              </div>
              <div className="flex flex-col m-2">
                <label
                  htmlFor="sobrenome"
                  className="block text-sm font-medium text-gray-700 text-left mb-2"
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
                htmlFor="cpf"
                className="block text-sm font-medium text-gray-700 text-left mb-2"
              >
                CPF
              </label>
              <Field
                id="cpf"
                name="cpf"
                placeholder="CPF"
                readOnly
                className="rounded-md text-sm placeholder:text-stone-400 border-gray-300 shadow-sm focus:outline-none"
              />
              <ErrorMessage name="cpf" />
            </div>
            <div className="flex flex-col m-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 text-left mb-2"
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
            <div className="flex flex-col m-2">
              <label
                htmlFor="funcao"
                className="block text-sm font-medium text-gray-700 text-left mb-2"
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
        </Formik> */}
      
    </Body>
  );
}

export default EditFuncionario;
