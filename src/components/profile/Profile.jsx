import { useEffect } from "react";
import { useAppContext } from "../../context/Context";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAppContext();

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (!user) return <p>Chargement des données utilisateur...</p>;

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "12px",
        backgroundColor: "#fdfdfd",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <img
        src="https://docs.gravatar.com/wp-content/uploads/2025/02/avatar-mysteryperson-20250210-256.png?w=256"
        alt="Avatar"
        style={{
          borderRadius: "50%",
          width: "120px",
          height: "120px",
          objectFit: "cover",
          marginBottom: "20px",
        }}
      />
      <h1 style={{ color: "#333", marginBottom: "10px" }}>Profil Utilisateur</h1>
      <div style={{ marginBottom: "15px" }}>
        <strong>ID:</strong> <span>{user.id}</span>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <strong>Nom:</strong> <span>{user.name}</span>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <strong>Email:</strong> <span>{user.email}</span>
      </div>
      <div style={{ marginBottom: "25px" }}>
        <strong>Actif:</strong> <span>{user.isActive ? "Oui" : "Non"}</span>
      </div>
      <div>
      <Link to="/" style={{ textDecoration: "none" }}>
        <button
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#ccc",
            cursor: "pointer",
          }}
         
        >
          Retour
        </button>
        </Link >
       <Link to="/abonnement" style={{ textDecoration: "none" }}>
       <button
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#007BFF",
            color: "#fff",
            cursor: "pointer",
          }}
        
        >
          Acheter
        </button>
       </Link> 
      </div>
    </div>
  );
};

export default Profile;
