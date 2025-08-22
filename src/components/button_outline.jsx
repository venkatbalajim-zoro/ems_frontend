import React from "react";

function OutlinedButton(props) {
  const styles = {
    backgroundColor: props.bgColor,
    border: "none",
    outline: `solid 2px ${props.color}`,
    color: props.color,
    padding: "10px",
    borderRadius: "10px",
    margin: 0,
    font: "inherit",
    textDecoration: "none",
    cursor: "pointer",
  };

  return (
    <>
      <button style={styles} onClick={props.onClick}>{props.name}</button>
    </>
  );
}

export default OutlinedButton
