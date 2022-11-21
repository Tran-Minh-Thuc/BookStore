import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import OrderService from "../../../service/OrderService";

const Order = () => {
  const orderService = new OrderService();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderService.getAll().then((res) => {
      setOrders(res);
    }).catch((err) => {
      console.log(err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const OrderItem = (props) => {

    return (props.data.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>
          <img src={item.list_product[0].book.image} alt="img" />
        </td>
        <td>{item.list_product[0].book.name}</td>
        <td>{item.list_product[0].book.price}</td>
        <td>{item.address.name}</td>
        <td>{item.address.phoneNumber}</td>
        <td>
          <span className="pr-2 hover:text-green-600 cursor-pointer">
            <i className="pi pi-info-circle" />
          </span>

          <span
            className="hover:text-red-600 cursor-pointer"

          >
            <i className="pi pi-trash" />
          </span>
        </td>
      </tr>
    )))

  }

  return (
    <div>
      <div className="table-body mt-2">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Hình ảnh</th>
              <th>Tên sách</th>
              <th>Giá</th>
              <th>Tên người mua</th>
              <th>Số điện thoại</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="h-10">
            <OrderItem data={orders} />
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Order;
