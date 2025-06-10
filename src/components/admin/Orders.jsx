import React, {useState, useEffect} from 'react'
import { GetAllOrders } from './func'
import Order from './Order'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons";

function Orders() {
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])
    const [searchEmail, setSearchEmail] = useState('')
    const [searchState, setSearchState] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [loadingAction, setLoadingAction] = useState(null)
    const itemsPerPage = 25

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await GetAllOrders()
                setOrders(data)
                console.log(data)
            } catch (err) {
                console.error("Erreur lors de la récupération des abonnés :", err)
            } finally {
                setLoading(false)
            }
        }

        setTimeout(() => {
            fetchOrders()
        }, 1000);
    }, [])

    const handleAction = async (orderId, action) => {
        setLoadingAction(orderId)
        try {
            const response = await fetch(`http://localhost:3000/orders/validate/${orderId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    state: action === 'accept' ? 1 : -1
                })
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            // Update the order state in the local state
            setOrders(orders.map(order => 
                order.id === orderId 
                    ? { ...order, state: action === 'accept' ? 1 : -1 }
                    : order
            ))

        } catch (error) {
            console.error("Erreur lors de l'action :", error)
        } finally {
            setLoadingAction(null)
        }
    }

    // Filter orders based on search criteria
    const filteredOrders = orders.filter(order => {
        const emailMatch = order.user.email.toLowerCase().includes(searchEmail.toLowerCase())
        const stateMatch = searchState === 'all' || order.state === parseInt(searchState)
        return emailMatch && stateMatch
    })

    // Calculate pagination
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className='content-users'>
            <h2>Abonnés:</h2>

            <div className="filters-container">
                <div className="search-filters">
                    <div className="search-box ">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input
                            style={{width: '50%'}}
                            type="text"
                            placeholder="Rechercher par email..."
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                        />
                    </div>
                    <select 
                        value={searchState} 
                        onChange={(e) => setSearchState(e.target.value)}
                        className="state-filter"
                    >
                        <option value="all">Tous les états</option>
                        <option value="0">En attente</option>
                        <option value="1">Accepté</option>
                        <option value="-1">Rejeté</option>
                    </select>
                </div>
            </div>

            {
                loading ? (
                    <div className="conv-loading"></div>
                ) : null
            }

            {
                paginatedOrders.map((order, index) => {
                    return (
                        <div key={index} className="order-container">
                            <div className="order-content">
                                <Order order={order} />
                               
                            </div>
                        </div>
                    )
                })
            }

            {totalPages > 1 && (
                <div className="pagination">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination-button"
                    >
                        Précédent
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="pagination-button"
                    >
                        Suivant
                    </button>
                </div>
            )}

            <style jsx>{`
                .filters-container {
                    margin-bottom: 20px;
                }

                .search-filters {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                    flex-wrap: wrap;
                }

                .search-box {
                    position: relative;
                    flex: 1;
                    min-width: 200px;
                }

                .search-icon {
                    position: absolute;
                    left: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #666;
                }

                .search-box input {
                    width: 100%;
                    padding: 10px 10px 10px 35px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-size: 14px;
                }

                .state-filter {
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-size: 14px;
                    min-width: 150px;
                    background-color: white;
                }

                .order-container {
                    margin-bottom: 15px;
                }

                .order-content {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .order-actions {
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

                .activer:disabled, .reject:disabled {
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

                .pagination {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 20px;
                }

                .pagination-button {
                    padding: 8px 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    background: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .pagination-button:hover:not(:disabled) {
                    background: #f0f0f0;
                }

                .pagination-button.active {
                    background: #007bff;
                    color: white;
                    border-color: #007bff;
                }

                .pagination-button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                @media (max-width: 768px) {
                    .search-filters {
                        flex-direction: column;
                        align-items: stretch;
                    }

                    .search-box {
                        width: 100%;
                    }

                    .state-filter {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    )
}

export default Orders
