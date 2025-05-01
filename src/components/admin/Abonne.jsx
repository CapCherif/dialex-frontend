import React, {useState} from 'react'
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faStop } from "@fortawesome/free-solid-svg-icons";


function Abonne({abonne}) {




 

  return (
    <div>
      <div className='user-card'>
      <div>
        <p>{abonne.user ?abonne.user.email : "N/A" }</p>
       
        <small>Date de création: {format(new Date(abonne.createdAt), "dd MMMM yyyy, h:mm a", { locale: fr })}</small>
        <br/>
        <br/>
        <small> Date De fin: {format(new Date(abonne.ExpirationDate), "dd MMMM yyyy, h:mm a", { locale: fr })} </small>
        

      </div>

      <div className="user-control">
       {abonne.state === 1 && (
               <button className="activer" >
                 <span>active</span>
               </button>
             )}
     
     {abonne.state === 0 && (
               <button className="suspendre" >
               
                
                 <span>non active</span>
               </button>
             )}
       
      </div>
    </div>
    </div>
  )
}

export default Abonne
