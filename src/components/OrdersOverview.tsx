import { Dropdown, Table } from "react-bootstrap";
import { OrderOverview } from "../transport/orders";
import { format } from "date-fns";
import { Gear } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

interface IOrdersOverview {
  data: OrderOverview[];
  type: "guest" | "client";
}
export function OrdersOverview({ data, type }: IOrdersOverview) {
  const navigate = useNavigate();
  return (
    <Table bordered hover size="sm" responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Skapad</th>
          <th>Ordernummer</th>
          <th>Order status</th>
          <th>Alternativ</th>
        </tr>
      </thead>
      <tbody>
        {data.map((o, i) => {
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{o.orderDate && format(o.orderDate * 1000, "yyyy-MM-dd")}</td>
              <td>{o.id}</td>
              <td>{o.orderStatus}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    <Gear />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        navigate(`/app/admin/orders/${o.id}?type=${type}`);
                        // setUserId(u.id);
                        // setOpenModal(true);
                        // setAlertMessage(null);
                      }}
                    >
                      Visa
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
