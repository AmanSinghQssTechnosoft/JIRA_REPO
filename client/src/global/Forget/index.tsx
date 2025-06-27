import { useState } from "react";
import "./forgetPassword.scss"
import { forgotPassword } from "../../utils/apiservice";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await forgotPassword(email);
    setStatus(res.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="header-format">
      <h2>Forgot Password</h2>
     <p role="button" aria-label="Close" onClick={() => navigate(-1)}>╳</p>

      </div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send Reset Link</button>
      <p>{status}</p>
    </form>
  );
};

export default ForgotPassword;
