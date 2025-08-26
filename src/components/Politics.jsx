const Politics = () => {
  const containerStyle = {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    lineHeight: "1.7",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  };

  const titleStyle = {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1d4ed8",
    marginBottom: "10px",
  };

  const subTitleStyle = {
    textAlign: "center",
    fontSize: "22px",
    fontWeight: "600",
    color: "#222",
    marginBottom: "25px",
  };

  const sectionStyle = {
    marginBottom: "20px",
  };

  const sectionTitleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#111",
  };

  const listStyle = {
    paddingLeft: "20px",
    marginTop: "8px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>DZ DAKAA ILMY</h1>
      <h2 style={subTitleStyle}>
        Politique de Protection des Données Personnelles
      </h2>

      <div>
        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>1. INTRODUCTION</h3>
          <p>
            DZ DAKAA ILMY attache une grande importance à la protection des données
            personnelles de ses utilisateurs. Cette politique a pour objectif
            d’informer les utilisateurs de la plateforme Dzialex sur la manière
            dont leurs données sont collectées, traitées, conservées et protégées
            conformément à la législation algérienne en vigueur.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>
            2. LES PRINCIPES APPLICABLES AUX DONNÉES PERSONNELLES
          </h3>
          <ul style={listStyle}>
            <li>
              <b>2.1. Utilisation légitime et proportionnée :</b> Les données sont
              collectées pour des finalités spécifiques, explicites et légitimes.
            </li>
            <li>
              <b>2.2. Collecte loyale et transparente :</b> Les utilisateurs sont
              informés de manière claire et compréhensible sur les traitements.
            </li>
            <li>
              <b>2.3. Pertinence et minimisation :</b> Seules les données
              strictement nécessaires sont collectées.
            </li>
            <li>
              <b>2.4. Protection dès la conception :</b> Mesures techniques et
              organisationnelles dès la conception.
            </li>
          </ul>
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>3. RECUEIL DES DONNÉES PERSONNELLES</h3>
          <p>
            Les données sont collectées lors de la création d’un compte utilisateur,
            de l’utilisation des services, de la navigation ou via les formulaires
            de contact.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>4. TYPES DE DONNÉES COLLECTÉES</h3>
          <p>
            Nom, prénom, adresse email, numéro de téléphone, données de connexion,
            historique de requêtes et informations de paiement.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>5. MOMENT DE LA COLLECTE</h3>
          <p>
            À l’inscription, à l’accès aux services, lors de la navigation ou après
            un contact avec le support technique.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>6. UTILISATION DES DONNÉES</h3>
          <p>
            Fournir les services, améliorer l’expérience, assurer la sécurité et
            répondre aux demandes d’assistance.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>7. DESTINATAIRES</h3>
          <p>
            Les équipes internes et certains prestataires techniques si nécessaire.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>8. DURÉE DE CONSERVATION</h3>
          <p>
            Conservées le temps nécessaire aux finalités et conformément à la loi.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>9. COOKIES</h3>
          <p>
            Utilisés pour le bon fonctionnement, mesurer l’audience et améliorer les
            services. Paramétrables dans le navigateur.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>10. DROITS DES PERSONNES</h3>
          <p>
            Droit d’accès, rectification, opposition, suppression et portabilité des
            données. Contact par email ou via l’espace personnel.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>11. SÉCURITÉ</h3>
          <p>
            Mesures adaptées pour protéger les données contre tout accès non
            autorisé, altération, perte ou divulgation.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>12. LIENS EXTERNES</h3>
          <p>
            La plateforme peut contenir des liens vers d’autres sites dont DZ DAKAA
            ILMY n’est pas responsable.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>13. MODIFICATIONS</h3>
          <p>
            La politique peut être modifiée. Les utilisateurs seront informés en cas
            de changement majeur.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>14. CONTACT</h3>
          <p>
            Pour toute question, contactez DZ DAKAA ILMY via l’email indiqué sur la
            plateforme ou le formulaire en ligne.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Politics;
