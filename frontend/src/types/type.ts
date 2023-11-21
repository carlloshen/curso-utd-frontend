export interface Request<T> {
  method: string;
  url: string;
  data: T;
}

export type Funcao = "DEVELOPER" | "QA" | "DESIGN" | "ESTAGIARIO";
export type Ativo = "ATIVO" | "INATIVO";

export interface NewData {
  nome: string;
  sobrenome?: string;
  email: string;
  cpf: string;
  funcao: Funcao;
}

export interface UpdateData {
  id?:string
  nome?: string;
  sobrenome?: string;
  email?: string;
  cpf?: string;
  funcao?: Funcao;
  ativo?: string;
}

export interface GetData {
  id: string
  nome: string;
  sobrenome: string;
  email: string;
  cpf: string;
  funcao: Funcao;
  ativo: Ativo;
}


export interface DadosContextProps {
    id: string;
    adicionarId: (id: string) => void
}

export interface Props {
  children: React.ReactNode;
}