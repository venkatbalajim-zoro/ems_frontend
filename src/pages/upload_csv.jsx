import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Button from '../components/button'
import Snackbar from '../components/snack_bar'
import { uploadDeptCSV } from "../services/department_service";
import { uploadEmpCSV } from "../services/employee_service";

function UploadCSVPage() {
    const { state } = useLocation()
    const group = state?.type || "departments"

    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const fileInputRef = useRef(null);

    const styles = {
        page: {
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
        },
        uploadContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
        },
        chooseButton: {
            border: "2px solid #2392fa",
            backgroundColor: "transparent",
            color: "#2392fa",
            padding: "20px 40px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "18px",
        },
        fileNameContainer: {
            marginTop: "8px",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "4px",
            width: "100%",
            textAlign: "center",
        },
        fileName: {
            fontSize: "15px",
            color: "#555",
            textAlign: "center",
        },
    }

    async function handleSubmit() {
        if (!file) {
            setSnackbarOpen(true);
            setSnackbarMessage("Please select a CSV file before uploading.");
            return;
        }

        try {
            setLoading(true)
            if (group === "departments") {
                await uploadDeptCSV(file)
            } else {
                await uploadEmpCSV(file)
            }
            setSnackbarMessage("File uploaded successfully!");
            setSnackbarOpen(true);
            setFile(null); 
            if (fileInputRef.current) {
                fileInputRef.current.value = null; 
            }
        } catch (error) {
            console.error("Failed to upload the CSV file: ", error)
            setSnackbarMessage(error.message);
            setSnackbarOpen(true);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={styles.page}>
            <h1>Upload CSV File</h1>
            <input
                type="file"
                accept=".csv"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={(e) => setFile(e.target.files[0])}
            />
            <div style={styles.uploadContainer}>
                <button style={styles.chooseButton} onClick={() => fileInputRef.current.click()}>
                    Choose CSV File
                </button>
                <div style={styles.fileNameContainer}>
                    <span style={styles.fileName}>{file ? `${file.name}` : "No file uploaded"}</span>
                </div>
            </div>
            <Button name={loading ? "Uploading ..." : "Upload"} color="#2392fa" onClick={handleSubmit} />
            
            <Snackbar 
                isVisible={snackbarOpen}
                message={snackbarMessage} 
                onClose={() => setSnackbarOpen(false)} 
            />
        </div>
    )
}

export default UploadCSVPage
