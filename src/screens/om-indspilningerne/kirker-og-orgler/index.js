/**React Imports */
import React,{useState} from 'react'
import {Text, View, ScrollView, Image} from 'react-native'

/**Libraries */
import {useTheme} from '@react-navigation/native'
import EStyleSheet from 'react-native-extended-stylesheet'

/**Components */
import Layout from '../../../components/layout'

/**Local Imports */
import { TableData, TableDataTwo } from './helpers';

/**Styles */
import styles from '../../styles/text-block'

/**Main Export */
const KirkerOgOrgler = ({navigation}) => {

	const {colors} = useTheme()

	return (
		<Layout {...{title: 'Kirker og orgler', navigation}}>
			<View style={styles.TextBlock}>
				<Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
					Godthaabskirken
				</Text>
				<Image source={require('../../../../assets/images/kirk_01.jpeg')}	style={styles.Text_Image}	/>
				<Text style={[styles.Text, styles.Text_Link_Bold, {color: colors.text}]}>
					De Classenske Boliger
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Hvor Frederiksberg svømmehal og Aksel Møllers Have ligger i dag, var
					der i første halvdel af 1800-tallet frugtbare marker. Her havde Det
					Classenske Fideikommis i 1866 købt et stykke jord, ca. 6 tdr. land fra
					Justitsråd Nyelands ejendom ”Sindshvile”, og i perioden 1866-1881
					havde man ladet opføre en hel by (24 langhuse i gule sten med
					lejligheder til i alt 378 familier) for “at hjælpe og lindre fattigdom
					og elendighed”. Arkitekt W. Tvede, der også senere blev
					Godthaabskirkens arkitekt, tegnede byggeriet. Det var koleraepidemien
					i1853, der gjorde, at Det Classenske Fideikommis tog initiativet til
					dette nybyggeri. Især København blev hårdt ramt af epidemien med
					omkring 7000 smittede og 4000 dødsfald. Epidemierne ramte især de
					fattigste borgere, oftest arbejderfamilier, som havde de ringeste og
					mest usunde boliger. Det Classenske Fideikommis var en filantropisk
					fond, der var stiftet af generalmajor J. F. Classen, som i 1700-tallet
					havde skabt sig en formue ved at lave krudt og kugler i Frederiksværk.
					En del af hans penge gik altså nu til at gøre noget for
					arbejderstanden. Grunden, som Fideikommis'et købte, strakte sig fra
					Godthåbsvej til den nuværende Nyelandsvej på den ene led, og fra
					Yrsavej hen mod Langelandsvej på den anden led. Rækkehusene, der blev
					kaldt De Classenske Boliger, var i to etager, og lejlighederne var
					små. Lejlighedstyperne var 1-, 1½- og 2-værelses lejligheder - alle
					med eget køkken ca. 4.kvm. og ca. 12-15 kvm. store værelser. Der var
					kun én vandhane pr. hus og intet afløb, hvorfor man selv måtte skaffe
					sig af med det brugte vand. Der var ikke toilet lejlighederne. De var
					derimod anbragt to og to i små bygninger ved husenes gavle, hvilket
					gav fire klosetter til 16 lejligheder. Hvert hus fik tildelt en lille
					havelod. På en central plads midt i byggeriet anlagdes et stort
					fælleshus, kedelrum og vaskeri samt forskellige butikker, hvor indkøb
					af dagligvarer kunne foretages. Endelig indrettedes der et børneasyl
					og dertil kom en kirke kaldet ”Classerkirken” (se nedenfor). Allerede
					i 1867 kunne de første lejere flytte ind. Huslejerne var meget små. I
					1880 boede der 1288 personer i bebyggelsen voksende til 1655 i 1895.
				</Text>
				<Text style={[styles.Text, styles.Text_Link_Bold, {color: colors.text}]}>
					Classerkirken
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					I 1880 blev “Classerkirken”, en lille rødstensbygning med to korte
					korsarme, tårn og indvendigt bjælkeloft, indviet som kirke for
					området. Kirkens første præster var Johannes Levinsen, der døde
					allerede 1884 og Carl Johannes Tolstrup, der 28 år gammel blev præst
					ved Classerkirken i 1898. Tolstrup havde i 3 år efter sin
					embedseksamen været huslærer ved hoffet hos kronprins Frederik, den
					senere Frederik VIII. Tolstrup beskrives som en dygtig igangsætter og
					organisator, og han fik et virksomt menighedsliv til at blomstre frem,
					ikke mindst for de unge.
				</Text>
				<Text style={[styles.Text, styles.Text_Link_Bold, {color: colors.text}]}>
					De Classenske Boligers videre skæbne
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					De viste det sig hurtigt, at De Classenske Boliger ikke var
					tidssvarende. Lige efter opførelsen blev boligerne ellers meget
					berømmet i både indland og udland, og Det Classenske Fideikommis
					høstede megen ros for sit sociale engagement. Men efterhånden blev
					ideen med sunde arbejderboliger alment udbredt og tabte derved sin
					nyhedsværdi. Det fik Fideikommis'et til at miste interessen for
					Classerne, og vedligeholdelsen af bygningerne blev forsømt. Oveni det
					var Det Classenske Fideikommis i sin filantropiske ånd meget
					eftergivende med hensyn til betalingen af huslejen lige fra de første
					beboere flyttede ind. Det resulterede i, at beboerne i De classenske
					Boliger oftest var folk med trange kår ( i 1906 var 40% af husstandene
					i De classenske Boliger “uden mandligt familieoverhoved”). Resultatet
					blev, at Classerne stort set var befolket af fattige, og at
					bygningerne fik lov til at forfalde. Inden længe have Frederiksberg
					fået sig en slumbebyggelse på halsen. De Classenske Boliger med deres
					ringe standard stod efterhånden mere og mere i kontrast til de nye
					arbejderboliger, der skød op omkring de små rækkehuse. Og i 1909 blev
					det for meget for Frederiksberg Kommune, som købte De classenske
					Boliger med nedrivning for øje. Bolignød og pengemangel gav dog
					Classerne “kunstigt åndedræt” i mange år fremover, og kun gradvist
					blev husene revet ned. Faktisk overlevede De classenske Boliger helt
					op til slutningen af 50″erne. Classernes ry som rabarberkvarter
					overlevede ligeså længe. Samtidig med, at De classenske Boliger blev
					solgt til Frederiksberg kommune, reserverede Fideikommis”et 75.000 kr.
					til opførelse af en ny kirke på en grund, skænket af proprietær, exam.
					juris. H. I Nyeland.
				</Text>
				<Text style={[styles.Text, styles.Text_Link_Bold, {color: colors.text}]}>
					Godthaab sogn oprettes
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Godthaab sogn oprettedes 30. september 1909 og omfattede de Classenske
					boligers distrikt samt dele af Mariendal, Skt. Lukas og Skt. Thomas
					sogne. Classerkirken blev brugt som midlertidig sognekirke, indtil
					Godthaabskirken kunne indvies 19. marts 1911, men blev derefter revet
					ned. Classerkirken havde altså en usædvanlig kort “levetid” på kun 30
					år.
				</Text>
				<Text style={[styles.Text, styles.Text_Link_Bold, {color: colors.text}]}>
					Godthaabskirken bliver til
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Fra første begyndelse var pastor Tolstrup brændende for
					kirkebyggeriet. Han stod i spidsen for den byggekomite, der nu blev
					nedsat. Allerede den 3. oktober 1909 blev Godthaabskirkens grundsten
					nedlagt af provst Ostenfeld, der senere blev Sjællands biskop. I
					grundstensdokumentet, der er indmuret i kirkens alter, står ordene fra
					1. Petersbrev 2,4-5. Her i datidens oversættelse:Kommer til Ham, den
					levende Sten, der vel er forkastet af Mennesker, men er udvalgt og
					dyrebar for Gud, og lader eder selv som levende Stene opbygge som et
					aandeligt Hus til et helligt Præsteskab, til at frembære aandelige
					Ofre, velbehagelige for
				</Text>
				<Text style={[styles.Text, styles.Text_Link_Bold, {color: colors.text}]}>
					Gud ved Jesus Kristus
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Der forestod nu byggekomiteen den efter datidens forhold ret
					betydelige opgave at skaffe restbeløbet til kirkens opførelse: ca.
					55.000 kr. Opgaven lykkedes. Da kirken 1 1/2 år efter blev indviet,
					stod den gældfri. Byggeudvalget med pastor Tolstrup i spidsen bad
					arkitekt Gotfred Tvede om at bygge den nye kirke. Arkitekt Tvede
					fortæller i Architekten 13. årg. Nr. 33 (13. maj 1911), at Tolstrup
					sagde til ham: “Gør kirken lys”, men i øvrigt fik arkitekt Tvede frie
					hænder inden for den opgivne sum.
				</Text>
				<Text style={[styles.Text, styles.Text_Link_Bold, {color: colors.text}]}>
					Godthaabskirkens indvielse 19. marts 1911
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Selve indvielsen af Godthaabskirken forløb temmelig dramatisk. Kong
					Frederik den Ottende og dronning Louise var til stede ved den
					højtidelige indvielse, der blev foretaget af Sjællands biskop, dr.
					theol. Peder Madsen. Som udgangspunkt for sin tale havde han valgt
					ordene fra Apostlenes Gerninger 2,42: Og de holdt fast ved Apostlenes
					Lære og Samfundet, Brødets Brydelse og Bønnerne. Midt under talen fik
					biskoppen et ildebefindende og blev båret ud i præsteværelset. Provst
					Ostenfeld trådte ind foran alteret og fuldførte biskoppens tale og
					indvielsen, uden at der gik større skår i højtideligheden. Kongen
					belønnede straks efter provsten med et ridderkors. Pastor Tolstrup
					prædikede ved indvielsen og indledte med at sige: Herrens ord bliver
					evindelig, det er den faste Grund, hvorpå den Gerning hviler, som skal
					øves fra dette Sted mens Tiderne skifte, og Verden derved forandres,
					mens Slægt følger Slægters gang, er der eet, der bliver som det
					eneste: Herrens ord. Samme år som kirken blev indviet døde pastor
					Tolstrup efter et kort sygeleje1. september 1911 kun 41 år gammel. Det
					kom som et slag for menigheden. Han blev den første, der blev begravet
					fra den kirke, han så ivrigt havde arbejdet på at få rejst. I kirken
					er der opsat en mindetavle over ham i kirkevæggen ved siden af
					prædikestolen. Nederst på tavlen står ordene fra Salme 103: Min sjæl
					lov Herren.
				</Text>
				<Text style={[styles.Text, styles.Text_Link_Bold, {color: colors.text}]}>
					Godthaabskirkens orgel
				</Text>
				<Image	source={require('../../../../assets/images/kirk_02.png')} style={styles.Text_Image}	/>
				<Text style={[styles.Text, {color: colors.text}]}>
					Godthaabskirkens nuværende romantiske orgel på 33 stemmer blev i 1983
					bygget af Jensen og Thomsens Orgelbyggeri, Hillerød.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Godthaabskirkens første orgel fra 1911 - et romantisk præget orgel -
					var oprindeligt anbragt i kirkens østlige side. Det var bygget af
					orgelfabrikant Chr. Winther og Th. Frobenius. Orglet blev i 1935
					udvidet og flyttet til sin nuværende placering på pulpituret over
					indgangen til kirkeskibet. I slutningen af 70-erne var kirkens gamle
					orgel teknisk set nedslidt, men det røbede dog ind imellem klanglige
					kvaliteter, som det daværende menighedsråd gerne så overført til et
					nyt orgel. Samtidig lagde arkitekten vægt på, at den fra kirkerummet
					synlige del af orglet, facadeskærmen, blev bevaret. En minutiøs
					gennemgang af alle piber blev foretaget sammen med orgelbyggerne og
					resultatet af denne undersøgelse blev, at man kunne anbefale en
					genanvendelse af 12 gamle stemmer, i alt over 550 enkeltpiber. Disse
					12 stemmer, der altså stammer fra det oprindelige orgel i 1911, danner
					udgangspunktet for den klanglige opbygning af det nuværende orgel. Den
					gamle facadeskærm, tegnet af Einar Madvig i 1935, er ligeledes
					genanvendt og rykket lidt frem i kirkerummet for at bedre kontakten
					mellem præst/menighed og organist/kor. En ny og højere facadeskærm
					udformet i stil med den gamle rejser sig længere tilbage på pulpituret
					og danner forsiden af orglets bageste sektion, svelleværket.
				</Text>
				<Text style={[styles.Text, styles.Text_Link_Bold, {color: colors.text}]}>
					Orglets disposition og tekniske specifikationer
				</Text>
				<ScrollView horizontal={true}>
					<View style={styles.Table}>
						{TableData.map((row, index) => {
						return (
							<View
								key={row.id}
								style={EStyleSheet.child(
									styles,
									'Row',
									index,
									TableData.length,
								)}
							>
								{row.cols.map(col => {
									return (
									<View key={col.id} style={styles.Col}>
										<Text
											style={[
												styles.Col_Item,
												{
												fontFamily: col.bold ? 'Sen-Bold' : 'Sen-Regular',
												color: col.bold ? colors.text : colors.text,
												width: 160,
												},
											]}
										>
											{col.text}
										</Text>
									</View>
									)
								})}
							</View>
						)
						})}
					</View>
				</ScrollView>
				<Text style={[styles.Text, {color: colors.text}]}>
					De med + mærkede registre er af Theodor Frobenius 1911. Manualomfang:
					C – g”””. Pedalomfang: C – f”. Elkoblinger: HV+SV, HV+COR, P+HV, P +
					SV, P + COR. Sløjfelader. Mekanisk spilletraktur. Elregistratur med
					256 elektronisk styrede sættekombinationer – system Karsten Olsen. 3
					faltebælge og en speciel bælg til de største pedalpiber. Fritstående
					spillebord vendt mod kirkerummet. Arkitekt: Rolf Graae m.a.a.
					Orgelteknisk rådgiver: organist Per Kynne Frandsen.
				</Text>
				<Text style={[styles.Text, styles.Text_Link_Bold, {color: colors.text}]}>
					Lundehus Kirke
				</Text>
				<Image source={require('../../../../assets/images/kirk_03.jpeg')} style={styles.Text_Image}/>
				<Text style={[styles.Text, {color: colors.text}]}>
					Lundehus Sogn har “naturlige” grænser og afgrænses mod syd og vest
					væsentligst af banelinjerne mod Hellerup, Svanemøllen og Farum. Mod
					øst af Ryvangens Naturpark og mod nord er sognegrænsen kommunegrænsen
					mod Gentofte Kommune.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Lundehus Sogn blev i 1938 udskilt fra Bispebjerg Sogn, som området
					havde tilhørt siden 1927, hvor den første del af Grundtvigskirken
					(Tårnkirken) var blevet indviet. Bispebjerg Sogn blev ved den
					lejlighed udskilt fra Brønshøj Sogn med den gamle middelalderkirke fra
					omkring 1180. Området her omkring den gamle Emdrup landsby var i
					århundreder det yderste mod øst i det store Brønshøj Sogn, der strakte
					sig fra Damhussøen til Øresund. I løbet af 1930’erne var lejlighederne
					i Ryparken blevet opført, og der opstod blandt beboerne et ønske om
					egen kirke.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Fabrikant Julius Hansen, hvis trikotagefabrikker lå mellem Gartnerivej
					og Bomhusvej, stillede en grund og en bygning til rådighed. Det var
					den første Lundehus Kirke. Bygningen ligger stadig på Rygaards Allé,
					og er en del af Københavns Kommunes børneinstitution “Rypen” (tidl.
					“Lillegaarden”).
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Dette var en midlertidig ordning, og menigheden begyndte hurtigt at
					samle penge ind til en mere permanent kirke. Den gang kunne
					kirkebyggeri ikke finansieres over kirkeskatten. På grund af
					byggerestriktioner i tiden efter krigen måtte lånet af bygningen på
					Rygaards Allé imidlertid forlænges.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Først efter næsten 20 år stod den nye Lundehus Kirke færdig i
					parkområdet ved Strødamvej – en grund, som Menighedsrådet på næsten
					mirakuløs måde havde fået lov til at købe af Københavns Kommune.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Kirken blev indviet første søndag i advent – den 1. december 1957.
				</Text>
				<Text style={[styles.Text, styles.Text_Link_Bold, {color: colors.text}]}>
					Kirkens arkitektur
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Kirkens arkitekt er Holger Jensen, der allerede på det tidspunkt havde
					gjort sig bemærket som en banebrydende kirkearkitekt og siden har
					tegnet rigtigt mange kirker. På grund af grundens trekantede form og
					af hensyn til den omkringliggende bebyggelse valgte han at bygge en
					pyramideformet kirke, hvor klokketårnet indgår son en åben del af
					taget. Idéen er, at kirken udefra skal minde om et sømærke af den
					slags, man ser ved den jyske vestkyst. Kirken er således tænkt som et
					fast punkt og et pejlemærke i sognet.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					I 2007 ønskede menighedsrådet en ombygning dels af de praktiske grunde
					og dels for at forstærke indtrykket af et helligt rum. 50 år synes
					pludselig som lang tid, især for en kirke, som blev bygget med færrest
					mulige midler. Helt konkret var gulvet brugt op, vinduespartiet kaput
					og belysningen for utilstrækkelig til at kirke-gængerne kunne læse
					salmebogens strofer.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Måske kunne hvælvingen komme til at leve mere, hvis den blev inddraget
					i belysningen. Også indtrykket var bleget. Helt så ren og enkel som
					kirkerummet var tænkt fremstod det ikke længere. De mørke træfarver
					løftede ikke hvælvingen, som de oprindeligt gjorde.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>.</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Men ombygningen var ikke ligetil og det stod hurtigt klart, at det var
					vigtigt at kunne bevare den stærke fornemmelse af rum, Holger Jensen
					skabte for 50 år siden. I sin enkelhed, renhed, lethed og samtidig et
					rum, der var kirke med den store hvælving, der rejser sig for øjet
					udvendig og favner de mennesker, der befinder sig inde i rummet.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					At definere hvad der kan give indtryk af anderledeshed og hellighed er
					ikke ligetil, men det har meget med kontraster, spændinger, forskelle
					og ro at gøre. Ved at pudse væggene hvide, er hvælvingen blevet
					fremhævet, den ”svæver” frit, og fornemmelsesmæssigt er der blevet
					højere til loftet. Det mørke granitgulv er en af kontrastvirkningerne,
					der desuden fremhæver de smukke stole.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Lyset i kirken, der kommer fra kirkehaven, har vi vendt hele kirken
					efter, så der nu er mindst mulig afstand mellem ude-kirkehaven og
					rummet inde. Det er den største ændring ved denne ombygning, idet
					altervæggen nu består af den gennembrudte glasvæg ud mod først
					kirkehaven og sidst de store træer i parken, Vor Herres store
					bagtæppe. Derved opnås en afslutning og uendelighedsfornemmelse på én
					gang.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					På den måde er kirkehaven tænkt med i rummet, og det er da også der,
					udsmykningen skal placeres, når der rejses penge til den. Men blikket
					standser ikke ved muren de store træer er rykket nærmere og lysets
					spil i deres kroner er blevet nærværende.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Indvendig er møbleringen delvis ny. Alteret er det oprindelige, der er
					placeret foran vinduet, og placeret sådan at præsten kan stå både med
					ryggen til menigheden og med ansigt vendt mod den. Prædikestolen har
					evangelistsymbolerne med fra den gamle prædikestol, mens alterskranken
					er ny og åbner ud mod rummet og menigheden.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					At skabe smukt og brugbart lys på én gang i Lundehus Kirkes rum er
					særdeles svært, fordi den ”himmel” lyset skal fæstnes ved er meget
					langt fra gulv, og desuden er hvælvingsrummet meget stort i sig selv.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Lysarkitekt Gunvor Hansen har gennem mange år bakset med den opgave,
					og har nu fundet frem til en både utraditionel og ind-lysende
					lyssætning, der tager hensyn både til læsefunktion og skønhed. Desuden
					kan lyssætningen reguleres efter kirkens brug til gudstjeneste,
					koncerter, dag, aften, sommer og vinter.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					På alteret placeres et lille kors. Det er udformet så det ”fanger”
					lyset og kan virke som koncentrationspunkt for øjet.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Ønsket fra arkitekt og menighedsråds side har været at skabe et rum,
					der rører mennesker. På én gang markant og let, enkelt og tydeligt og
					i materialer, der spiller med og mod hinanden og fremhæver det
					anderledes, et kirkerum er.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Som kirken nu fremtræder mødes kirke- og koncertgængere i øjenhøjde og
					kaldes på af lys og stoflighed, nærvær og afstand. Med plads til de
					største tanker og følelser og de mindste fornemmelser, der endnu ikke
					er sat ord på.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					I kirken står lysgloben, små lys på en “jordklode” omkring et større
					lys i midten. Lyset i midten er Livets Lys – Kristus – og de små lys i
					cirkel omkring er den mangfoldighed, livets lys spejles i. Her kan man
					tænde et lys for verden, for en ven, for sig selv og lade lyset varme
					og stilheden tale.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					I 1994 fik kirken et nyt orgel placeret på gulvet til venstre, når man
					kommer ind. Orgelhuset er af lyst fyrretræ, som efterhånden vil få den
					samme lød som det øvrige træ i kirken.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Som en smuk skulptur er orglet føjet ind i den eksisterende arkitektur
					af kirkens arkitekter Holger Jensen og hans søn, Lars Jensen. Orglet
					har 21 stemmer, og er bygget af orgelbyggefirmaet Frobenius i Lyngby.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Kirkeskibet – en model af the-clipperen “Thermopylæ”, der fragtede the
					fra Kina til England, er udført og skænket til kirken af civilingeniør
					Tage Blum.
				</Text>
				<Text style={[styles.Text, styles.Text_Link_Bold, {color: colors.text}]}>
					Lundehus Kirkes orgel
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Orgel: Th. Frobenius & Sønner 1994 21 stemmer, heraf 2 delvis
					transmitteret. HV: Principal 8, Dolce 8´ (C-H fælles m. Pr. 8´), Oktav
					4´, Flauto de voce 4´, Oktav 2´, Cornet III, Tormpet 8´ POS: Trægedakt
					8 (B/D), Gamba 8´(T/D), Fistola 4´(B/D), Kvint 2 2/3 (T/D), Flautino 2
					(B/D), Terts 1 3/5´(T/D), Cymbel I (B/D), Vox humana 8 (B/D).
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					PED: Subbas 16´, voce fondamentale 8´, Gedakt 8´i(C-f fra Subb. 16´),
					Oktav 4´(C-f fra Voce fondam. 8´), Corno di notte 2´, Faggottino 16´.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Omfang: C-g3, C-f1. Normalkopler. Svelle og tremulant for POS.
					Registerdeling i POS: (B): C-cl, (T): a-c1, (D): cs1-g3. Mekanisk
					traktur og registratur sløjfevindlader.
				</Text>
				<Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
					Trinitatis Kirke
				</Text>
				<Image source={require('../../../../assets/images/kirk_04.jpeg')} style={styles.Text_Image}/>
				<Text style={[styles.Text, {color: colors.text}]}>
					Trinitatis Kirke er Christian den IV’s værk, skønt han ikke selv nåede
					at se kirken færdig.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Han ønskede at bygge en speciel kirke for universitetets professorer
					og studerende. Derfor lod han i 1630’erne Regensens bedesal indrette
					som en rigtig kirke. Den skulle fungere som kirke, indtil den nye
					studenterkirke stod færdig. Regensen, der ligeledes er bygget af
					Christian den IV, hører til blandt de ældste studenterkollegier i
					København.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Christian den IV ville bygge en kirke, der både var sakral og
					verdslig. Den skulle rumme kirken, den kongelige bogsamling og et
					observatorium. Denne tredeling blev senere afspejlet i kirkens navn –
					Trinitatis – treenigheden, hvor Faderen er i himlen, Sønnen er i
					sandheden (i bøgerne), og Helligånden er i kirken. Indskriften ved
					indgangen til Rundetaarn beskriver på latin bygningskompleksets
					funktion:
				</Text>
				<View style={styles.List}>
					<View style={styles.List_Item}>
						<View style={styles.Dot} />
						<Text style={[styles.Text, {color: colors.text}]}>
							En kirke for den hellige trefoldighed.
						</Text>
					</View>
					<View style={styles.List_Item}>
						<View style={[styles.Dot, {backgroundColor: colors.text}]} />
						<Text style={[styles.Text, {color: colors.text}]}>
							En bøgernes højborg og.
						</Text>
					</View>
					<View style={styles.List_Item}>
						<View style={[styles.Dot, {backgroundColor: colors.text}]} />
						<Text style={[styles.Text, {color: colors.text}]}>
							En stjerneborg af vidunderlig udførelse.
						</Text>
					</View>
				</View>
				<Text style={[styles.Text, {color: colors.text}]}>
					Efter usikkerhed om, hvor der skulle bygges, blev grundene på hjørnet
					af Købmagergade og Landemærket anskaffet. De blev ryddet for huse, og
					grundstenen blev lagt 7. juli 1637. Senere kilder, bl.a. en af
					tavlerne ved Rundetaarns indgang, hævder, at kongen selv nedlagde
					stenen. Vi ved dog fra kongens egenhændige breve, at han var i Holsten
					den dag.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Kongen var selv aktiv i planlægningen af bygningen, og på Rundetaarns
					front finder vi en rebus, der med sikkerhed kan henføres til Christian
					den IV. I Rigsarkivet findes hans udkast til den, for øvrigt på
					bagsiden af hans skitse til tre pramme, som han ønskede bygget på
					Holmen i 1640. Rebussen kan tolkes på flere måder. Thomas Bang, der
					var professor ved Universitetet og den første bibliotekar i den nye
					bibliotekssal over kirken, tolkede i 1648 rebussen således: ”Styr
					lærdommen og retfærdigheden, Herre i den kronede Konge Christian den
					4.’s hjerte”. Lærdommen skal forstås som den rette kristelige lære.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Byggeriet skred støt frem under skiftende bygmestre, Hans van
					Steenwinckel den yngre, Leonard Blasius og Albertus Mathiesen.
					Rundetaarn stod færdig 1642-43. Rebussen på tårnet siger 1642 og
					gitteret på toppen siger 1643. Den sidste sten i hvælvingerne blev sat
					7. juli 1651, og kirken blev indviet Trinitatis søndag, 1. juni 1656.
					De sidste fem år var gået med at lave kirkens inventar.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Da byggeriet begyndte, var bygningens udseende planlagt i meget grove
					træk, og en række ikke uvæsentlige detaljer fandt først deres endelige
					udformning under byggeriet. Således blev byggeriet påbegyndt, uden at
					man vidste, hvilken højde Rundetaarn skulle have, og bygningsdetaljer,
					der nu er skjult bag kirkerummets hvælvinger viser, at rummet
					oprindeligt var tænkt udført med fladt loft.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Kirken ligner ikke nogen af Christian den IV’s andre bygninger. De er
					alle i den såkaldte hollandske renæssance-stil. Trinitatis Kirkes
					arkitektur peger bagud. Der er romanske elementer i Rundetaarns frise
					øverst på tårnet, gotiske træk i de spidsbuede kirkevinduer og i
					hvælvene i kirkerummet. Kirkerummets søjlers baser og kapitæler har
					renæssance-træk. Rummet er ca. 50 meter langt, 20 meter bredt og 18
					meter højt. Noget tyder på, at rummets størrelse er blevet bestemt af
					bibliotekets behov for gulvplads.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Kort efter kirkens indvielse, nemlig 6. juli 1658, blev
					patronatsretten overdraget til Universitetet, men der fulgte ingen
					indtægter med en sådan ordning. Kirken måtte klare sig ved salg af
					stolestader og begravelser – en noget usikker finansieringsmetode. I
					1683 blev kirken tildelt det sogn, der egentlig tilhørte Sankt Anna
					Rotunda, den store tolvkantede centralkirke, som Christian den IV
					havde påbegyndt ved Nyboder i 1640, men som aldrig blev fuldført.
					Sognet gav mulighed for faste indtægter, men samtidig svækkede denne
					ordning tilknytningen til Universitetet, og fra 1. januar 1869 blev
					Trinitatis Kirke alene sognekirke.
				</Text>
				<Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
					Trinitatis Kirkes kororgel
				</Text>
				<Image source={require('../../../../assets/images/kirk_05.jpeg')}style={styles.Text_Image}/>
				<Text style={[styles.Text, {color: colors.text}]}>
					Poul-Gerhard Andersen´s Orgelbyggeri 1987 9 stemmer.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					Arkitekter Inger & Johannes Exner
				</Text>
				<Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
					Disposition:
				</Text>
				<ScrollView horizontal={true}>
					<View style={styles.Table}>
						{TableDataTwo.map((row, index) => {
						return (
							<View
								key={row.id}
								style={EStyleSheet.child(
									styles,
									'Row',
									index,
									TableDataTwo.length,
								)}
							>
							{row.cols.map(col => {
								return (
								<View key={col.id} style={styles.Col}>
									<Text
										style={[
											styles.Col_Item,
											{
											fontFamily: col.bold ? 'Sen-Bold' : 'Sen-Regular',
											color: col.bold ? colors.text : colors.text,
											width: 120,
											},
										]}
									>
										{col.text}
									</Text>
								</View>
								)
							})}
							</View>
						)
						})}
					</View>
				</ScrollView>
				<Text style={[styles.Text, {color: colors.text}]}>
					*) Fælles svelle for I og II Manualomfang C-g”’. Pedalomfang
					C-f’.Kopler: II-I, I-P, II-P. Omfant C-g3, C-f1. Normalkobler
					Mekanisk traktur og registratur Sløjfevindlader
				</Text>
			</View>
		</Layout>
	)
}

export default KirkerOgOrgler
