import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Predictor from './components/Predictor';
import About from './components/About';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Navbar/>
      <Routes>
       
       <Route path='/' element={<Predictor/>}></Route>
        
       <Route path='/about' element={<About/>}></Route>
       </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
