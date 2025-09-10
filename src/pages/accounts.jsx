import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { read, remove } from "../services/auth_service"; 
import Button from '../components/button'
import Snackbar from "../components/snack_bar";
import ConfirmDialog from "../components/confirm_dialog"

function AccountsPage() {
  const navigate = useNavigate()

  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState(null);

  const styles = {
    page: {
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "20px",
    },
    header: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    thTd: {
      border: "1px solid #ddd",
      padding: "8px",
    },
    buttonContainer: {
      display: "flex",
      gap: "10px",
    },
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await read();
        const fetchedAccounts = response.data;
        const filteredAccounts = fetchedAccounts.filter(
          (acc) => acc.username !== response.username
        );

        setAccounts(filteredAccounts);
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  function askDelete(username) {
      setSelectedUsername(username);
      setConfirmOpen(true);
  }

  async function confirmDelete() {
      if (selectedUsername) {
          await handleDelete(selectedUsername);
          setSelectedUsername(null);
      }
      setConfirmOpen(false);
  }

  async function handleDelete(username) {
    try {
      await remove(username);
      setAccounts(accounts.filter((acc) => acc.username !== username));
      setSnackbarMessage("Account data deleted successfully.")
      setSnackbarOpen(true)
    } catch (error) {
      setSnackbarMessage(error.message)
      setSnackbarOpen(true)
      console.error("Failed to delete account:", error);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1>Accounts</h1>
        <div style={styles.buttonContainer}>
          <Button name="Register" color="#2392fa" onClick={() => {navigate("/register")}} />
          <Button name="Recovery" color="#2392fa" onClick={() => {navigate("/recover")}} />
        </div>
      </div>

      {loading ? (
        <p>Loading accounts...</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.thTd}>Username</th>
              <th style={styles.thTd}>Employee ID</th>
              <th style={styles.thTd}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.username}>
                <td style={styles.thTd}>{account.username}</td>
                <td style={styles.thTd}>{account.employee_id}</td>
                <td style={styles.thTd}>
                  <Button name="Delete" color="#d64b4b" onClick={() => askDelete(account.username)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ConfirmDialog 
          isOpen={confirmOpen}
          message="Are you sure to delete?"
          onConfirm={confirmDelete}
          onCancel={() => setConfirmOpen(false)}
      />

      <Snackbar 
          isVisible={snackbarOpen}
          message={snackbarMessage} 
          onClose={() => {
              setSnackbarOpen(false)
          }} 
      />
    </div>
  );
}

export default AccountsPage;
