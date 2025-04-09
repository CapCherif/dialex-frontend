import React from 'react'
import { useAppContext } from '../context/Context'
function Footer() {
    const {setHelp} = useAppContext();
  return (
    <footer>
      <p>Copyright@2025</p>
      <a href="#" onClick={()=>setHelp(true)}>Aide</a>
    </footer>
  )
}

export default Footer
