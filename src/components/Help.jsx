import React from 'react'
import { useAppContext } from '../context/Context';

function Help() {
    
    
    const {setHelp} = useAppContext();
    

  return (
    <div id="voile">
      <div className='helpDiv'>
        <h2>Aide</h2>
        <div className="close" onClick={()=>setHelp(false)}>x</div>
        <p>Bonjour,</p>
        <p>Bienvenu sur DZIALex, le système expert juridique spécialiste dans le droit Algérien.</p>  
        <p>Cette version est en cours d'enrichissement et sera bientôt disponible en abonnement au grand public. </p>
        <p>Merci de votre confiance et de votre soutien</p>
       
      </div>
    </div>
  )
}

export default Help
