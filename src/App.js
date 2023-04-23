import './App.css';
import Home from "./components/Home/Home";
import AddBook from "./components/Books/AddBook";
import BookDetails from "./components/Books/bookDetails";
import SignIn from "./components/User/Login";
import SignUp from "./components/User/Registration";
import UpdateBook from "./components/Books/UpdateBook";
import Navbar from "./components/Home/Navbar";
import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route  path="/" element={<SignUp/>}/>
        <Route  path="/login" element={<SignIn/>}/>
        <Route  path="/books" element={<Home/>}/>
        <Route  path="/detail/:id" element={<BookDetails/>}/>
        <Route  path="/addBook" element={<AddBook/>}/>
        <Route  path="/update/:id" element={<UpdateBook/>}/>
      </Routes>

    </div>
    </BrowserRouter>
  
  );
}

export default App;
