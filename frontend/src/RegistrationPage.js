import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios first

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
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
        if (!formData.first_name) tempErrors.first_name = "First Name is required";
        if (!formData.last_name) tempErrors.last_name = "Last Name is required";
        if (!formData.email) tempErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";
        if (!formData.password) tempErrors.password = "Password is required";
        else if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";
        return tempErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:5000/v1/users', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log(response.data); // You can inspect the response here
                setSubmitted(true);
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: ''
                });
            } catch (error) {
                console.error('Error submitting form:', error.response ? error.response.data : error.message);
            }
        } else {
            setErrors(validationErrors);
            setSubmitted(false);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
            <h2>Register</h2>
            {submitted && <p style={{ color: "green" }}>Registration successful!</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
                    {errors.first_name && <div style={{ color: "red" }}>{errors.first_name}</div>}
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
                    {errors.last_name && <div style={{ color: "red" }}>{errors.last_name}</div>}
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
                </div>
                <button type="submit" style={{ marginTop: "1rem" }}>Register</button>
            </form>
        </div>
    );
};

export default RegistrationPage;
