
import { useDispatch, useSelector } from "react-redux"
import { authLogin } from "../../redux/slice/userAuthSlice"
import "./loginpage.scss"
import { useState, type ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { userLogin } from "../../utils/apiservice"
import { GoogleOAuthProvider } from "@react-oauth/google"
import GoogleLogin from "../GoogleLgin"

interface logintypes {
    email: string,
    password: string,
}

const LoginPage = () => {
    const token = useSelector((state: any) => state.authLogin.token)
    console.log("jj", token)
    const [credentials, setCredentials] = useState<logintypes>({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(credentials.email) || !credentials.password) {
            alert("Please enter credentials required");
            return;
        }
        const response = await userLogin(credentials)
        console.log("loginresponse", response)
        dispatch(authLogin({
            id: response.user.id,
            email: response.user.email,
            role: response.user.role,
            token: response.jwttoken
        }))
        navigate("/home")
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value,
        }));
    };

  

    return (
        <div className="login-container">
            <h1>Login here</h1>
            <GoogleOAuthProvider clientId='277587073370-bmskjo8qadfvmq9vjhhen2036r9t5h3k.apps.googleusercontent.com'>
                <GoogleLogin 
                />
            </GoogleOAuthProvider>
            <p>or</p>
            <div className="main-email-passowrd">
                <div className="email">
                    <input type="email" name="email" placeholder="Enter Email here" onChange={handleChange} />
                </div>
                <div className="password">
                    <input type="text" name="password" placeholder="Enter password here" onChange={handleChange} />
                </div>
            </div>
            <div className="login-btn">
                <button onClick={handleSubmit}>Login</button>
            </div>

            <Link to="/register" className="link_login">Join to register</Link>
            <Link to="/forgetPassword" className="link_login">Forget Password</Link>
        </div>
    )
}

export default LoginPage