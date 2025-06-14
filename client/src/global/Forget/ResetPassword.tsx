import { useState, useEffect } from "react";
import "./resetPassword.scss"
import { resetPassword } from "../../utils/apiservice";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenParam = queryParams.get("token");
    setToken(tokenParam);
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setStatus("Missing token");
      return;
    }
     const data=await resetPassword(password,token)
      setStatus(data.message);
  };

  return (
    <form onSubmit={handleReset}>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
      <p>{status}</p>
    </form>
  );
};

export default ResetPassword;
