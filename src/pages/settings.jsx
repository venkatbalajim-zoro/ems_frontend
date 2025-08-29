import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button'
import { useLogout, deleteAccount, fetchUsername } from '../services/auth_service';
import { useEffect } from 'react';

function SettingsPage() {
  const logout = useLogout()
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [id, setId] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetchUsername() 
        setUsername(response.username)
        setId(response.employee_id)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch the username info:", error)
      }
    }

    fetchData()
  }, [])

  const styles = {
    page: {
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "20px",
    }, 
    userInfo: {
      padding: "20px 0"
    }
  };

  if (loading) {
    return (
      <p>Loading ...</p>
    )
  }

  return (
    <div style={styles.page}>
      <h1>Settings</h1>
      <div style={styles.userInfo}>
        <h3>User Information</h3>
        <p><span style={{ fontWeight: 500 }}>Username:</span> {username}</p>
        <p><span style={{ fontWeight: 500 }}>Employee ID:</span> {id}</p>
      </div>
      <Button name="Logout from this system" color="#2392fa" bgColor="#daeaf7" onClick={logout} />
      <Button name="Delete your account" color="#d64b4b" bgColor="#fdf4f4" onClick={async () => {await deleteAccount(navigate)}} />
    </div>
  );
}

export default SettingsPage;
