"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { MenuOverlay } from "@/components/menu-overlay"
import { useLanguage } from "@/contexts/language-context"

// Dictionnaire complet (tous les termes de toutes les catégories)
const dictionary = [
  // Communication, Marketing
  {
    word: "Moodboard",
    definition: {
      FR: "Planche d'inspiration visuelle regroupant des images, couleurs, textures et éléments graphiques pour définir l'ambiance d'un projet.",
      ALL: "Visuelle Inspirationstafel, die Bilder, Farben, Texturen und grafische Elemente zusammenfasst, um die Stimmung eines Projekts zu definieren.",
      IT: "Tavola di ispirazione visiva che raccoglie immagini, colori, texture ed elementi grafici per definire l'atmosfera di un progetto.",
      ANGL: "Visual inspiration board gathering images, colors, textures and graphic elements to define the mood of a project.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Call to action (CTA)",
    definition: {
      FR: "Élément visuel ou textuel qui incite l'utilisateur à effectuer une action spécifique, comme un bouton 'Acheter maintenant'.",
      ALL: "Visuelles oder textuelles Element, das den Benutzer dazu anregt, eine bestimmte Aktion auszuführen, wie z.B. eine 'Jetzt kaufen'-Schaltfläche.",
      IT: "Elemento visivo o testuale che incoraggia l'utente a compiere un'azione specifica, come un pulsante 'Acquista ora'.",
      ANGL: "Visual or textual element that encourages the user to perform a specific action, such as a 'Buy now' button.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Brainstorming",
    definition: {
      FR: "Technique de créativité en groupe qui vise à générer un maximum d'idées sur un sujet donné, sans jugement initial.",
      ALL: "Kreativitätstechnik in der Gruppe, die darauf abzielt, zu einem bestimmten Thema ohne anfängliche Beurteilung so viele Ideen wie möglich zu generieren.",
      IT: "Tecnica di creatività di gruppo che mira a generare il massimo di idee su un determinato argomento, senza giudizio iniziale.",
      ANGL: "Group creativity technique that aims to generate a maximum of ideas on a given topic, without initial judgment.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Semiotics (sémiotique)",
    definition: {
      FR: "Étude des signes et des symboles, de leur signification et de leur interprétation dans la communication visuelle et textuelle.",
      ALL: "Untersuchung von Zeichen und Symbolen, ihrer Bedeutung und ihrer Interpretation in der visuellen und textuellen Kommunikation.",
      IT: "Studio dei segni e dei simboli, del loro significato e della loro interpretazione nella comunicazione visiva e testuale.",
      ANGL: "Study of signs and symbols, their meaning and interpretation in visual and textual communication.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Brief",
    definition: {
      FR: "Document qui définit les objectifs, les contraintes et les attentes d'un projet de communication ou de marketing.",
      ALL: "Dokument, das die Ziele, Einschränkungen und Erwartungen eines Kommunikations- oder Marketingprojekts definiert.",
      IT: "Documento che definisce gli obiettivi, i vincoli e le aspettative di un progetto di comunicazione o marketing.",
      ANGL: "Document that defines the objectives, constraints and expectations of a communication or marketing project.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "AIDA model",
    definition: {
      FR: "Modèle marketing qui décrit les quatre étapes du processus d'achat: Attention, Intérêt, Désir et Action.",
      ALL: "Marketingmodell, das die vier Stufen des Kaufprozesses beschreibt: Aufmerksamkeit, Interesse, Verlangen und Handlung.",
      IT: "Modello di marketing che descrive le quattro fasi del processo di acquisto: Attenzione, Interesse, Desiderio e Azione.",
      ANGL: "Marketing model that describes the four stages of the purchasing process: Attention, Interest, Desire, and Action.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Search engine optimization (SEO)",
    definition: {
      FR: "Ensemble de techniques visant à optimiser la visibilité d'un site web dans les résultats des moteurs de recherche.",
      ALL: "Eine Reihe von Techniken zur Optimierung der Sichtbarkeit einer Website in Suchmaschinen.",
      IT: "Insieme di tecniche volte a ottimizzare la visibilità di un sito web nei risultati dei motori di ricerca.",
      ANGL: "Set of techniques aimed at optimizing the visibility of a website in search engine results.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Pitch",
    definition: {
      FR: "Présentation concise et persuasive d'une idée, d'un projet ou d'un produit, destinée à convaincre un public cible.",
      ALL: "Prägnante und überzeugende Präsentation einer Idee, eines Projekts oder eines Produkts, um eine Zielgruppe zu überzeugen.",
      IT: "Presentazione concisa e persuasiva di un'idea, un progetto o un prodotto, destinata a convincere un pubblico target.",
      ANGL: "Concise and persuasive presentation of an idea, project, or product, designed to convince a target audience.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Public Cible / Zielpublikum",
    definition: {
      FR: "Groupe spécifique de personnes auquel est destiné un produit, un service ou un message de communication.",
      ALL: "Spezifische Gruppe von Personen, an die ein Produkt, eine Dienstleistung oder eine Kommunikationsbotschaft gerichtet ist.",
      IT: "Gruppo specifico di persone a cui è destinato un prodotto, un servizio o un messaggio di comunicazione.",
      ANGL: "Specific group of people to whom a product, service, or communication message is directed.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Tonalité de communication",
    definition: {
      FR: "Style et ton adoptés dans les messages d'une marque pour refléter sa personnalité et s'adresser à son public cible.",
      ALL: "Stil und Ton, die in den Botschaften einer Marke verwendet werden, um ihre Persönlichkeit widerzuspiegeln und ihre Zielgruppe anzusprechen.",
      IT: "Stile e tono adottati nei messaggi di un marchio per riflettere la sua personalità e rivolgersi al suo pubblico target.",
      ANGL: "Style and tone adopted in a brand's messages to reflect its personality and address its target audience.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "SWOT",
    definition: {
      FR: "Outil d'analyse stratégique qui évalue les forces (Strengths), faiblesses (Weaknesses), opportunités (Opportunities) et menaces (Threats) d'un projet ou d'une organisation.",
      ALL: "Strategisches Analysewerkzeug, das die Stärken, Schwächen, Chancen und Risiken eines Projekts oder einer Organisation bewertet.",
      IT: "Strumento di analisi strategica che valuta i punti di forza, debolezze, opportunità e minacce di un progetto o di un'organizzazione.",
      ANGL: "Strategic analysis tool that evaluates the Strengths, Weaknesses, Opportunities, and Threats of a project or organization.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Concept",
    definition: {
      FR: "Idée directrice qui guide la création d'une campagne de communication ou d'un projet marketing.",
      ALL: "Leitidee, die die Erstellung einer Kommunikationskampagne oder eines Marketingprojekts leitet.",
      IT: "Idea guida che orienta la creazione di una campagna di comunicazione o di un progetto di marketing.",
      ANGL: "Guiding idea that directs the creation of a communication campaign or marketing project.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Search engine marketing (SEM)",
    definition: {
      FR: "Forme de marketing digital qui vise à augmenter la visibilité d'un site web dans les résultats des moteurs de recherche par le biais de publicités payantes.",
      ALL: "Form des digitalen Marketings, die darauf abzielt, die Sichtbarkeit einer Website in Suchmaschinen durch bezahlte Werbung zu erhöhen.",
      IT: "Forma di marketing digitale che mira ad aumentare la visibilità di un sito web nei risultati dei motori di ricerca attraverso pubblicità a pagamento.",
      ANGL: "Form of digital marketing that aims to increase a website's visibility in search engine results through paid advertising.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Cahier des charges (vs Offerte)",
    definition: {
      FR: "Document détaillant les spécifications techniques et fonctionnelles d'un projet, servant de base à la proposition commerciale (offerte).",
      ALL: "Dokument, das die technischen und funktionalen Spezifikationen eines Projekts detailliert und als Grundlage für das kommerzielle Angebot dient.",
      IT: "Documento che dettaglia le specifiche tecniche e funzionali di un progetto, servendo come base per la proposta commerciale.",
      ANGL: "Document detailing the technical and functional specifications of a project, serving as a basis for the commercial proposal (offer).",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Positionnement",
    definition: {
      FR: "Façon dont une marque ou un produit est perçu dans l'esprit des consommateurs par rapport à la concurrence.",
      ALL: "Art und Weise, wie eine Marke oder ein Produkt im Vergleich zur Konkurrenz in der Wahrnehmung der Verbraucher positioniert ist.",
      IT: "Modo in cui un marchio o un prodotto è percepito nella mente dei consumatori rispetto alla concorrenza.",
      ANGL: "Way in which a brand or product is perceived in the minds of consumers relative to the competition.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Sales Funnel",
    definition: {
      FR: "Représentation du parcours client, de la prise de conscience initiale jusqu'à l'achat et la fidélisation.",
      ALL: "Darstellung der Customer Journey, vom ersten Bewusstsein bis hin zum Kauf und zur Kundenbindung.",
      IT: "Rappresentazione del percorso del cliente, dalla consapevolezza iniziale all'acquisto e alla fidelizzazione.",
      ANGL: "Representation of the customer journey, from initial awareness to purchase and loyalty.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Concurrence",
    definition: {
      FR: "Ensemble des entreprises qui proposent des produits ou services similaires et qui se disputent le même marché.",
      ALL: "Alle Unternehmen, die ähnliche Produkte oder Dienstleistungen anbieten und um denselben Markt konkurrieren.",
      IT: "Insieme delle aziende che offrono prodotti o servizi simili e che competono per lo stesso mercato.",
      ANGL: "Set of companies that offer similar products or services and compete for the same market.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Valeurs",
    definition: {
      FR: "Principes fondamentaux qui guident les actions et la culture d'une entreprise ou d'une marque.",
      ALL: "Grundlegende Prinzipien, die die Handlungen und Kultur eines Unternehmens oder einer Marke leiten.",
      IT: "Principi fondamentali che guidano le azioni e la cultura di un'azienda o di un marchio.",
      ANGL: "Fundamental principles that guide the actions and culture of a company or brand.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Kosten (laufende Kosten, effektive kosten...)",
    definition: {
      FR: "Ensemble des dépenses associées à un projet ou une campagne marketing, incluant les coûts courants et effectifs.",
      ALL: "Alle mit einem Projekt oder einer Marketingkampagne verbundenen Ausgaben, einschließlich laufender und effektiver Kosten.",
      IT: "Insieme delle spese associate a un progetto o a una campagna di marketing, inclusi i costi correnti ed effettivi.",
      ANGL: "Set of expenses associated with a project or marketing campaign, including ongoing and effective costs.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Chaîne media",
    definition: {
      FR: "Ensemble des canaux de communication utilisés pour diffuser un message marketing ou publicitaire.",
      ALL: "Alle Kommunikationskanäle, die zur Verbreitung einer Marketing- oder Werbebotschaft verwendet werden.",
      IT: "Insieme dei canali di comunicazione utilizzati per diffondere un messaggio di marketing o pubblicitario.",
      ANGL: "Set of communication channels used to broadcast a marketing or advertising message.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "A/B testing",
    definition: {
      FR: "Méthode de test comparatif entre deux versions d'un élément pour déterminer laquelle performe le mieux.",
      ALL: "Vergleichstestmethode zwischen zwei Versionen eines Elements, um festzustellen, welche besser funktioniert.",
      IT: "Metodo di test comparativo tra due versioni di un elemento per determinare quale funziona meglio.",
      ANGL: "Comparative testing method between two versions of an element to determine which performs better.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "NDA (non-disclosure agreement)",
    definition: {
      FR: "Accord de confidentialité qui protège les informations sensibles partagées entre parties lors d'une collaboration.",
      ALL: "Vertraulichkeitsvereinbarung, die sensible Informationen schützt, die während einer Zusammenarbeit zwischen Parteien ausgetauscht werden.",
      IT: "Accordo di riservatezza che protegge le informazioni sensibili condivise tra le parti durante una collaborazione.",
      ANGL: "Confidentiality agreement that protects sensitive information shared between parties during a collaboration.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Segmentation",
    definition: {
      FR: "Division d'un marché en groupes distincts de consommateurs ayant des besoins, caractéristiques ou comportements similaires.",
      ALL: "Aufteilung eines Marktes in verschiedene Gruppen von Verbrauchern mit ähnlichen Bedürfnissen, Eigenschaften oder Verhaltensweisen.",
      IT: "Divisione di un mercato in gruppi distinti di consumatori con bisogni, caratteristiche o comportamenti simili.",
      ANGL: "Division of a market into distinct groups of consumers with similar needs, characteristics, or behaviors.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Impressions",
    definition: {
      FR: "Nombre de fois qu'une publicité ou un contenu a été affiché à des utilisateurs, sans nécessairement générer d'interaction.",
      ALL: "Anzahl der Male, die eine Werbung oder ein Inhalt Benutzern angezeigt wurde, ohne notwendigerweise eine Interaktion zu generieren.",
      IT: "Numero di volte in cui una pubblicità o un contenuto è stato mostrato agli utenti, senza necessariamente generare interazione.",
      ANGL: "Number of times an advertisement or content has been displayed to users, without necessarily generating interaction.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Différenciation",
    definition: {
      FR: "Stratégie qui consiste à distinguer un produit ou service de ses concurrents par des caractéristiques uniques et valorisantes.",
      ALL: "Strategie, die darauf abzielt, ein Produkt oder eine Dienstleistung durch einzigartige und wertvolle Eigenschaften von seinen Konkurrenten zu unterscheiden.",
      IT: "Strategia che consiste nel distinguere un prodotto o servizio dai suoi concorrenti attraverso caratteristiche uniche e valorizzanti.",
      ANGL: "Strategy that consists of distinguishing a product or service from its competitors through unique and valuable characteristics.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Engagement",
    definition: {
      FR: "Niveau d'interaction et d'implication des utilisateurs avec un contenu, une marque ou une campagne marketing.",
      ALL: "Grad der Interaktion und Beteiligung von Benutzern mit einem Inhalt, einer Marke oder einer Marketingkampagne.",
      IT: "Livello di interazione e coinvolgimento degli utenti con un contenuto, un marchio o una campagna di marketing.",
      ANGL: "Level of interaction and involvement of users with content, a brand, or a marketing campaign.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Textverständnis",
    definition: {
      FR: "Capacité à interpréter correctement un brief et à formuler un re-briefing si nécessaire.",
      ALL: "Fähigkeit, ein Briefing richtig zu interpretieren und bei Bedarf ein Re-Briefing zu formulieren.",
      IT: "Capacità di interpretare correttamente un brief e di formulare un re-briefing se necessario.",
      ANGL: "Ability to correctly interpret a brief and formulate a re-briefing if necessary.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Marketing Direct",
    definition: {
      FR: "Technique de communication marketing qui s'adresse directement au consommateur final, sans intermédiaire.",
      ALL: "Marketingkommunikationstechnik, die sich direkt an den Endverbraucher richtet, ohne Zwischenhändler.",
      IT: "Tecnica di comunicazione di marketing che si rivolge direttamente al consumatore finale, senza intermediari.",
      ANGL: "Marketing communication technique that addresses the final consumer directly, without intermediaries.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Relations Publiques",
    definition: {
      FR: "Ensemble des techniques et actions visant à gérer l'image et la réputation d'une organisation auprès de ses différents publics.",
      ALL: "Techniken und Maßnahmen zur Verwaltung des Images und des Rufs einer Organisation bei ihren verschiedenen Zielgruppen.",
      IT: "Insieme di tecniche e azioni volte a gestire l'immagine e la reputazione di un'organizzazione presso i suoi diversi pubblici.",
      ANGL: "Set of techniques and actions aimed at managing the image and reputation of an organization with its various audiences.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },
  {
    word: "Multichannel Marketing",
    definition: {
      FR: "Stratégie qui utilise plusieurs canaux de communication pour atteindre et interagir avec les clients de manière cohérente.",
      ALL: "Strategie, die mehrere Kommunikationskanäle nutzt, um Kunden konsistent zu erreichen und mit ihnen zu interagieren.",
      IT: "Strategia che utilizza più canali di comunicazione per raggiungere e interagire con i clienti in modo coerente.",
      ANGL: "Strategy that uses multiple communication channels to reach and interact with customers in a consistent manner.",
    },
    partOfSpeech: "noun",
    category: "Communication, Marketing",
  },

  // Design graphique, Typo
  {
    word: "Mood board",
    definition: {
      FR: "Planche d'images et de matières dont le but est d'aider à la détermination des choix stylistiques dans un projet.",
      ALL: "Eine Tafel mit Bildern und Materialien, die dazu dient, die stilistischen Entscheidungen in einem Projekt zu bestimmen.",
      IT: "Tavola di immagini e materiali il cui scopo è aiutare a determinare le scelte stilistiche in un progetto.",
      ANGL: "Board of images and materials whose purpose is to help determine stylistic choices in a project.",
    },
    partOfSpeech: "noun",
    category: "Design graphique, Typo",
  },
  {
    word: "Serif",
    definition: {
      FR: "Empattement ou petit trait terminal qui apparaît à l'extrémité des caractères dans certaines polices de caractères.",
      ALL: "Serifen oder kleine Endstriche, die am Ende von Zeichen in bestimmten Schriftarten erscheinen.",
      IT: "Grazie o piccoli tratti terminali che appaiono all'estremità dei caratteri in alcuni tipi di carattere.",
      ANGL: "Small decorative flourishes at the end of strokes in some typefaces.",
    },
    partOfSpeech: "noun",
    category: "Design graphique, Typo",
  },
  {
    word: "Kerning",
    definition: {
      FR: "Ajustement de l'espace entre des paires de caractères spécifiques pour obtenir un espacement visuellement plaisant.",
      ALL: "Anpassung des Abstands zwischen bestimmten Zeichenpaaren, um einen visuell ansprechenden Abstand zu erhalten.",
      IT: "Regolazione dello spazio tra coppie di caratteri specifici per ottenere una spaziatura visivamente gradevole.",
      ANGL: "Adjustment of the space between specific character pairs to achieve visually pleasing spacing.",
    },
    partOfSpeech: "noun",
    category: "Design graphique, Typo",
  },

  // UI, UX
  {
    word: "Wireframe",
    definition: {
      FR: "Schéma fonctionnel d'une interface qui représente la structure, la hiérarchie des informations et les principaux éléments d'une interface, sans traitement graphique.",
      ALL: "Funktionales Schema einer Benutzeroberfläche, das die Struktur, die Informationshierarchie und die Hauptelemente einer Benutzeroberfläche ohne grafische Behandlung darstellt.",
      IT: "Schema funzionale di un'interfaccia che rappresenta la struttura, la gerarchia delle informazioni e gli elementi principali di un'interfaccia, senza trattamento grafico.",
      ANGL: "Functional diagram of an interface that represents the structure, information hierarchy, and main elements of an interface, without graphic treatment.",
    },
    partOfSpeech: "noun",
    category: "Ui, Ux",
  },
  {
    word: "Affordance",
    definition: {
      FR: "Qualité d'un objet qui suggère intuitivement son mode d'utilisation, sa fonction ou son comportement.",
      ALL: "Eigenschaft eines Objekts, die intuitiv seine Verwendung, Funktion oder sein Verhalten suggeriert.",
      IT: "Qualità di un oggetto che suggerisce intuitivamente il suo modo d'uso, la sua funzione o il suo comportamento.",
      ANGL: "Quality of an object that intuitively suggests its mode of use, function, or behavior.",
    },
    partOfSpeech: "noun",
    category: "Ui, Ux",
  },
  {
    word: "Heatmap",
    definition: {
      FR: "Représentation graphique des données où les valeurs sont représentées par des couleurs, souvent utilisée pour visualiser le comportement des utilisateurs sur une interface.",
      ALL: "Grafische Darstellung von Daten, bei der Werte durch Farben dargestellt werden, häufig verwendet, um das Benutzerverhalten auf einer Benutzeroberfläche zu visualisieren.",
      IT: "Rappresentazione grafica dei dati in cui i valori sono rappresentati da colori, spesso utilizzata per visualizzare il comportamento degli utenti su un'interfaccia.",
      ANGL: "Graphical representation of data where values are represented by colors, often used to visualize user behavior on an interface.",
    },
    partOfSpeech: "noun",
    category: "Ui, Ux",
  },

  // Web, Code
  {
    word: "API",
    definition: {
      FR: "Interface de programmation d'application qui permet à différents logiciels de communiquer entre eux et d'échanger des données selon un ensemble de règles prédéfinies.",
      ALL: "Anwendungsprogrammierschnittstelle, die es verschiedenen Softwareanwendungen ermöglicht, miteinander zu kommunizieren und Daten nach einem Satz vordefinierter Regeln auszutauschen.",
      IT: "Interfaccia di programmazione dell'applicazione che consente a diversi software di comunicare tra loro e scambiare dati secondo un insieme di regole predefinite.",
      ANGL: "Application Programming Interface that allows different software applications to communicate with each other and exchange data according to a set of predefined rules.",
    },
    partOfSpeech: "noun",
    category: "Web, Code",
  },
  {
    word: "Framework",
    definition: {
      FR: "Ensemble cohérent de composants logiciels structurels qui sert à créer les fondations d'un logiciel.",
      ALL: "Kohärente Sammlung von struktureellen Softwarekomponenten, die als Grundlage für die Erstellung von Software dienen.",
      IT: "Insieme coerente di componenti software strutturali che serve a creare le fondamenta di un software.",
      ANGL: "Coherent collection of structural software components that serves to create the foundations of software.",
    },
    partOfSpeech: "noun",
    category: "Web, Code",
  },
  {
    word: "Responsive",
    definition: {
      FR: "Approche de conception qui fait en sorte qu'une interface s'adapte automatiquement à la taille de l'écran du dispositif utilisé pour la consulter.",
      ALL: "Designansatz, der sicherstellt, dass sich eine Benutzeroberfläche automatisch an die Bildschirmgröße des Geräts anpasst, auf dem sie angezeigt wird.",
      IT: "Approccio di progettazione che fa sì che un'interfaccia si adatti automaticamente alle dimensioni dello schermo del dispositivo utilizzato per visualizzarla.",
      ANGL: "Design approach that ensures an interface automatically adapts to the screen size of the device used to view it.",
    },
    partOfSpeech: "adjective",
    category: "Web, Code",
  },

  // Photo, Vidéo, Audio
  {
    word: "Codec",
    definition: {
      FR: "Programme capable de compresser et/ou décompresser un signal numérique, généralement audio ou vidéo.",
      ALL: "Programm, das ein digitales Signal, in der Regel Audio oder Video, komprimieren und/oder dekomprimieren kann.",
      IT: "Programma in grado di comprimere e/o decomprimere un segnale digitale, generalmente audio o video.",
      ANGL: "Program capable of compressing and/or decompressing a digital signal, usually audio or video.",
    },
    partOfSpeech: "noun",
    category: "Photo, Vidéo, Audio",
  },
  {
    word: "Storyboard",
    definition: {
      FR: "Représentation illustrée d'un film ou d'une animation avant sa réalisation, sous forme de séquences dessinées.",
      ALL: "Illustrierte Darstellung eines Films oder einer Animation vor seiner Realisierung in Form von gezeichneten Sequenzen.",
      IT: "Rappresentazione illustrata di un film o di un'animazione prima della sua realizzazione, sotto forma di sequenze disegnate.",
      ANGL: "Illustrated representation of a film or animation before its production, in the form of drawn sequences.",
    },
    partOfSpeech: "noun",
    category: "Photo, Vidéo, Audio",
  },
  {
    word: "Compositing",
    definition: {
      FR: "Technique consistant à combiner des éléments visuels de sources séparées en une seule image, souvent utilisée en post-production.",
      ALL: "Technik, bei der visuelle Elemente aus separaten Quellen zu einem einzigen Bild kombiniert werden, oft in der Postproduktion verwendet.",
      IT: "Tecnica che consiste nel combinare elementi visivi da fonti separate in un'unica immagine, spesso utilizzata in post-produzione.",
      ANGL: "Technique of combining visual elements from separate sources into a single image, often used in post-production.",
    },
    partOfSpeech: "noun",
    category: "Photo, Vidéo, Audio",
  },

  // Autres Ressources
  {
    word: "Open source",
    definition: {
      FR: "Se dit d'un logiciel dont le code source est distribué librement et peut être modifié et redistribué par quiconque.",
      ALL: "Bezieht sich auf Software, deren Quellcode frei verteilt wird und von jedem modifiziert und weiterverteilt werden kann.",
      IT: "Si riferisce a un software il cui codice sorgente è distribuito liberamente e può essere modificato e ridistribuito da chiunque.",
      ANGL: "Refers to software whose source code is freely distributed and can be modified and redistributed by anyone.",
    },
    partOfSpeech: "adjective",
    category: "Autre ressources",
  },
  {
    word: "Agile",
    definition: {
      FR: "Méthode de gestion de projet qui préconise une approche itérative et collaborative, avec des cycles de développement courts.",
      ALL: "Projektmanagementmethode, die einen iterativen und kollaborativen Ansatz mit kurzen Entwicklungszyklen befürwortet.",
      IT: "Metodo di gestione dei progetti che promuove un approccio iterativo e collaborativo, con cicli di sviluppo brevi.",
      ANGL: "Project management method that advocates an iterative and collaborative approach, with short development cycles.",
    },
    partOfSpeech: "adjective",
    category: "Autre ressources",
  },
  {
    word: "Benchmark",
    definition: {
      FR: "Processus d'évaluation comparative qui consiste à mesurer les performances d'un produit ou service par rapport à la concurrence ou à un standard.",
      ALL: "Vergleichender Bewertungsprozess, bei dem die Leistung eines Produkts oder einer Dienstleistung im Vergleich zur Konkurrenz oder zu einem Standard gemessen wird.",
      IT: "Processo di valutazione comparativa che consiste nel misurare le prestazioni di un prodotto o servizio rispetto alla concorrenza o a uno standard.",
      ANGL: "Comparative evaluation process that consists of measuring the performance of a product or service against competition or a standard.",
    },
    partOfSpeech: "noun",
    category: "Autre ressources",
  },
]

export default function DictionaryPage() {
  const { language, t, translateCategory } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")

  // Filter words based on search term
  const filteredWords = dictionary.filter(
    (item) =>
      searchTerm === "" ||
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition[language].toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <main className="min-h-screen bg-black p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-[#00D0B4] transition-colors">
            GLOSSAIRE IMD
          </h1>
          <MenuOverlay />
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00D0B4] opacity-50 h-5 w-5" />
          <Input
            type="text"
            placeholder={t("search")}
            className="pl-10 bg-[#232D3F] border-none text-[#00D0B4] placeholder:text-[#00D0B4] placeholder:opacity-50 h-12 font-body"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredWords.length > 0 ? (
            filteredWords.map((item, index) => (
              <div
                key={index}
                className="bg-[#232D3F] p-6 transition-all hover:opacity-80 rounded-lg border border-[#00D0B4] border-opacity-20"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-body font-medium text-[#00D0B4]">{item.word}</h2>
                  <span className="text-xs px-2 py-1 bg-[#00D0B4] bg-opacity-20 rounded-full text-[#00D0B4] font-body">
                    {translateCategory(item.category)}
                  </span>
                </div>
                <p className="text-[#00D0B4] opacity-90 font-body">{item.definition[language]}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-[#00D0B4] font-body">{t("noResults")}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
