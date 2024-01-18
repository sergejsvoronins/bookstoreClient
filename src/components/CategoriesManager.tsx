import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export function CategoriesManager() {
  return (
    <Container>
      <Outlet></Outlet>
    </Container>
  );
}
