import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons/faLessThanEqual';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Abonnement() {

    const [loading, setLoading] = useState(false)
    const [mois, setMois] = useState(1)
    const [idUser, setIdUser]= useState(localStorage.getItem('iduser'))
    
    const [abAdded, setAbAdded] = useState(false)

    const PRIX_HT_PAR_MOIS = 400; // Prix HT par mois
    const TVA_RATE = 0.20; // TVA 20%

    const handleChange = (value) => {
        const moisChoisis = parseInt(value);
        setMois(moisChoisis);
      };

      const calculatePrices = () => {
        const montantHT = mois * PRIX_HT_PAR_MOIS;
        const montantTVA = montantHT * TVA_RATE;
        const montantTTC = montantHT + montantTVA;
        return {
            ht: montantHT.toFixed(2),
            tva: montantTVA.toFixed(2),
            ttc: montantTTC.toFixed(2)
        };
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
    <div>
      <div id="abonnement">
        <p className='text-center'>Merci de votre inscription, maintenant</p>
        <h1>Abonnez vous</h1>
       
        <p className='text-center'>
           Prix par mois: 400 DZ HT (480 DZ TTC avec TVA 20%)
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

        <div className="price-details">
            <div className="price-row">
                <span>Montant HT:</span>
                <span>{calculatePrices().ht} DZ</span>
            </div>
            <div className="price-row">
                <span>TVA (20%):</span>
                <span>{calculatePrices().tva} DZ</span>
            </div>
            <div className="price-row total">
                <span>Total TTC:</span>
                <span>{calculatePrices().ttc} DZ</span>
            </div>
        </div>

        <button onClick={AddOrder}>
          {loading ? <div className='loading-ring-white'></div> : <></>}
          Valider
        </button>
        <br />
        {abAdded ? (
            <div className="success">
                <div>
                    <p>Votre demande d'abonnement est en cours de traitement.</p>
                    <p>Montant HT: {calculatePrices().ht} DZ</p>
                    <p>TVA (20%): {calculatePrices().tva} DZ</p>
                    <p>Montant TTC: {calculatePrices().ttc} DZ</p>
                </div>
            </div>
        ) : null}
        <br /><br />
        <p>Votre compte sera activé dès réception de votre virement bancaire du montant indiqué en total. Merci de votre confiance</p>
        <div style={{display: 'flex'}}>
          <p className='bg-green'>Paiement en ligne par virement RIB BNA</p>
          <p className='bg-gray'>11223 445654 7789874 xxx</p>
        </div>
        <div className='flex'>
          <Link to="/" style={{textDecoration:'none'}}><a className='bg-gray text-center' style={{textDecoration:'none'}}>Retour</a></Link>
          <a href="mailto:dz-ilmy@parene.org" className='bg-gray text-center' style={{textDecoration:'none'}}>Contacter nous</a>
        </div>
      </div>

      <style jsx>{`
          .price-details {
              background: #f8f9fa;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
          }

          .price-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #dee2e6;
          }

          .price-row:last-child {
              border-bottom: none;
          }

          .price-row.total {
              font-weight: bold;
              font-size: 1.1em;
              color: #28a745;
              margin-top: 10px;
              padding-top: 10px;
              border-top: 2px solid #dee2e6;
          }

          .success {
              background-color: #d4edda;
              color: #155724;
              padding: 15px;
              border-radius: 4px;
              margin-top: 10px;
              border: 1px solid #c3e6cb;
          }
      `}</style>
    </div>
  )
}

export default Abonnement
