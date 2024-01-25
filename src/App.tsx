import { Outlet } from "react-router-dom";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { IUserContext, UserContext } from "./context/userContext";
import { useContext, useState } from "react";
import { LoginUser } from "./transport/user";
import { UserProvider } from "./components/UserProvider";

function App() {
  // const [user, setUser] = useState<LoginUser | null>(null);
  // const userContext = useContext<IUserContext>(UserContext);

  return (
    // <UserContext.Provider value={{ user, setUser }}>
    <Outlet></Outlet>
    // </UserContext.Provider>
  );
}

export default App;
