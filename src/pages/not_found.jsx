import React from "react";

function NotFoundPage() {
    const styles = {
        page: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
        },
        title: {
            fontSize: "2em",
        },
    }

    return (
        <div style={styles.page}>
            <h1 style={styles.title}>404 Not Found.</h1>
        </div>
    );
}

export default NotFoundPage