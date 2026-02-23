"use client"
import {useState} from 'react'
import Welcome from "@/COMPONENTS/welcome";
import RegisterForm from "@/COMPONENTS/registerForm";

function SignUp() {
    const [step, setStep] = useState(0)
    return (
        <>{step==0 ? <Welcome nextStep={setStep}/>:<RegisterForm nextStep={setStep}/>}</>
    )
}

export default SignUp
