import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons/faLessThanEqual';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Abonnement() {

    const [loading, setLoading] = useState(false)
    const [mois, setMois] = useState(1)
    const [idUser, setIdUser]= useState(localStorage.getItem('iduser'))
    
    const [abAdded, setAbAdded] = useState(false)

    const handleChange = (value) => {
        const moisChoisis = parseInt(value);
        setMois(moisChoisis);
      };


      const navigate = useNavigate();

      useEffect(()=>{
        if(idUser == 0){
          navigate('/login')
        }
      }, [idUser])

      

    const LogOut = ()=>{
     
      localStorage.setItem('iduser', 0)
      navigate('/login')
    }



    const AddOrder = async ()=>{
      setLoading(true)
      setTimeout(async () => {
        try {
            
          const response = await fetch('http://localhost:3000/orders/add', {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              },
              body:JSON.stringify({
                durration: mois,
                user:localStorage.getItem('iduser')
              })
              
            });
        
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
        
            let data = await response.json();
            localStorage.setItem('iduser', 0)
            


            setLoading(false)


            if(data.createdAt && data.state == 0){
              setAbAdded(true)
              setTimeout(() => {
                setAbAdded(false)
                setIdUser(localStorage.getItem('iduser'))
              }, 10000);
            }
            
        } catch (err) {
              console.log(`Erreur lors de l'envoi: ${err.message}`);
                return []
        } 
      
      }, 2000);
    }
  return (
    <div id="abonnement">
      <h1>Abonnez vous</h1>
     
     <p>
        Choisissez le nombre de mois 400 DZ par mois et par utilisateur. 
        Pour les comptes collectifs merci de nous contacter.
        
     </p>
      <div>
        <select onChange={(e)=> handleChange(e.target.value)}>
            <option value="1">1 mois</option>
            <option value="2">2 mois</option>
            <option value="3">3 mois</option>
            <option value="4">4 mois</option>
            <option value="5">5 mois</option>
        </select>
      </div>

    <h3>Total : <span>{mois * 400}</span></h3>
    <p>Paiement en ligne par virement RIB BNA <strong>11223 445654 7789874 xxx</strong> </p>

      <button onClick={AddOrder}>
        {
            loading ? <div className='loading-ring-white'></div> : <></>
        } 
        Valider</button>
        <br />
        {abAdded ? <div className="success">Votre demande d'abonnement est en cours de traitement..</div> : null}
        <br /><br />
        <a href="#" onClick={LogOut}>Revenir</a>
    </div>
  )
}

export default Abonnement
