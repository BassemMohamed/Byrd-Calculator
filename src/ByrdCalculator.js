import React, { Component } from "react";
import styled from "styled-components";
import apiService from "./service/ByrdApiService";
import { Header, CustomerForm, OrderSummary, OrderCard } from "./components/";

const MainContent = styled.article`
  width: 80%;
  max-width: 1000px;
  margin: 1rem auto;

  > form {
    padding: 2rem;
    border-radius: 10px;
    border: 1px solid #eee;
  }

  > div {
    width: 100%;
    padding: 2rem;
    margin-top: 2rem;
    min-height: 500px;
    border-radius: 10px;
    background-color: #eee;
  }
`;

class ByrdCalculator extends Component {
  state = {
    formValues: {},
    customerList: [],
    ordersList: []
  };

  handleFormSubmit = formValues => {
    const { customerId, startDate, endDate } = formValues;

    apiService.getOrders(customerId, startDate, endDate, ({ data }) => {
      this.setState({
        formValues,
        ordersList: data
      });
    });
  };

  componentDidMount() {
    apiService.getAllCustomer(({ data }) => {
      this.setState({ customerList: data });
    });
  }

  render() {
    const { customerList, ordersList, formValues } = this.state;
    if (customerList)
      return (
        <>
          <Header />
          <MainContent>
            <CustomerForm
              customerList={customerList}
              handleFormSubmit={this.handleFormSubmit}
            />

            <div>
              {ordersList.length === 0 && <p>Search for customer orders...</p>}
              {ordersList.length > 0 && (
                <>
                  <OrderSummary
                    formValues={formValues}
                    ordersList={ordersList}
                  />
                  {ordersList.map(order => (
                    <OrderCard order={order} key={order.id} />
                  ))}
                </>
              )}
            </div>
          </MainContent>
        </>
      );
  }
}

export default ByrdCalculator;
