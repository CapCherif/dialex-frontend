import React from 'react'
import { useAppContext } from '../context/Context'
function Footer() {
    const {setHelp} = useAppContext();
  return (
    <footer>
      <p>© 2025 Parene : Savoir et Partage</p>
      <i>Propulsé par les technologies OpenAI</i>
   
      <a href="">Politique de confidentialité</a>
      <a href="">Conditions d'utilisation</a>
      <a href="">Contactez-nous</a>
     
      <a href="#" onClick={()=>setHelp(true)}>Aide</a>
    </footer>
  )
}

export default Footer
