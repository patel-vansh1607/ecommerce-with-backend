import React, { useState } from 'react';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const validate = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = "Name is required";
        if (!formData.email) tempErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";
        if (!formData.password) tempErrors.password = "Password is required";
        else if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";
        return tempErrors;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                password: ''
            });
            console.log(formData);
        } else {
            setErrors(validationErrors);
            setSubmitted(false);
        }
    };

    return(
        <div style= {{maxWidth: "400px", margin: "auto", padding:"1rem"}}>
        <h2>Register</h2>
        {submitted && <p style={{color: "green"}}>Registration successful!</p>}
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange}></input>
                {errors.name && <div style={{color: "red"}}>{errors.name}</div>}
            </div>
            <div>
                <label>Email:</label>
                <input type="text" name="email" value={formData.email} onChange={handleChange}></input>
                {errors.email && <div style={{color: "red"}}>{errors.email}</div>}
            </div>
            <div>
                <label>Password:</label>
                <input type="text" name="password" value={formData.password} onChange={handleChange}></input>
                {errors.password && <div style={{color: "red"}}>{errors.password}</div>}
            </div>
            <button type="submit" style={{marginTop: "1rem"}}>Register</button>
        </form>
        </div>
    )
}

export default RegistrationPage;