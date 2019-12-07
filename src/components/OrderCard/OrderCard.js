import React from "react";
import { Descriptions, Card, List } from "antd";
import styled from "styled-components";
var moment = require("moment");

const OrderCardStyled = styled.div`
  margin: 2rem 0;
  > div {
    width: 100%;
  }

  .ant-descriptions-view {
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  ul {
    padding: 1rem;
    border: 1px solid #eee;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const OrderSummary = ({ order, totalPrice }) => (
  <Descriptions bordered column={2}>
    <Descriptions.Item label="Name">{order.recipient.name}</Descriptions.Item>
    <Descriptions.Item label="Email">{order.recipient.email}</Descriptions.Item>
    <Descriptions.Item label="Total Price">{totalPrice}</Descriptions.Item>
    <Descriptions.Item label="Created at">
      {moment(order.created_at).format("YYYY-M-D")}
    </Descriptions.Item>
    <Descriptions.Item label="Delivery Courier">
      {order.delivery.courier}
    </Descriptions.Item>
    <Descriptions.Item label="Delivery Method">
      {order.delivery.method}
    </Descriptions.Item>
    <Descriptions.Item label="Recipient Name">
      {order.recipient.name}
    </Descriptions.Item>
    <Descriptions.Item label="Recipient Email">
      {order.recipient.email}
    </Descriptions.Item>
  </Descriptions>
);

class OrderCard extends React.Component {
  render() {
    const { order } = this.props;
    const totalPrice = order.items.reduce(
      (acc, item) => acc + parseFloat(item.total_price.amount),
      0
    );

    return (
      <OrderCardStyled>
        <Card bordered={false} title={order.id}>
          <OrderSummary order={order} totalPrice={totalPrice} />
          {order.items && (
            <List
              itemLayout="horizontal"
              dataSource={order.items}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={`${item.name} (${item.quantity})`}
                    description={`${item.total_price.amount} ${item.total_price.currency}`}
                  />
                </List.Item>
              )}
            />
          )}
        </Card>
      </OrderCardStyled>
    );
  }
}

export default OrderCard;
