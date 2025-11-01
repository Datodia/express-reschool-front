import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


export default function Dashboard() {
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [deletedId,setDeletedId] = useState('')
    const token = Cookies.get('token')
    const navigate = useNavigate()


    const getUser = async () => {
        const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/current-user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if(resp.status !== 200){
            navigate('/')
        }
        const data = await resp.json()

        if (data.role !== 'admin') {
            navigate('/')
        }
        setUser(data)
    }

    const getAllusers = async () => {
        const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await resp.json()
        setUsers(data)
    }

    const handleDelete = async (id) => {
        try{

            setDeletedId(id)
            const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = resp.json()
            if(resp.status === 200){
                await getAllusers()
                toast.success('deleted succesfully')
            }else{
                toast.error(data.error)
            }
        }catch(e){

        }finally{
            setDeletedId('')
        }
    }

    if (!token) return null

    useEffect(() => {
        getUser()
        getAllusers()

    }, [])




    return (
        <div className='p-4'>
            <Link to={'/'}>Back to HOme</Link>
            <h1 className='text-xl'>Dashboard</h1>

            <table className='border-2 border-black w-full'>
                <thead className='border-2 border-black'>
                    <tr className='flex gap-2 p-2'>
                        <th className='flex-1 font-bold p-1  border-2 border-black'>ID</th>
                        <th className='flex-1 font-bold p-1 border-2 border-black'>fullName</th>
                        <th className='flex-1 font-bold p-1 border-2 border-black'>email</th>
                        <th className='flex-1 font-bold p-1 border-2 border-black'>Delete</th>
                    </tr>
                </thead>
                <tbody className='border-2 border-black'>
                    {users.map(el => (
                        <tr key={el._id} className='flex my-1 gap-2 p-2'>
                            <td className='flex-1 p-1  text-center'>{el?._id}</td>
                            <td className='flex-1 p-1 text-center'>{el?.fullName}</td>
                            <td className='flex-1 p-1 text-center'>{el?.email}</td>
                            <td onClick={() => handleDelete(el._id)} className='flex-1 p-1 text-center bg-red-500'>{el._id === deletedId ? 'Loading...' : 'Delete'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
