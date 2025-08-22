import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button'
import { useLogout, recovery, deleteAccount } from '../services/auth_service';

function SettingsPage() {
  const logout = useLogout()
  const navigate = useNavigate()

  const styles = {
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "20px",
  };

  return (
    <div style={styles}>
      <h1>Settings Page</h1>
      <br />
      <Button name="Logout from this system" color="#2392fa" bgColor="#daeaf7" onClick={logout} />
      <Button name="Delete your account" color="#d64b4b" bgColor="#fdf4f4" onClick={async () => {await deleteAccount(navigate)}} />
    </div>
  );
}

export default SettingsPage;
