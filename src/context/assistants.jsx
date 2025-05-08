

const assistants_prompt = {
    "conversation":`Bonjour ! Comment puis-je vous aider aujourd'hui ? Si vous avez des questions juridiques ou besoin
     d'information sur un sujet spécifique, n'hésitez pas à me le faire savoir.
    `
    ,
    "complétion":`Bonjour ! Je suis votre assistant juridique virtuel, spécialisé en droit algérien. Je suis ici pour vous aider à compléter un texte juridique en rajoutant un paragraphe adapté. Pour commencer, pourriez-vous me fournir le texte que vous souhaitez que je complète ? Si vous souhaitez charger un document, utilisez le menu "chargement de document".
    `,
    "traduction":`Bonjour ! Comment puis-je vous aider aujourd'hui ? Si vous avez besoin d'une traduction juridique, donnez le texte ou chargez le document via le menu "chargement de document".
    `,
    "résumé":`Bonjour ! Je suis votre expert juridique virtuel spécialisé en droit algérien. Comment puis-je vous aider aujourd'hui ? 
        Si vous avez un document ou un texte que vous souhaitez que je résume, n'hésitez pas à le partager via le menu "chargement de document". 
    `,
    "explication":`Bonjour ! Je suis à votre disposition. Avez-vous un texte juridique spécifique que vous souhaitez analyser ou des questions particulières concernant le droit algérien ? N'hésitez pas à me transmettre vos questions avec le texte ou le document via le menu "chargement de document".
    `,
    "rédaction":`Bonjour, je suis votre expert juridique virtuel spécialisé en droit algérien. Mon objectif est de vous aider à rédiger tout type de document juridique de manière claire, concise et bien argumentée, en m'appuyant sur les textes de référence du cadre juridique algérien.
        Pour commencer, pourriez-vous me préciser la nature du document que vous souhaitez rédiger (contrat, acte juridique, lettre de mise en demeure, etc.) ? En fonction du type de document, je vous poserai quelques questions pour recueillir tous les détails nécessaires afin de garantir que le contenu soit complet et conforme aux exigences légales.
        Une fois que j'aurai toutes les informations, je vous proposerai un projet de document. Et si vous n'êtes pas entièrement satisfait de ma proposition, souhaitez-vous que nous la révisions ensemble ?
    `,
    'vérification':`Bonjour ! Comment puis-je vous aider aujourd'hui ? N'hésitez pas à me transmettre le texte ou le fichier - via le menu "chargement de document" - que vous souhaitez faire vérifier ou analyser.
    
    `,
    'reformulation':`Bonjour ! Je suis votre assistant juridique virtuel spécialisé en droit algérien. Comment puis-je vous aider aujourd'hui ? Si vous avez un texte que vous souhaitez reformuler ou adapter dans un autre contexte juridique, n'hésitez pas à me le transmettre. Si vous souhaitez le faire à partir d'un document, donnez le via le menu "chargement de document"
    `, 
    'analyse':`Bonjour, je suis un expert dans la lecture de contenus de documents, les documents à chargés doivent être au format pdf, docx ou txt. Je te donnerai un résumé aprés lecture. `
}

export default assistants_prompt;