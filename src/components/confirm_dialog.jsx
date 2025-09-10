import React from "react";

function ConfirmDialog({ isOpen, message, onConfirm, onCancel }) {
    if (!isOpen) return null

    const styles = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
        },
        dialog: {
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center",
            minWidth: "300px"
        },
        buttons: {
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            gap: "10px"
        },
        btn: {
            padding: "8px 16px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer"
        },
        yesBtn: {
            backgroundColor: "#d64b4b",
            color: "white"
        },
        noBtn: {
            backgroundColor: "gray",
            color: "white"
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.dialog}>
                <p>{message}</p>
                <div style={styles.buttons}>
                    <button style={{ ...styles.btn, ...styles.yesBtn }} onClick={onConfirm}>
                        Yes
                    </button>
                    <button style={{ ...styles.btn, ...styles.noBtn }} onClick={onCancel}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog