import React, {useState, useEffect} from 'react'
import { GetAllOrders } from './func'
import Order from './Order'


function Orders() {
 
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])
   
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const data = await GetAllOrders()
          setOrders(data)
          console.log(data)
        } catch (err) {
          console.error("Erreur lors de la récupération des abonnés :", err)
        } finally {
          setLoading(false)
        }
      }
  
      setTimeout(() => {
        fetchOrders()
      }, 1000);
    }, [])



   return (
     <div className='content-users'>
       <h2>Abonnés:</h2>
 
       {
         loading ? (
             <div className="conv-loading"></div>
         ):null
       }
 
 
       {
         orders.map((order, index)=>{
           return <Order key={index} order={order} />
         })
       }
 
     </div>
   )
}

export default Orders
