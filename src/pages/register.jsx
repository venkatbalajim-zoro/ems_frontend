import React, { useState } from "react";
import TextField from "../components/input_field"; 
import { register } from "../services/auth_service"; 
import Snackbar from "../components/snack_bar"; 

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  const styles = {
    page: {
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      width: "100%",
    },
    button: {
      padding: "10px 20px",
      fontSize: "1rem",
      borderRadius: "10px",
      border: "none",
      backgroundColor: "#2392fa",
      color: "#fff",
      cursor: "pointer",
      width: "150px",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSnackbarMessage("");
    setIsSnackbarVisible(false);

    try {
      await register(username, password, employeeId);
      setSnackbarMessage("Registration successful!");
      setIsSnackbarVisible(true);

      setUsername("");
      setPassword("");
      setEmployeeId("");
    } catch (error) {
      setSnackbarMessage(error.message || "Registration failed");
      setIsSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <h1>Register New Account</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        <TextField label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <TextField label="Employee ID" type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Registering..." : "Submit"}
        </button>
      </form>

      <Snackbar
        message={snackbarMessage}
        isVisible={isSnackbarVisible}
        onClose={() => setIsSnackbarVisible(false)}
      />
    </div>
  );
}

export default RegisterPage
