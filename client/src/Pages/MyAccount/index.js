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

import NoUserImg from '../../assets/images/no-user.png'


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

    const isVideo = (url) => {
        if (!url) return false;
        if (typeof url === 'string' && url.startsWith('blob:')) {
            // For local blob previews, we should ideally store the type
            // but as a fallback we can't easily detect from URL alone.
            // We'll improve the preview state to include type.
            return url.includes('video');
        }
        return url.match(/\.(mp4|webm|mkv|mov|avi)$/i) || url.includes('/video/');
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [previews, setPreviews] = useState([]);

    const context = useContext(MyContext);

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });




    const [formFields, setFormFields] = useState({
        name: "",
        email: "",
        phone: "",
        images: []
    });

    const [fields, setFields] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
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

        const userStr = localStorage.getItem("user");
        if (userStr && userStr !== "undefined") {
            const user = JSON.parse(userStr);

        fetchDataFromApi(`/api/user/${user?._id || user?.id}`).then((res) => {
            if (res && !res.error) {
                setFormFields({
                    name: res.name || "",
                    email: res.email || "",
                    phone: res.phone || ""
                });
                setPreviews(res.images || []);
            } else {
                console.error("Failed to fetch user details:", res?.msg);
            }
        });
        }
    }, [history]);


    const changeInput = (e) => {
        setFields(() => (
            {
                ...fields,
                [e.target.name]: e.target.value
            }
        ))
    }

    const changeInput2 = (e) => {
        setFormFields(() => (
            {
                ...formFields,
                [e.target.name]: e.target.value
            }
        ))
    }




    const onChangeFile = async (e, apiEndPoint) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const formdata = new FormData();
        const localPreviews = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            formdata.append(`images`, file);

            // Create local object URL for instant preview
            const localUrl = URL.createObjectURL(file);
            // Append a hint to the blob URL to help isVideo detect it
            const hintUrl = file.type.startsWith('video') ? `${localUrl}#video` : localUrl;
            localPreviews.push(hintUrl);
        }

        // Show local preview immediately
        setPreviews(localPreviews);
        context.setAlertBox({
            open: true,
            error: false,
            msg: "Uploading... Please wait."
        });

        uploadImage(apiEndPoint, formdata).then(res => {
            if (Array.isArray(res) && res.length !== 0) {
                // Delete old images to free up space (remote only)
                // Note: We should only delete if we have real remote URLs
                // Previews might contain blob URLs now, so be careful.

                setPreviews(res); // Replace local blobs with remote URLs

                setTimeout(() => {
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Upload Complete!"
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
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Upload failed. Check your connection."
            });
        });

    }



    const editUser = (e) => {
        e.preventDefault();

        const appendedArray = [...(previews || [])];

        const updatedFields = {
            ...formFields,
            images: appendedArray.filter(img => !img.startsWith('blob:')) // Only save remote URLs
        }



        if (formFields.name !== "" && formFields.email !== "" && formFields.phone !== "") {
            const userStr = localStorage.getItem("user");
            if (userStr && userStr !== "undefined") {
                const user = JSON.parse(userStr);

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
        } else {
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'Please fill all the details'
            });
            return false;
        }


    }

    const changePassword = (e) => {
        e.preventDefault();

        if (fields.oldPassword !== "" && fields.newPassword !== "" && fields.confirmPassword !== "") {

            if (fields.newPassword !== fields.confirmPassword) {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: 'New password and confirm password do not match'
                });
                return false;
            }

            const userStr = localStorage.getItem("user");
            let user = null;
            if (userStr && userStr !== "undefined") {
                user = JSON.parse(userStr);
            }
            const userId = user?._id || user?.id;

            if (!userId) {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: 'User session not found. Please log in again.'
                });
                return;
            }

            editData(`/api/user/changePassword/${userId}`, {
                oldPassword: fields.oldPassword,
                newPassword: fields.newPassword
            }).then(res => {
                if (res.error) {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: res.msg || 'Failed to change password'
                    });
                } else {
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: 'Password changed successfully!'
                    });
                    setFields({ oldPassword: '', newPassword: '', confirmPassword: '' });
                }
            });

        } else {
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'Please fill all the fields'
            });
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
                                                isVideo(previews[0]) ?
                                                    <video autoPlay loop muted key={previews[0].split('#')[0]} src={previews[0].split('#')[0]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '100%' }} /> :
                                                    <img src={previews[0].split('#')[0]} referrerPolicy="no-referrer" alt="profile" />
                                                :
                                                <img src={NoUserImg} alt="profile placeholder" />
                                        }
                                        <div className="overlay d-flex align-items-center justify-content-center">
                                            <IoMdCloudUpload />
                                            <input type="file" accept="image/*,video/*" multiple onChange={(e) => onChangeFile(e, '/api/user/upload')} name="images" />
                                        </div>
                                    </div>
                                </div>


                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextField label="Name" variant="outlined" className="w-100" name="name" onChange={changeInput2} value={formFields?.name} />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextField label="Email" disabled variant="outlined" className="w-100" name="email" onChange={changeInput2} value={formFields?.email} />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextField label="Phone" variant="outlined" className="w-100" name="phone" onChange={changeInput2} value={formFields?.phone} />
                                            </div>
                                        </div>


                                    </div>

                                    <div className="form-group">
                                        <Button type="submit" disabled={previews?.some(img => img.startsWith('blob:'))} className="btn-blue bg-red btn-lg btn-big">
                                            {previews?.some(img => img.startsWith('blob:')) ? "Uploading..." : "Save"}
                                        </Button>
                                    </div>

                                </div>


                            </div>
                        </form>



                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <form onSubmit={changePassword}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <TextField label="Old Password" type="password" variant="outlined" className="w-100" name="oldPassword" onChange={changeInput} value={fields?.oldPassword} />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <TextField label="New Password" type="password" variant="outlined" className="w-100" name="newPassword" onChange={changeInput} value={fields?.newPassword} />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <TextField label="Confirm Password" type="password" variant="outlined" className="w-100" name="confirmPassword" onChange={changeInput} value={fields?.confirmPassword} />
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
                </Box>

            </div>
        </section >
    )
}

export default MyAccount;