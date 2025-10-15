// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import HomeIcon from "@mui/icons-material/Home";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { emphasize, styled } from "@mui/material/styles";
// import Chip from "@mui/material/Chip";
// import React, { useState } from "react";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import Button from "@mui/material/Button";
// import { postData } from "../../utils/api";
// import { fetchDataFromApi } from "../../utils/api";



// //breadcrumb code
// const StyledBreadcrumb = styled(Chip)(({ theme }) => {
//     const backgroundColor =
//         theme.palette.mode === "light"
//             ? theme.palette.grey[100]
//             : theme.palette.grey[800];
//     return {
//         backgroundColor,
//         height: theme.spacing(3),
//         color: theme.palette.text.primary,
//         fontWeight: theme.typography.fontWeightRegular,
//         '&:hover, &:focus': {
//             backgroundColor: emphasize(backgroundColor, 0.06),
//         },
//         '&:active': {
//             boxShadow: theme.shadows[1],
//             backgroundColor: emphasize(backgroundColor, 0.12),
//         },
//     };
// });

// const ProductUpload = () => {

//  const [formFields, setFormFields] = useState({
//     name: '',
//     images: [],
//     color: ''
//  });

//   const changeInput = (e) => {
//     setFormFields(() => (
//       {
//         ...formFields,
//         [e.target.name]: e.target.value
//       }
//     ))

//   }

//   const addCategory = (e) => {
//     e.preventDefault();
    
//     postData('/api/categories/', formFields).then((res) => {
//       console.log(res);
//     })
//   }

//   return (
//     <>
//       <div className="right-content w-100">
//         <div className="card shadow border-0 w-100 flex-row p-4">
//           <h5 className="mb-0">Add Category</h5>
//           <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
//             <StyledBreadcrumb
//               component="a"
//               href="/"
//               label="Dashboard"
//               icon={<HomeIcon fontSize="small" />}
//             />
//             <StyledBreadcrumb
//               component="a"
//               href="#"
//               label="Category"
//               deleteIcon={<ExpandMoreIcon />}
//             />
//             <StyledBreadcrumb
//               label="Add Category"
//               deleteIcon={<ExpandMoreIcon />}
//             />
//           </Breadcrumbs>  
//         </div>


//         <form className="form" onSubmit={addCategory}>
//           <div className="row">
//             <div className="col-sm-9">
//               <div className="card p-4">
               

//                 <div className="form-group">
//                   <h6>Category Name</h6>
//                   <input type="text" name="name" onChange={changeInput} />
//                 </div>

//                 <div className="form-group">
//                   <h6>Image Url</h6>
//                   <input type="text" name="images" onChange={changeInput} />
//                 </div>

//                 <div className="form-group">
//                   <h6>Color</h6>
//                   <input type="text" name="color" onChange={changeInput} />
//                 </div>


                
//                 <br />

//                 <Button type="submit" className="btn-blue btn-lg btn-big"><FaCloudUploadAlt /> &nbsp; PUBLISH AND VIEW</Button>

//               </div>
//             </div>
//           </div>
//         </form>

//       </div>
//     </>
//   )

// }


// export default CategoryAdd;

import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from "@mui/material/Button";
import { postData } from "../../utils/api";

// ✅ Breadcrumb style
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const CategoryAdd = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    image: "",
    color: "",
  });

  // input change
  const changeInput = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  // submit
  const addCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await postData("/api/categories/", formFields);
      console.log("✅ Category Added:", res);
      alert("Category Added Successfully!");
    } catch (err) {
      console.error("❌ Error adding category:", err);
    }
  };

  return (
    <div className="right-content w-100">
      {/* Top Bar with Breadcrumb */}
      <div className="card shadow border-0 w-100 flex-row p-4">
        <h5 className="mb-0">Add Category</h5>
        <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
          <StyledBreadcrumb
            component="a"
            href="/"
            label="Dashboard"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb
            component="a"
            href="#"
            label="Category"
            deleteIcon={<ExpandMoreIcon />}
          />
          <StyledBreadcrumb
            label="Add Category"
            deleteIcon={<ExpandMoreIcon />}
          />
        </Breadcrumbs>
      </div>

      {/* Form */}
      <form className="form" onSubmit={addCategory}>
        <div className="row">
          <div className="col-sm-9">
            <div className="card p-4">
              <div className="form-group">
                <h6>Category Name</h6>
                <input
                  type="text"
                  name="name"
                  value={formFields.name}
                  onChange={changeInput}
                />
              </div>

              <div className="form-group">
                <h6>Image Url</h6>
                <input
                  type="text"
                  name="image"
                  value={formFields.image}
                  onChange={changeInput}
                />
              </div>

              <div className="form-group">
                <h6>Color</h6>
                <input
                  type="text"
                  name="color"
                  value={formFields.color}
                  onChange={changeInput}
                />
              </div>

              <br />

              <Button type="submit" className="btn-blue btn-lg btn-big">
                <FaCloudUploadAlt /> &nbsp; PUBLISH AND VIEW
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CategoryAdd;

