import React from 'react';
import Header from '../Header/Header';
import { addNewPost } from '../API/Api';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import "./newPost.css";

export default function Newpost() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            userId: "",
            title: "",
            body: ""
        },
        validationSchema: Yup.object({
            userId: Yup.number().required("Required").positive(),
            title: Yup.string().max(30, "The title should contain only 30 characters").required("Required"),
            body:Yup.string().required("Required")
            
        })
        ,
        onSubmit: () => {
            postData();
        }
    })

    console.log(formik.errors);
    
    //Post Data
    const postData = async () => {
        // console.log("formik",formik.values);
        const postDetails = {
            ...formik.values,
            createdAt: new Date(),
            likes: 0,
            liked: false,
            comments:[]
        }
        let status = await addNewPost(postDetails);
        if (status === 201) { 
            formik.resetForm();
            navigate("/");
        }
        else {
            alert("Adding new post failed");
        }
    }

    return (
        <div>
            <Header />
            <form onSubmit={formik.handleSubmit}>

                <div className="userBox mx-5 mt-5">

                    <div className="mb-3 row">
                        <label  className="col-sm-2  col-form-label">User Id</label>

                        <div className="col-sm-10 ">
                            <input
                                type="number"
                                id="userId"
                                className="form-control"
                                value={formik.values.userId}
                                name="userId"
                                onChange={formik.handleChange}
                                placeholder="Give any random Number"
                                onBlur={formik.handleBlur}
                            />
                            {(formik.touched.userId && formik.errors.userId) && <p className='text-danger mt-2'>{formik.errors.userId}</p>}
                        </div>

                    </div>

                    <div className="mb-3 row">
                        <label  className="col-sm-2  col-form-label">Title</label>

                        <div className="col-sm-10 ">
                            <input
                                type="text"
                                id="title"
                                className="form-control"
                                value={formik.values.title}
                                name="title"
                                onChange={formik.handleChange}
                                placeholder="Give any title"
                                onBlur={formik.handleBlur}
                            />
                            {(formik.touched.title && formik.errors.title) && <p className='text-danger mt-2'>{formik.errors.title}</p>}
                        </div>

                    </div>

                    <div className="mb-3 row">
                        <label  className="col-sm-2  col-form-label">Body</label>

                        <div className="col-sm-10 ">
                            <textarea
                                name="body"
                                id="body"
                                className="form-control"
                                value={formik.values.body}
                                onChange={formik.handleChange}
                                placeholder="Give your blog body"
                                onBlur={formik.handleBlur}
                            />
                            {(formik.touched.body&&formik.errors.body) && <p className='text-danger mt-2'>{formik.errors.body}</p>}
                        </div>
                        
                    </div>

                    <div className="text-center">
                        <input type="submit" className="btn btn-success"/> 
                    </div>

                </div>

            </form>
        </div>
    )
}
