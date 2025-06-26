import React, {useState} from 'react'
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faStop, faTimes, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

function Abonne({abonne, onUpdate}) {
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [localAbonne, setLocalAbonne] = useState(abonne);

  const handleSuspend = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/abonnement/${localAbonne.id}/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      setLocalAbonne(prev => ({ ...prev, isActive: false }));
      onUpdate && onUpdate();
      setShowConfirmModal(false);
      
    } catch (err) {
      console.error("Erreur lors de la suspension:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/abonnement/${localAbonne.id}/activate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      setLocalAbonne(prev => ({ ...prev, isActive: true }));
      onUpdate && onUpdate();
      setShowConfirmModal(false);
      
    } catch (err) {
      console.error("Erreur lors de l'activation:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = () => {
    if (!localAbonne.isActive) {
      return <span className="badge suspended">Suspendu</span>;
    }
    switch (localAbonne.state) {
      case 1:
        return <span className="badge accepted">Accepté</span>;
      case 0:
        return <span className="badge pending">En attente</span>;
      case -1:
        return <span className="badge rejected">Rejeté</span>;
      default:
        return <span className="badge">Inconnu</span>;
    }
  };

  return (
    <div>
      <div className='user-card'>
        <div>
          <p>{localAbonne.user ? localAbonne.user.email : "N/A"}</p>
          <small>Date de création: {format(new Date(localAbonne.createdAt), "dd MMMM yyyy, h:mm a", { locale: fr })}</small>
          <br/>
          <br/>
          
          <small>Date De fin: {format(new Date(localAbonne.ExpirationDate), "dd MMMM yyyy, h:mm a", { locale: fr })}</small>
        </div>

        <div className="user-control">
          {getStatusBadge()}
          
          {loading ? (
            <div className="loading-ring-white"></div>
          ) : (
            <div className="action-buttons">
            
              
              {localAbonne.state !== 1 && (
                <button 
                  className="accept-button" 
                  onClick={() => {
                    setSelectedAction('activate');
                    setShowConfirmModal(true);
                  }}
                  title="Accepter l'abonnement"
                >
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <span>Accepter</span>
                </button>
              )}
              
              {localAbonne.state !== 0 && (
                <button 
                  className="pending-button"
                  onClick={() => handleSuspend()}
                  title="Mettre en attente"
                >
                  <FontAwesomeIcon icon={faStop} />
                  <span>En attente</span>
                </button>
              )}
              
              {localAbonne.state !== -1 && (
                <button 
                  className="reject-button"
                  onClick={() => handleSuspend()}
                  title="Rejeter l'abonnement"
                >
                  <FontAwesomeIcon icon={faTimes} />
                  <span>supprimer</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

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
                disabled={loading}
              >
                {loading ? 'Traitement en cours...' : 'Confirmer'}
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
        .badge {
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          margin-right: 15px;
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

        .badge.suspended {
          background-color: #6c757d;
          color: white;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
        }

        .accept-button, .pending-button, .reject-button, .suspend-button, .activate-button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .accept-button {
          background-color: #28a745;
          color: white;
        }

        .accept-button:hover {
          background-color: #218838;
        }

        .pending-button {
          background-color: #ffc107;
          color: #000;
        }

        .pending-button:hover {
          background-color: #e0a800;
        }

        .reject-button {
          background-color: #dc3545;
          color: white;
        }

        .reject-button:hover {
          background-color: #c82333;
        }

        .suspend-button {
          background-color: #6c757d;
          color: white;
        }

        .suspend-button:hover {
          background-color: #5a6268;
        }

        .activate-button {
          background-color: #17a2b8;
          color: white;
        }

        .activate-button:hover {
          background-color: #138496;
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

        .confirm-btn {
          background-color: #007bff;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .cancel-btn {
          background-color: #6c757d;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .confirm-btn:hover {
          background-color: #0056b3;
        }

        .cancel-btn:hover {
          background-color: #5a6268;
        }

        .confirm-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Abonne
