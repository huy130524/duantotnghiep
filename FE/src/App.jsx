import HomePage from "./Pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./LayoutAdmin/Dashboard";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route>
            <Route index element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="admin">
            <Route path="dasboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
