import React from "react";
import './FormsControls.css'

export const Element = Element => ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={`form-control ${hasError ? 'error' : ''}`}>
            <div>
                <Element {...input} {...props}/>
            </div>
            <div>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}