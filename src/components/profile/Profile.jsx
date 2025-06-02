import { useEffect, useState } from "react";
import { useAppContext } from "../../context/Context";
import { Link } from "react-router-dom";
import UserAvatar from "../../assets/user.png"


import { faCheck, faUpload} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Profile = () => {
  const { user, language, setLanguage } = useAppContext();

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [abonnement, setAbonnement] = useState(null);
  const [ok, setOk] = useState(false);
  const getUserAbonnement = async ()=> {
    const response = await fetch(`http://localhost:3000/abonnement/${user.id}`);
    const data = await response.json();
    setAbonnement(data)
    console.log(data);
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!avatar) return;

    const formData = new FormData();
    formData.append('file', avatar);
    formData.append('userId', user.id);

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:3000/users/avatar`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      console.log('Upload réussi :', data);
      setAvatar(null)
      setOk(true)
      setTimeout(() => {
        setOk(false)
      }, 3000);
    } catch (err) {
      console.error('Erreur upload :', err);
    } finally {
      setLoading(false);
    }
  };




  const handleLanguage = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
  };

  useEffect(() => {
    if (user && user.avatar) {
      setPreview("http://localhost:3000" + user.avatar);
    }
    if(user && user.id){
      getUserAbonnement()
    }
  }, [user]);

  if (!user) return <p>Chargement des données utilisateur...</p>;

  // Helper to format date as "1 avril 2036"
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const months = [
      "janvier", "février", "mars", "avril", "mai", "juin",
      "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div id="profile" >

      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <div>
          {preview ?
            <img
              src={preview}
              alt="Avatar preview"
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
            /> :
            <img
              src={UserAvatar}
              alt="Avatar preview"
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
            />
          }
        </div>

        <div className="control">
          <label htmlFor="avatar-upload" style={{ cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faUpload} id="upload-img" />
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          {
            avatar != null ?
              <button type="submit" disabled={loading} id="btn-update-avatar">
                {loading ? 'Envoi...' : 'Envoyer'}
              </button> :
              <></>
          }
          {
            ok ?
              <FontAwesomeIcon icon={faCheck} id="ok-icon" />
              : null
          }
        </div>
      </form>

      <h1>Profil Utilisateur</h1>
      <div>
        <strong>ID:</strong> <span>{user.id}</span>
      </div>

      <div>
        <strong>Nom:</strong> <span>{user.name}</span>
      </div>

      <div>
        <strong>Email:</strong> <span>{user.email}</span>
      </div>

      <div >
        <strong>Actif:</strong> <span>{user.isActive ? "Oui" : "Non"}</span>
      </div>

      <div >
        <strong>Expiration abonnement:</strong> <span>{abonnement ? formatDate(abonnement.ExpirationDate) : 'N/A'}</span>
      </div>

      <div>
        <strong>Langue</strong>
        <div id="set-language">
          <select name="language" id="language" value={language} onChange={handleLanguage}>
            <option value="ar">Arabe</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>

      <div className="token-section">
        <div className="token-display">
          <div className="token-icon">🪙</div>
          <div className="token-info">
            <div className="token-label">Solde de tokens</div>
            <div className="token-amount">{user?.token ? user.token.tokenNumber : '0'}</div>
          </div>
        </div>
        {!user?.token && (
          <div className="no-tokens-message">
            Vous n'avez pas encore de tokens
          </div>
        )}
      </div>

      <div className="action-buttons">
        <Link to="/" className="btn light-btn">
          Retour
        </Link>
        <Link to="/abonnement" className="btn green-btn">
          Prolonger votre abonnement
        </Link>
        <Link to="/achat-token" className="btn green-btn">
          Acheter des tokens
        </Link>
      </div>

      <style jsx>{`
        #profile {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        h1 {
          color: #2c3e50;
          text-align: center;
          margin: 20px 0;
          font-size: 24px;
        }

        .token-section {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          margin: 20px 0;
          text-align: center;
        }

        .token-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 10px;
        }

        .token-icon {
          font-size: 32px;
          background: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .token-info {
          text-align: left;
        }

        .token-label {
          color: #6c757d;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .token-amount {
          font-size: 28px;
          font-weight: 600;
          color: #28a745;
        }

        .no-tokens-message {
          color: #dc3545;
          font-size: 14px;
          margin-top: 10px;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .btn {
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .light-btn {
          background: #f8f9fa;
          color: #2c3e50;
          border: 1px solid #dee2e6;
        }

        .green-btn {
          background: #28a745;
          color: white;
        }

        .light-btn:hover {
          background: #e9ecef;
        }

        .green-btn:hover {
          background: #218838;
          transform: translateY(-1px);
        }

        #set-language {
          margin: 10px 0;
        }

        #language {
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #dee2e6;
          width: 200px;
        }

        div > strong {
          display: inline-block;
          min-width: 120px;
          color: #495057;
        }

        div > span {
          color: #2c3e50;
        }

        .control {
          margin: 15px 0;
        }

        #upload-img {
          font-size: 24px;
          color: #6c757d;
          margin: 10px;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        #upload-img:hover {
          color: #28a745;
        }

        #btn-update-avatar {
          background: #28a745;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin-left: 10px;
        }

        #ok-icon {
          color: #28a745;
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};

export default Profile;
