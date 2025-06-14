import { useState } from "react";
import "./forgetPassword.scss"
import { forgotPassword } from "../../utils/apiservice";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res=await forgotPassword(email)
      setStatus(res.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
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
