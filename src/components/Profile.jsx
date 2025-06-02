import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch profile');
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="avatar-section">
                    <img 
                        src={user?.avatar || '/default-avatar.png'} 
                        alt="Profile" 
                        className="avatar-image"
                    />
                    <h1>{user?.fullName}</h1>
                </div>
            </div>

            <div className="info-grid">
                <div className="info-card user-details">
                    <h2>Informations Personnelles</h2>
                    <div className="info-row">
                        <span className="label">Email:</span>
                        <span className="value">{user?.email}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Téléphone:</span>
                        <span className="value">{user?.phoneNumber}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Adresse:</span>
                        <span className="value">{user?.address}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Cabinet:</span>
                        <span className="value">{user?.cabinet}</span>
                    </div>
                </div>

                <div className="info-card subscription-status">
                    <h2>État de l'Abonnement</h2>
                    {user?.abonnement ? (
                        <>
                            <div className="status-badge active">
                                {user.abonnement.state === 1 ? 'Actif' : 'Inactif'}
                            </div>
                            <div className="info-row">
                                <span className="label">Expire le:</span>
                                <span className="value">
                                    {new Date(user.abonnement.ExpirationDate).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="status-badge inactive">
                            Aucun abonnement actif
                        </div>
                    )}
                </div>

                <div className="info-card token-balance">
                    <h2>Solde de Tokens</h2>
                    {user?.token ? (
                        <div className="token-info">
                            <div className="token-circle">
                                <div className="token-icon">🪙</div>
                                <div className="token-amount">
                                    <span className="token-number">{user.token.tokenNumber}</span>
                                    <span className="token-label">tokens</span>
                                </div>
                            </div>
                            <div className="token-details">
                                <div className="info-row">
                                    <span className="label">Nombre de tokens:</span>
                                    <span className="value highlight">{user.token.tokenNumber}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Dernière mise à jour:</span>
                                    <span className="value">{new Date(user.token.updatedAt).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="no-tokens">
                            <div className="token-circle empty">
                                <div className="token-icon">🪙</div>
                                <div className="token-amount">
                                    <span className="token-number">0</span>
                                    <span className="token-label">tokens</span>
                                </div>
                            </div>
                            <span>Aucun token disponible</span>
                            <a href="/achat-token" className="buy-tokens-btn">
                                Acheter des tokens
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .profile-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .profile-header {
                    text-align: center;
                    margin-bottom: 40px;
                }

                .avatar-section {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                }

                .avatar-image {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 4px solid #fff;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }

                .info-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 20px;
                    margin-top: 20px;
                }

                .info-card {
                    background: white;
                    border-radius: 12px;
                    padding: 24px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                h1 {
                    font-size: 24px;
                    color: #2c3e50;
                    margin: 0;
                }

                h2 {
                    font-size: 18px;
                    color: #2c3e50;
                    margin: 0 0 20px 0;
                    padding-bottom: 10px;
                    border-bottom: 2px solid #f0f2f5;
                }

                .info-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 12px;
                    padding: 8px 0;
                }

                .label {
                    color: #6c757d;
                    font-weight: 500;
                }

                .value {
                    color: #2c3e50;
                    font-weight: 500;
                }

                .status-badge {
                    display: inline-block;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-weight: 500;
                    margin-bottom: 20px;
                }

                .active {
                    background-color: #d4edda;
                    color: #155724;
                }

                .inactive {
                    background-color: #f8d7da;
                    color: #721c24;
                }

                .token-info {
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                }

                .token-circle {
                    background: #f8f9fa;
                    border-radius: 50%;
                    width: 150px;
                    height: 150px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    border: 3px solid #28a745;
                }

                .token-circle.empty {
                    border-color: #dc3545;
                }

                .token-icon {
                    font-size: 32px;
                    margin-bottom: 5px;
                }

                .token-amount {
                    text-align: center;
                }

                .token-number {
                    font-size: 28px;
                    font-weight: 700;
                    color: #28a745;
                    display: block;
                }

                .token-label {
                    font-size: 16px;
                    color: #6c757d;
                }

                .token-details {
                    width: 100%;
                    background: #f8f9fa;
                    border-radius: 8px;
                    padding: 15px;
                }

                .highlight {
                    color: #28a745;
                    font-weight: 700;
                }

                .no-tokens {
                    text-align: center;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                }

                .no-tokens .token-number {
                    color: #dc3545;
                }

                .buy-tokens-btn {
                    display: inline-block;
                    background-color: #28a745;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 6px;
                    text-decoration: none;
                    font-weight: 500;
                    transition: background-color 0.2s;
                }

                .buy-tokens-btn:hover {
                    background-color: #218838;
                }

                @media (max-width: 768px) {
                    .info-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}

export default Profile; 