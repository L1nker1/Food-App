import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import PostRecipe from "./components/CreateRecipe/CreateRecipe.jsx";
import CardDetail from "./components/Detail/Detail.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home /> }/> 
        <Route path="/create" element={<PostRecipe/>} />
        <Route path="/home/details/:id" element={<CardDetail/>}/>
      </Routes>
    </div>
  )
}

export default App
