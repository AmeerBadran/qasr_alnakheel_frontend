export default {
    title: "Create your account",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone Number",
    country: "Country",
    city: "City",
    password: "Password",
    confirmPassword: "Confirm Password",
    birthdate: "Birthdate",
    postalCode: "Postal Code (Optional)",
    signUp: "Sign Up",
    loginWith: "Or login with",
    alreadyHaveAccount: "Already have an account?",
    signInNow: "Sign In Now",
    goToHome: "Go to Home",
    uploadImage: "Click to upload image",
    enterImage: "Enter Image",

    // Validation messages
    validation: {
        required: "Required",
        invalidEmail: "Invalid email",
        phoneFormat: "Phone number must be 10 digits and start with 05",
        atLeastOnePhone: "At least one phone number is required",
        minPassword: "At least 6 characters",
        passwordsMustMatch: "Passwords must match",
    },

    verification: {
        title: "Account Verification",
        description: "The verification code has been sent to your email.",
        email: "Email",
        code: "Verification Code (6 digits)",
        verify: "Verify",
        sendAgain:"Send Again",
        checkSpam: "Please check your Spam or Junk folder if you don't see the email.",
        expiryWarning: "If you delay entering the code for more than 10 minutes, please request a new code to be sent to your email.",
        validation: {
            required: "This field is required",
            invalidEmail: "Invalid email",
            codeLength: "Code must be 6 digits",
            failed: "Verification failed, please check your code"
        }
    }
};
