import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            setLoading(true)
            const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/sign-in`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            const data = await resp.json()
            console.log(resp)
            console.log(data)

            if(resp.status === 200){
                Cookies.set('token', data, {expires: 1 / 24})
                toast.success('Logged in scuccessly')
                navigate('/')
            }else{
                toast.error(data.message)
                console.log(data)
            }
        }catch(e){
            toast.error(e.message)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1>Sign-in</h1>

            <form onSubmit={handleSubmit} className='flex flex-col w-[400px] gap-2'>
                 <input 
                    type="email" 
                    placeholder='email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                    className='border-2 border-black'
                />
                 <input 
                    type="password" 
                    placeholder='********' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    className='border-2 border-black'
                />

                <button className='p-2 bg-blue-500'>{loading ? 'loading..': 'Sign-in'}</button>
                <h2>dont have an account? <Link to={'/sign-up'}>Sign-up</Link></h2>
            </form>
        </div>
    )
}
