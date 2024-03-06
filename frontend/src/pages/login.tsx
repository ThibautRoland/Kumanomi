import { saveTokenInCookie } from '@/api/cookies/cookies'
import { loginApi } from '@/api/sessions/sessions'
import { LoginBackError, LoginSucces } from '@/components/login'
import { ChangeEvent, InputHTMLAttributes, useState } from 'react'
import { useRouter } from 'next/router'

enum StateLogin {
    WaitingForLogin ,
    Failed,
    WrongEmailFormat,
    Success,
    ErrorBack
}
/*
curl get with username : password
*/
export default function Login() {
    const router = useRouter()

    const [getEmail, setEmail] = useState("John.Doe@example.com")
    const [getPassword, setPassword] = useState("password")
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

        const tokenFromApi = loginApi(loginData)
        tokenFromApi.then(function(token)  {

            if (token == null){
                setStateLogin(StateLogin.ErrorBack)
                return
            }
    
            
            if (token.length === 0) {
                setStateLogin(StateLogin.Failed)
                return
            }
            setStateLogin(StateLogin.Success)
            
            saveTokenInCookie(token)
            
            router.push({
                pathname: '/dashboard',
                query: { token: token }
            }, '/dashboard')
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