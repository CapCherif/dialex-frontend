import React from "react";
import myImage from "./../../assets/landing.png"; // adjust path as needed
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div className="landing">
     <header className="headerLanding">
        <h1>DZIALEX</h1>
       <Link to={"/login"} >
       <button className="connexion"> connexion</button>
       </Link> 
     </header>

      <div className="contentLanding">
        <img src={myImage} alt="" className="self-center" />
        <p className="decorationTitle">Le portail de l’assistant juridiques virtuel spécialiste du droit algérien </p>
        <p className="paragraphe">DZIALEX représente une avancée significative pour les professionnels du droit, leur permettant d'optimiser leur productivité et d'améliorer leur efficacité. Grâce à ses capacités rédactionnelles et analytiques, cet outil aide les avocats et juristes à expertiser rapidement des situations complexes, facilitant ainsi une évaluation précise des cas. En déchiffrant le langage technique des textes législatifs, DZIALEX offre une compréhension approfondie des enjeux juridiques, ce qui permet aux professionnels de prendre des décisions éclairées. De plus, sa fonction de recherche documentaire efficace permet d'extraire des informations pertinentes, réduisant le temps consacré à la recherche. En évaluant la complexité d'un dossier, DZIALEX aide également à chiffrer le coût des prestations, ce qui peut attirer davantage de clients. En somme, cet assistant virtuel se positionne comme un allié stratégique pour les praticiens du droit, leur permettant de naviguer avec aisance dans un environnement juridique en constante évolution. (En savoir plus)
           </p>
       
        <p className="paragraphe">
        Découvrez par vous-même comment DZIALEX peut transformer votre approche du droit algérien.
        </p>
        <button className="self-center btn-connexion">
          Essayer DZIALEX
        </button>
        <p className="paragraphe">
        Demandez une démo personnalisée ou commencez votre essai gratuit !  
        </p>
        <h1 className="title-landing">DZIALEX : Votre Assistant Spécialisé en Droit Algérien </h1>

        <p className="paragraphe">
        Dans un paysage juridique algérien en évolution rapide, naviguer parmi les textes législatifs et réglementaires peut s'avérer complexe. Que vous soyez un professionnel du droit cherchant la précision, un étudiant en quête de clarté ou un citoyen souhaitant comprendre ses droits, une compréhension approfondie est essentielle. 
        </p>

        <p className="paragraphe">
        C'est pour répondre à ce besoin que DZIALEX a été conçu. Il s'agit d'un assistant virtuel intelligent, entièrement dédié au droit algérien, offrant des fonctionnalités pensées pour vous faire gagner en temps et en efficacité. 
        </p>

        <h1 className="title-landing">Analyse Juridique Approfondie  </h1>
        <p className="paragraphe">
        DZIALEX excelle dans l'analyse et l'interprétation des textes de loi, décrets et autres documents réglementaires algériens. Il est capable de décrypter le langage technique pour vous permettre de saisir les nuances législatives complexes. En reliant les dispositions entre elles, DZIALEX vous aide à obtenir une vision claire et structurée des enjeux juridiques, par exemple en analysant les implications d'une nouvelle loi de finance ou en décortiquant les articles d'un code spécifique, facilitant ainsi votre prise de décision. 
        </p>


        <h1 className="title-landing">Recherche Documentaire Efficace  </h1>
        <p className="paragraphe">
        Gagnez un temps précieux avec la fonction de recherche documentaire avancée de DZIALEX. L'assistant passe au crible vos documents (lois, statuts, directives, jurisprudence...) pour extraire rapidement les informations pertinentes. Cette capacité est cruciale pour les professionnels du droit qui doivent trouver instantanément toutes les dispositions relatives à un sujet précis ou comparer différentes versions d'un texte réglementaire avec précision. 
        </p>

        <h1 className="title-landing">Assistance à la Création et Structuration de Documents Juridiques </h1>
        <p className="paragraphe">
        DZIALEX vous apporte un soutien méthodologique et structurel pour la création de vos documents juridiques. Il vous aide à planifier, organiser et formater vos contenus de manière rigoureuse, que vous prépariez un mémoire universitaire, une consultation juridique pour un client, ou une note interne sur un point de droit spécifique. Cette assistance est conçue pour vous permettre de produire des travaux de haute qualité, conformes aux standards académiques et professionnels. 
        </p>

        <h1 className="title-landing">Reformulation et Résumé de Textes Complexes </h1>
        <p className="paragraphe">
        Confronté à un texte juridique dense ou particulièrement long DZIALEX peut en extraire l'essence. Notre fonctionnalité de reformulation et de résumé condense l'information tout en veillant à préserver l'intégralité des points cruciaux. Cela vous permet de synthétiser rapidement une décision de justice, un long rapport législatif ou un article de doctrine pour en saisir l'essentiel de manière accessible. 
        </p>
        <h1 className="title-landing">Assistance Adaptée à Vos Besoins  </h1>
        <p className="paragraphe">
        Chaque question juridique est unique. Grâce à son interface conversationnelle interactive, DZIALEX s'adapte à vos interrogations spécifiques. Posez vos questions sur le fonctionnement d'une loi particulière ou sollicitez des éclaircissements sur une problématique précise ; DZIALEX module ses réponses pour vous fournir le soutien le plus pertinent possible. 
        </p>
        <h1 className="title-landing">DZIALEX : Un Focus Unique sur le Droit Algérien </h1>
        <p className="paragraphe">
        L'une des forces majeures de DZIALEX est sa connaissance pointue du droit algérien. Nous vous fournissons des éclaircissements fiables sur la législation en vigueur (lois, décrets...), et vous aidons à comprendre leurs implications concrètes sur les aspects économiques et administratifs de votre activité professionnelle ou de votre vie quotidienne. Cette expertise fait de DZIALEX un partenaire essentiel pour quiconque doit interagir avec le cadre juridique algérien. 
        </p>

        <h1 className="title-landing">Accédez à l'Expertise Juridique avec DZIALEX  </h1>
        <p className="paragraphe">
        En résumé, DZIALEX est votre allié stratégique pour maîtriser le droit algérien. Grâce à ses fonctionnalités d'analyse, de recherche, de création et de résumé, combinées à son expertise pointue et son assistance adaptée, DZIALEX rend le droit algérien plus accessible et compréhensible que jamais. 
        </p>

        </div>

      
      
    </div>
  );
}
export default Landing;