import { useContext, useEffect, useState } from "react";
import { Accordion, Col, Container, Row, Image, Table } from "react-bootstrap";
import { IUserContext, UserContext } from "../context/userContext";
import { OrderDetails, getOneUserOrders } from "../transport/orders";
import { format } from "date-fns";

export function AccountOrdersPage() {
  const { user } = useContext<IUserContext>(UserContext);
  const [orders, setOrders] = useState<OrderDetails[]>([]);

  useEffect(() => {
    if (user) {
      const getAllUserOrders = async () => {
        const response = await getOneUserOrders(user?.id);
        setOrders(response);
      };
      getAllUserOrders();
    }
  }, []);
  const getLocalStatusTitle = (title: string) => {
    let status = "";
    switch (title) {
      case "new":
        status = "behandlas";
        return status;
      case "processing":
        status = "behandlas";
        return status;
      case "shipped":
        status = "skickat";
        return status;
      case "completed":
        status = "klart";
        return status;
      case "canceled":
        status = "borttagen";
        return status;
      case "returned":
        status = "returnerad";
        return status;
    }
  };
  return (
    <Accordion>
      {orders.map((o, i) => (
        <Accordion.Item
          className="rounded-0 border-top-0 border-end-0 border-start-0 border-secondary"
          key={o.id}
          eventKey={i.toString()}
        >
          <Accordion.Header>
            <Row className="w-100">
              <Col xs={5}>
                <Row className="gap-3">
                  <Col xs={12} className="fs-4">
                    Order: {o.id}
                  </Col>
                  <Col style={{ fontSize: "1rem" }}>
                    {o.orderDate ? format(o.orderDate * 1000, "yy-MM-dd") : ""}
                  </Col>
                </Row>
              </Col>
              <Col xs={5}>
                <Row className="text-end gap-3">
                  <Col xs={12}>
                    <span className="bg-dark text-light rounded-5 px-3 py-1">
                      {getLocalStatusTitle(o.orderStatus)}
                    </span>
                  </Col>
                  <Col>{o.totalPrice} SEK</Col>
                </Row>
              </Col>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col xs={12} md={6} className="">
                {o.books.map((b) => (
                  <Row key={b.bookId} className="w-100 mb-3 py-3 bg-light ">
                    <Col xs={4}>
                      <Image src={b.imgUrl || ""} className="w-75"></Image>
                    </Col>
                    <Col
                      xs={8}
                      className="p-0 d-flex flex-wrap align-items-between"
                    >
                      <h6 className="w-100">{b.title}</h6>
                      <Row className="w-100 p-0">
                        <Col className="d-flex align-items-end">
                          <span>{b.bookPrice} SEK</span>
                        </Col>
                        <Col className="d-flex align-items-end justify-content-end">
                          <span>{b.amount}st</span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
              </Col>
              <Col>
                <Row className="py-3">
                  <h6 className="px-0">
                    {o.books.length}{" "}
                    {o.books.length === 1 ? "produkt" : "produkter"}
                  </h6>
                </Row>
                <Row>
                  <h6 className="px-0">TOTALSUMMA: {o.totalPrice} SEK</h6>
                </Row>
                <hr />
                <Row>
                  <h6 className="px-0 mb-3">Leveransadress</h6>
                  <p className="p-0 m-0 fs-4">
                    {o.shipmentDetails.firstName} {o.shipmentDetails.lastName}
                  </p>
                  <p className="p-0 m-0">{o.shipmentDetails.address}</p>
                  <p className="p-0 m-0">{o.shipmentDetails.city}</p>
                  <p className="p-0 m-0">{o.shipmentDetails.zipCode}</p>
                  <p className="p-0 m-0">Sverige</p>
                </Row>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
