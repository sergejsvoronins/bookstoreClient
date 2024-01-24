import {
  Accordion,
  Alert,
  Container,
  Fade,
  Form,
  Table,
} from "react-bootstrap";
import {
  OrderDetailsSchema,
  OrderStatuses,
  updateClientOrder,
  updateGuestOrder,
} from "../transport/orders";
import { useEffect, useState } from "react";
import { format } from "date-fns";

interface IOrderDetailsPage {
  type: "guest" | "client";
  data: OrderDetailsSchema;
}
export function OrderDetailsPage({ type, data }: IOrderDetailsPage) {
  const [status, setStatus] = useState<OrderStatuses>(data.orderStatus);
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    if (alert) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  }, [alert]);
  const updateOrderStatus = async (order: {
    id: number;
    orderStatus: OrderStatuses;
  }) => {
    try {
      if (type === "guest") {
        const response = await updateGuestOrder(order);
      } else {
        const response = await updateClientOrder(order);
      }
      setAlert(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Fade in={alert}>
        <div id="alertMessage">
          <Alert variant="success">
            Status för beställningen {data.id} har uppdaterats till "{status}"{" "}
          </Alert>
        </div>
      </Fade>
      <h1 className="my-3">Order översikt</h1>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>Ordernummer:</td>
            <td>{data.id}</td>
          </tr>
          <tr>
            <td>Orderdatum:</td>
            <td>
              {data.orderDate && format(data.orderDate * 1000, "yyyy-MM-dd")}
            </td>
          </tr>
          <tr className="fs-3">
            <td>Total summa ink frakt:</td>
            <td>{data.totalPrice}:-</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>
              <Form.Group controlId="validationUser">
                <Form.Select
                  required
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value as OrderStatuses);
                    updateOrderStatus({
                      id: data.id,
                      orderStatus: e.target.value as OrderStatuses,
                    });
                  }}
                >
                  <option>new</option>
                  <option>processing</option>
                  <option>shipped</option>
                  <option>completed</option>
                  <option>canceled</option>
                  <option>returned</option>
                </Form.Select>
              </Form.Group>
            </td>
          </tr>
        </tbody>
      </Table>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Beställnings artiklar</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>BookId</th>
                  <th>Titel</th>
                  <th>Antal</th>
                  <th>Pris/st (kr)</th>
                </tr>
              </thead>
              <tbody>
                {data.books.map((b) => (
                  <tr key={b.bookId}>
                    <td>{b.bookId}</td>
                    <td>{b.title}</td>
                    <td>{b.amount}</td>
                    <td>{b.bookPrice}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Leverans detaljer</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>Mottagare</td>
                  <td>{data.shipmentDetails.firstName}</td>
                </tr>
                <tr>
                  <td>Adress</td>
                  <td>{data.shipmentDetails.address}</td>
                </tr>
                <tr>
                  <td>Ort</td>
                  <td>{data.shipmentDetails.city}</td>
                </tr>
                <tr>
                  <td>Postnummer</td>
                  <td>{data.shipmentDetails.zipCode}</td>
                </tr>
                <tr>
                  <td>Mobilnummer</td>
                  <td>{data.shipmentDetails.mobile}</td>
                </tr>
                <tr>
                  <td>Epost</td>
                  <td>{data.shipmentDetails.email}</td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        {data.userinfo && data.userId && (
          <Accordion.Item eventKey="2">
            <Accordion.Header>Kundinformation</Accordion.Header>
            <Accordion.Body>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>Namn</td>
                    <td>
                      {data.userinfo.firstName ? data.userinfo.firstName : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td>Efternamn</td>
                    <td>
                      {data.userinfo.lastName ? data.userinfo.lastName : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td>Adress</td>
                    <td>
                      {data.userinfo.address ? data.userinfo.address : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td>Ort</td>
                    <td>{data.userinfo.city ? data.userinfo.city : "-"}</td>
                  </tr>
                  <tr>
                    <td>Postnummer</td>
                    <td>
                      {data.userinfo.zipCode ? data.userinfo.zipCode : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td>Mobilnummer</td>
                    <td>{data.userinfo.mobile ? data.userinfo.mobile : "-"}</td>
                  </tr>
                  <tr>
                    <td>Epost</td>
                    <td>{data.shipmentDetails.email}</td>
                  </tr>
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        )}
      </Accordion>
    </Container>
  );
}
