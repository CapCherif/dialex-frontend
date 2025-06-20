import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faStop, faTrash, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function User({userData, onUserUpdate}) {
    const [loadingActiver, setLoadingActiver]=useState(false)
    const [loadingSuspendre, setLoadingSuspendre]=useState(false)
    const [loadingDelete, setLoadingDelete]=useState(false)
    const [loadingReject, setLoadingReject]=useState(false)
    const [user, setUser] = useState(userData)

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

    return (
        <div className='user-card'>
            <div className="user-info">
                <div className="user-header">
                    <p className="user-email">{user.email}</p>
                    <span className={getUserStatus().class}>{getUserStatus().text}</span>
                </div>
                <small className="user-date">{new Date(user.createdAt).toLocaleDateString()}</small>
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
                }

                .user-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
                }

                .user-info {
                    flex: 1;
                }

                .user-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 8px;
                }

                .user-email {
                    font-size: 16px;
                    font-weight: 500;
                    color: #2c3e50;
                    margin: 0;
                }

                .user-date {
                    color: #7f8c8d;
                    font-size: 13px;
                }

                .user-control {
                    display: flex;
                    gap: 12px;
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
            `}</style>
        </div>
    )
}

export default User
