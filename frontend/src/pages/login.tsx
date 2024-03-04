import { loginApi } from '@/api/sessions/sessions'
import { LoginBackError, LoginSucces } from '@/components/login'
import { ChangeEvent, InputHTMLAttributes, useState } from 'react'

enum StateLogin {
    WaitingForLogin ,
    Failed,
    WrongEmailFormat,
    Success,
    ErrorBack
}

export default function Login() {

    const [getEmail, setEmail] = useState("")
    const [getPassword, setPassword] = useState("")
    const [getStateLogin, setStateLogin] = useState(StateLogin.WaitingForLogin)

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setEmail(value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setPassword(value);
    }

    const emailValidation = (email: string) => {
        const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return (!(email === '') && email.match(regex))
    }

    const login = () => {
        //TODO check if the email is OK with regex
        // TODO hidden password ******
        const loginData = {
            email: getEmail,
            password: getPassword
        }

        if (!emailValidation(getEmail)) {
            setStateLogin(StateLogin.WrongEmailFormat)
            console.log(getStateLogin)
            return
        }

        const canConnect = loginApi(loginData)
        canConnect.then(function(resBool)  {
            console.log("bool from promise" + resBool)
            if (resBool) {
                setStateLogin(StateLogin.Success)
                console.log(getStateLogin)
                return
            }
            if (resBool === false ){
                setStateLogin(StateLogin.Failed)
                console.log(getStateLogin)
                return 
            }
            // no response from api
            setStateLogin(StateLogin.ErrorBack)
            console.log(getStateLogin)

        })
    }

    return (<div>
        <h1 className="text-center font-bold text-3xl py-5">Log into your account!</h1>
        <div className="flex flex-row">
            <div className="basis-1/3"></div>

            <div className={`${ (getStateLogin  === 0 || getStateLogin === 1 || getStateLogin === 2 ) ? 'display' : 'hidden'}`}>
                <div className={`basis-1/3 ${ getStateLogin === StateLogin.Failed ? 'border-2 border-red-400': '' }`} >
                    <div className={`${ getStateLogin === StateLogin.WrongEmailFormat ? 'border-2 border-red-400': ''}`}>
                        <p>email address</p> 
                        <input placeholder={`${ getStateLogin === StateLogin.WrongEmailFormat ? 'Wrong email format': 'john.doe@example.com '}`}type="text" className="bg-slate-300 p-3" onChange={handleEmailChange}/>
                    </div>
                    <p>password</p>
                    <input placeholder="password" type="password" className="bg-slate-300 p-3" onChange={handlePasswordChange} />
                    <button className='border p-3 rounded-lg' onClick={login}>Login</button>
                </div>
            </div>

            <div className={`${getStateLogin === StateLogin.Success ? '' : 'hidden'}`}>
                <LoginSucces/>
            </div>
            <div className={`${getStateLogin === StateLogin.ErrorBack ? '' : 'hidden'}`}>
                <LoginBackError/>
            </div>
            
            
            <div className="basisi-1/3"></div>
        </div>

    </div>
    );
  }