import React from "react";
import { Form, Select, DatePicker, Button } from "antd";

const { Option } = Select;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CustomerForm extends React.Component {
  state = {
    date: [],
    customerId: ""
  };

  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    const { handleFormSubmit } = this.props;
    const { customerId, date } = this.state;

    handleFormSubmit({
      date,
      customerId
    });
  };

  handleCustomerChange = value => {
    this.setState({
      customerId: value
    });
  };

  handleDateChange = value => {
    this.setState({
      date: value
    });
  };

  render() {
    const { customerList, form } = this.props;
    const {
      getFieldError,
      getFieldsError,
      isFieldTouched,
      getFieldDecorator
    } = form;

    const customerSelectError =
      isFieldTouched("usercustomerSelectname") &&
      getFieldError("customerSelect");
    const rangeDateError =
      isFieldTouched("rangeDate") && getFieldError("rangeDate");

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item
          required
          label="Customer"
          validateStatus={customerSelectError ? "error" : ""}
          help={customerSelectError || ""}
        >
          {getFieldDecorator("customerSelect", {
            rules: [{ required: true, message: "Please select a customer!" }]
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a customer"
              onChange={this.handleCustomerChange}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {customerList.map(customer => (
                <Option key={customer.id} value={customer.id}>
                  {customer.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          required
          label="Date"
          help={rangeDateError || ""}
          validateStatus={rangeDateError ? "error" : ""}
        >
          {getFieldDecorator("rangeDate", {
            rules: [{ required: true, message: "Please choose date!" }]
          })(<DatePicker.RangePicker onChange={this.handleDateChange} />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: "customer_form" })(CustomerForm);
