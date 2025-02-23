import { Route, Routes } from "react-router-dom";

import HomePageAdmin from "./Pages/HomePage";
import LoginAdmin from "./Pages/Login";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route index element={<HomePageAdmin />} />
          <Route path="login" element={<LoginAdmin />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
