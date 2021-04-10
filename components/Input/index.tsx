import React, { useState } from "react";
import styles from "../../styles/Home.module.css";

interface IInput {
    label: string,
    id: string,
    value: any,
    onChange: any,
    placeholder: string,
    type: string
}

export default function Input(property: IInput) {
    return (
        <div className={styles.fields}>
            <input
                type={property.type}
                name={property.id}
                id={property.id}
                value={property.value}
                onChange={property.onChange}
                placeholder={property.placeholder}
            />

            <label htmlFor={property.id}> {property.label} </label>
        </div>
    );
}