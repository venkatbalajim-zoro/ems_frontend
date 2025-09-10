import React, { useEffect, useState } from "react";
import Button from "./button";
import { fetchUsername } from "../services/auth_service";

function NavBar({ onNavigate }) {
  const [username, setUsername] = useState("")
  const [id, setId] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const response = await fetchUsername() 
      setUsername(response.username)
      setId(response.employee_id)
    }

    fetchData()
  }, [])

  const styles = {
    background: "#dceefa",
    padding: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "0",
    width: "100%",
    gap: "30px"
  };

  return (
    <div style={styles}>
      <div style={{ flex: 1 }} />

      <div style={{ display: "flex", gap: "30px", justifyContent: "center" }}>
        <Button name="Employees" color="#2392fa" onClick={() => onNavigate("employees")} />
        <Button name="Departments" color="#2392fa" onClick={() => onNavigate("departments")} />
        <Button name="Accounts" color="#2392fa" onClick={() => onNavigate("accounts")} />
        <Button name="Settings" color="#2392fa" onClick={() => onNavigate("settings")} />
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <span>Username: {username}</span>
          <span>Employee ID: {id}</span>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
