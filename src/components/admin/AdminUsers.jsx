import React, { useEffect, useState } from 'react'
import { GetAllUsers } from './func'
import User from './User'


function AdminUsers() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await GetAllUsers()
        setUsers(data)
        console.log(data)
      } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs :", err)
      } finally {
        setLoading(false)
      }
    }

    setTimeout(() => {
      fetchUsers()
    }, 1000);
  }, [])


  return (
    <div className='content-users'>
      <h2>Users</h2>

      {
        loading ? (
            <div className="conv-loading"></div>
        ):null
      }

      {
        users.map((user, index)=>{
          return <User key={index} userData={user} />
        })
      }
    </div>
  )
}

export default AdminUsers
