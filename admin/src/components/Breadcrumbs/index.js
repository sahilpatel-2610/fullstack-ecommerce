import { Link } from "react-router-dom";
import "./breadcrumbs.css";

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="custom-breadcrumb">
      {items.map((item, index) => (
        <span key={index}>
          {item.path ? (
            <Link to={item.path}>{item.label}</Link>
          ) : (
            <span className="active">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="separator"> / </span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;