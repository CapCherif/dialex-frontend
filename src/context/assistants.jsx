

const assistants_prompt = {
    "conversation":`Bonjour ! Comment puis-je vous aider aujourd'hui ? Si vous avez des questions juridiques ou besoin
     d'information sur un sujet spécifique, n'hésitez pas à me le faire savoir.
    `
    ,
    "complétion":`Bonjour ! Je suis votre assistant juridique virtuel, spécialisé en droit algérien. Je suis ici pour vous aider à compléter un texte juridique en rajoutant un paragraphe adapté. Pour commencer, pourriez-vous me fournir le texte que vous souhaitez que je complète ? Assurez-vous que votre fichier est au format docx, pdf, png ou jpeg. Si vous rencontrez des problèmes pour charger le fichier, veuillez le reformater pour retirer les caractères inappropriés.
    `,
    "traduction":`Bonjour ! Comment puis-je vous aider aujourd'hui ? Avez-vous besoin d'une traduction ou d'une assistance juridique concernant l'un des documents que vous avez téléchargés ?
    `,
    "résumé":`Bonjour ! Je suis votre expert juridique virtuel spécialisé en droit algérien. Comment puis-je vous aider aujourd'hui ? 
        Si vous avez un document ou un texte que vous souhaitez que je résume, n'hésitez pas à le partager. Si vous avez plusieurs documents, 
        je suis également à votre disposition pour vous aider à contextualiser le contenu.
    `,
    "explication":`Bonjour ! Je suis à votre disposition. Avez-vous un texte juridique spécifique que vous souhaitez analyser ou des questions particulières concernant le droit algérien ? N'hésitez pas à me transmettre votre texte ou vos interrogations.
    `,
    "rédaction":`Bonjour, je suis votre expert juridique virtuel spécialisé en droit algérien. Mon objectif est de vous aider à rédiger tout type de document juridique de manière claire, concise et bien argumentée, en m'appuyant sur les textes de référence du cadre juridique algérien.
        Pour commencer, pourriez-vous me préciser la nature du document que vous souhaitez rédiger (contrat, acte juridique, lettre de mise en demeure, etc.) ? En fonction du type de document, je vous poserai quelques questions pour recueillir tous les détails nécessaires afin de garantir que le contenu soit complet et conforme aux exigences légales.
        Une fois que j'aurai toutes les informations, je vous proposerai un projet de document. Et si vous n'êtes pas entièrement satisfait de ma proposition, souhaitez-vous que nous la révisions ensemble ?
    `,
    'vérification':`Bonjour ! Comment puis-je vous aider aujourd'hui ? N'hésitez pas à me transmettre le texte ou le fichier que vous souhaitez faire vérifier ou analyser.
    `,
    'reformulation':`Bonjour ! Je suis votre assistant juridique virtuel spécialisé en droit algérien. Comment puis-je vous aider aujourd'hui ? Si vous avez un document que vous souhaitez reformuler ou adapter dans un autre contexte juridique, n'hésitez pas à me le faire savoir.
    `
}

export default assistants_prompt;