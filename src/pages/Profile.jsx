import { useState } from "react"
import Cookies from 'js-cookie'
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Profile() {
    const token = Cookies.get('token')
     const navigate = useNavigate()
    const [user,setUser] = useState(null)
    const [loading, setLoading] = useState(false)

     const getUser = async () => {
        try{

            const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/current-user`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if(resp.status === 200){

                const data = await resp.json()
                setUser(data)
            }else{
                navigate('/sign-in')
            }
        }catch(e){
            navigate('/sign-in')
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const handleUploadAvatar = async (e) => {
        setLoading(true)
        const files = e.target.files
        const formData = new FormData()

        formData.append('avatar', files[0])

        const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        if(resp.status === 200){
            getUser()
            setLoading(false)
        }
    }
    
  return (
    <div className="p-4">
        <Link to={'/'}>
            Back to home
        </Link>
        <h1>Profile</h1>
        <h1>Email: <span className="font-bold">{user?.email}</span></h1>
        <h1>FullName: <span className="font-bold">{user?.fullName}</span></h1>

        <div>
            <img src={user?.avatar} alt="user" className="w-[200px] h-[200px]" />
        </div>

        <div className="mt-4">
            <label htmlFor="avatar" className="mt-4">
                {loading ? 'Loading..': 'Upload Image' }
            </label>
            <input onChange={handleUploadAvatar} type="file" id='avatar' className="hidden" />
        </div>
    </div>
  )
}
