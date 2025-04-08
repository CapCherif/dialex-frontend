import React from 'react'
import { useAppContext } from '../context/Context';

function Help() {
    
    
    const {setHelp} = useAppContext();
    

  return (
    <div id="voile">
      <div className='helpDiv'>
        <h2>Aide</h2>
        <div className="close" onClick={()=>setHelp(false)}>x</div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, nihil.</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium soluta ut fugit 
            dolore ab esse debitis, cupiditate quia neque at!</p>

        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur recusandae corporis eos vel, placeat veritatis.</p>
      </div>
    </div>
  )
}

export default Help
