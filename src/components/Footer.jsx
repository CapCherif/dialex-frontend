import React from 'react'
import { useAppContext } from '../context/Context'
function Footer() {
    const {setHelp} = useAppContext();
  return (
    <footer>
      <p>© 2025 Parene : Savoir et Partage</p>
      <i>Propulsé par les technologies OpenAI</i>
   
      <a href="https://www.parene.org/wp-content/uploads/2025/04/CGU-CGV.pdf">Politique de confidentialité</a>
      <a href="https://www.parene.org/wp-content/uploads/2025/04/CGU-CGV.pdf" target='_blank'>Conditions d'utilisation</a>
      <a href="mailto:contact@parene.org">Contactez-nous</a>
     
      <a href="#" onClick={()=>setHelp(true)}>Aide</a>
    </footer>
  )
}

export default Footer
