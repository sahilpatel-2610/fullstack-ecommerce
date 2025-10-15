import React from "react";

const Products = () => {
  return (
    <div className="content">
      <div className="card">
        <h2>All Products</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>iPhone 15</td>
              <td>Mobiles</td>
              <td>$999</td>
              <td>Available</td>
            </tr>
            <tr>
              <td>2</td>
              <td>MacBook Pro</td>
              <td>Laptops</td>
              <td>$1999</td>
              <td>Out of Stock</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;