import { Container } from "react-bootstrap";

interface IUpdateItem {
  type: string;
}
export function UpdateItem({ type }: IUpdateItem) {
  return <Container>update {type}</Container>;
}
