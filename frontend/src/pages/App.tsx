import Navbar from "../components/Navbar";
import { DadosContextProvider } from "../config/Context/DadosContext";
import Rotas from "../routes/Rotas";

function App() {
  return (
    <>
      <DadosContextProvider>
        <Navbar />
        <Rotas />
      </DadosContextProvider>
    </>
  );
}

export default App;
