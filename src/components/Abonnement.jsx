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
     
      localStorage.removeItem('iduser')
       localStorage.removeItem('access_token')
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
      <p className='text-center'>Merci de votre inscription, maintenant ​</p>
      <h1>Abonnez vous</h1>
     
     <p className='text-center'>
     400 DZ par mois​
        
     </p>
      <div className='flex'>
        <p className='w-40'>Choisissez le nombre de mois</p>
        <select onChange={(e)=> handleChange(e.target.value)}>
            <option value="1">1 mois</option>
            <option value="2">2 mois</option>
            <option value="3">3 mois</option>
            <option value="4">4 mois</option>
            <option value="5">5 mois</option>
             <option value="6">6 mois</option>
            <option value="7">7 mois</option>
            <option value="8">8 mois</option>
              <option value="9">9 mois</option>
             <option value="10">10 mois</option>
            <option value="11">11 mois</option>
            <option value="12">12 mois</option>
        </select>
      </div>

    <h3>Total : <span>{mois * 400} DZ</span></h3>
   

      <button onClick={AddOrder}>
        {
            loading ? <div className='loading-ring-white'></div> : <></>
        } 
        Valider</button>
        <br />
        {abAdded ? <div className="success">Votre demande d'abonnement est en cours de traitement..</div> : null}
        <br /><br />
        <p>Votre compte sera activé dès réception de votre virement bancaire​

 du montant indiqué en total, Merci de votre confiance </p>
        <div style={{display: 'flex'}}>
        <p className='bg-green'>Paiement en ligne par virement RIB BNA  </p>
        <p className='bg-gray'>11223 445654 7789874 xxx</p>
        </div>
        <div className='flex'>
        <a onClick={LogOut} className='bg-gray text-center'  style={{textDecoration:'none'}}>Annuler</a>
        <a href="mailto:dz-ilmy@parene.org" className='bg-gray text-center' style={{textDecoration:'none'}}>Contacter nous</a>
        </div>
       
    </div>
  )
}

export default Abonnement
