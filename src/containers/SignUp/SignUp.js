import React, { Component } from 'react';
import classes from "./SignUp.css";
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';


class SignUp extends Component {

    state = {
        signUpForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                message: 'Invalid Name',
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
                message: 'Invalid Password',
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

        if (rules.passMatch) {
            const pattern = this.state.signUpForm.password.value;
            isValid = pattern.match(value) && isValid;
        }


        return isValid;

    }



    inputChangedHandler = (event, inputIdentifier) => {
        const updatedSignUpForm = {
            ...this.state.signUpForm
        };
        const updatedFormElement = {
            ...updatedSignUpForm[inputIdentifier]

        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedSignUpForm[inputIdentifier] = updatedFormElement;


        let formIsValid = true;
        for (let inputIdentifier in updatedSignUpForm) {
            formIsValid = updatedSignUpForm[inputIdentifier].valid && formIsValid
        }

        this.setState({ signUpForm: updatedSignUpForm, formIsValid: formIsValid });
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.signUpForm) {
            formElementsArray.push({
                id: key,
                config: this.state.signUpForm[key]
            });
        }

        let form = (
            <form className={classes.SignUp} >
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

                {/* <button disabled={!this.state.formIsValid}> Sign up </button> */}
                <Button btnType="Success" disabled={!this.state.formIsValid}> Sign up </Button>
                <div>
                    <p>Already have an account? <a href="/SignIn" >Sign In</a></p>
                </div>
            </form>
        )



        return (
            <div className={classes.Title}>
                <h4>Sign Up</h4>
                {form}
            </div>

        )
    }

}

export default SignUp;