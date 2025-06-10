import React, { useEffect, useState } from 'react'
import { GetAllAbonnement } from './func'
import Abonne from './Abonne'

function Abonnes() {
  const [loading, setLoading] = useState(true)
  const [abonnes, setAbonnes] = useState([])
 
  const fetchAbonnes = async () => {
    try {
      const data = await GetAllAbonnement()
      setAbonnes(data)
    } catch (err) {
      console.error("Erreur lors de la récupération des abonnés :", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchAbonnes()
    }, 1000);
  }, [])

  return (
    <div className='content-users'>
      <h2>Abonnés:</h2>

      {loading ? (
        <div className="conv-loading"></div>
      ) : null}

      {abonnes.map((abonne, index) => (
        <Abonne 
          key={index} 
          abonne={abonne} 
          onUpdate={fetchAbonnes}
        />
      ))}
    </div>
  )
}

export default Abonnes
