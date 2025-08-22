import axios from "axios";

const deptServiceUrl = import.meta.env.VITE_DEPT_SERVICE_URL

// add function
async function add(id, name) {
    try {
        const response = await axios.post(`${deptServiceUrl}/departments/add`, 
            {
                id: parseInt(id),
                name: name,
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`
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
async function remove(deptId) {
    try {
        await axios.delete(`${deptServiceUrl}/departments/delete`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            },
            data: {
                id: deptId
            }
        })
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
        const response = await axios.get(`${deptServiceUrl}/departments/read`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
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
async function update(id, name) {
    try {
        const response = await axios.put(`${deptServiceUrl}/departments/update`, 
            {
                id: parseInt(id),
                name: name,
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`
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
async function downloadDeptCSV() {
    try {
        const response = await axios.get(
            `${deptServiceUrl}/departments/download-csv`,
            {
                headers: { "Authorization": `Bearer ${localStorage.getItem("authToken")}` },
                responseType: "blob"
            }
        )

        const blob = new Blob([response.data], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)

        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", "departments.csv")
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

// upload csv function
async function uploadDeptCSV(file) {
  try {
    const formData = new FormData()
    formData.append("file", file) 

    const response = await axios.put(`${deptServiceUrl}/departments/upload-csv`,
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

export {read, remove, add, update, downloadDeptCSV, uploadDeptCSV}
