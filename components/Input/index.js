import React, { useState } from "react";
import styles from "../../styles/Home.module.css";


export default function Input({ label, id, onChange, placeholder, value, type }) {
    return (
        <>
            <div className={styles.fields}>
                <input type={type} name={id} id={id} value={value} onChange={onChange} placeholder={placeholder} />
                <label htmlFor={id}> {label} </label>
            </div>
        </>
    );
}