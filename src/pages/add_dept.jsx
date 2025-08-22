import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import TextField from "../components/input_field";
import Button from "../components/button";
import { add, update } from "../services/department_service";
import Snackbar from "../components/snack_bar";

function AddDepartmentPage() {
    const { state } = useLocation()
    const [id, setId] = useState(state?.id || "")
    const [name, setName] = useState(state?.name || "")

    const [loading, setLoading] = useState(false);
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
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: "100%",
        }
    }

    async function handleSubmit() {
        try {
            setLoading(true)
            if (state?.page !== undefined) {
                await update(id, name)
            } else {
                await add(id, name)
            }
            var keyword = state?.page !== undefined ? "updated" : "added"
            setSnackMsg(`Department details are ${keyword} successfully!`)
            setOpen(true);
            if (state?.page === undefined) {
                setId("")
                setName("")
            }
        } catch (error) {
            setSnackMsg(error?.message || "Failed to add department.");
            setOpen(true);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={styles.page}>
            <h1>{state?.page || "Add new department"}</h1>
            <TextField label="Department ID" type="number" value={id} onChange={(e) => setId(e.target.value)} />
            <TextField label="Department Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <Button name={loading ? "Processing ..." : "Submit"} color="#2392fa" onClick={handleSubmit} />

            <Snackbar isVisible={open} message={snackMsg} />
        </div>
    )
}

export default AddDepartmentPage
