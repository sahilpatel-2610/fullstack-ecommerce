import Button from '@mui/material/Button';
import { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { fetchDataFromApi } from '../../../utils/api';
import { MyContext } from '../../../App';
import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const SearchBox = () => {

    const context = useContext(MyContext);
    const history = useNavigate();
    const [searchFields, setSearchFields] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onChangeValue = (e) => {
        setSearchFields(e.target.value);
    }

    const searchProducts = () => {
        setIsLoading(true);
        fetchDataFromApi(`/api/search?q=${searchFields}`).then((res) => {
            context.setSearchData(res);
            history('/search');
            setSearchFields("");
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        })
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchProducts();
        }
    }

    return (
        <div className='headerSearch ml-3 mr-3'>
            <input
                type='text'
                value={searchFields}
                placeholder='Search for products...'
                onChange={onChangeValue}
                onKeyDown={onKeyDown}
            />
            <Button onClick={searchProducts}>
                {
                    isLoading === true ? <CircularProgress size={20} color="inherit" /> : <IoIosSearch />
                }
            </Button>
        </div>
    )
}

export default SearchBox;