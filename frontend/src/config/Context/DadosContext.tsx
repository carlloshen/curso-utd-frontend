import { createContext, useState, useContext } from "react";
import { DadosContextProps } from "../../types/type";
import { Props } from "../../types/type";
const DadosContext = createContext<DadosContextProps>({
  id: "",
} as DadosContextProps);




export function DadosContextProvider({ children }: Props) {
  const [id, setId] = useState<string>("");

 const adicionarId = (novoId: string)  => setId(novoId);

  return (
    <>
      <DadosContext.Provider value={{id, adicionarId }}>
        {children}
      </DadosContext.Provider>
    </>
  );
}

export const useId = () =>{
  const context = useContext(DadosContext)
  return context;
}

export default DadosContext;
