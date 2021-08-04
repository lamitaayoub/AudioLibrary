import React, { Component } from 'react';
import classes from "./SignIn.css";
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';


class SignIn extends Component {

    state = {
        signInForm: {
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
                message: 'Invalid Password',
                validation: {
                    required: true,
                    minLength: 8,
                    specialChar: true
                },
                valid: false,
                touched: false

            },

        },
        formIsValid: false
    }

    checkValidity(value, rules) {
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


        return isValid;

    }



    inputChangedHandler = (event, inputIdentifier) => {
        const updatedSignInForm = {
            ...this.state.signInForm
        };
        const updatedFormElement = {
            ...updatedSignInForm[inputIdentifier]

        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedSignInForm[inputIdentifier] = updatedFormElement;


        let formIsValid = true;
        for (let inputIdentifier in updatedSignInForm) {
            formIsValid = updatedSignInForm[inputIdentifier].valid && formIsValid
        }

        this.setState({ signInForm: updatedSignInForm, formIsValid: formIsValid });
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.signInForm) {
            formElementsArray.push({
                id: key,
                config: this.state.signInForm[key]
            });
        }

        let form = (
            <form className={classes.SignIn} >
                {
                    formElementsArray.map(formElement => (

                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            label={formElement.config.label}
                            invalid={!formElement.config.valid}
                            message={!formElement.config.valid && formElement.config.touched ? formElement.config.message : null}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        />
                    )

                    )
                }

                <Button btnType="Success" disabled={!this.state.formIsValid}> Sign In </Button>
                <div>
                    <p>Don't have an account? <a href="/SignUp" >Sign Up</a></p>
                </div>
            </form>
        )



        return (
            <div className={classes.Title}>
                <h4>Sign In</h4>
                {form}
            </div>
        )
    }

}

export default SignIn;