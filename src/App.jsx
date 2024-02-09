import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='profile/:user' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
