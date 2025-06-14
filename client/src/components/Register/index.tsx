import React, { useState } from "react";
import "./register.scss";
import { userRegister } from "../../utils/apiservice";
import { authRegister } from "../../redux/slice/userAuthSlice";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await userRegister(formData)
        dispatch(authRegister({
            id:response.user.id,
            email: response.user.email,
            role: response.user.role,
            token: response.jwttoken,
        }));
        navigate("/home")
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Register</h2>

                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="role">Role</label>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="seller">Seller</option>
                </select>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
