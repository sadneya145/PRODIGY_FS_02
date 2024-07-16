// import logo from './logo.svg';
import Login from './Page/Dashboard/Login'
import Signup from './Page/Dashboard/Signup';
import { AuthProvider } from './Page/Dashboard/AuthContext';
import './App.css';
import {  Routes ,Route} from 'react-router-dom';
import Dashboard from './Page/Dashboard/Dashboard';

function App() {
  return (
    <AuthProvider>
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>

    </Routes>
    </AuthProvider>
    // <Dashboard/>
  );
}

export default App;
