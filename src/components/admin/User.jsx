import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faStop, faTrash, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import dayjs from 'dayjs';

function User({userData, onUserUpdate}) {
    const [loadingActiver, setLoadingActiver]=useState(false)
    const [loadingSuspendre, setLoadingSuspendre]=useState(false)
    const [loadingDelete, setLoadingDelete]=useState(false)
    const [loadingReject, setLoadingReject]=useState(false)
    const [user, setUser] = useState(userData)
    const [showManageModal, setShowManageModal] = useState(false);
    const [expirationDate, setExpirationDate] = useState(user.abonnement && user.abonnement.ExpirationDate ? dayjs(user.abonnement.ExpirationDate).format('YYYY-MM-DD') : '');
    const [tokenToAdd, setTokenToAdd] = useState(0);
    const [manageMsg, setManageMsg] = useState('');
    const [manageLoading, setManageLoading] = useState(false);

    const getUserStatus = () => {
        switch(user.status) {
            case 0:
                return { text: "En attente", class: "pending-badge" };
            case 1:
                return { text: "Activé", class: "active-badge" };
            case 2:
                return { text: "Rejeté", class: "rejected-badge" };
            default:
                return { text: "Inconnu", class: "unknown-badge" };
        }
    }

    const updateUserStatus = (newStatus) => {
        setUser(prev => ({...prev, status: newStatus}))
        if (onUserUpdate) {
            onUserUpdate(user.id, newStatus)
        }
    }

    const ActiverUser = async () => {
        setLoadingActiver(true)
        try {
            const response = await fetch(`http://localhost:3000/users/validate-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: user.id
                })
            })

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`)
            }

            const result = await response.json()
            console.log('Utilisateur activé:', result)
            updateUserStatus(1)
        } catch (error) {
            console.error("Erreur lors de l'activation :", error)
        } finally {
            setLoadingActiver(false)
        }
    }

    const SuspendreUser = async () => {
        setLoadingSuspendre(true)
        try {
            const response = await fetch(`http://localhost:3000/users/deactivate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: user.id
                })
            })

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`)
            }

            const result = await response.json()
            console.log('Utilisateur suspendu:', result)
            updateUserStatus(0)
        } catch (error) {
            console.error("Erreur lors de la suspension :", error)
        } finally {
            setLoadingSuspendre(false)
        }
    }

    const DeleteUser = async () => {
        setLoadingDelete(true)
        try {
            const response = await fetch(`http://localhost:3000/users/${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`)
            }

            const result = await response.json()
            console.log('Utilisateur supprimé:', result)
            if (onUserUpdate) {
                onUserUpdate(user.id, 'deleted')
            }
        } catch (error) {
            console.error("Erreur lors de la suppression :", error)
        } finally {
            setLoadingDelete(false)
        }
    }

    const RejectUser = async () => {
        setLoadingReject(true)
        try {
            const response = await fetch(`http://localhost:3000/users/reject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: user.id
                })
            })

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`)
            }

            const result = await response.json()
            console.log('Utilisateur rejeté:', result)
            updateUserStatus(2)
        } catch (error) {
            console.error("Erreur lors du rejet :", error)
        } finally {
            setLoadingReject(false)
        }
    }

    const greenBtnStyle = {
        background:'#28a745', color:'#fff', border:'none', borderRadius:6, padding:'8px 16px', fontWeight:'bold', cursor:'pointer', fontSize:'1rem', boxShadow:'0 1px 2px rgba(40,167,69,0.08)'
    };

    return (
        <div className='user-card' key= {userData.id}>
            <div className="user-info">
                <div className="user-header">
                    <p className="user-email">{user.email}</p>
                    <span className={getUserStatus().class}>{getUserStatus().text}</span>
                </div>
                <div>
                    <strong>Username:</strong> {user.fullName}
                </div>

                   <div>
                    <strong>full name:</strong> {user.fullName}
                </div>

                   <div>
                    <strong>address:</strong> {user.address}
                </div>

                   <div>
                    <strong>telephone:</strong> {user.phoneNumber}
                </div>
                  <div>
                    <strong>code promotionnel:</strong> {user.copon ? user.copon : 'N/A'}
                </div>
                <div>
                    <strong>profession:</strong> {user.profession ? user.profession : 'N/A'}
                </div>
                <div>
                    <strong>Nombre de tokens:</strong> {user.token ? user.token.tokenNumber : 'N/A'}
                </div>
                <div>
                    <strong>Expiration abonnement:</strong> {user.abonnement && user.abonnement.ExpirationDate ? new Date(user.abonnement.ExpirationDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                </div>
                <button 
                  style={{
                    marginTop:8, marginBottom:8, background:'#28a745', color:'#fff', border:'none', borderRadius:6, padding:'8px 16px', fontWeight:'bold', cursor:'pointer', fontSize:'1rem', boxShadow:'0 1px 2px rgba(40,167,69,0.08)'
                  }}
                  onClick={()=>setShowManageModal(m=>!m)}
                >
                  Gérer Abonnement & Tokens
                </button>
                {showManageModal && (
                  <div style={{background:'#f8f9fa', border:'1px solid #ddd', borderRadius:8, padding:16, marginTop:8, marginBottom:8, maxWidth:350}}>
                    <div style={{marginBottom:12}}>
                      <label><strong>Nouvelle date d'expiration</strong></label><br/>
                      <input type="date" value={expirationDate} onChange={e=>setExpirationDate(e.target.value)} style={{width:'100%',padding:6,marginTop:4}}/>
                      <button style={{...greenBtnStyle, marginTop:6}} disabled={manageLoading} onClick={async()=>{
                        setManageLoading(true);
                        setManageMsg('');
                        try {
                          const resp = await fetch(`http://localhost:3000/abonnement/${user.abonnement?.id}/expiration-date`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ expirationDate })
                          });
                          if (!resp.ok) throw new Error('Erreur lors de la mise à jour');
                          setManageMsg('Date d\'expiration mise à jour !');
                          setUser(u=>({...u, abonnement: {...u.abonnement, ExpirationDate: expirationDate}}));
                        } catch(e) {
                          setManageMsg('Erreur: '+e.message);
                        } finally { setManageLoading(false); }
                      }}>Mettre à jour la date</button>
                    </div>
                    <div style={{marginBottom:12}}>
                      <label><strong>Ajouter des tokens</strong></label><br/>
                      <input type="number" min="1" value={tokenToAdd} onChange={e=>setTokenToAdd(Number(e.target.value))} style={{width:'100%',padding:6,marginTop:4}}/>
                      <button style={{...greenBtnStyle, marginTop:6}} disabled={manageLoading || !tokenToAdd} onClick={async()=>{
                        setManageLoading(true);
                        setManageMsg('');
                        try {
                          const resp = await fetch('http://localhost:3000/token-manager/attribute-tokens', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ userId: user.id, tokenNumber: tokenToAdd })
                          });
                          if (!resp.ok) throw new Error('Erreur lors de l\'ajout de tokens');
                          setManageMsg('Tokens ajoutés !');
                          setUser(u=>({...u, token: { ...(u.token||{}), tokenNumber: (u.token?.tokenNumber||0) + tokenToAdd }}));
                          setTokenToAdd(0);
                        } catch(e) {
                          setManageMsg('Erreur: '+e.message);
                        } finally { setManageLoading(false); }
                      }}>Ajouter</button>
                    </div>
                    {manageMsg && <div style={{color:manageMsg.startsWith('Erreur')?'#c0392b':'#27ae60',marginTop:4}}>{manageMsg}</div>}
                  </div>
                )}
            </div>

            <div className="user-control">
                {
                    user.status === 0 ? (
                        <>
                            <button className='activer' onClick={ActiverUser}> 
                                {loadingActiver ? <div className='loading-ring-white'></div> : <FontAwesomeIcon icon={faCheckCircle} />}
                                <span>Activer</span>
                            </button>
                            <button className='reject' onClick={RejectUser}>
                                {loadingReject ? <div className='loading-ring-white'></div> : <FontAwesomeIcon icon={faTimesCircle} />}
                                <span>Rejeter</span>
                            </button>
                        </>
                    ) : user.status === 1 ? (
                        <button className='suspendre' onClick={SuspendreUser}>
                            {loadingSuspendre ? <div className='loading-ring-white'></div> : <FontAwesomeIcon icon={faStop} />}
                            <span>Suspendre</span>
                        </button>
                    ) : null
                }
                <button className='delete' onClick={DeleteUser}>
                    {loadingDelete ? <div className='loading-ring-white'></div> : <FontAwesomeIcon icon={faTrash} />}
                    <span>Supprimer</span>
                </button>
            </div>

            <style jsx>{`
                .user-card {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px;
                    margin: 15px 0;
                    background: #fff;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                    flex-wrap: wrap;
                }

                .user-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
                }

                .user-info {
                    flex: 1;
                    min-width: 220px;
                }

                .user-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 8px;
                    flex-wrap: wrap;
                }

                .user-email {
                    font-size: 16px;
                    font-weight: 500;
                    color: #2c3e50;
                    margin: 0;
                    word-break: break-all;
                }

                .user-date {
                    color: #7f8c8d;
                    font-size: 13px;
                }

                .user-control {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .pending-badge {
                    background-color: #f1c40f;
                    color: #000;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 500;
                }

                .active-badge {
                    background-color: #2ecc71;
                    color: white;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 500;
                }

                .rejected-badge {
                    background-color: #e74c3c;
                    color: white;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 500;
                }

                .unknown-badge {
                    background-color: #95a5a6;
                    color: white;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 500;
                }

                button {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    color: white;
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }

                button:hover {
                    transform: translateY(-1px);
                }

                .activer {
                    background-color: #2ecc71;
                }

                .activer:hover {
                    background-color: #27ae60;
                }

                .suspendre {
                    background-color: #f1c40f;
                }

                .suspendre:hover {
                    background-color: #f39c12;
                }

                .delete {
                    background-color: #e74c3c;
                }

                .delete:hover {
                    background-color: #c0392b;
                }

                .reject {
                    background-color: #95a5a6;
                }

                .reject:hover {
                    background-color: #7f8c8d;
                }

                .loading-ring-white {
                    width: 18px;
                    height: 18px;
                    border: 2px solid #ffffff;
                    border-radius: 50%;
                    border-top-color: transparent;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* Responsive styles */
                @media (max-width: 900px) {
                    .user-card {
                        flex-direction: column;
                        align-items: flex-start;
                        padding: 16px;
                    }
                    .user-control {
                        width: 100%;
                        justify-content: flex-start;
                        margin-top: 12px;
                    }
                }
                @media (max-width: 600px) {
                    .user-card {
                        padding: 10px;
                        margin: 10px 0;
                    }
                    .user-info {
                        font-size: 14px;
                    }
                    .user-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 6px;
                    }
                    button {
                        width: 100%;
                        justify-content: center;
                        font-size: 13px;
                        padding: 10px 0;
                        margin-bottom: 6px;
                    }
                    .user-control {
                        flex-direction: column;
                        gap: 6px;
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    )
}

export default User
