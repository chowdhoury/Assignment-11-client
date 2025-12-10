import React from "react";

const MyOrders = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>1</th>
            <td>2023-10-01</td>
            <td>The Great Gatsby</td>
            <td>$15.99</td>
            <td>Shipped</td>
            <td>Paid</td>
            <td>
              <button className="btn btn-sm btn-primary">Pay</button>
              <button className="btn btn-sm btn-primary">Cancel</button>
            </td>
          </tr>
          <tr>
            <th>1</th>
            <td>2023-10-01</td>
            <td>The Great Gatsby</td>
            <td>$15.99</td>
            <td>Shipped</td>
            <td>Paid</td>
            <td>
              <button className="btn btn-sm btn-primary">Pay</button>
              <button className="btn btn-sm btn-primary">Cancel</button>
            </td>
          </tr>
          <tr>
            <th>1</th>
            <td>2023-10-01</td>
            <td>The Great Gatsby</td>
            <td>$15.99</td>
            <td>Shipped</td>
            <td>Paid</td>
            <td>
              <button className="btn btn-sm btn-primary">Pay</button>
              <button className="btn btn-sm btn-primary">Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
