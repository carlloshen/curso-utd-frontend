import {Route, Routes} from 'react-router-dom'
import Home from '../pages/Home';
import Funcionario from '../pages/Funcionario';
import AddFuncionario from '../pages/AddFuncionario';
import EditFuncionario from '../pages/EditFuncionario';
import ListarFuncionarios from '../pages/ListarFuncionarios';
import NotFound from '../pages/NotFound';


function Rotas() {
  return (
  <Routes>
    <Route path='/' index element={<Home/>}/>
    <Route path='/funcionarios' element={<Funcionario/>}>
      <Route path='list' element={<ListarFuncionarios/>}/>
      <Route path='add' element={<AddFuncionario/>}/>
      <Route path='edit' element={<EditFuncionario/>}/>
    </Route>
    <Route path='*' element={<NotFound />} />
  </Routes>
  );

}


export default Rotas;