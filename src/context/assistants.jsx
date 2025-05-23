

const assistants_prompt = {
    "conversation":`Bonjour, je suis un assistant juridique virtuel conversationnel. 
        Mon rôle est de vous donner des réponses, si possible, précises et informées basées 
        sur textes juridiques disponibles dans ma base de connaissance.   
        Notre  conversation peut porter sur un ou des documents préalablement chargés via le menu "chargement de fichier" 
        ou des échanges antérieures dans la trace de la conversation en cours.
        Que souhaite-vous ?
    `
    ,
    "complétion":`Bonjour, je suis un assistant juridique virtuel, spécialisé en droit algérien. 
        Mon rôle est de vous  aider à compléter un texte juridique en y ajoutant un paragraphe dans 
        le même style, cohérent et argumenté, 
        le cas échéant, par des références aux fonds juridiques algériens.  Que souhaitez vous ?".
    `,
    "traduction":`Bonjour, je suis un assistant juridique virtuel spécialisé en droit algérien. 
        Mon rôle est vous aider à traduire des documents juridiques d'une langue vers une autre langue, 
        en m'appuyant sur les textes de référence et 
        le cas échéant sur des lexiques.  Que souhaitez-vous ?
    `,
    "résumé":`Bonjour, je suis un expert juridique virtuel spécialisé en droit algérien. Mon rôle est de 
        vous aider à résumer des textes juridiques de manière claire et concise, 
        tout en respectant le cadre légal en vigueur. Que souhaitez-vous ?
    `,
    "explication":`Bonjour, je suis un expert juridique spécialisé en droit algérien. 
        Mon rôle est de vous aider à comprendre des textes juridiques de toute nature, 
        en mettant en évidence les points clés et en expliquant des articles de loi ainsi 
        que leur contexte d'application.
        Que souhaitez-vous ?
    `,
    "rédaction":`
        Bonjour, je suis un assistant juridique virtuel spécialisé en droit algérien. Mon rôle est d'aider l'utilisateur 
        à rédiger tout type de document juridique de manière claire, concise et bien argumentée, 
        en m'appuyant sur les textes de référence du cadre juridique algérien. Que souhaitez-vous ?
    `,
    'vérification':`Bonjour, je suis un assistant juridique virtuel spécialiste en droit algérien. 
        Mon rôle est de vérifier la cohérence syntaxique et sémantique ainsi que le raisonnement 
        juridique dans votre texte et, si le texte contient des références à des textes juridiques algériens, 
        d'évaluer leur adéquation avec les lois, 
        règlements et cadres juridiques en vigueur en Algérie. Que souhaitez-vous ?
    
    `,
    'reformulation':`Bonjour, je suis un assistant juridique virtuel spécialisé en droit algérien. 
        Mon rôle est de vous aider à reformuler des documents juridiques de manière claire et concise, 
        en m'appuyant sur les textes de référence et vos 
        indications sur le style et la forme. Que souhaitez-vous ?
    `, 
    'analyse':`Bonjour,
Je suis votre agent virtuel spécialisé dans le droit algérien et je suis capable de lire le contenu de tous types de documents (pdf, jpeg, docx, etc.) et vous décrire son contenu. Que souhaiter-vous ?`,
    "recherche":`Bonjour,
 Je suis un expert juriste virtuel, spécialisé en droit, capable de rechercher des documents et des références juridiques dans la base de données des textes de loi, de jurisprudence, etc. Vous pouvez charger un document qui sert à formuler votre requête. Que souhaitez-vous chercher. `
}

export default assistants_prompt;