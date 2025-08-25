import axios from "axios";

const empServiceUrl = import.meta.env.VITE_BACKEND_APP

// add function
async function add(employeeData) {
    try {
        const response = await axios.post(`${empServiceUrl}/employees/add`, 
            employeeData,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json",
                }
            }
        )
        return response.data.message 
    } catch (error) {
        if (error.response && error.response.data.error) {
            throw new Error(error.response.data.error)
        } else {
            throw new Error("An unexpected error occurred.")
        }
    }
}

// delete function
async function remove(employeeId) {
    try {
        const response = await axios.delete(`${empServiceUrl}/employees/delete`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            }, 
            data: {
                employee_id: employeeId
            }
        })
        return response.data.message
    } catch (error) {
        if (error.response && error.response.data.error) {
            throw new Error(error.response.data.error)
        } else {
            throw new Error("An unexpected error occurred.")
        }
    }
}

// read function
async function read() {
    try {
        const response = await axios.get(`${empServiceUrl}/employees/read`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("authToken")}` }
        })
        return response.data.data
    } catch (error) {
        if (error.response && error.response.data.error) {
            throw new Error(error.response.data.error)
        } else {
            throw new Error("An unexpected error occurred.")
        }
    }
}

// update function
async function update(employeeData) {
    try {
        const response = await axios.put(`${empServiceUrl}/employees/update`, 
            employeeData,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json",
                }
            }
        )
        return response.data.message 
    } catch (error) {
        if (error.response && error.response.data.error) {
            throw new Error(error.response.data.error)
        } else {
            throw new Error("An unexpected error occurred.")
        }
    }
}

// upload csv function
async function uploadEmpCSV(file) {
    try {
        const formData = new FormData()
        formData.append("file", file)

        const response = await axios.put(`${empServiceUrl}/employees/upload-csv`, 
            formData,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        return response.data.message
    } catch (error) {
        if (error.response && error.response.data.error) {
            throw new Error(error.response.data.error)
        } else {
            throw new Error("An unexpected error occurred.")
        }
    }
}

// download csv function
async function downloadEmpCSV() {
    try {
        const response = await axios.get(
            `${empServiceUrl}/employees/download-csv`,
            {
                headers: { "Authorization": `Bearer ${localStorage.getItem("authToken")}` },
                responseType: "blob"
            }
        )

        const blob = new Blob([response.data], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)

        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", "employees.csv")
        document.body.appendChild(link)
        link.click()
        link.remove()
    } catch (error) {
        if (error.response && error.response.data.error) {
            throw new Error(error.response.data.error)
        } else {
            throw new Error("An unexpected error occurred.")
        }
    }
}

export {read, remove, add, update, uploadEmpCSV, downloadEmpCSV}
