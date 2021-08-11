import React, { useState } from 'react';
import classes from "./SignUp.css";
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-albums';
import { Link } from 'react-router-dom';


const signUp = () => {

    const [signUpForm, setSignUpForm] = useState(
        {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                message: 'Please enter your name',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                message: 'Invalid Email',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },

            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                message: 'Password must have a minimum of 8 characters, Uppercase and Lowercase letters, Numbers and Symbols',
                validation: {
                    required: true,
                    minLength: 8,
                    specialChar: true
                },
                valid: false,
                touched: false

            },
            confirmPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm Your Password'
                },
                value: '',
                message: 'Passwords not matching',
                validation: {
                    required: true,
                    minLength: 8,
                    passMatch: true
                },
                valid: false,
                touched: false

            }
        }

    )
    const [formIsValid, setFormIsValid] = useState(false);



    const checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.specialChar) {
            const pattern = (/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/);
            isValid = pattern.test(value) && isValid
        }

        if (rules.passMatch) {
            const pattern = signUpForm.password.value;
            isValid = pattern.match(value) && isValid;
        }


        return isValid;

    }



    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedSignUpForm = {
            ...signUpForm
        };
        const updatedFormElement = {
            ...updatedSignUpForm[inputIdentifier]

        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedSignUpForm[inputIdentifier] = updatedFormElement;


        let formIsValid = true;
        for (let inputIdentifier in updatedSignUpForm) {
            formIsValid = updatedSignUpForm[inputIdentifier].valid && formIsValid
        }

        setSignUpForm(updatedSignUpForm);
        setFormIsValid(formIsValid);
    }



    const signUpHandler = () => {
        const user = {
            email: signUpForm.email.value,
            password: signUpForm.password.value
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBfmnMPLfBZ85ZXYBFNimKJmkE_QpZX61E', user)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }



    const formElementsArray = [];
    for (let key in signUpForm) {
        formElementsArray.push({
            id: key,
            config: signUpForm[key]
        });
    }


    const form = formElementsArray.map(formElement => (

        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            label={formElement.config.label}
            invalid={!formElement.config.valid}
            message={!formElement.config.valid && formElement.config.touched ? formElement.config.message : null}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)}
        />
    )

    )

    return (
        <div>
            <div className={classes.Title}>
                <h4>Sign Up</h4>
            </div>
            <form className={classes.SignUp} >
                {form}
                <Link to={'/'}>
                    <Button btnType="Success" disabled={!formIsValid} clicked={() => signUpHandler()}> Sign up </Button>
                </Link>
                <div>
                    <p>Already have an account? <a href="/SignIn" >Sign In</a></p>
                </div>
            </form>
        </div>
    )


}

export default signUp;