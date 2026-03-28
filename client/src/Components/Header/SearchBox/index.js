import Button from '@mui/material/Button';
import { FiSearch } from "react-icons/fi";

const SearchBox = () => {
    return(
        <div className='headerSearch ml-3 mr-3'>
            <input type='text' placeholder='Search for products...'/>
            <Button><FiSearch/></Button>
        </div>
    )
}

export default SearchBox;