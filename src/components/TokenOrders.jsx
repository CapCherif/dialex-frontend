import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function TokenOrders() {
    const [orders, setOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ text: '', type: '' })
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if(!token) {
            navigate('/login')
        }
        fetchOrders()
    }, [])

    useEffect(() => {
        filterOrders()
    }, [searchTerm, orders])

    const filterOrders = () => {
        if (!searchTerm.trim()) {
            setFilteredOrders(orders)
            return
        }

        const searchTermLower = searchTerm.toLowerCase().trim()
        const filtered = orders.filter(order => 
            order.id.toString().includes(searchTermLower) ||
            order.user.email.toLowerCase().includes(searchTermLower)
        )
        setFilteredOrders(filtered)
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:3000/token-manager/orders', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setMessage({ text: 'Erreur lors du chargement des commandes', type: 'error' });
        }
    };

    const validateOrder = async (orderId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/token-manager/orders/${orderId}/validate`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to validate order');
            }

            setMessage({ text: 'Commande validée avec succès', type: 'success' });
            fetchOrders(); // Refresh the orders list
        } catch (error) {
            console.error('Error validating order:', error);
            setMessage({ text: 'Erreur lors de la validation de la commande', type: 'error' });
        }
        setLoading(false);
    };

    return (
        <div className="admin-container">
            <h1>Gestion des Commandes de Tokens</h1>
            
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Rechercher par ID de commande ou email..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
            </div>
            
            {message.text && (
                <div className={`alert ${message.type === 'error' ? 'alert-error' : 'alert-success'}`}>
                    {message.text}
                </div>
            )}

            <div className="orders-list">
                {filteredOrders.length === 0 ? (
                    <div className="no-results">
                        {searchTerm ? 'Aucune commande trouvée' : 'Aucune commande disponible'}
                    </div>
                ) : (
                    filteredOrders.map(order => (
                        <div key={order.id} className="order-card">
                            <div className="order-header">
                                <div className="order-id">Commande #{order.id}</div>
                                <div className={`order-status ${order.isValidated ? 'validated' : 'pending'}`}>
                                    {order.isValidated ? 'Activée' : 'En attente'}
                                </div>
                            </div>
                            
                            <div className="order-body">
                                <div className="user-info">
                                    <h3>Information Client</h3>
                                    <p><strong>Nom:</strong> {order.user.fullName}</p>
                                    <p><strong>Email:</strong> {order.user.email}</p>
                                    <p><strong>Téléphone:</strong> {order.user.phoneNumber}</p>
                                    <p><strong>Cabinet:</strong> {order.user.cabinet}</p>
                                </div>
                                
                                <div className="order-details">
                                    <h3>Détails de la Commande</h3>
                                    <div className="detail-row">
                                        <span>Nombre de Tokens:</span>
                                        <span className="token-amount">{order.tokenAmount}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span>Prix Total:</span>
                                        <span className="price">{order.price} DZ</span>
                                    </div>
                                    <div className="detail-row">
                                        <span>Date de Création:</span>
                                        <span>{new Date(order.createdAt).toLocaleDateString('fr-FR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}</span>
                                    </div>
                                    {order.validatedAt && (
                                        <div className="detail-row">
                                            <span>Date de Validation:</span>
                                            <span>{new Date(order.validatedAt).toLocaleDateString('fr-FR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="order-actions">
                                {!order.isValidated && (
                                    <button 
                                        onClick={() => validateOrder(order.id)}
                                        disabled={loading}
                                        className="validate-btn"
                                    >
                                        {loading ? 'Validation en cours...' : 'Valider la commande'}
                                    </button>
                                )}
                                {order.isValidated && (
                                    <div className="validated-message">
                                        ✓ Commande activée
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <style jsx>{`
                .admin-container {
                    padding: 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                h1 {
                    color: #2c3e50;
                    margin-bottom: 30px;
                    font-size: 24px;
                }

                .orders-list {
                    display: grid;
                    gap: 20px;
                }

                .order-card {
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    overflow: hidden;
                }

                .order-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 20px;
                    background: #f8f9fa;
                    border-bottom: 1px solid #eee;
                }

                .order-id {
                    font-weight: 600;
                    color: #2c3e50;
                }

                .order-status {
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 500;
                }

                .order-status.pending {
                    background-color: #fff3cd;
                    color: #856404;
                }

                .order-status.validated {
                    background-color: #d4edda;
                    color: #155724;
                }

                .order-body {
                    padding: 20px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                }

                .user-info, .order-details {
                    padding: 15px;
                    background: #f8f9fa;
                    border-radius: 6px;
                }

                h3 {
                    color: #2c3e50;
                    margin-bottom: 15px;
                    font-size: 16px;
                }

                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    padding: 8px 0;
                    border-bottom: 1px solid #eee;
                }

                .detail-row:last-child {
                    border-bottom: none;
                }

                .token-amount {
                    font-weight: 600;
                    color: #2c3e50;
                }

                .price {
                    font-weight: 600;
                    color: #28a745;
                }

                .order-actions {
                    padding: 20px;
                    background: #f8f9fa;
                    border-top: 1px solid #eee;
                    text-align: right;
                }

                .validate-btn {
                    background-color: #28a745;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: 500;
                }

                .validate-btn:hover {
                    background-color: #218838;
                    transform: translateY(-1px);
                }

                .validate-btn:disabled {
                    background-color: #6c757d;
                    cursor: not-allowed;
                    transform: none;
                }

                .validated-message {
                    color: #155724;
                    font-weight: 500;
                }

                .alert {
                    padding: 15px;
                    margin-bottom: 20px;
                    border-radius: 4px;
                    font-weight: 500;
                }

                .alert-success {
                    background-color: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                }

                .alert-error {
                    background-color: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                }

                @media (max-width: 768px) {
                    .order-body {
                        grid-template-columns: 1fr;
                    }
                }

                .search-container {
                    margin-bottom: 20px;
                }

                .search-input {
                    width: 100%;
                    max-width: 500px;
                    padding: 12px 16px;
                    font-size: 16px;
                    border: 2px solid #ddd;
                    border-radius: 8px;
                    transition: border-color 0.3s ease;
                    outline: none;
                }

                .search-input:focus {
                    border-color: #28a745;
                }

                .search-input::placeholder {
                    color: #6c757d;
                }

                .no-results {
                    text-align: center;
                    padding: 40px;
                    background: white;
                    border-radius: 8px;
                    color: #6c757d;
                    font-size: 16px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    )
}

export default TokenOrders 