import {Routes, Route} from 'react-router-dom';
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import Register from './component/Register';


function App() {
  
  return(
  <>
    <Routes>
      <Route exact path="/" Component={Dashboard}/>
      <Route exact path="/login" Component={Login}/>
      <Route exact path="/Register" Component={Register}/>
    </Routes>
  </>

)}

export default App;