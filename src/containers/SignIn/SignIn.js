import React, { useState } from 'react';
import classes from "./SignIn.css";
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';


const signIn = () => {
    const [signInForm, setSignInForm] = useState(
        {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                message: 'Please enter an Email',
                validation: {
                    required: true,
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
                message: 'Please enter a Password',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false

            }
        }
    )

    const [formIsValid, setFormIsValid] = useState(false);
   

   const  checkValidity = (value, rules)  => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;

    }



    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedSignInForm = {
            ...signInForm
        };
        const updatedFormElement = {
            ...updatedSignInForm[inputIdentifier]

        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedSignInForm[inputIdentifier] = updatedFormElement;


        let formIsValid = true;
        for (let inputIdentifier in updatedSignInForm) {
            formIsValid = updatedSignInForm[inputIdentifier].valid && formIsValid
        }

        // this.setState({ signInForm: updatedSignInForm, formIsValid: formIsValid });
        setSignInForm(updatedSignInForm);
        setFormIsValid(formIsValid);
    }



        const formElementsArray = [];
        for (let key in signInForm) {
            formElementsArray.push({
                id: key,
                config: signInForm[key]
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
                    <h4>Sign In</h4>
                </div>
                <form className={classes.SignIn} >
                    {form}
                    <Button btnType="Success" disabled={!formIsValid}> Sign In </Button>
                    <div>
                        <p>Don't have an account? <a href="/SignUp" >Sign Up</a></p>
                    </div>
                </form>
            </div>
        )
    }



export default signIn;