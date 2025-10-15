// import { FaMinus } from "react-icons/fa6";
// import { FaPlus } from "react-icons/fa6";
// import Button from '@mui/material/Button';
// import { useState } from 'react';

// const QuantityBox = () => {

//     const [inputVal, setInputVal] = useState(1);

//     const Minus = () => {
//        if (inputVal!==1 && inputVal>0) {
//           setInputVal(inputVal-1);
//        }
//     }

//     const Plus = () => {
//         setInputVal(inputVal+1);
//     }

//     return (
//         <div className='quantityDrop d-flex align-items-center'>
//             <Button onClick={Minus}><FaMinus /></Button>
//                 <input type="text" />
//             <Button onClick={Plus}><FaPlus /></Button>
//         </div>
//     )
// }

// export default QuantityBox;



//--------------------------------------EXTRAchat--------------------------------------------------------//

// QuantityBox.jsx
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function QuantityBox() {
  const [qty, setQty] = useState(1);

  const handleMinus = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const handlePlus = () => {
    setQty(qty + 1);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      {/* Minus Button */}
      <div
        onClick={handleMinus}
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#000",
        }}
      >
        <FaMinus size={14} color="#000" />
      </div>

      {/* Quantity Number (Normal Text Only) */}
      <span
        style={{
          fontSize: 16,
          fontWeight: "500",
          minWidth: 20,
          textAlign: "center",
          color: "#000",
        }}
      >
        {qty}
      </span>

      {/* Plus Button */}
      <div
        onClick={handlePlus}
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#000",
        }}
      >
        <FaPlus size={14} color="#000" />
      </div>
    </div>
  );
}