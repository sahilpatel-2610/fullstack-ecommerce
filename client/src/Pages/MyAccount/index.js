import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { deleteImage, editData, fetchDataFromApi, uploadImage } from "../../utils/api";
import { MyContext } from "../../App";
import { useContext } from "react";


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const MyAccount = () => {

    const history = useNavigate();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [previews, setPreviews] = useState([]);

    const context = useContext(MyContext);




    const [formFields, setFormFields] = useState({
        name: "",
        email: "",
        phone: "",
        images: []
    });


    useEffect(() => {
        window.scrollTo(0, 0);

        const token = localStorage.getItem("token");
        if (!token) {
            history("/signIn");
        }


        fetchDataFromApi("/api/imageUpload").then((res) => {
            if (Array.isArray(res)) {
                res.forEach((item) => {
                    item?.images?.forEach((img) => {
                        deleteImage(`/api/user/deleteImage?img=${img}`).then(() => {
                            deleteImage("/api/imageUpload/deleteAllImages");
                        })
                    })
                })
            }
        })

        const user = JSON.parse(localStorage.getItem("user"));

        fetchDataFromApi(`/api/user/${user?._id || user?.id}`).then((res) => {
            setFormFields({
                name: res.name || "",
                email: res.email || "",
                phone: res.phone || ""
            });
            setPreviews(res.images || []);
        });
    }, [history]);


    const changeInput = (e) => {
        setFormFields(() => (
            {
                ...formFields,
                [e.target.name]: e.target.value
            }
        ))
    }



    const onChangeFile = async (e, apiEndPoint) => {
        const formdata = new FormData();
        try {

            const files = e.target.files;
            for (var i = 0; i < files.length; i++) {
                if (files[i]) {
                    const file = files[i];
                    formdata.append(`images`, file);
                }
            }

        } catch (error) {
            console.log(error);
        }

        uploadImage(apiEndPoint, formdata).then(res => {
            if (Array.isArray(res) && res.length !== 0) {
                // Delete old images to free up space
                if (previews && previews.length > 0) {
                    previews.forEach(img => {
                        deleteImage(`/api/user/deleteImage?img=${img}`);
                    });
                }

                const appendedArray = [...res];
                setPreviews(appendedArray);
                setTimeout(() => {
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Images Uploaded!"
                    })
                }, 200);
            } else {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "Failed to upload images."
                });
            }
        }).catch(err => {
            console.error("Upload Error:", err);
        });

    }



    const editUser = (e) => {
        e.preventDefault();

        const appendedArray = [...(previews || [])];

        const updatedFields = {
            ...formFields,
            images: appendedArray
        }



        if (formFields.name !== "" && formFields.email !== "" && formFields.phone !== "") {
            const user = JSON.parse(localStorage.getItem("user"));

            editData(`/api/user/${user?._id || user?.id}`, updatedFields).then(res => {
                context.fetchUser();

                deleteImage("/api/imageUpload/deleteAllImages");

                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: "User Updated Successfully!"
                })
            })
        }

        else {
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'Please fill all the details'
            });
            return false;
        }


    }

    return (
        <section className="section myAccountPage">
            <div className="container">
                <h2 className="hd">My Account</h2>

                <Box sx={{ width: '100%' }} className="myAccBox card border-0">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Edit Profile" {...a11yProps(0)} />
                            <Tab label="Change Password" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <form onSubmit={editUser}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="userImage">
                                        {
                                            previews?.length > 0 ?
                                                <img src={previews[0]} alt="profile" />
                                                :
                                                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="profile placeholder" />
                                        }
                                        <div className="overlay d-flex align-items-center justify-content-center">
                                            <IoMdCloudUpload />
                                            <input type="file" multiple onChange={(e) => onChangeFile(e, '/api/user/upload')} name="images" />
                                        </div>
                                    </div>
                                </div>


                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextField label="Name" variant="outlined" className="w-100" name="name" onChange={changeInput} />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextField label="Email" disabled variant="outlined" className="w-100" name="email" onChange={changeInput} />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextField label="Phone" variant="outlined" className="w-100" name="phone" onChange={changeInput} />
                                            </div>
                                        </div>


                                    </div>

                                    <div className="form-group">
                                        <Button type="submit" className="btn-blue bg-red btn-lg btn-big">Save</Button>
                                    </div>

                                </div>


                            </div>
                        </form>



                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <form>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <TextField label="Name" variant="outlined" className="w-100" name="name" onChange={changeInput} />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <TextField label="Email" disabled variant="outlined" className="w-100" name="email" onChange={changeInput} />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <TextField label="Phone" variant="outlined" className="w-100" name="phone" onChange={changeInput} />
                                            </div>
                                        </div>


                                    </div>

                                    <div className="form-group">
                                        <Button className="btn-blue bg-red btn-lg btn-big">Save</Button>
                                    </div>

                                </div>


                            </div>
                        </form>
                    </CustomTabPanel>
                </Box>

            </div>
        </section >
    )
}

export default MyAccount;