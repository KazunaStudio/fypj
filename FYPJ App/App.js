import './App.css';
import {AboutUs} from './Pages/AboutUs';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Navigation} from './Navigation';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
        
      <Navigation/>

      <Routes>
        <Route path='/Pages/AboutUs' element={<AboutUs/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
