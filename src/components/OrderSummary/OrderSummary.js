import React from "react";
import { Descriptions } from "antd";

const OrderSummary = ({ ordersList, formValues }) => {
  const totalAmount = ordersList.reduce(
    (acc, order) => acc + parseFloat(order.charge_customer.total_price),
    0
  );

  const { date } = formValues;
  const numberOfDays = date[1].diff(date[0], "days");

  return (
    <>
      <Descriptions bordered title="Orders:">
        <Descriptions.Item label="Start Date">
          {formValues.date[0].format("YYYY-M-D")}
        </Descriptions.Item>
        <Descriptions.Item label="End Date">
          {formValues.date[1].format("YYYY-M-D")}
        </Descriptions.Item>
        <Descriptions.Item label="Number of Days">
          {numberOfDays}
        </Descriptions.Item>
        <Descriptions.Item label="Number of Orders">
          {ordersList.length}
        </Descriptions.Item>
        <Descriptions.Item label="Total Amount">
          {totalAmount}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default OrderSummary;
