import React, { useEffect, useState, useContext } from 'react';
import { fetchDataFromApi, deleteData } from '../../utils/api';
import { MyContext } from '../../App';
import Button from '@mui/material/Button';
import { MdDelete } from "react-icons/md";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';

const StyledBreadcrumb = styled(Chip)(({ theme }) => ({
    backgroundColor: 'rgba(0,0,0,0.05)',
    height: theme.spacing(3),
    color: 'rgba(0,0,0,0.7)',
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover, &:focus': {
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    "body.dark &": {
        backgroundColor: '#1a2745',
        color: '#ffffffb3',
    },
}));

const Reviews = () => {
    const [reviewList, setReviewList] = useState([]);
    const context = useContext(MyContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        context.setProgress(20);
        fetchDataFromApi('/api/productReviews').then((res) => {
            setReviewList(res);
            context.setProgress(100);
        });
    }, []);

    const deleteReview = (id) => {
        context.setProgress(40);
        deleteData(`/api/productReviews/${id}`).then((res) => {
            context.setProgress(100);
            context.setAlertBox({
                open: true,
                error: false,
                msg: "Review Deleted!",
            });
            fetchDataFromApi('/api/productReviews').then((res) => {
                setReviewList(res);
            });
        });
    }

    return (
        <div className="right-content w-100">
            <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
                <h5 className="mb-0">Product Reviews List</h5>
                <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs_">
                    <StyledBreadcrumb
                        component={Link}
                        to="/"
                        label="Dashboard"
                        icon={<HomeIcon fontSize="small" />}
                    />
                    <StyledBreadcrumb label="Reviews" />
                </Breadcrumbs>
            </div>

            <div className="card shadow border-0 p-3 mt-4">
                <div className="table-responsive mt-3">
                    <table className="table table-bordered table-striped v-align">
                        <thead className="thead-dark" style={{ backgroundColor: '#1da256' }}>
                            <tr>
                                <th style={{ minWidth: '150px' }}>Name</th>
                                <th style={{ minWidth: '200px' }}>Product ID</th>
                                <th style={{ minWidth: '400px' }}>Review</th>
                                <th style={{ minWidth: '120px' }}>Rating</th>
                                <th style={{ minWidth: '150px' }}>Date</th>
                                <th style={{ minWidth: '100px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviewList.length > 0 && reviewList.map((review, index) => (
                                <tr key={index}>
                                    <td>{review.customerName}</td>
                                    <td><span className="text-blue font-weight-bold">{review.productId}</span></td>
                                    <td><div style={{ maxWidth: '400px', whiteSpace: 'normal' }}>{review.review}</div></td>
                                    <td><Rating name="read-only" value={review.customerRating} readOnly size="small" /></td>
                                    <td>{review.dateCreated?.split('T')[0]}</td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                            <Button className="error" color="error" onClick={() => deleteReview(review._id)}>
                                                <MdDelete />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
