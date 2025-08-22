import React, { useState } from "react";
import TextField from "../components/input_field";
import { recovery } from "../services/auth_service";
import Snackbar from "../components/snack_bar";

function RecoveryPage() {
  const [username, setUsername] = useState("");
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
      width: "50%",
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

  const handleProceed = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSnackbarMessage("");
    setIsSnackbarVisible(false);

    try {
      const message = await recovery(username);
      setSnackbarMessage(message || "Password sent to the user email.");
      setIsSnackbarVisible(true);
      setUsername("");
    } catch (error) {
      setSnackbarMessage(error.message || "Recovery failed");
      setIsSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <h1>Account Recovery</h1>
      <form style={styles.form} onSubmit={handleProceed}>
        <TextField
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Processing..." : "Proceed"}
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

export default RecoveryPage
