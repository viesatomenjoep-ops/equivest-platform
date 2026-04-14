const fs = require('fs');

let content = fs.readFileSync('src/i18n/ui.ts', 'utf-8');

// The new EN keys
const enKeys = `
    'contact.inquiry': 'Investment Inquiry',
    'contact.connect_pre': 'Connect with our ',
    'contact.connect_post': ' network',
    'contact.connect_elite': 'Elite',
    'contact.ready': 'Ready to explore high-end investment opportunities in the world of showjumping? Our team is available for private consultations and personalized investment plans.',
`;

// Insert into en block right after 'contact.whatsapp' if possible, or at the end of the en block
content = content.replace(/'contact\.whatsapp': 'Chat via WhatsApp',/, enKeys + "\n    'contact.whatsapp': 'Chat via WhatsApp',");

// NL Translations
const nlTranslations = `
    'contact.inquiry': 'Investeringsaanvraag',
    'contact.connect_pre': 'Verbind met ons ',
    'contact.connect_post': ' netwerk',
    'contact.connect_elite': 'Elite',
    'contact.ready': 'Klaar om hoogwaardige investeringsmogelijkheden in de springpaardenwereld te verkennen? Ons team is beschikbaar voor privéconsultaties en gepersonaliseerde investeringsplannen.',
    'team.title': 'Ontmoet Team Equivest',
    'team.intro1': 'Uitmuntendheid in sport en verkoop begint met buitengewone zorg, correcte training en doordachte voorbereiding. Onze stal is gebouwd op ervaring, precisie, horsemanship, teamwork en passie voor de sport.',
    'team.intro2': 'Achter elke verkoop of succesvolle ronde in de ring staat een klein, toegewijd team dat zich inzet om paarden te ontwikkelen tot de hoogste internationale normen. Ons verkoopprogramma is gebouwd op vertrouwen, transparantie en een langetermijnvisie. Gevestigd in zowel Europa als de VS, ontwikkelen en presenteren we kwaliteitsvolle sportpaarden voor de internationale markt.',
    'team.role1': 'Directeur & Talent Scout',
    'team.name1': 'Heather Field',
    'team.desc1': 'Met jarenlange ervaring op internationaal springniveau overziet Heather alle training, competitie en verkoopstrategie voor de stal in zowel Europa als de VS. Bekend om haar doordachte aanpak van paardenontwikkeling, richt Heather zich op de lange termijn gezondheid en prestaties—zowel in als buiten de ring. Elk verkoop- & sportpaard wordt getraind met duidelijkheid, eerlijkheid en met het oog op zijn potentieel op lange termijn.',
    'team.fact1': 'Leuk weetje: Gelooft dat elk paard ons iets speciaals te leren heeft.',
    'team.role2': 'Amerikaanse Showruiter, Trainer en Manager',
    'team.name2': 'Tyler Petrie',
    'team.desc2': 'Tyler speelt een centrale rol in alle aspecten van de Amerikaanse kant van ons programma. Ze overziet de training, competitieplanning & shows, en het dagelijks beheer van de stal. Van jonge beloftes tot ervaren wedstrijdpaarden, ze helpt ervoor zorgen dat elk paard zelfverzekerd, stabiel en correct is voorbereid voor proeven en competities. Haar oog voor detail helpt elk paard accuraat en professioneel te presenteren aan ruiters en agenten wereldwijd.',
    'team.role3': 'Europese Showruiter & Assistent Trainer',
    'team.name3': 'Christelle Littunen',
    'team.desc3': 'Met uitgebreide ervaring in het internationaal produceren en uitbrengen van paarden, richt Christelle zich op de bewerkbaarheid, duurzaamheid en correcte ontwikkeling—belangrijke kwaliteiten voor succesvolle partnerschappen in zowel Europese als Amerikaanse markten. Ze speelt een centrale rol in de dagelijkse training, evaluatie van verkooppaarden en het competitief rijden.',
    'team.fact3': '“Succes wordt dag voor dag gebouwd, niet alleen in de ring.”',
    'team.role4': 'Hoofd Paardenverzorging Europa',
    'team.name4': 'Aurelie Mordefroy',
    'team.desc4': 'Verantwoordelijk voor de dagelijkse verzorging, presentatie en het welzijn van de paarden, handhaaft Aurelie de hoogste normen thuis en tijdens het reizen. Van onberispelijke verzorging tot het beheren van de routine en het comfort tijdens internationaal transport, ze zorgt ervoor dat elk paard altijd klaar is om te presteren en er op zijn best uit te zien.',
    'team.fact4': 'Leuk weetje: Vroege ochtenden en frisse paarden zijn haar favoriete deel van de baan.',
    'team.role5': 'Verkoopondersteuning',
    'team.name5': 'Kyara Murreli',
    'team.desc5': 'Kyara ondersteunt het verkoopprogramma in Europa en de VS, door te assisteren bij de verzorging, het klaarmaken van het tuigage, proefdagen en logistiek. Haar efficiëntie en betrouwbaarheid helpen zorgen voor soepele overgangen—van stalbezoeken tot internationale verzendingen—waardoor het aankoopproces naadloos verloopt voor klanten.',
    'team.role6': 'Media Manager',
    'team.name6': 'Eveline van Gruisen',
    'team.desc6': 'Eveline beheert de visuele en digitale presentatie van al onze paarden. Ze is verantwoordelijk voor foto- en videoproductie, online posts, competitie-reels en social media content. Eveline heeft een helder inzicht in de marketingverwachtingen en speelt een sleutelrol bij het voorzien van onze huidige en toekomstige klanten van transparante, hoogwaardige media.',
    'team.role7': 'Administratief Directeur',
    'team.name7': 'Tom van Biene',
    'team.desc7': 'Tom overziet de administratieve en operationele kant van het bedrijf en zorgt voor duidelijke communicatie en soepele coördinatie tussen Europa en de Verenigde Staten. Van contracten en planning tot logistiek en klantenondersteuning, hij helpt een professionele, georganiseerde en efficiënte ervaring te creëren voor eigenaren, agenten en kopers.',
    'team.closing': '"Ons team deelt één doel: de toewijding aan het produceren en presenteren van kwaliteitspaarden die in staat zijn op het hoogste niveau van het internationale springen te presteren, met eerlijkheid en professionaliteit, om zo succesvolle partnerschappen te creëren aan beide zijden van de oceaan."',
`;

content = content.replace(/'ui\.scroll': 'Scroll',/g, "'ui.scroll': 'Scroll to top',");
content = content.replace(/'ui\.scroll': 'Scrollen',/g, "'ui.scroll': 'Nach oben scrollen',");
content = content.replace(/'ui\.scroll': 'Desplazar',/g, "'ui.scroll': 'Desplazarse hacia arriba',");

content = content.replace(/(nl: \{[\s\S]*?)('ui\.scroll': 'Scroll to top',)/, "$1" + nlTranslations + "\n    $2");

const deTranslations = `
    'contact.inquiry': 'Investitionsanfrage',
    'contact.connect_pre': 'Verbinden Sie sich mit unserem ',
    'contact.connect_post': '-Netzwerk',
    'contact.connect_elite': 'Elite',
    'contact.ready': 'Bereit, hochwertige Investitionsmöglichkeiten in der Welt des Springreitens zu entdecken? Unser Team steht für private Beratungen und individuelle Investitionspläne zur Verfügung.',
    'team.title': 'Lernen Sie das Team Equivest kennen',
    'team.intro1': 'Exzellenz im Sport und Verkauf beginnt mit außergewöhnlicher Pflege, korrektem Training und sorgfältiger Vorbereitung. Unser Stall baut auf Erfahrung, Präzision, Horsemanship, Teamwork und Leidenschaft für den Sport auf.',
    'team.intro2': 'Hinter jedem Verkauf oder erfolgreichen Ritt im Parcours steht ein kleines, engagiertes Team, das sich der Entwicklung von Pferden auf höchstem internationalen Niveau verschrieben hat. Unser Verkaufsprogramm basiert auf Vertrauen, Transparenz und einer langfristigen Vision. Mit Sitz in Europa und den USA entwickeln und präsentieren wir hochwertige Sportpferde für den internationalen Markt.',
    'team.role1': 'Direktorin & Talent Scout',
    'team.name1': 'Heather Field',
    'team.desc1': 'Mit jahrelanger Erfahrung im internationalen Springsport überwacht Heather das gesamte Training, die Turnierplanung und die Verkaufsstrategie für den Stall sowohl in Europa als auch in den USA. Bekannt für einen durchdachten Ansatz in der Pferdeentwicklung, konzentriert sich Heather auf langfristige Gesundheit und Leistung – innerhalb und außerhalb des Parcours. Jedes Verkaufs- und Sportpferd wird mit Klarheit, Ehrlichkeit und im Hinblick auf sein langfristiges Potenzial trainiert.',
    'team.fact1': 'Wissenswertes: Glaubt daran, dass jedes Pferd uns etwas Besonderes beibringen kann.',
    'team.role2': 'US-Showreiterin, Trainerin und Managerin',
    'team.name2': 'Tyler Petrie',
    'team.desc2': 'Tyler spielt eine zentrale Rolle in allen Aspekten der US-Seite unseres Programms. Sie überwacht das Training, die Wettkampfplanung und -teilnahme sowie das tägliche Management des Stalls. Von jungen Talenten bis hin zu erfahrenen Turnierpferden hilft sie sicherzustellen, dass jedes Pferd selbstbewusst, beständig und optimal auf Tests und Turniere vorbereitet ist. Ihre Liebe zum Detail hilft dabei, jedes Pferd akkurat und professionell Reitern und Agenten weltweit zu präsentieren.',
    'team.role3': 'EU-Showreiterin & Assistenztrainerin',
    'team.name3': 'Christelle Littunen',
    'team.desc3': 'Mit umfassender Erfahrung in der internationalen Ausbildung und Vorstellung von Pferden konzentriert sich Christelle auf Rittigkeit, Langlebigkeit und korrekte Entwicklung – Schlüsseleigenschaften für erfolgreiche Partnerschaften auf den europäischen und amerikanischen Märkten. Sie spielt eine zentrale Rolle beim täglichen Training, der Bewertung von Verkaufspferden und im Turniersport.',
    'team.fact3': '„Erfolg wird Tag für Tag aufgebaut, nicht nur im Parcours.“',
    'team.role4': 'Leiterin Pferdepflege EU',
    'team.name4': 'Aurelie Mordefroy',
    'team.desc4': 'Verantwortlich für die tägliche Pflege, Präsentation und das Wohlbefinden der Pferde, hält Aurelie höchste Standards zu Hause und auf Reisen aufrecht. Von makelloser Pflege bis hin zur Sicherstellung von Routine und Komfort bei internationalen Transporten sorgt sie dafür, dass jedes Pferd immer bereit ist, sein Bestes zu geben und sich optimal zu präsentieren.',
    'team.fact4': 'Wissenswertes: Frühe Morgenstunden und frische Pferde sind ihr Lieblingsteil des Jobs.',
    'team.role5': 'Verkaufsunterstützung',
    'team.name5': 'Kyara Murreli',
    'team.desc5': 'Kyara unterstützt das Verkaufsprogramm in Europa und den USA, indem sie beim Putzen, der Vorbereitung der Ausrüstung, bei Reittests und der Logistik hilft. Ihre Effizienz und Zuverlässigkeit sorgen für reibungslose Abläufe – vom Stallbesuch bis zum internationalen Transport – und machen den Kaufprozess für Kunden nahtlos.',
    'team.role6': 'Media Managerin',
    'team.name6': 'Eveline van Gruisen',
    'team.desc6': 'Eveline leitet die visuelle und digitale Präsentation all unserer Pferde. Sie ist verantwortlich für Foto- und Videoproduktionen, Online-Beiträge, Wettkampf-Reels und Social-Media-Inhalte. Eveline hat ein klares Verständnis für die Erwartungen im Marketing und spielt eine Schlüsselrolle dabei, unseren aktuellen und zukünftigen Kunden transparente, hochwertige Medien zur Verfügung zu stellen.',
    'team.role7': 'Verwaltungsdirektor',
    'team.name7': 'Tom van Biene',
    'team.desc7': 'Tom überwacht die administrativen und operativen Abläufe des Unternehmens und sorgt für eine klare Kommunikation und reibungslose Koordination zwischen Europa und den USA. Von Verträgen und Terminplanung bis hin zu Logistik und Kundenbetreuung trägt er dazu bei, Eigentümern, Agenten und Käufern eine professionelle, organisierte und effiziente Erfahrung zu bieten.',
    'team.closing': '„Unser Team teilt ein gemeinsames Ziel: Das Engagement, hochwertige Pferde auszubilden und zu präsentieren, die in der Lage sind, auf dem höchsten Niveau des internationalen Springsports ehrlich und professionell zu bestehen, um erfolgreiche Partnerschaften auf beiden Seiten des Atlantiks zu schaffen.“',
`;
content = content.replace(/(de: \{[\s\S]*?)('ui\.scroll': 'Nach oben scrollen',)/, "$1" + deTranslations + "\n    $2");

const esTranslations = `
    'contact.inquiry': 'Consulta de Inversión',
    'contact.connect_pre': 'Conéctese con nuestra red de ',
    'contact.connect_post': '',
    'contact.connect_elite': 'Élite',
    'contact.ready': '¿Listo para explorar oportunidades de inversión de alto nivel en el mundo del salto ecuestre? Nuestro equipo está disponible para consultas privadas y planes de inversión personalizados.',
    'team.title': 'Conozca al Equipo Equivest',
    'team.intro1': 'La excelencia en el deporte y las ventas comienza con un cuidado excepcional, un entrenamiento correcto y una preparación cuidadosa. Nuestro establo se basa en la experiencia, la precisión, la equitación, el trabajo en equipo y la pasión por el deporte.',
    'team.intro2': 'Detrás de cada venta o ronda exitosa en la pista hay un equipo pequeño y dedicado, comprometido a desarrollar caballos hasta los más altos estándares internacionales. Nuestro programa de ventas se basa en la confianza, la transparencia y una visión a largo plazo. Con sede en Europa y los EE. UU., desarrollamos y presentamos caballos deportivos de calidad para el mercado internacional.',
    'team.role1': 'Directora & Cazatalentos',
    'team.name1': 'Heather Field',
    'team.desc1': 'Con años de experiencia a nivel internacional en el salto, Heather supervisa todo el entrenamiento, la competición y la estrategia de ventas para el establo tanto en Europa como en EE. UU. Conocida por un enfoque reflexivo en el desarrollo de los caballos, Heather se centra en la salud y el rendimiento a largo plazo, tanto dentro como fuera de la pista. Cada caballo de salto y de venta se entrena con claridad, honestidad y con su potencial a largo plazo en mente.',
    'team.fact1': 'Dato curioso: Cree que cada caballo tiene algo especial que enseñarnos.',
    'team.role2': 'Jinete de Concurso de EE. UU., Entrenadora y Gerente',
    'team.name2': 'Tyler Petrie',
    'team.desc2': 'Tyler desempeña un papel central en todos los aspectos de nuestro programa en EE. UU. Supervisa el entrenamiento, la planificación y participación en competiciones, y la gestión diaria del establo. Desde promesas jóvenes hasta caballos de competición experimentados, ayuda a asegurar que cada caballo esté seguro, consistente y correctamente preparado para pruebas y competiciones. Su atención al detalle ayuda a presentar cada caballo de manera precisa y profesional a jinetes y agentes en todo el mundo.',
    'team.role3': 'Jinete de Concurso de la UE & Asistente de Entrenador',
    'team.name3': 'Christelle Littunen',
    'team.desc3': 'Con amplia experiencia produciendo y compitiendo caballos a nivel internacional, Christelle se centra en la montabilidad, la longevidad y el desarrollo correcto: cualidades clave para asociaciones exitosas en los mercados europeo y estadounidense. Ella desempeña un papel central en la doma diaria, la evaluación de caballos de venta y la equitación competitiva.',
    'team.fact3': '“El éxito se construye día a día, no solo en la pista.”',
    'team.role4': 'Jefa de Cuidado de Caballos UE',
    'team.name4': 'Aurelie Mordefroy',
    'team.desc4': 'Responsable del cuidado diario, la presentación y el bienestar de los caballos, Aurelie mantiene los estándares más altos en casa y durante los viajes. Desde una presentación impecable hasta la gestión de la rutina y la comodidad durante el transporte internacional, se asegura de que cada caballo esté siempre listo para rendir y lucir en su mejor forma.',
    'team.fact4': 'Dato curioso: Las mañanas tempranas y los caballos frescos son su parte favorita del trabajo.',
    'team.role5': 'Soporte de Ventas',
    'team.name5': 'Kyara Murreli',
    'team.desc5': 'Kyara apoya el programa de ventas en Europa y EE. UU., ayudando con el aseo, la preparación de los equipos, los días de prueba y la logística. Su eficiencia y confiabilidad ayudan a garantizar transiciones sin problemas, desde visitas al establo hasta envíos internacionales, haciendo que el proceso de compra sea perfecto para los clientes.',
    'team.role6': 'Gerente de Medios',
    'team.name6': 'Eveline van Gruisen',
    'team.desc6': 'Eveline gestiona la presentación visual y digital de todos nuestros caballos. Es responsable de la producción de fotos y videos, publicaciones en línea, videos de competencia y contenido de redes sociales. Eveline tiene una clara comprensión de las expectativas de marketing y juega un papel clave al proporcionar a nuestros clientes actuales y futuros medios transparentes y de alta calidad.',
    'team.role7': 'Director Administrativo',
    'team.name7': 'Tom van Biene',
    'team.desc7': 'Tom supervisa el lado administrativo y operativo del negocio, asegurando una comunicación clara y una coordinación fluida entre Europa y los Estados Unidos. Desde contratos y programación hasta logística y atención al cliente, ayuda a crear una experiencia profesional, organizada y eficiente para propietarios, agentes y compradores.',
    'team.closing': '“Nuestro equipo comparte un solo objetivo: el compromiso de producir y presentar caballos de calidad capaces de rendir al más alto nivel del salto internacional con honestidad y profesionalismo, creando asociaciones exitosas a ambos lados del Atlántico.”',
`;
content = content.replace(/(es: \{[\s\S]*?)('ui\.scroll': 'Desplazarse hacia arriba',)/, "$1" + esTranslations + "\n    $2");

fs.writeFileSync('src/i18n/ui.ts', content);
console.log("Translations successfully updated.");
