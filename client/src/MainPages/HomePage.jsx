import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormData from "../Components/FormData";


const HomePage = () => {
  const [formdata, setFormData] = useState([]);

  const localdata = JSON.parse(localStorage.getItem("formdata")) || [];
  let formvalues = {
    Name: "",
    Email: "",
    PhoneNumber: "",
  };

  const validationSchema = Yup.object().shape({
    Name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is Required"),
    PhoneNumber: Yup.string()
      .max(50, "Too Long!")
      .required("PhoneNumber is Required"),
    Email: Yup.string().email("Invalid email").required("Email is Required"),
  });

  const handleSubmit = (values) => {
    const obj = {
      Name: values.Name,
      PhoneNumber: values.PhoneNumber,
      Email: values.Email,
    };
    setFormData([...formdata, obj]);
    localStorage.setItem("formdata", JSON.stringify([...localdata, obj]));

    toast.success("Data Saved Sucessfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });
    formvalues = {
      Name: "",
      Email: "",
      PhoneNumber: "",
    };
    window.location.reload();
  };

  return (
    <>
      <div class="bg-sky-500/100 w-100 m-auto p-2">
        <h1 className="text-2xl text-center text-blue-700">Personal info</h1>
        <p>Please provide your name, email address, and phone number</p>

        <Formik
          validationSchema={validationSchema}
          initialValues={formvalues}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange }) => (
            <Form>
              <label className="mt-2">
                Name
                <span className="text-red-600">*</span>
              </label>
              <br />
              <Field
                name="Name"
                type="text"
                id="Name"
                onChange={handleChange}
              />
              {errors.Name && touched.Name ? (
                <div className="text-red-600">{errors.Name}</div>
              ) : null}
              <br />
              <label className="mt-2">
                Email
                <span className="text-red-600">*</span>
              </label>
              <br />
              <Field
                name="Email"
                type="email"
                id="Email"
                onChange={handleChange}
              />
              {errors.Email && touched.Email ? (
                <div className="text-red-600">{errors.Email}</div>
              ) : null}
              <br />
              <label className="mt-2">
                Phone Number
                <span className="text-red-600">*</span>
              </label>
              <br />
              <Field
                name="PhoneNumber"
                type="number"
                id="PhoneNumber"
                onChange={handleChange}
              />
              {errors.PhoneNumber && touched.PhoneNumber ? (
                <div className="text-red-600">{errors.PhoneNumber}</div>
              ) : null}
              <br />
              <button
                type="submit"
                class=" mt-2 bg-slate-400 w-40 px-1 py-2 rounded-xl text-white"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="mt-7">
        <FormData data={localdata} />
      </div>
    </>
  );
};

export default HomePage;