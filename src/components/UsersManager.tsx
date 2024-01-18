import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export function UsersManager() {
  return (
    <Container>
      <Outlet></Outlet>
    </Container>
  );
}
