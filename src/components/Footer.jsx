import React from 'react'
import { useAppContext } from '../context/Context'
function Footer() {
    const {setHelp} = useAppContext();
  return (
    <footer>
      <p>© 2025 Parene : Savoir et Partage</p>
      <i>Propulsé par les technologies OpenAI</i>
      <div>
        <p><a href="">Politique de confidentialité</a></p>
        <p><a href="">Conditions d'utilisation</a></p>
        <p><a href="">Contactez-nous</a></p>
      </div>
      <a href="#" onClick={()=>setHelp(true)}>Aide</a>
    </footer>
  )
}

export default Footer
