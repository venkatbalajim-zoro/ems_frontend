import Button from "../components/button"
import Snackbar from "../components/snack_bar"
import TextField from "../components/input_field"
import React, { useState, useEffect } from "react"
import {login, checkAuthentication} from "../services/auth_service"
import { useNavigate } from "react-router-dom"

function LoginPage() {
    const navigate = useNavigate()

    const styles = {
        page: {
            display: "flex",
            padding: "50px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
        },
        title: {
            fontSize: "2em",
            color: "#2A4365",
        },
        container: {
            textAlign: "center",
            width: "50%",
            background: "#F7FAFC",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        },
        subtitle: {
            fontSize: "1.5em",
            color: "#2873c9",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
    }

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [username, setUsername] = useState("")
    const [pwd, setPwd] = useState("")
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")

    useEffect(() => {
        async function checkStatus() {
            const authStatus = await checkAuthentication()
            setIsAuthenticated(authStatus)

            setIsLoading(false)
        }

        checkStatus()
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home")
        }
    }, [isAuthenticated, navigate])

    function handleUsername(value) {
        setUsername(value)
    }

    function handlePassword(value) {
        setPwd(value)
    }

    async function handleSubmit() {
        try {
            const success = await login(username, pwd)
            if (success) {
                setIsAuthenticated(true)
            }
        } catch (error) {
            setSnackbarMessage(error.message)
            setIsSnackbarVisible(true)
        }
    }

    if (isLoading) {
        return (
            <div>
                <p>Loading ...</p>
            </div>
        )
    }

    return (
        <div style={styles.page}>
            <h1 style={styles.title}>Employee Management System</h1>
            <div style={styles.container}>
                <h2 style={styles.subtitle}>Login using your account</h2>
                <br />
                <form
                    style={styles.form}
                    onSubmit={(event) => {
                        event.preventDefault()
                    }}
                >
                    <TextField
                        label="Username"
                        type="text"
                        onChange={(event) => handleUsername(event.target.value)}
                    />
                    <br />
                    <TextField
                        label="Password"
                        type="password"
                        onChange={(event) => handlePassword(event.target.value)}
                    />
                    <br />
                    <Button name="Submit" color="#2392fa" onClick={handleSubmit}></Button>
                </form>
            </div>
            <Snackbar
                message={snackbarMessage}
                isVisible={isSnackbarVisible}
                onClose={() => setIsSnackbarVisible(false)}
            />
        </div>
    )
}

export default LoginPage
