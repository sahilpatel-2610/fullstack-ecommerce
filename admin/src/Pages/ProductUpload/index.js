// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import HomeIcon from "@mui/icons-material/Home";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { emphasize, styled } from "@mui/material/styles";
// import Chip from "@mui/material/Chip";

// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import React, { useState } from "react";
// import Rating from "@mui/material/Rating";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import Button from "@mui/material/Button";




// breadcrumb code
// const StyledBreadcrumb = styled(Breadcrumbs)(({ theme }) => ({
//     const backgroundColor =
//         theme.palette.mode === "light"
//             ? theme.palette.grey[100]
//             : theme.palette.grey[800];
//     return {
//         backgroundColor,
//         height: theme.spacing(3),   
//     }            
// }))

// const ProductUpload = () => {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Product Uploaded:", { name, price });
//     setName("");
//     setPrice("");
//   };

 

// export default ProductUpload;

import Breadcrumbs from "../../components/Breadcrumbs";

const ProductUpload = () => {
  return (
    <div className="page">
      <div className="page-header d-flex justify-content-between align-items-center">
        <h4>Product Upload</h4>
        <Breadcrumbs
          items={[
            { label: "Dashboard", path: "/dashboard" },
            { label: "Products", path: "/products" },
            { label: "Product Upload" },
          ]}
        />
      </div>

      <div className="card p-4 mt-3">
        <h5>Basic Information</h5>
        <form className="form">
          <div className="mb-3">
            <label>Title</label>
            <input type="text" className="form-control" placeholder="Enter product title" />
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea className="form-control" rows="3" placeholder="Enter product description"></textarea>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Category</label>
              <select className="form-select">
                <option>None</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label>Brand</label>
              <select className="form-select">
                <option>None</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductUpload;