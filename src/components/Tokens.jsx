import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Tokens() {
    const [loading, setLoading] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [idUser, setIdUser] = useState(localStorage.getItem('iduser'))
    const [tokenAdded, setTokenAdded] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)

    const navigate = useNavigate();
    const TOKENS_PER_QUANTITY = 120000; // 120000 tokens per quantity
    const PRICE_PER_QUANTITY = 1000; // 1000 DZ per quantity
    const TVA_RATE = 0.20; // TVA 20%

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if(!token) {
            navigate('/login')
        }
    }, [])

    const handleChange = (value) => {
        const qty = parseInt(value);
        if (qty < 1) {
            setQuantity(1); // Minimum quantity is 1
        } else {
            setQuantity(qty);
        }
    };

    const calculatePrices = () => {
        const montantHT = quantity * PRICE_PER_QUANTITY;
        const montantTVA = montantHT * TVA_RATE;
        const montantTTC = montantHT + montantTVA;
        const tokensToReceive = quantity * TOKENS_PER_QUANTITY;
        return {
            ht: montantHT.toFixed(2),
            tva: montantTVA.toFixed(2),
            ttc: montantTTC.toFixed(2),
            tokens: tokensToReceive
        };
    };

    const LogOut = () => {
        localStorage.removeItem('iduser')
        localStorage.removeItem('access_token')
        navigate('/login')
    }

    const handleConfirmOrder = () => {
        setShowConfirmation(true);
    }

    const handleCancelOrder = () => {
        setShowConfirmation(false);
    }

    const AddTokenOrder = async () => {
        setShowConfirmation(false);
        setLoading(true)
        setTimeout(async () => {
            try {
                const prices = calculatePrices();
                const response = await fetch('/api/token-manager/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: parseInt(localStorage.getItem('iduser')),
                        tokenAmount: prices.tokens,
                        price: quantity * PRICE_PER_QUANTITY
                    })
                });

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                let data = await response.json();
               
                setLoading(false)

                if(data.createdAt) {
                    setTokenAdded(true)
                    setTimeout(() => {
                        setTokenAdded(false)
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
            <p className='text-center'>Achat de tokens</p>
            <h1>Acheter des tokens</h1>

            <p className='text-center'>
                1 pack = 120000 tokens pour 1000 DZ
            </p>

            <div className='flex'>
                <p className='w-40'>Choisir la quantité de packs</p>
                <input 
                    type="number" 
                    min="1"
                    value={quantity}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Entrez la quantité"
                    style={{
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '16px',
                        width: '200px',
                        outline: 'none',
                        backgroundColor: '#fff',
                        transition: 'border-color 0.3s ease'
                    }}
                    className="token-input"
                />
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
                <div className="price-row">
                    <span>Total TTC:</span>
                    <span>{calculatePrices().ttc} DZ</span>
                </div>
                <div className="price-row total">
                    <span>Tokens à recevoir:</span>
                    <span>{calculatePrices().tokens.toLocaleString()} tokens</span>
                </div>
            </div>

            <button onClick={handleConfirmOrder}>
                {loading ? <div className='loading-ring-white'></div> : 'Valider'}
            </button>

            {showConfirmation && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Confirmation de commande</h2>
                        <div className="confirmation-details">
                            <p>Êtes-vous sûr de vouloir passer cette commande ?</p>
                            <p><strong>Quantité de packs:</strong> {quantity}</p>
                            <p><strong>Tokens à recevoir:</strong> {calculatePrices().tokens.toLocaleString()}</p>
                            <p><strong>Montant HT:</strong> {calculatePrices().ht} DZ</p>
                            <p><strong>TVA (20%):</strong> {calculatePrices().tva} DZ</p>
                            <p><strong>Total TTC:</strong> {calculatePrices().ttc} DZ</p>
                        </div>
                        <div className="modal-buttons">
                            <button className="confirm-button" onClick={AddTokenOrder}>
                                Confirmer
                            </button>
                            <button className="cancel-button" onClick={handleCancelOrder}>
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <br />
            {tokenAdded ? (
                <div className="success" style={{
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    padding: '15px',
                    borderRadius: '4px',
                    marginTop: '10px',
                    border: '1px solid #c3e6cb'
                }}>
                    <p style={{ marginBottom: '8px' }}>✅ Votre commande de {calculatePrices().tokens.toLocaleString()} tokens a été créée avec succès!</p>
                    <p>Montant HT: {calculatePrices().ht} DZ</p>
                    <p>TVA (20%): {calculatePrices().tva} DZ</p>
                    <p>Montant TTC: {calculatePrices().ttc} DZ</p>
                    <p>Veuillez procéder au virement bancaire pour finaliser votre commande.</p>
                </div>
            ) : null}
            <br /><br />
            <p>Vos tokens seront ajoutés à votre compte dès réception de votre virement bancaire du montant indiqué en total. Merci de votre confiance</p>
            <div style={{display: 'flex'}}>
                <p className='bg-green'>Paiement en ligne par virement RIB BNA </p>
                <p className='bg-gray'>11223 445654 7789874 xxx</p>
            </div>
            <div className='flex'>
                <Link to="/" style={{textDecoration:'none'}}><a className='bg-gray text-center' style={{textDecoration:'none'}}>Retour</a></Link>
                <a href="mailto:dz-ilmy@parene.org" className='bg-gray text-center' style={{textDecoration:'none'}}>Contacter nous</a>
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
                    padding: 30px;
                    border-radius: 8px;
                    max-width: 500px;
                    width: 90%;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }

                .modal-content h2 {
                    margin-top: 0;
                    color: #333;
                    text-align: center;
                }

                .confirmation-details {
                    margin: 20px 0;
                }

                .confirmation-details p {
                    margin: 10px 0;
                    color: #666;
                }

                .modal-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin-top: 20px;
                }

                .confirm-button, .cancel-button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: background-color 0.3s;
                }

                .confirm-button {
                    background-color: #28a745;
                    color: white;
                }

                .confirm-button:hover {
                    background-color: #218838;
                }

                .cancel-button {
                    background-color: #dc3545;
                    color: white;
                }

                .cancel-button:hover {
                    background-color: #c82333;
                }
            `}</style>
        </div>
    )
}

export default Tokens
