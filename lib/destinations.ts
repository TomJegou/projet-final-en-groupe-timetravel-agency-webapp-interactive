export type DestinationSlug = "paris-1889" | "cretace" | "florence-1504";

export type DestinationImage = {
  src: string;
  ratio: "1:1" | "16:9" | "9:16";
  alt: string;
};

export type Destination = {
  slug: DestinationSlug;
  name: string;
  era: string;
  shortEra: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  highlights: string[];
  travelTips: string[];
  videoSrc: string;
  heroImage: DestinationImage;
  gallery: DestinationImage[];
  palette: {
    primary: string;
    accent: string;
  };
  duration: string;
  difficulty: "Tranquille" | "Modérée" | "Aventureuse";
};

const PARIS = "/Paris 1889";
const CRETACE = "/Crétacé -65M années";
const FLORENCE = "/Renaissance Florence 1504";

export const destinations: Destination[] = [
  {
    slug: "paris-1889",
    name: "Paris",
    era: "Exposition universelle de 1889",
    shortEra: "1889",
    tagline: "Le siècle des lumières électriques",
    shortDescription:
      "Assistez à l'inauguration de la Tour Eiffel et plongez dans la Belle Époque, entre prouesses industrielles et cafés littéraires.",
    longDescription:
      "Paris célèbre le centenaire de la Révolution française en accueillant 32 millions de visiteurs sur le Champ-de-Mars. La toute jeune Tour Eiffel domine la ville, scandale d'aujourd'hui devenu symbole éternel. Les pavillons coloniaux, la Galerie des machines et les spectacles d'Edison cohabitent avec les terrasses des Grands Boulevards où Toulouse-Lautrec croque la nuit. Une époque de fer, de gaz et d'électricité naissante.",
    highlights: [
      "Inauguration de la Tour Eiffel",
      "Galerie des machines (115 m de portée)",
      "Phonographes Edison & lumière électrique",
      "Cabarets de Montmartre, Moulin Rouge",
      "Pavillons des nations & rue du Caire",
    ],
    travelTips: [
      "Privilégiez la tenue d'époque : redingote pour ces messieurs, robe à tournure pour ces dames.",
      "Le franc-or a cours : 1 franc 1889 ≈ 4 € d'aujourd'hui. Prévoyez 50 francs de poche.",
      "L'eau du robinet est encore peu fiable : préférez le vin coupé ou l'eau de Vichy.",
      "Évitez les déclarations politiques sur Boulanger, c'est l'année de sa fuite.",
    ],
    videoSrc: "/Paris 1889.mp4",
    heroImage: {
      src: PARIS + "/Variation 1/Paris 1889 16 9.png",
      ratio: "16:9",
      alt: "Paris en 1889 vu depuis la Tour Eiffel",
    },
    gallery: [
      {
        src: PARIS + "/Variation 1/Paris 1889 1 1.png",
        ratio: "1:1",
        alt: "Vue carrée de Paris 1889",
      },
      {
        src: PARIS + "/Variation 1/Paris 1889 9 16.png",
        ratio: "9:16",
        alt: "Verticale de la Tour Eiffel en construction",
      },
      {
        src: PARIS + "/Variation 2/Paris 1889 16 9.png",
        ratio: "16:9",
        alt: "Galerie des machines, exposition universelle 1889",
      },
      {
        src: PARIS + "/Variation 2/Paris 1889 1 1.png",
        ratio: "1:1",
        alt: "Cabaret parisien, Belle Époque",
      },
      {
        src: PARIS + "/Variation 2/Paris 1889 9 16.png",
        ratio: "9:16",
        alt: "Réverbère et calèche au crépuscule",
      },
      {
        src: PARIS + "/Variation 3/Paris 1889 16 9.png",
        ratio: "16:9",
        alt: "Pavillons des nations vus du ciel",
      },
      {
        src: PARIS + "/Variation 3/Paris 1889 1 1.png",
        ratio: "1:1",
        alt: "Boulevard parisien fin XIXe",
      },
      {
        src: PARIS + "/Variation 3/Paris 1889 9 16.png",
        ratio: "9:16",
        alt: "Affiche de l'exposition universelle",
      },
    ],
    palette: {
      primary: "#1a1410",
      accent: "#c9a55b",
    },
    duration: "5 jours",
    difficulty: "Tranquille",
  },
  {
    slug: "cretace",
    name: "Crétacé",
    era: "-65 millions d'années",
    shortEra: "-65 Ma",
    tagline: "Le dernier souffle des géants",
    shortDescription:
      "Marchez aux côtés des derniers tyrannosaures dans une jungle primaire, semaines avant l'impact de Chicxulub.",
    longDescription:
      "Fin du Maastrichtien : la planète est plus chaude, les pôles sont libres de glace, et les forêts de séquoias géants couvrent l'Amérique du Nord. Tyrannosaurus rex et Triceratops dominent les plaines, des Quetzalcoatlus de la taille d'un avion patrouillent le ciel. C'est le crépuscule d'un règne de 165 millions d'années — peut-être la destination la plus humble de notre catalogue.",
    highlights: [
      "Observation de Tyrannosaurus rex en chasse",
      "Forêts de fougères arborescentes & araucarias",
      "Vol des Quetzalcoatlus (envergure 10 m)",
      "Cratère du Yucatán (avant impact)",
      "Mer intérieure de Niobrara",
    ],
    travelTips: [
      "Combinaison thermo-camouflée OBLIGATOIRE : la faune locale a une excellente vision.",
      "Aucune interaction biologique : les microbes du Crétacé sont inoffensifs pour vous, vous êtes mortel pour eux.",
      "Restez à portée du véhicule de récupération : nous n'envoyons pas d'équipe en cas de retard.",
      "Voyage déconseillé aux personnes sensibles : la chaîne alimentaire est très active.",
    ],
    videoSrc: "/Crétacé -65M années.mp4",
    heroImage: {
      src: CRETACE + "/Variation 1/Crétacé 16 9.png",
      ratio: "16:9",
      alt: "Paysage du Crétacé avec fougères géantes",
    },
    gallery: [
      {
        src: CRETACE + "/Variation 1/Crétacé 1 1.png",
        ratio: "1:1",
        alt: "Forêt primaire au Crétacé supérieur",
      },
      {
        src: CRETACE + "/Variation 1/Crétacé 9 16.png",
        ratio: "9:16",
        alt: "Séquoia géant au coucher du soleil",
      },
      {
        src: CRETACE + "/Variation 2/Crétacé 16 9.png",
        ratio: "16:9",
        alt: "Tyrannosaure dans une plaine",
      },
      {
        src: CRETACE + "/Variation 2/Crétacé 1 1.png",
        ratio: "1:1",
        alt: "Tricératops au bord d'une rivière",
      },
      {
        src: CRETACE + "/Variation 2/Crétacé 9 16.png",
        ratio: "9:16",
        alt: "Quetzalcoatlus en vol",
      },
      {
        src: CRETACE + "/Variation 3/Crétacé 16 9.png",
        ratio: "16:9",
        alt: "Volcan en activité au Crétacé",
      },
      {
        src: CRETACE + "/Variation 3/Crétacé 1 1.png",
        ratio: "1:1",
        alt: "Lagon préhistorique",
      },
      {
        src: CRETACE + "/Variation 3/Crétacé 9 16.png",
        ratio: "9:16",
        alt: "Aurore boréale du Crétacé",
      },
    ],
    palette: {
      primary: "#0f1c14",
      accent: "#d4a373",
    },
    duration: "3 jours",
    difficulty: "Aventureuse",
  },
  {
    slug: "florence-1504",
    name: "Florence",
    era: "Renaissance, 1504",
    shortEra: "1504",
    tagline: "L'année où l'art changea de visage",
    shortDescription:
      "Florence à son apogée : David vient d'être inauguré, Léonard et Michel-Ange peignent la Salle du Conseil.",
    longDescription:
      "1504. La République florentine est dirigée par Pier Soderini. Le 8 septembre, on dévoile le David de Michel-Ange devant le Palazzo Vecchio. À quelques mètres, Léonard de Vinci esquisse la Bataille d'Anghiari, tandis que Michel-Ange travaille sur la Bataille de Cascina — le seul moment de l'histoire où les deux titans peignent dans la même salle. Raphaël n'a que 21 ans et arrive en ville pour apprendre. C'est le sommet absolu de la Renaissance.",
    highlights: [
      "Inauguration du David de Michel-Ange",
      "Visite de l'atelier de Léonard de Vinci",
      "Salle du Conseil, Palazzo Vecchio",
      "Coupole du Duomo (Brunelleschi)",
      "Banquet médicéen au Palazzo Pitti",
    ],
    travelTips: [
      "Le toscan vernaculaire est de rigueur : un précis de conversation vous sera fourni.",
      "Florins d'or et grossi d'argent : 1 florin ≈ 200 € d'aujourd'hui en pouvoir d'achat.",
      "Évitez de discuter politique avec les Médicis ou les anti-Médicis — la situation est tendue.",
      "Tenue d'époque obligatoire dans les lieux publics ; nous fournissons les costumes.",
    ],
    videoSrc: "/Florence.mp4",
    heroImage: {
      src: FLORENCE + "/Variation 1/Florence 16 9.png",
      ratio: "16:9",
      alt: "Florence Renaissance vue depuis l'Arno",
    },
    gallery: [
      {
        src: FLORENCE + "/Variation 1/Florence 1 1.png",
        ratio: "1:1",
        alt: "Le Duomo de Brunelleschi",
      },
      {
        src: FLORENCE + "/Variation 1/Florence 9 16.png",
        ratio: "9:16",
        alt: "Ruelle florentine au XVIe siècle",
      },
      {
        src: FLORENCE + "/Variation 2/Florence 16 9.png",
        ratio: "16:9",
        alt: "Place de la Seigneurie, 1504",
      },
      {
        src: FLORENCE + "/Variation 2/Florence 1 1.png",
        ratio: "1:1",
        alt: "Atelier d'artiste à Florence",
      },
      {
        src: FLORENCE + "/Variation 2/Florence 9 16.png",
        ratio: "9:16",
        alt: "Vitrine d'apothicaire Renaissance",
      },
      {
        src: FLORENCE + "/Variation 3/Florence 16 9.png",
        ratio: "16:9",
        alt: "Vue panoramique de Florence depuis les collines",
      },
      {
        src: FLORENCE + "/Variation 3/Florence 1 1.png",
        ratio: "1:1",
        alt: "Cour intérieure d'un palais médicéen",
      },
      {
        src: FLORENCE + "/Variation 3/Florence 9 16.png",
        ratio: "9:16",
        alt: "Pont Vecchio à l'aube",
      },
    ],
    palette: {
      primary: "#1c1410",
      accent: "#c08552",
    },
    duration: "7 jours",
    difficulty: "Modérée",
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getDestinationSlugs(): DestinationSlug[] {
  return destinations.map((d) => d.slug);
}
