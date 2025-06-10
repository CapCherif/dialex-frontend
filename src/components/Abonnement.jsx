import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons/faLessThanEqual';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Abonnement() {

    const [loading, setLoading] = useState(false)
    const [mois, setMois] = useState(1)
    const [idUser, setIdUser]= useState(localStorage.getItem('iduser'))
    
    const [abAdded, setAbAdded] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [abonnement, setAbonnement] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [loadingAction, setLoadingAction] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuspendModal, setShowSuspendModal] = useState(false);
    const [showActivateModal, setShowActivateModal] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);

    const PRIX_HT_PAR_MOIS = 3500; // Prix HT par mois
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
      setShowConfirmation(true)
    }

    const confirmOrder = async () => {
      setShowConfirmation(false)
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

    const cancelOrder = () => {
      setShowConfirmation(false)
    }

    const handleSuspend = async () => {
        if (!abonnement) return;
        
        setLoadingAction(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/abonnement/${abonnement.id}/suspend`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suspension de l\'abonnement');
            }

            const data = await response.json();
            setAbonnement(data);
            setMessage({ text: 'Abonnement suspendu avec succès', type: 'success' });
            setShowSuspendModal(false);
        } catch (error) {
            setMessage({ text: error.message, type: 'error' });
        } finally {
            setLoadingAction(false);
        }
    };

    const handleActivate = async () => {
        if (!abonnement) return;
        
        setLoadingAction(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/abonnement/${abonnement.id}/activate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'activation de l\'abonnement');
            }

            const data = await response.json();
            setAbonnement(data);
            setMessage({ text: 'Abonnement activé avec succès', type: 'success' });
            setShowActivateModal(false);
        } catch (error) {
            setMessage({ text: error.message, type: 'error' });
        } finally {
            setLoadingAction(false);
        }
    };

  return (
    <div>
      <div id="abonnement">
        <p className='text-center'>Merci de votre inscription, maintenant</p>
        <h1>Abonnez vous</h1>
       
        <p className='text-center'>
           Prix par mois: 3500 DZ HT (4200 DZ TTC avec TVA 20%)
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

        {showConfirmation && (
          <div className="confirmation-modal">
            <div className="modal-content">
              <h2>Confirmer votre abonnement</h2>
              <div className="order-details">
                <p>Durée: {mois} mois</p>
                <p>Montant HT: {calculatePrices().ht} DZ</p>
                <p>TVA (20%): {calculatePrices().tva} DZ</p>
                <p className="total">Total TTC: {calculatePrices().ttc} DZ</p>
              </div>
              <div className="modal-buttons">
                <button onClick={confirmOrder} className="confirm-btn">Confirmer</button>
                <button onClick={cancelOrder} className="cancel-btn">Annuler</button>
              </div>
            </div>
          </div>
        )}

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

      {abonnement && (
        <div className="abonnement-card">
          <div className="abonnement-actions">
            {!abonnement.isActive ? (
              <button 
                onClick={() => {
                  setSelectedAction('activate');
                  setShowActivateModal(true);
                }}
                className="activate-btn"
                disabled={loadingAction}
              >
                {loadingAction ? 'Activation en cours...' : 'Activer l\'abonnement'}
              </button>
            ) : (
              <button 
                onClick={() => {
                  setSelectedAction('suspend');
                  setShowSuspendModal(true);
                }}
                className="suspend-btn"
                disabled={loadingAction}
              >
                {loadingAction ? 'Suspension en cours...' : 'Suspendre l\'abonnement'}
              </button>
            )}
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmer l'action</h3>
            <p>Êtes-vous sûr de vouloir {selectedAction === 'activate' ? 'activer' : 'suspendre'} cet abonnement ?</p>
            <div className="modal-actions">
              <button 
                onClick={() => {
                  if (selectedAction === 'activate') {
                    handleActivate();
                  } else {
                    handleSuspend();
                  }
                }}
                className="confirm-btn"
                disabled={loadingAction}
              >
                {loadingAction ? 'Traitement en cours...' : 'Confirmer'}
              </button>
              <button 
                onClick={() => {
                  setShowConfirmModal(false);
                  setSelectedAction(null);
                }}
                className="cancel-btn"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

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

          .confirmation-modal {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.5);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 1000;
          }

          .modal-content {
              background-color: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              max-width: 500px;
              width: 90%;
          }

          .order-details {
              margin: 20px 0;
              padding: 15px;
              background-color: #f8f9fa;
              border-radius: 4px;
          }

          .order-details p {
              margin: 10px 0;
          }

          .order-details .total {
              font-weight: bold;
              color: #28a745;
              font-size: 1.1em;
              border-top: 1px solid #dee2e6;
              padding-top: 10px;
              margin-top: 10px;
          }

          .modal-buttons {
              display: flex;
              justify-content: space-between;
              margin-top: 20px;
          }

          .confirm-btn {
              background-color: #28a745;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 4px;
              cursor: pointer;
          }

          .cancel-btn {
              background-color: #dc3545;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 4px;
              cursor: pointer;
          }

          .confirm-btn:hover {
              background-color: #218838;
          }

          .cancel-btn:hover {
              background-color: #c82333;
          }

          .abonnement-actions {
              display: flex;
              gap: 1rem;
              margin-top: 2rem;
          }

          .activate-btn {
              background-color: #28a745;
              color: white;
              padding: 0.75rem 1.5rem;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-weight: 500;
              transition: background-color 0.2s;
          }

          .activate-btn:hover {
              background-color: #218838;
          }

          .suspend-btn {
              background-color: #dc3545;
              color: white;
              padding: 0.75rem 1.5rem;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-weight: 500;
              transition: background-color 0.2s;
          }

          .suspend-btn:hover {
              background-color: #c82333;
          }

          .activate-btn:disabled,
          .suspend-btn:disabled {
              background-color: #6c757d;
              cursor: not-allowed;
          }

          .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.5);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 1000;
          }

          .modal-content {
              background: white;
              padding: 2rem;
              border-radius: 8px;
              max-width: 500px;
              width: 90%;
          }

          .modal-content h3 {
              margin: 0 0 1rem 0;
              color: #333;
          }

          .modal-content p {
              margin: 0 0 1.5rem 0;
              color: #666;
          }

          .modal-actions {
              display: flex;
              gap: 1rem;
              justify-content: flex-end;
          }

          .confirm-btn:disabled {
              background-color: #ccc;
              cursor: not-allowed;
          }
      `}</style>
    </div>
  )
}

export default Abonnement
