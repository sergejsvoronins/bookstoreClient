import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { IUserContext, UserContext } from "../context/userContext";
import { NotFoundPage } from "./NotFoundPage";

export function AdminPage() {
  const userContext = useContext<IUserContext>(UserContext);
  return (
    <>
      {userContext.user?.accountLevel === "admin" ? (
        <Container>
          <Outlet></Outlet>
        </Container>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}
