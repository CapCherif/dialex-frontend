import React, {useState} from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faStop } from "@fortawesome/free-solid-svg-icons";


function Order({order}) {


    const [loadingActiver, setLoadingActiver]=useState(false)
    const [loadingSuspendre, setLoadingSuspendre]=useState(false)


    const ValiderOrder = async () => {
        setLoadingActiver(true)
        setTimeout(async () => {
            try {
                const response = await fetch(`http://localhost:3000/orders/validate/${order.id}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body:JSON.stringify({
                      state:1
                  })
                })
            
                if (!response.ok) {
                  throw new Error(`Erreur HTTP: ${response.status}`)
                }
            
                const result = await response.json()
            
                // Optionnel : mettre à jour localement le statut actif
                // Si tu veux que ça reflète directement le changement sans recharger toute la page
                order.state = 1
            
              } catch (error) {
                console.error("Erreur lors de l'activation :", error)
              } finally {
                setLoadingActiver(false)
              }
        }, 2000);
       
      }


      const SusupendreOrder = async () => {
        setLoadingSuspendre(true)
        setTimeout(async () => {
            try {
                const response = await fetch(`http://localhost:3000/orders/validate/${order.id}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body:JSON.stringify({
                      state:2
                  })
                })
            
                if (!response.ok) {
                  throw new Error(`Erreur HTTP: ${response.status}`)
                }
            
                const result = await response.json()
            
                // Optionnel : mettre à jour localement le statut actif
                // Si tu veux que ça reflète directement le changement sans recharger toute la page
                order.state = 2
            
              } catch (error) {
                console.error("Erreur lors de l'activation :", error)
              } finally {
                setLoadingSuspendre(false)
              }
        }, 2000);
       
      }

  return (
    <div>
      <div className='user-card'>
      <div>
        <p>{order.user.email}</p>
        <small>{order.createdAt}</small>
      </div>

      <div className="user-control">
      {order.state === 0 && (
          <button className="activer" onClick={ValiderOrder}>
            {loadingActiver && <div className="loading-ring-white"></div>}
            <FontAwesomeIcon icon={faCheckCircle} />
            <span>Activer</span>
          </button>
        )}

        {order.state === 1 && (
          <button className="suspendre" onClick={SusupendreOrder}>
            {loadingSuspendre && <div className="loading-ring-white"></div>}
            <FontAwesomeIcon icon={faStop} />
            <span>Suspendre</span>
          </button>
        )}

        {order.state === 2 && (
          <button className="disabled" disabled>
            <span>Supprimé</span>
          </button>
        )}
       
      </div>
    </div>
    </div>
  )
}

export default Order



