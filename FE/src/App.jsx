import HomePage from "./Pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Productdetails from "./Pages/ProductDetails";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="details" element={<Productdetails />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
