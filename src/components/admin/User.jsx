import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faStop } from "@fortawesome/free-solid-svg-icons";

function User({userData}) {

    const [loadingActiver, setLoadingActiver]=useState(false)
    const [loadingSuspendre, setLoadingSuspendre]=useState(false)


    const ActiverUser = async () => {
        setLoadingActiver(true)
        setTimeout(async () => {
            try {
                const response = await fetch(`/api/users/validate-user`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body:JSON.stringify({
                      id:userData.id
                  })
                })
            
                if (!response.ok) {
                  throw new Error(`Erreur HTTP: ${response.status}`)
                }
            
                const result = await response.json()
                console.log('Utilisateur activé:', result)
            
                // Optionnel : mettre à jour localement le statut actif
                // Si tu veux que ça reflète directement le changement sans recharger toute la page
                userData.isActive = true
            
              } catch (error) {
                console.error("Erreur lors de l'activation :", error)
              } finally {
                setLoadingActiver(false)
              }
        }, 2000);
       
      }


      const SuspendreUser = async () => {
        setLoadingSuspendre(true)
        setTimeout(async () => {
            try {
                const response = await fetch(`/api/users/suspendre-user`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body:JSON.stringify({
                      id:userData.id
                  })
                })
            
                if (!response.ok) {
                  throw new Error(`Erreur HTTP: ${response.status}`)
                }
            
                const result = await response.json()
                console.log('Utilisateur activé:', result)
            
                // Optionnel : mettre à jour localement le statut actif
                // Si tu veux que ça reflète directement le changement sans recharger toute la page
                userData.isActive = false
            
              } catch (error) {
                console.error("Erreur lors de l'activation :", error)
              } finally {
                setLoadingSuspendre(false)
              }
        }, 2000);
       
      }
      

  return (
    <div className='user-card'>
      <div>
        <p>{userData.email}</p>
        <small>{userData.createdAt}</small>
      </div>

      <div className="user-control">
        {
            !userData.isActive ?
            <button className='activer' onClick={ActiverUser}> 
                    {
                        loadingActiver ? <div className='loading-ring-white'></div> : <></>
                    }
                <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon><span>Activer</span>
            </button>:
            <button className='suspendre' onClick={SuspendreUser}>
                    {
                        loadingSuspendre ? <div className='loading-ring-white'></div> : <></>
                    } 
                <FontAwesomeIcon icon={faStop}></FontAwesomeIcon><span>Suspendre</span>
            </button>

        }
       
      </div>
    </div>
  )
}

export default User
