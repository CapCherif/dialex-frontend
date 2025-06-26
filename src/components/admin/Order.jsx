import React, {useState} from 'react'
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

function Order({order}) {
    const [loadingActiver, setLoadingActiver] = useState(false)
    const [loadingReject, setLoadingReject] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    const ValiderOrder = async () => {
        setLoadingActiver(true)
        try {
            const response = await fetch(`/api/orders/validate/${order.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    state: 1
                })
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()
            order.state = 1

        } catch (error) {
            console.error("Erreur lors de l'activation :", error)
        } finally {
            setLoadingActiver(false)
        }
    }

    const RejectOrder = async () => {
        setLoadingReject(true)
        try {
            const response = await fetch(`/api/orders/reject/${order.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    state: 2
                })
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()
            order.state = 2

        } catch (error) {
            console.error("Erreur lors du rejet :", error)
        } finally {
            setLoadingReject(false)
        }
    }

    const handleDelete = async () => {
        setLoadingDelete(true)
        try {
            const response = await fetch(`/api/orders/${order.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            // Remove the order from the DOM
            const orderElement = document.querySelector(`[data-order-id="${order.id}"]`)
            if (orderElement) {
                orderElement.remove()
            }

        } catch (error) {
            console.error("Erreur lors de la suppression :", error)
        } finally {
            setLoadingDelete(false)
            setShowDeleteConfirm(false)
        }
    }

    const getStatusBadge = () => {
        switch (order.state) {
            case 1:
                return <span className="badge accepted">Accepté</span>;
            case 0:
                return <span className="badge pending">En attente</span>;
            case 2:
                return <span className="badge rejected">Rejeté</span>;
            default:
                return <span className="badge">Inconnu</span>;
        }
    };

    return (
        <div data-order-id={order.id} className="order-wrapper">
            <div className='user-card'>
                <div className="order-info">
                    <p>{order.user.email}</p>
                    <small>{format(new Date(order.createdAt), "dd MMMM yyyy, h:mm a", { locale: fr })}</small>
                    <br/>
                    <small>Durré : {order.durration} mois</small>
                </div>

                <div className="user-control">
                    {getStatusBadge()}
                    
                    <div className="action-buttons">
                        {order.state === 0 && (
                            <button className="activer" onClick={ValiderOrder}>
                                {loadingActiver && <div className="loading-ring-white"></div>}
                                <FontAwesomeIcon icon={faCheckCircle} />
                                <span>Accepter</span>
                            </button>
                        )}

                        {order.state === 0 && (
                            <button className="reject" onClick={RejectOrder}>
                                {loadingReject && <div className="loading-ring-white"></div>}
                                <FontAwesomeIcon icon={faTimes} />
                                <span>Rejeter</span>
                            </button>
                        )}

                        <button 
                            className="delete" 
                            onClick={() => setShowDeleteConfirm(true)}
                            title="Supprimer l'abonnement"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                            <span>Supprimer</span>
                        </button>
                    </div>
                </div>
            </div>

            {showDeleteConfirm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Confirmation de suppression</h2>
                        <p>Êtes-vous sûr de vouloir supprimer cet abonnement ?</p>
                        <p><strong>Email:</strong> {order.user.email}</p>
                        <p><strong>Durée:</strong> {order.durration} mois</p>
                        <div className="modal-buttons">
                            <button 
                                className="confirm-delete" 
                                onClick={handleDelete}
                                disabled={loadingDelete}
                            >
                                {loadingDelete ? 'Suppression...' : 'Confirmer la suppression'}
                            </button>
                            <button 
                                className="cancel-delete" 
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={loadingDelete}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .order-wrapper {
                    width: 100%;
                    margin-bottom: 15px;
                }

                .user-card {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    width: 100%;
                }

                .order-info {
                    flex: 1;
                }

                .user-control {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .badge {
                    padding: 6px 12px;
                    border-radius: 4px;
                    font-size: 14px;
                    font-weight: 500;
                }

                .badge.accepted {
                    background-color: #28a745;
                    color: white;
                }

                .badge.pending {
                    background-color: #ffc107;
                    color: #000;
                }

                .badge.rejected {
                    background-color: #dc3545;
                    color: white;
                }

                .action-buttons {
                    display: flex;
                    gap: 10px;
                }

                .activer {
                    padding: 10px;
                    border: 1px solid #28a745;
                    color: white;
                    background-color: #28a745;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .activer:hover:not(:disabled) {
                    background-color: #218838;
                }

                .reject {
                    padding: 10px;
                    border: 1px solid #dc3545;
                    color: white;
                    background-color: #dc3545;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .reject:hover:not(:disabled) {
                    background-color: #c82333;
                }

                .delete {
                    padding: 10px;
                    border: 1px solid #6c757d;
                    color: white;
                    background-color: #6c757d;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .delete:hover:not(:disabled) {
                    background-color: #5a6268;
                }

                .activer:disabled, .reject:disabled, .delete:disabled {
                    opacity: 0.7;
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
                    padding: 20px;
                    border-radius: 8px;
                    max-width: 400px;
                    width: 90%;
                }

                .modal-content h2 {
                    color: #dc3545;
                    margin-top: 0;
                }

                .modal-buttons {
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                    margin-top: 20px;
                }

                .confirm-delete, .cancel-delete {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .confirm-delete {
                    background-color: #dc3545;
                    color: white;
                }

                .confirm-delete:hover:not(:disabled) {
                    background-color: #c82333;
                }

                .cancel-delete {
                    background-color: #6c757d;
                    color: white;
                }

                .cancel-delete:hover:not(:disabled) {
                    background-color: #5a6268;
                }

                .confirm-delete:disabled, .cancel-delete:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .loading-ring-white {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
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

export default Order



