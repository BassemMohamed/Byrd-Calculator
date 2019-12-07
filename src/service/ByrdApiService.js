import axios from "axios";

function getAllCustomer(onSuccess, onError) {
  axios
    .get("https://private-anon-a1f69e6712-byrd1.apiary-mock.com/customers")
    .then(onSuccess)
    .catch(onError);
}

function getOrders(custId, startDate, endDate, onSuccess, onError) {
  axios
    .get(
      `https://private-anon-a1f69e6712-byrd1.apiary-mock.com/orders/${custId}?start_date=${startDate}&end_date=${endDate}`
    )
    .then(onSuccess)
    .catch(onError);
}

export default {
  getAllCustomer,
  getOrders
};
