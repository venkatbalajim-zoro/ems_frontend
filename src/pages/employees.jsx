import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Button from '../components/button'
import Snackbar from "../components/snack_bar";
import ConfirmDialog from "../components/confirm_dialog"
import { downloadEmpCSV, read, remove } from "../services/employee_service";

function EmployeesPage() {
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([])
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [id, setId] = useState("")

    useEffect(() => {
        async function fetchEmployees() {
            try {
                const response = await read()
                setId(response.employee_id)
                setEmployees(response.data)
            } catch (error) {
                console.error("Failed to fetch the employees data: ", error)
            }
        }
        fetchEmployees()
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
            
        },
        uploadBtn: {
            
        },
        downloadBtn: {
            
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

    function askDelete(employeeId) {
        setSelectedEmployeeId(employeeId);
        setConfirmOpen(true);
    }

    async function confirmDelete() {
        if (selectedEmployeeId) {
            await handleDelete(selectedEmployeeId);
            setSelectedEmployeeId(null);
        }
        setConfirmOpen(false);
    }

    async function handleDelete(employeeId) {
        try {
            if (employeeId === id) {
                setSnackbarMessage("Unable to delete your own data.")
            } else {
                await remove(employeeId)
                setEmployees(employees.filter((emp) => emp.employee_id !== employeeId))
                setSnackbarMessage("Employee data deleted successfully.")
            }
        } catch (error) {
            setSnackbarMessage(error.message)
            console.error("Failed to delete the employee data: ", error)
        } finally {
            setSnackbarOpen(true)
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Employees</h1>
                <div style={styles.buttonGroup}>
                    <Button name="Add" color="#2392fa" onClick={() => {navigate('/add-employee')}} />
                    <Button name="Upload CSV" color="#2392fa" onClick={() => {navigate('/upload-csv', {
                        state: {
                            type: "employees"
                        }
                    })}} />
                    <Button name="Download CSV" color="#2392fa" onClick={downloadEmpCSV} /> 
                </div>
            </div>

            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>First Name</th>
                    <th style={styles.th}>Last Name</th>
                    <th style={styles.th}>Email ID</th>
                    <th style={styles.th}>Phone</th>
                    <th style={styles.th}>Dept Name</th>
                    <th style={styles.th}>Designation</th>
                    <th style={styles.th}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((emp) => (
                    <tr key={emp.employee_id}>
                    <td style={styles.td}>{emp.employee_id}</td>
                    <td style={styles.td}>{emp.first_name}</td>
                    <td style={styles.td}>{emp.last_name}</td>
                    <td style={styles.td}>{emp.email}</td>
                    <td style={styles.td}>{emp.phone}</td>
                    <td style={styles.td}>{emp.department_name}</td>
                    <td style={styles.td}>{emp.designation}</td>
                    <td style={styles.td}>
                        <div style={styles.actions}>
                        <Button name="Update" color="#2392fa" onClick={() => {navigate('/update-employee', {
                            state: {
                                ...emp, 
                                page: "update"
                            }
                        })}} />
                        <Button name="Delete" color="#d64b4b" onClick={() => askDelete(emp.employee_id)} />
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>

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

export default EmployeesPage
