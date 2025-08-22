import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from '../components/button'
import { downloadDeptCSV, read, remove } from "../services/department_service"

function DepartmentsPage() {
  const navigate = useNavigate()
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const data = await read()
        setDepartments(data)
      } catch (error) {
        console.error("Failed to fetch departments:", error)
      }
    }
    fetchDepartments()
  }, [])

  const styles = {
    container: {
      padding: "40px"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px"
    },
    title: {
      fontWeight: "bold"
    },
    buttonGroup: {
      display: "flex",
      gap: "8px"
    },
    button: {
      padding: "8px 16px",
      borderRadius: "6px",
      color: "white",
      border: "none",
      cursor: "pointer"
    },
    addBtn: {
      backgroundColor: "green"
    },
    uploadBtn: {
      backgroundColor: "blue"
    },
    downloadBtn: {
      backgroundColor: "goldenrod"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      border: "1px solid #ccc"
    },
    th: {
      border: "1px solid #ccc",
      padding: "8px",
      backgroundColor: "#f5f5f5",
      textAlign: "left"
    },
    td: {
      border: "1px solid #ccc",
      padding: "8px"
    },
    actions: {
      display: "flex",
      gap: "8px"
    },
    updateBtn: {
      backgroundColor: "blue",
      padding: "4px 12px",
      borderRadius: "4px",
      color: "white",
      border: "none",
      cursor: "pointer"
    },
    deleteBtn: {
      backgroundColor: "red",
      padding: "4px 12px",
      borderRadius: "4px",
      color: "white",
      border: "none",
      cursor: "pointer"
    }
  }

  async function handleDelete(deptId) {
    try {
      await remove(deptId)
      setDepartments(departments.filter((dept) => dept.id !== deptId))
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  }

  async function handleDownload() {
    try {
      await downloadDeptCSV()
    } catch (error) {
      console.error("Failed to download the CSV file: ", error)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Departments Page</h1>
        <div style={styles.buttonGroup}>
          <Button name="Add" color="#2392fa" onClick={() => {navigate('/add-department')}} />
          <Button name="Upload CSV" color="#2392fa" onClick={() => {navigate('/upload-csv')}} />
          <Button name="Download CSV" color="#2392fa" onClick={handleDownload} /> 
        </div>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id}>
              <td style={styles.td}>{dept.id}</td>
              <td style={styles.td}>{dept.name}</td>
              <td style={styles.td}>
                <div style={styles.actions}>
                  <Button name="Update" color="#2392fa" onClick={() => {
                    navigate('/update-department', {
                      state: {
                        id: dept.id,
                        name: dept.name,
                        page: "Update the department",
                      }
                    })
                  }} />
                  <Button name="Delete" color="#d64b4b" onClick={() => {handleDelete(dept.id)}} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DepartmentsPage
