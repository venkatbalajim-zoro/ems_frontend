import React, { useState } from "react";
import NavBar from "../components/nav_bar";
import EmployeesPage from "./employees";
import DepartmentsPage from "./departments";
import AccountsPage from "./accounts";
import SettingsPage from "./settings";

function HomePage() {
  const [activePage, setActivePage] = useState("employees");

  const renderPage = () => {
    switch (activePage) {
      case "employees":
        return <EmployeesPage />;
      case "departments":
        return <DepartmentsPage />;
      case "accounts":
        return <AccountsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <h1>This is main page.</h1>;
    }
  };

  return (
    <div>
      <NavBar onNavigate={setActivePage} />
      <div>
        {renderPage()}
      </div>
    </div>
  );
}

export default HomePage;
