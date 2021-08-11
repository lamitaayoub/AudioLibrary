import React from 'react';
import classes from './Input.css';


const input = ({invalid, touched, elementType, value, elementConfig, changed, label,message}) => {
    const inputClasses = [classes.InputElement];
    let inputElement = <input  className = {inputClasses.join(' ')} {...elementConfig} value={value} onChange={changed} />;

    if(invalid && touched){
        inputClasses.push(classes.Invalid);
    }

    switch (elementType) {
        case ('input'):
            inputElement = <input className = {inputClasses.join(' ')} {...elementConfig}  value={value} onChange={changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea className = {inputClasses.join(' ')} {...elementConfig} value={value} onChange={changed} />;
            break;

        default:
            inputElement;
    }



return (
    <div className = {classes.Input}>
        <label className={classes.Label}>{label}</label>
        {inputElement}
        <label className = {classes.Message}>{message}</label>
    </div>
)

}

export default input;