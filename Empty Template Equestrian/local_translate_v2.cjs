const fs = require('fs');
const path = require('path');

const langs = ['nl', 'de', 'es'];

const translations = {
  nl: {
    "Jumpers": "Springpaarden",
    "Hunters": "Hunters",
    "Mare": "Merrie",
    "Stallion": "Hengst",
    "Financial Prospectus": "Financieel Prospectus",
    "Metrics": "Statistieken",
    "Expected Valuation": "Verwachte Waardering",
    "Asset Purchase Price": "Aankoopprijs Activa",
    "Expected Sale Price": "Verwachte Verkoopprijs",
    "Developing": "In Ontwikkeling",
    "Mos": "Mnd",
    
    // DESCRIPTIONS
    // 1
    "As a developing 7-year-old mare (Zirocco Blue VDL x I'm Special de Muze) currently competing in the 1.30m - 1.35m division, Special Blue possesses the ultimate modern type for the elite American hunter/jumper circuit. Acquired at € 185.000, her value relies heavily on her extreme rideability and scope, pointing towards a target sale of € 350.000 as she masters the international amateur leagues.": 
    "Als zich ontwikkelende 7-jarige merrie (Zirocco Blue VDL x I'm Special de Muze), momenteel uitkomend in het 1.30m - 1.35m circuit, bezit Special Blue het ultieme moderne type voor de Amerikaanse elite hunter/jumper divisie. Met een aankoopprijs van € 185.000 berust haar waarde zwaar op haar extreme rijdbaarheid en vermogen, sturend richting een verwachte verkoop van € 350.000 naarmate zij de internationale amateur competities trotseert.",
    // 2
    "Theuwi is a spectacular 7-year-old mare by Emerald out of an Indoctro dam. Currently successfully navigating the 1.40m sections, she represents a turnkey investment for the professional rings. With an acquisition cost of € 225.000, her immense stride and natural bascule provide a seamless transition to ranking classes, pushing her financial trajectory toward the € 415.000 target sale bracket within 12-18 months.":
    "Theuwi is een spectaculaire 7-jarige merrie van Emerald uit een Indoctro moeder. Ze navigeert momenteel zeer succesvol in het 1.40m circuit en vertegenwoordigt een panklare investering voor de professionele sport. Tegen een aankoopprijs van € 225.000 zorgen haar enorme galop en natuurlijke bascule voor een naadloze doorstroming naar de ranking classes, waarbij haar rendementscurve stijgt naar de € 415.000 verwachting binnen 12-18 maanden.",
    // 3
    "Directly descending from Chaccoon Blue and Odermus R, this 7-year-old mare is an explosive and highly competitive asset in the 1.30m - 1.35m developing classes. Her extreme blood and light-footed reflexes make her an ideal speed prospect. Secured at an entry valuation of € 145.000, she provides an aggressive and highly liquid path to a € 275.000 target sale for buyers seeking immediate 1.40m performance.":
    "Direct afstammend van Chaccoon Blue en Odermus R, is deze 7-jarige merrie een uiterst competitief bezit in de 1.30m - 1.35m rubrieken. Haar extreme bloed en lichtvoetige reflexen maken van haar een ideaal speed-prospect. Binnengehaald tegen een waardering van € 145.000, biedt zij een agressief en zeer liquide rendement richting een doelverkoop van € 275.000 voor kopers die direct op zoek zijn naar 1.40m prestaties.",
    // 4
    "Bred by the prestigious Paul Schockemöhle operation, this 7-year-old mare (Stakkatol x Balou du Rouet) is an absolute rubber ball off the ground. She is currently confirming her status in the 1.30m - 1.35m developing tracks. Entering the portfolio at € 280.000, her spectacular freakish technique and premium PS brand recognition mathematically project a high-margin exit strategy towards € 550.000.":
    "Gefokt door het prestigieuze landgoed van Paul Schockemöhle, is deze 7-jarige merrie (Stakkatol x Balou du Rouet) werkelijk een rubberen bal van de grond. Momenteel bevestigt zij haar status in de 1.30m - 1.35m categorieën. Toegelaten tot het portfolio tegen € 280.000, projecteert haar zeldzaam spectaculaire techniek in combinatie met het premium PS merkrendement een verkoopstrategie rond de € 550.000.",
    // 5
    "At 6 years old, Doutzen (Dominator 2000 Z x Cancare) commands the ring with undeniable physical presence and sheer power. She is steadily gaining experience in the 1.25m - 1.30m Young Horse divisions. This mare is a legitimate long-term 1.60m Grand Prix prospect. Acquired for € 315.000, her raw athletic capacity provides the foundation to target an elite professional sale around € 750.000 as she matures.":
    "Op 6-jarige leeftijd beheerst Doutzen (Dominator 2000 Z x Cancare) de arena met een ijzersterke fysieke présence en pure kracht. Ze doet in rap tempo ervaring op in de 1.25m - 1.30m springrubrieken. Deze merrie is een legitieme investering met een potentieel voor 1.60m Grand Prix proeven. Aangeschaft voor € 315.000, biedt haar pure capaciteit het fundament voor een verkoop in de elite klasse richting € 750.000 naarmate haar rijpingsproces vordert.",
    // 6
    "Standing elegantly at 170cm, this 6-year-old mare combines the carefulness of I'm Special de Muze with the competitive drive of For Pleasure. Competing in the 1.25m - 1.30m Young Horse classes, her massive, ground-covering canter makes her a hyper-liquid asset. Valued at € 165.000 upon acquisition, she is molded perfectly for the lucrative amateur market, seeking a rapid turnaround to approximately € 280.000.":
    "Elegant staand op 1.70m, combineert deze 6-jarige merrie de voorzichtigheid van I'm Special de Muze met de instelling van For Pleasure. Momenteel uitkomend in het 1.25m - 1.30m jonge paarden niveau, is zij door haar enorm grondbindende galop een uitzonderlijk liquide toevoeging. Gewaardeerd tegen € 165.000 na aankoop, lijkt zij in het lucratieve amateur segment af te stevenen op een waardering van om en nabij € 280.000.",
    // 7
    "An officially Approved BWP Stallion uniting the legendary Chacco Blue blood with a Maquin van de Heffinck dam. At 6 years old and stepping into 1.25m - 1.30m Young Horse circuits, United is a phenomenal dual-purpose asset. His € 450.000 acquisition price reflects his immense stallion syndication potential, driving towards an astronomical € 1.200.000 target valuation through stud fees and CSI development.":
    "Een officieel Gekeurde BWP Hengst waarin het legendarische bloed van Chacco Blue vloeit met een Maquin van de Heffinck stamdame. 6-jarig en succesvol debuterend in de 1.25m - 1.30m klassen, fungeert United als een fenomenaal dubbeldoel actief. Zijn inkoopprijs van € 450.000 weerspiegelt de extreme potentie als toekomstig tophengst, sturend naar astronomische waarderingen boven € 1.200.000 via dekkingen en CSI-doorloop.",
    // 8
    "A jaw-dropping 5-year-old grey stallion by Nixon van 't Meulenhof, supplemented by Cancara. He is a standout in the 1.10m - 1.20m Young Horse classes. His extreme elasticity and commercial stopping power as a spectacular grey stallion justify the € 180.000 entry point. Focused on the young horse championships, his trajectory allows for a massive ROI towards a € 390.000 target sale prior to his 7-year-old year.":
    "Een indrukwekkende 5-jarige grijze hengst van Nixon van 't Meulenhof, gecombineerd met Cancara. Hij valt op in de 1.10m - 1.20m rubrieken. Omdat hij ongewoon soepel springt met veel commerciële stootkracht dankzij zijn zeldzame schimmelkleur, is de € 180.000 positionering ronduit gerechtvaardigd. Met pijlen op de jonge paarden competities, wekt zijn talent speculaties tot verkoopprijzen van makkelijk € 390.000 voor aanvang van zijn zevende levensjaar.",
    // 9
    "Blending the modern sensation Ermitage Kalone with the immortal Casall, Warrior is a spectacular 4-year-old stallion jumping the 1.00m Young Jumper courses. He embodies the purest definition of an early-stage, pure-growth asset. Secured at € 240.000, the immediate focus lies in stallion approvals, with an extremely lucrative path targeting a € 600.000 exit to a major Olympic string as his talent solidifies.":
    "Zinderend gefokt met de moderne sensatie Ermitage Kalone en onsterfelijke Casall, is Warrior een spectaculaire 4-jarige hengst startend in de 1.00m categorie. Hij belichaamt definitief het ultieme startfase vermogensstuk. Aangeschaft voor een strategische € 240.000, bereidt hij zich inmiddels voor op stamboekkeuringen en bouwt hij aan een op rendementsgerichte verkoop richting € 600.000 rondom Olympische syndicaten."
  },
  de: {
    "Jumpers": "Springpferde",
    "Hunters": "Hunters",
    "Mare": "Stute",
    "Stallion": "Hengst",
    "Financial Prospectus": "Finanzprospekt",
    "Metrics": "Kennzahlen",
    "Expected Valuation": "Erwartete Bewertung",
    "Asset Purchase Price": "Kaufpreis",
    "Expected Sale Price": "Erwarteter Verkaufspreis",
    "Developing": "In Entwicklung",
    "Mos": "Monate",
    
    // DESCRIPTIONS
    // 1
    "As a developing 7-year-old mare (Zirocco Blue VDL x I'm Special de Muze) currently competing in the 1.30m - 1.35m division, Special Blue possesses the ultimate modern type for the elite American hunter/jumper circuit. Acquired at € 185.000, her value relies heavily on her extreme rideability and scope, pointing towards a target sale of € 350.000 as she masters the international amateur leagues.": 
    "Als 7-jährige Nachwuchsstute (Zirocco Blue VDL x I'm Special de Muze), die sich derzeit im 1.30m - 1.35m Parcour behauptet, hat Special Blue den hochmodernen Typ für den elitären US Hunter/Jumper Bereich. Mit einem Einstiegspreis von € 185.000 wird ihr Marktwert maßgeblich durch unglaubliche Rittigkeit und immenses Vermögen definiert. Sie profiliert sich für einen Zielverkauf in Höhe von € 350.000.",
    // 2
    "Theuwi is a spectacular 7-year-old mare by Emerald out of an Indoctro dam. Currently successfully navigating the 1.40m sections, she represents a turnkey investment for the professional rings. With an acquisition cost of € 225.000, her immense stride and natural bascule provide a seamless transition to ranking classes, pushing her financial trajectory toward the € 415.000 target sale bracket within 12-18 months.":
    "Theuwi ist eine spektakuläre 7-jährige Stute von Emerald aus einer Indoctro-Mutter. Derzeit meistert sie mühelos den 1.40m Level und stellt ein hochgradig profitables Kapital im professionellen Sport dar. Auf eine Erwerbssumme von € 225.000 stützend, bringt ihr großflächiger Galopp und natürlich perfekte Bascule eine Renditesteigerung auf ein Ziel-Segment von € 415.000 innerhalb der kommenden 12-18 Monate.",
    // 3
    "Directly descending from Chaccoon Blue and Odermus R, this 7-year-old mare is an explosive and highly competitive asset in the 1.30m - 1.35m developing classes. Her extreme blood and light-footed reflexes make her an ideal speed prospect. Secured at an entry valuation of € 145.000, she provides an aggressive and highly liquid path to a € 275.000 target sale for buyers seeking immediate 1.40m performance.":
    "Unmittelbar abstammend von Chaccoon Blue und Odermus R, punktet diese 7-jährige Stute explosiv in den 1.30m - 1.35m Springprüfungen. Ihre extreme Sensibilität und blitzartigen Reflexe stufen sie als ideales Speed-Pferd ein. Bei einer Sicherungsbewertung in Höhe von € 145.000 eröffnet sie hochliquide Spekulationen basierend auf einen € 275.000 Zielverkauf im 1.40m Sport.",
    // 4
    "Bred by the prestigious Paul Schockemöhle operation, this 7-year-old mare (Stakkatol x Balou du Rouet) is an absolute rubber ball off the ground. She is currently confirming her status in the 1.30m - 1.35m developing tracks. Entering the portfolio at € 280.000, her spectacular freakish technique and premium PS brand recognition mathematically project a high-margin exit strategy towards € 550.000.":
    "Gezüchtet von Paul Schockemöhle, ist diese 7-jährige Stute (Stakkatol x Balou du Rouet) wahrlich ein Gummiball am Stufensprung. Sie bestätigt beständig ihren Status auf dem 1.30m - 1.35m Parcour. Ins Portfolio aufgenommen bei exakten € 280.000, kalkulieren die makellose Sprungtechnik und PS-Auktionseinflüsse eine Verkaufsrendite von rund € 550.000.",
    // 5
    "At 6 years old, Doutzen (Dominator 2000 Z x Cancare) commands the ring with undeniable physical presence and sheer power. She is steadily gaining experience in the 1.25m - 1.30m Young Horse divisions. This mare is a legitimate long-term 1.60m Grand Prix prospect. Acquired for € 315.000, her raw athletic capacity provides the foundation to target an elite professional sale around € 750.000 as she matures.":
    "Im Alter von 6 Jahren verankert Doutzen (Dominator 2000 Z x Cancare) unbestreitbare Relevanz im Parcour mit ihrer puristischen Kampfkraft. Rasante Erfahrungen baut sie auf dem 1.25m - 1.30m Elite Jungpferde-Niveau auf. Diese Stute positioniert sich geradewegs Richtung Grand Prix (1.60m). Angesetzt für € 315.000 rechnet man nach erfolgreicher Ausbildung mit Profitsteigender Verwertung bei Elite Auktionen für glatt € 750.000.",
    // 6
    "Standing elegantly at 170cm, this 6-year-old mare combines the carefulness of I'm Special de Muze with the competitive drive of For Pleasure. Competing in the 1.25m - 1.30m Young Horse classes, her massive, ground-covering canter makes her a hyper-liquid asset. Valued at € 165.000 upon acquisition, she is molded perfectly for the lucrative amateur market, seeking a rapid turnaround to approximately € 280.000.":
    "Mit erstklassigen 170cm bündelt diese beeindruckend geformte 6-jährige Stute die feine Artikulation von I'm Special de Muze mit For Pleasure's Mentalität. Innerhalb der Jungpferde Parcouren bei bis zu 1.30m sichert ihr stark deckender Galopp hochliquide Ausstiegsmöglichkeiten. Das Anlagevolumen beläuft sich aktuell auf € 165.000 mit exakt € 280.000 Zielabsatz bei florierenden Amateurenmärkten.",
    // 7
    "An officially Approved BWP Stallion uniting the legendary Chacco Blue blood with a Maquin van de Heffinck dam. At 6 years old and stepping into 1.25m - 1.30m Young Horse circuits, United is a phenomenal dual-purpose asset. His € 450.000 acquisition price reflects his immense stallion syndication potential, driving towards an astronomical € 1.200.000 target valuation through stud fees and CSI development.":
    "Ein urkundlich BWP Gekörter Hengst, welcher legendäres Chacco Blue Blut mit Maquin van de Heffinck verbündet. United zeigt als fantastisches Kapital doppeltes Wachstum im Jungpferdesport bei 1.25m - 1.30m. Die € 450.000 Ankaufsumme stützt sich maßgeblich auf seine zukünftigen Einnahmen aus Decktaxen. Man extrapoliert eine Endbewertung im astronomischen Maßstab von etwa € 1.200.000.",
    // 8
    "A jaw-dropping 5-year-old grey stallion by Nixon van 't Meulenhof, supplemented by Cancara. He is a standout in the 1.10m - 1.20m Young Horse classes. His extreme elasticity and commercial stopping power as a spectacular grey stallion justify the € 180.000 entry point. Focused on the young horse championships, his trajectory allows for a massive ROI towards a € 390.000 target sale prior to his 7-year-old year.":
    "Ein herausragend dominanter 5-jähriger Schimmelhengst des Gestüts Nixon van 't Meulenhof, abgeführt von Cancara. Höchst attraktiv bewährt er sich auf Sprunghöhen von 1.10m - 1.20m. Exzellente Elastizität und sein optisches Prachtvolumen verteidigen die veranschlagten Ankaufkosten von € 180.000. Mit einem exklusiven Fokus auf Championate verspricht der Hengst einen stetigen Weg in Richtung Rekordverkauf von € 390.000.",
    // 9
    "Blending the modern sensation Ermitage Kalone with the immortal Casall, Warrior is a spectacular 4-year-old stallion jumping the 1.00m Young Jumper courses. He embodies the purest definition of an early-stage, pure-growth asset. Secured at € 240.000, the immediate focus lies in stallion approvals, with an extremely lucrative path targeting a € 600.000 exit to a major Olympic string as his talent solidifies.":
    "Dem modernem Ideal des Ermitage Kalone und grenzenlosem Casall geschuldet, brilliert Hengst Warrior (4 Jahre alt) bei seinen 1.00m Einführungs-Springen. Er spiegelt glasklar einen sogenannten Wachstumswert ('pure-growth asset') der ersten Stufe. Mit € 240.000 Kapitalbedarf liegt der jetzige Schwerpunkt streng auf Zuchtzulassungen, anlehnend an hochdosierte Zukunftsperspektiven in Olympia-Leistungsstufen bei € 600.000."
  },
  es: {
    "Jumpers": "Caballos de Salto",
    "Hunters": "Hunters",
    "Mare": "Yegua",
    "Stallion": "Semental",
    "Financial Prospectus": "Prospecto Financiero",
    "Metrics": "Métricas",
    "Expected Valuation": "Valoración Esperada",
    "Asset Purchase Price": "Precio de Compra",
    "Expected Sale Price": "Precio de Venta Esperado",
    "Developing": "En Desarrollo",
    "Mos": "Meses",
    
    // DESCRIPTIONS
    // 1
    "As a developing 7-year-old mare (Zirocco Blue VDL x I'm Special de Muze) currently competing in the 1.30m - 1.35m division, Special Blue possesses the ultimate modern type for the elite American hunter/jumper circuit. Acquired at € 185.000, her value relies heavily on her extreme rideability and scope, pointing towards a target sale of € 350.000 as she masters the international amateur leagues.": 
    "Como yegua en desarrollo de 7 años (Zirocco Blue VDL x I'm Special de Muze) que compite actualmente en la división de 1,30m - 1,35m, Special Blue posee el tipo de aspecto moderno por excelencia perfecto para el exigente circuito elite de Estados Unidos. Adquirida por un valor principal de € 185.000, el salto en valoración se apoya por completo a través de destrezas como la versatilidad de manejo, impulsando proyecciones hacia los € 350.000.",
    // 2
    "Theuwi is a spectacular 7-year-old mare by Emerald out of an Indoctro dam. Currently successfully navigating the 1.40m sections, she represents a turnkey investment for the professional rings. With an acquisition cost of € 225.000, her immense stride and natural bascule provide a seamless transition to ranking classes, pushing her financial trajectory toward the € 415.000 target sale bracket within 12-18 months.":
    "Theuwi es una yegua fascinante de 7 años concebida por Emerald de madre Indoctro. Atendiendo al éxito instantáneo visto en niveles salto de 1.40m, simboliza una inversión garantizada ('llave en mano'). Bajo un coste valorado de € 225.000, gozar de una trancada impresionante consolida su entrada prematura en competiciones ranking, ascendiendo la escalera financiera de cara un traspaso tasado alrededor de € 415.000 a mediano plazo.",
    // 3
    "Directly descending from Chaccoon Blue and Odermus R, this 7-year-old mare is an explosive and highly competitive asset in the 1.30m - 1.35m developing classes. Her extreme blood and light-footed reflexes make her an ideal speed prospect. Secured at an entry valuation of € 145.000, she provides an aggressive and highly liquid path to a € 275.000 target sale for buyers seeking immediate 1.40m performance.":
    "Descendiente legítima de las venas cruzadas de Chaccoon Blue con la línea de cría Odermus R, esta potente yegua de 7 años demuestra rendimientos abrumadores concursando bajo esferas de salto a 1.30m - 1.35m. Gracias a una rápida adaptabilidad es percibida para circuitos tipo 'speed'. Con ingresos inyectados de € 145.000 la curva de ganancias establece revalorizaciones sumamente dinámicas estimadas predeciblemente en € 275.000 en su cúspide.",
    // 4
    "Bred by the prestigious Paul Schockemöhle operation, this 7-year-old mare (Stakkatol x Balou du Rouet) is an absolute rubber ball off the ground. She is currently confirming her status in the 1.30m - 1.35m developing tracks. Entering the portfolio at € 280.000, her spectacular freakish technique and premium PS brand recognition mathematically project a high-margin exit strategy towards € 550.000.":
    "Obtenida mediante el programa histórico a manos de Paul Schockemöhle, esta formidable yegua de 7 años (Stakkatol x Balou du Rouet) ejecuta unas elevaciones increíbles con técnica desproporcional. Reafirmando el reconocimiento en pruebas 1.30m, la asignación y capital inicial estipulados a € 280.000 promueven estrategias alcistas que rentabilizan márgenes altos, aspirando lograr desinversiones cuantiosas situadas a € 550.000.",
    // 5
    "At 6 years old, Doutzen (Dominator 2000 Z x Cancare) commands the ring with undeniable physical presence and sheer power. She is steadily gaining experience in the 1.25m - 1.30m Young Horse divisions. This mare is a legitimate long-term 1.60m Grand Prix prospect. Acquired for € 315.000, her raw athletic capacity provides the foundation to target an elite professional sale around € 750.000 as she matures.":
    "Contando escasos 6 años de vida, Doutzen (nacida de Dominator 2000 Z y de raíz Cancare) acapara todos los destellos al galopar ostentando pura presencia escénica monumental. Escalando peldaños seguros progresando dentro 1.25m a 1.30m, asume una proyección digna para los grandes saltos en Grand Prix 1.60m. Integrada recientemente bajo una estimación estricta a € 315.000 proyectando ganancias contundentes que rebasan € 750.000.",
    // 6
    "Standing elegantly at 170cm, this 6-year-old mare combines the carefulness of I'm Special de Muze with the competitive drive of For Pleasure. Competing in the 1.25m - 1.30m Young Horse classes, her massive, ground-covering canter makes her a hyper-liquid asset. Valued at € 165.000 upon acquisition, she is molded perfectly for the lucrative amateur market, seeking a rapid turnaround to approximately € 280.000.":
    "Posando suntuosamente por arriba de 1.70m, esta gloriosa yegua de 6 años enlaza dotes de meticulosidad extraída del emblemático 'I'm Special de Muze' junto al implacable deseo vencedor procedente de la estirpe 'For Pleasure'. Su robusto galope recubridor la cataloga bajo perfiles liquidez altísimos. Trazando su valía por la cifra original base de € 165.000 su trayectoria está apuntando hacia retornos fluidos dictados rondando la cifra tasada a € 280.000.",
    // 7
    "An officially Approved BWP Stallion uniting the legendary Chacco Blue blood with a Maquin van de Heffinck dam. At 6 years old and stepping into 1.25m - 1.30m Young Horse circuits, United is a phenomenal dual-purpose asset. His € 450.000 acquisition price reflects his immense stallion syndication potential, driving towards an astronomical € 1.200.000 target valuation through stud fees and CSI development.":
    "Cimentado formalmente Semental Autorizado del sello BWP, fusiona material original extraído íntegramente por genética legendaria de 'Chacco Blue'. Ejerce a 6 años maduros un recorrido fenomenal exhibido durante eventos Young Horse superando alturas combinadas 1.25m - 1.30m. Sus acciones, cotizadas primariamente costando € 450.000 apalancan ingresos venideros a través tarifas cubrición conduciendo un trayecto ascendente espectacular cerca € 1.200.000.",
    // 8
    "A jaw-dropping 5-year-old grey stallion by Nixon van 't Meulenhof, supplemented by Cancara. He is a standout in the 1.10m - 1.20m Young Horse classes. His extreme elasticity and commercial stopping power as a spectacular grey stallion justify the € 180.000 entry point. Focused on the young horse championships, his trajectory allows for a massive ROI towards a € 390.000 target sale prior to his 7-year-old year.":
    "Constituyendo todo un Semental gris espectacular con una cortedad de tan solo 5 años de edad liderado proveniente directo de 'Nixon van 't Meulenhof'. Realzándose con fluidez dentro del círculo equino clasificado bajo estatus de caballo joven, encabeza los perfiles económicos avalados positivamente valiendo un aproximado firme de compra entrada a € 180.000 logrando expandir su margen rendimiento (ROI) culminando expectativas de cara a € 390.000.",
    // 9
    "Blending the modern sensation Ermitage Kalone with the immortal Casall, Warrior is a spectacular 4-year-old stallion jumping the 1.00m Young Jumper courses. He embodies the purest definition of an early-stage, pure-growth asset. Secured at € 240.000, the immediate focus lies in stallion approvals, with an extremely lucrative path targeting a € 600.000 exit to a major Olympic string as his talent solidifies.":
    "Diluyendo a la percepción moderna encarnada popularmente a través de la aclamada imagen Ermitage Kalone aunado con sangre inmortal de 'Casall'. Warrior es sencillamente espectacular luciendo como semental prodigio rebasando metas juveniles (salto de barreras alza en categoría básica de 1.00m). Acordado un valor adquisitivo en torno a € 240.000 priorizando el licenciamiento para metas sumamente rentables valoradas a € 600.000 dentro espectros nivel Olimpiadas."
  }
};

const portPath = path.join(__dirname, 'src', 'content', 'portfolio');

for (const code of langs) {
  const dirPath = path.join(portPath, code);
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
  
  for (const file of files) {
    const p = path.join(dirPath, file);
    let content = fs.readFileSync(p, 'utf8');
    
    // Replace text keys
    for (const [en, local] of Object.entries(translations[code])) {
      // Create regex for exact match but with flexible spaces and newlines if possible or just normal replacement
      content = content.replace(en, local);
    }
    
    fs.writeFileSync(p, content);
    console.log(`Translated ${file} to ${code}`);
  }
}
