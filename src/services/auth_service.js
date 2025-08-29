import axios from "axios";
import { useNavigate } from "react-router-dom";

const authServiceUrl = import.meta.env.VITE_BACKEND_APP

// login function
async function login(username, password) {
    if (username === "" || password === "") {
        throw new Error("Please enter the credentials.")
    }

    try {
        const response = await axios.post(`${authServiceUrl}/auth/login`, {
            username: username,
            password: password
        })
        localStorage.setItem("authToken", response.data.token)
        return true 
    } catch (error) {
        if (error.response && error.response.data.error) {
            throw new Error(error.response.data.error)
        } else {
            throw new Error("An unexpected error occurred.")
        }
    }
}

// logout function
function useLogout() {
    const navigate = useNavigate();
    function logout() {
        try {
            localStorage.removeItem("authToken");
            navigate("/");
        } catch (error) {
            console.error(error);
            throw new Error("Failed to logout.");
        }
    }
    return logout;
}

// check token in the local storage to skip login
async function checkAuthentication() {
    try {
        await axios.get(`${authServiceUrl}/auth/check`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        })
        return true 
    } catch (error) {
        console.error("Authentication check failed: ", error)
    }
}

// fetching logged username
async function fetchUsername() {
    try {
        const response = await axios.get(`${authServiceUrl}/auth/check`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            }
        })
        return response.data.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error)
        } else {
            throw new Error("An unexpected error occurred.")
        }
    }
}

// remove function
async function remove(username) {
    try {
        const response = await axios.delete(`${authServiceUrl}/auth/remove`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            },
            data: {
                username: username
            }
        })
        return response.data.message
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error)
        } else {
            throw new Error("An unexpected error occurred.")
        }
    }
}

// read function
async function read() {
    try {
        const response = await axios.get(`${authServiceUrl}/auth/accounts`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        })
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error)
        } else {
            throw new Error("An unexpected error occurred.")
        }
    }
}

// recovery function
async function recovery(username) {
    try {
        const response = await axios.post(`${authServiceUrl}/auth/recover`, { username: username }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        })
        return response.data.data 
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error)
        } else {
            console.log(error)
            throw new Error("An unexpected error occurred.")
        }
    }
}

// register function
async function register(username, password, employeeId) {
    try {
        const response = await axios.post(`${authServiceUrl}/auth/register`,
            {
                username: username,
                password: password,
                employee_id: parseInt(employeeId)
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data.message;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}

// delete account function
async function deleteAccount(navigate) {
    try {
        await axios.delete(`${authServiceUrl}/auth/delete`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
        })
        localStorage.removeItem("authToken")
        navigate("/") 
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error)
        } else {
            throw new Error("An unexpected error occured.")
        }
    }
}

export { login, useLogout, checkAuthentication, remove, read, recovery, register, deleteAccount, fetchUsername }
