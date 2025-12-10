import React from 'react';

const Invoices = () => {
    return (
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Issued</th>
              <th>Order</th>
              <th>Title</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>2023-10-01</td>
              <td>12345</td>
              <td>The Great Gatsby</td>
              <td>$15.99</td>
            </tr>
            <tr>
              <th>1</th>
              <td>2023-10-01</td>
              <td>12345</td>
              <td>The Great Gatsby</td>
              <td>$15.99</td>
            </tr>
            <tr>
              <th>1</th>
              <td>2023-10-01</td>
              <td>12345</td>
              <td>The Great Gatsby</td>
              <td>$15.99</td>
            </tr>
            <tr>
              <th>1</th>
              <td>2023-10-01</td>
              <td>12345</td>
              <td>The Great Gatsby</td>
              <td>$15.99</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
};

export default Invoices;