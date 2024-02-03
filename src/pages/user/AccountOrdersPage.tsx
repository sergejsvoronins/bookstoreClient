import { useContext, useEffect, useState } from "react";
import { IUserContext, UserContext } from "../../context/userContext";
import { OrderDetails, getOneUserOrders } from "../../transport/orders";
import { UserOrderOverview } from "../../components/UserOrderOverview";

export function AccountOrdersPage() {
  const { user } = useContext<IUserContext>(UserContext);
  const [orders, setOrders] = useState<OrderDetails[]>([]);

  useEffect(() => {
    if (user) {
      const getAllUserOrders = async () => {
        try {
          const response = await getOneUserOrders(user?.id);
          setOrders(response);
        } catch (e) {
          setOrders([]);
        }
      };
      getAllUserOrders();
    }
  }, []);

  return (
    <>
      {orders.length !== 0 ? (
        <>
          {orders.map((o) => (
            <UserOrderOverview key={o.id} order={o} />
          ))}
        </>
      ) : (
        <p>Du har inga beställningar</p>
      )}
    </>
  );
}
