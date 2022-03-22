import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/layout/Navbar";
import LoginPage from "./Components/Pages/Login";
import Profile from "./Components/Pages/Profile";
import Register from "./Components/Pages/Register";
import WelcomePage from "./Components/Pages/Welcome";

function App() {
    // state with logged in user data
    // useEffect tthat handles localstorage if user navigates away from page/refreshes
    // logout handler function that deletes a token from localStorage
    return (
        <Router>
            <Navbar />
            <div className="App">
                <Routes>
                    <Route exact path='/' element={<WelcomePage />}/>
                    <Route path='/login' element={<LoginPage />}/>
                    <Route path='/profile' element={<Profile />}/>
                    <Route path='/register' element={<Register />}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
