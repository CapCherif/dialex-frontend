import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Tokens() {
    const [loading, setLoading] = useState(false)
    const [tokens, setTokens] = useState(100)
    const [idUser, setIdUser] = useState(localStorage.getItem('iduser'))
    const [tokenAdded, setTokenAdded] = useState(false)

    const navigate = useNavigate();

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
                10 DZ par token
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

            <h3>Total : <span>{tokens * 10} DZ</span></h3>

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
                    <p>Montant à payer: {tokens * 10} DZ</p>
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
        </div>
    )
}

export default Tokens
