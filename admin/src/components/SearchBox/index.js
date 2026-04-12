import { IoSearch } from "react-icons/io5";

const SearchBox = () => {
    return (
        <div className="searchBox position-relative d-flex align-items-center">
            <IoSearch className="me-2" />
            <input type="text" placeholder="Search here..." className="w-100" />
        </div>
    )
}

export default SearchBox;