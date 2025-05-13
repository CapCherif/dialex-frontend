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
  const [ok, setOk] = useState(false);

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
  }, [user]);

  if (!user) return <p>Chargement des données utilisateur...</p>;

  return (
    <div id="profile" >


      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
      <div>
        {preview ?
          <img
            src={preview}
            alt="Avatar preview"
            style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
          />:
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
          avatar !=null ?
          <button type="submit" disabled={loading} id="btn-update-avatar">
            {loading ? 'Envoi...' : 'Envoyer'}
          </button>:
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


      <div>
        <strong>Langue</strong>
        <div id="set-language">
            <select name="language" id="language" value={language} onChange={handleLanguage}>
              <option value="ar">Arabe</option>
              <option value="fr">Français</option>
            </select>
        </div>
      </div>
      <div>
        <strong>Nombre de token</strong>
        <div id="barre">
          <div id="progress"></div>
        </div>
      </div>



      <div>
      <Link to="/" style={{ textDecoration: "none" }} className="btn light-btn">
      
          Retour
  
        </Link >
       <Link to="/abonnement" style={{ textDecoration: "none" }} className="btn green-btn">
     
          Prolonger votre abonnement
    
       </Link> 
      </div>
      

    </div>
  );
};

export default Profile;
