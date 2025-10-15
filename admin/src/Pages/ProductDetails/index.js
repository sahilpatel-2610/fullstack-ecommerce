import React from "react";

const ProductDetails = () => {
  return (
    <div className="content">
      <div className="card">
        <h2>Product Details</h2>
        <p><strong>Name:</strong> iPhone 15</p>
        <p><strong>Category:</strong> Mobiles</p>
        <p><strong>Price:</strong> $999</p>
        <p><strong>Description:</strong> Latest Apple iPhone with A17 Bionic chip.</p>
        <button>Edit Product</button>
      </div>
    </div>
  );
};

export default ProductDetails;