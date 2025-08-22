import React from "react";
import Button from "./button";

function NavBar({ onNavigate }) {
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
      <Button name="Employees" color="#2392fa" onClick={() => onNavigate("employees")} />
      <Button name="Departments" color="#2392fa" onClick={() => onNavigate("departments")} />
      <Button name="Accounts" color="#2392fa" onClick={() => onNavigate("accounts")} />
      <Button name="Settings" color="#2392fa" onClick={() => onNavigate("settings")} />
    </div>
  );
}

export default NavBar;
