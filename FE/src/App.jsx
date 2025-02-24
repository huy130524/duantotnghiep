import HomePage from "./Pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Productdetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import CheckOut from "./Pages/CheckOut";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="details" element={<Productdetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<CheckOut />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
