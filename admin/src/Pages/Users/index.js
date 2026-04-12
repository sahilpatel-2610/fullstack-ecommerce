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

const Users = () => {
    const [userList, setUserList] = useState([]);
    const context = useContext(MyContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        context.setProgress(20);
        fetchDataFromApi('/api/user').then((res) => {
            setUserList(res);
            context.setProgress(100);
        });
    }, []);

    const deleteUser = (id) => {
        context.setProgress(40);
        deleteData(`/api/user/${id}`).then((res) => {
            context.setProgress(100);
            context.setAlertBox({
                open: true,
                error: false,
                msg: "User Deleted!",
            });
            fetchDataFromApi('/api/user').then((res) => {
                setUserList(res);
            });
        });
    }

    return (
        <div className="right-content w-100">
            <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
                <h5 className="mb-0">Users List</h5>
                <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs_">
                    <StyledBreadcrumb
                        component={Link}
                        to="/"
                        label="Dashboard"
                        icon={<HomeIcon fontSize="small" />}
                    />
                    <StyledBreadcrumb label="Users" />
                </Breadcrumbs>
            </div>

            <div className="card shadow border-0 p-3 mt-4">
                <div className="table-responsive mt-3">
                    <table className="table table-bordered table-striped v-align">
                        <thead className="thead-dark" style={{ backgroundColor: '#1da256' }}>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.length > 0 && userList.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td className="text-capitalize">{user.isAdmin ? "Admin" : "Customer"}</td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                            <Button className="error" color="error" onClick={() => deleteUser(user._id)}>
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

export default Users;
