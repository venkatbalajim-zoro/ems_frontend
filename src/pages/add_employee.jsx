import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import TextField from "../components/input_field";
import Button from "../components/button";
import { add, update } from "../services/employee_service";
import Snackbar from "../components/snack_bar";

function AddEmployeePage() {
    const { state } = useLocation()
    const [id, setId] = useState(state?.employee_id || "")
    const [firstName, setFirstName] = useState(state?.first_name || "")
    const [lastName, setLastName] = useState(state?.last_name || "")
    const [email, setEmail] = useState(state?.email || "")
    const [phone, setPhone] = useState(state?.phone || "")
    const [gender, setGender] = useState(state?.gender || "Male")
    const [deptId, setDeptId] = useState(state?.department_id || "")
    const [designation, setDesignation] = useState(state?.designation || "")
    const [salary, setSalary] = useState(state?.salary || "")
    const [hireDate, setHireDate] = useState(state?.hire_date || "")

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [snackMsg, setSnackMsg] = useState("")

    const styles = {
        page: {
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
        },
        form: {
            width: "100%",
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            width: "100%",
        },
        leftColumn: {
            display: "flex",
            flexDirection: "column",
            gap: "15px",
        },
        rightColumn: {
            display: "flex",
            flexDirection: "column",
            gap: "15px",
        },
        dropdown: {
            marginTop: "10px",
            border: "2px solid grey",
            padding: "5px 10px",
            fontSize: "1rem",
            borderRadius: "5px",
            width: "50%",
        },
        label: {
            fontSize: "1rem",
            color: "#374151",
        },
    }

    async function handleSubmit() {
        try {
            setLoading(true)
            var employeeData = {
                employee_id: parseInt(id),
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                gender: gender,
                designation: designation,
                department_id: parseInt(deptId),
                salary: parseFloat(salary),
                hire_date: hireDate
            }

            if (state?.page !== undefined) {
                await update(employeeData)
            } else {
                await add(employeeData)
            }
            var keyword = state?.page !== undefined ? "updated" : "added"
            setSnackMsg(`Employee details are ${keyword} successfully!`)
            setOpen(true);
            if (state?.page === undefined) {
                setId("")
                setFirstName("")
                setLastName("")
                setEmail("")
                setPhone("")
                setGender("Male")
                setDesignation("")
                setSalary("")
                setDeptId("")
                setHireDate("")
            }
        } catch (error) {
            setSnackMsg(error?.message || "Failed to add employee data.");
            setOpen(true);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={styles.page}>
            <h1>{state?.page !== undefined ? "Update employee details" : "Add new employee"}</h1>
            <form style={styles.form} onSubmit={(e) => {e.preventDefault()}}>
                <div style={styles.grid}>
                    <div style={styles.leftColumn}>
                        <TextField
                            type="number"
                            label="Employee ID"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <TextField
                            type="text"
                            label="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            type="text"
                            label="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                            type="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div>
                            <label style={styles.label}>Gender</label> 
                            <br />
                            <select value={gender || "Male"} style={styles.dropdown} onChange={(e) => setGender(e.target.value)}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                    </div>
                    <div style={styles.rightColumn}>
                        <TextField
                            type="text"
                            label="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <TextField
                            type="number"
                            label="Department ID"
                            value={deptId}
                            onChange={(e) => setDeptId(e.target.value)}
                        />
                        <TextField
                            type="text"
                            label="Designation"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        />
                        <TextField
                            type="number"
                            label="Salary"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                        <TextField
                            type="date"
                            label="Hire Date"
                            value={hireDate}
                            onChange={(e) => setHireDate(e.target.value)}
                        />
                    </div>
                </div>
                <br />
                <Button name={loading ? "Processing ..." : "Submit"} color="#2392fa" onClick={handleSubmit} />
            </form>
            <Snackbar isVisible={open} message={snackMsg} onClose={() => {setOpen(false)}} />
        </div>
    )
}

export default AddEmployeePage
