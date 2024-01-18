import { Container } from "react-bootstrap";
import { BookForm } from "./BookForm";

interface ICreateItem {
  type: string;
}
export function CreateItem({ type }: ICreateItem) {
  function getForm(type: string) {
    switch (type) {
      // case "books":
      //   return <BookForm />;

      default:
        return "Some form";
    }
  }
  return <Container>{getForm(type)}</Container>;
}
