import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export function AuthorsManager() {
  return (
    <Container>
      <Outlet></Outlet>
    </Container>
  );
}
