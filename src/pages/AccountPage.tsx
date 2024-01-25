import { useContext, useEffect } from "react";
import { IUserContext, UserContext } from "../context/userContext";
import { Outlet, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

export function AccountPage() {
  const { user } = useContext<IUserContext>(UserContext);
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    !user && navigate("/login");
  }, []);
  return (
    <Container>
      {user && (
        <div>
          User page <Outlet></Outlet>
        </div>
      )}
    </Container>
  );
}
