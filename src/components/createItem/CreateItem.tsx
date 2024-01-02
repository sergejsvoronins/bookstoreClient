import { Container } from "react-bootstrap";
import { CreateBookForm } from "../forms/CreateBookForm";

interface ICreateItem {
  type: string;
}
export function CreateItem({ type }: ICreateItem) {
  function getForm(type: string) {
    switch (type) {
      case "books":
        return <CreateBookForm />;

      default:
        return "Some form";
    }
  }
  return <Container>{getForm(type)}</Container>;
}
