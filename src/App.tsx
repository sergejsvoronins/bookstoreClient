import { Outlet } from "react-router-dom";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "./context/userContext";
import { useState } from "react";
import { LoginUser } from "./transport/user";

function App() {
  const [user, setUser] = useState<LoginUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Outlet></Outlet>;
    </UserContext.Provider>
  );
}

export default App;
