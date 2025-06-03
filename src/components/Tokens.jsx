import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Tokens() {
    const [loading, setLoading] = useState(false)
    const [tokens, setTokens] = useState(100)
    const [idUser, setIdUser] = useState(localStorage.getItem('iduser'))
    const [tokenAdded, setTokenAdded] = useState(false)

    const navigate = useNavigate();
    const PRIX_HT_PAR_TOKEN = 10; // Prix HT par token
    const TVA_RATE = 0.20; // TVA 20%

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if(!token) {
            navigate('/login')
        }
    }, [])

    const handleChange = (value) => {
        const tokensChoisis = parseInt(value);
        if (tokensChoisis < 1) {
            setTokens(1);
        } else {
            setTokens(tokensChoisis);
        }
    };

    const calculatePrices = () => {
        const montantHT = tokens * PRIX_HT_PAR_TOKEN;
        const montantTVA = montantHT * TVA_RATE;
        const montantTTC = montantHT + montantTVA;
        return {
            ht: montantHT.toFixed(2),
            tva: montantTVA.toFixed(2),
            ttc: montantTTC.toFixed(2)
        };
    };

    const LogOut = () => {
        localStorage.removeItem('iduser')
        localStorage.removeItem('access_token')
        navigate('/login')
    }

    const AddTokenOrder = async () => {
        setLoading(true)
        setTimeout(async () => {
            try {
                const response = await fetch('http://localhost:3000/token-manager/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: parseInt(localStorage.getItem('iduser')),
                        tokenAmount: tokens,
                        price: tokens * 10
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
                Prix par token: 10 DZ HT (12 DZ TTC avec TVA 20%)
            </p>

            <div className='flex'>
                <p className='w-40'>Choisissez le nombre de tokens</p>
                <input 
                    type="number" 
                    min="1"
                    value={tokens}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Entrez le nombre de tokens"
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
                <div className="price-row total">
                    <span>Total TTC:</span>
                    <span>{calculatePrices().ttc} DZ</span>
                </div>
            </div>

            <button onClick={AddTokenOrder}>
                {loading ? <div className='loading-ring-white'></div> : <></>}
                Valider
            </button>
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
                    <p style={{ marginBottom: '8px' }}>✅ Votre commande de {tokens} tokens a été créée avec succès!</p>
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
                <a onClick={LogOut} className='bg-gray text-center' style={{textDecoration:'none'}}>Annuler</a>
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
            `}</style>
        </div>
    )
}

export default Tokens
