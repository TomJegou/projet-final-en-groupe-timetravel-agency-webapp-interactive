# TimeTravel Agency — Webapp Interactive

> Webapp moderne et immersive mettant en scène l'agence **TimeTravel Agency** et ses 3 destinations historiques :
> **Paris 1889**, **Crétacé (-65M années)** et **Renaissance Florence 1504**.

**Auteur :** Tom JEGOU

---

## Mission

Construire une présence web interactive permettant aux clients de :

- **Découvrir** les destinations temporelles via une interface immersive (vidéo, parallax, animations)
- **Interagir** avec un agent conversationnel IA qui guide et conseille
- **Personnaliser** leur voyage selon leurs préférences
- **Réserver** et planifier leur voyage temporel

Les médias utilisés dans la webapp (images et vidéos) sont servis depuis `public/`. Leur **production** est documentée ci-dessous (génération IA + prompt engineering).

---

## Assets visuels — Gemini & prompt engineering

Les **images** et **vidéos** du projet (fichiers dans `public/`, dont `Paris 1889.mp4`, `Crétacé -65M années.mp4`, `Florence.mp4` et les variations PNG par destination) ont été **générées avec Google Gemini**.

Les prompts de génération d'images ont été conçus en **méthode prompt engineering** à l'aide de **Cursor** (modèle **Auto**), avec structuration JSON (config, prompt principal, éléments détaillés, negative prompt, chaîne complète exportable).

### Répertoire des prompts images

Tous les prompts sont versionnés dans :

```text
pictures_prompts/
├── Paris 1889/
│   ├── Variation 1/
│   ├── Variation 2/
│   └── Variation 3/
├── Crétacé -65M années/
│   ├── Variation 1/
│   ├── Variation 2/
│   └── Variation 3/
└── Renaissance Florence 1504/
    ├── Variation 1/
    ├── Variation 2/
    └── Variation 3/
```

Chaque fichier `.json` contient notamment : `prompt_config`, `main_prompt`, `detailed_elements`, `negative_prompt`, `style_keywords` et souvent un champ `complete_prompt_string` prêt à copier vers Gemini ou un autre générateur.

### Exemple de prompt (Paris 1889 — 16:9)

Source : `pictures_prompts/Paris 1889/Variation 1/paris_1889_image_prompt.json`

```text
Panoramic view of Paris 1889 during Exposition Universelle, 16:9 horizontal format,
featuring the newly inaugurated Eiffel Tower painted in Rouge Venise red-brown with gradient,
massive Galerie des Machines with blue-grey steel and glass vault,
Haussmannian limestone buildings with zinc roofs and wrought-iron balconies,
bustling cobblestone streets with reflections,
crowds in authentic 1889 Belle Époque fashion,
women in S-silhouette dresses with corseted waists wearing elaborate feathered hats,
men in three-piece suits and frock coats wearing top hats and bowler hats,
warm yellow gaslight contrasting with cold blue-white electric arc lights from the Exposition,
foggy morning atmosphere, volumetric lighting through steam and coal smoke,
mist over the Seine, sepia and zinc grey color palette,
impressionist realism style à la Gustave Caillebotte and Jean Béraud,
autochrome photography texture with light film grain and subtle vignetting,
historically accurate, cinematic composition.
```

**Negative prompt (extrait)** : `modern clothing, cars, skyscrapers, neon signs, anachronistic elements, 21st century elements, …`

---

## Stack technique

| Couche | Techno | Usage |
| --- | --- | --- |
| Framework | [Next.js 16.2.6](https://nextjs.org) (App Router) | SSR/SSG, routing, API routes |
| Runtime | React 19.2 + TypeScript 5 | Composants serveur & client |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) | Design system via CSS variables |
| Animations | [`motion`](https://motion.dev) (ex Framer Motion v11+) | Transitions, scroll reveal, micro-interactions |
| UI primitives | [Radix UI](https://www.radix-ui.com) | Dialog, Tabs (accessibilité a11y) |
| Icônes | [`lucide-react`](https://lucide.dev) | Set d'icônes cohérent et léger |
| Polices | `next/font/google` — Geist + Cormorant Garamond | Sans moderne + serif "intemporelle" |
| Formulaires | `react-hook-form` + [`zod`](https://zod.dev) | Validation typée du formulaire de réservation |
| Notifications | [`sonner`](https://sonner.emilkowal.ski) | Toasts non intrusifs |
| **Agent IA** | [Vercel AI SDK](https://sdk.vercel.ai) (`ai` + [`@ai-sdk/mistral`](https://docs.mistral.ai/api)) | Chat streaming côté serveur (Mistral, modèle `mistral-small-latest`) |
| Déploiement | [Vercel](https://vercel.com) | Hébergement, edge functions, preview deployments |

---

## Fonctionnalités prévues

### Page d'accueil
- Hero plein écran avec vidéo de fond (rotation des 3 destinations)
- Présentation animée de l'agence
- Galerie interactive des 3 époques (cards 3D au hover)
- CTA vers les destinations et la réservation

### Pages destinations (`/destinations/[slug]`)
- Hero immersif par époque
- Galerie d'images (variations 1:1, 16:9, 9:16)
- Contexte historique, points d'intérêt, conseils du voyageur

### Agent conversationnel IA
- Widget flottant disponible sur toutes les pages
- Streaming des réponses (Vercel AI SDK)
- Contexte enrichi avec les données des 3 destinations
- Quick actions / FAQ préconfigurée

### Formulaire de réservation (`/reservation`)
- Parcours multi-étapes : Destination → Dates → Voyageurs → Confirmation
- Validation Zod + animations de transition entre étapes
- Animation de confirmation finale

---

## Arborescence cible

```
app/
  layout.tsx                  # Layout racine (fonts, metadata)
  page.tsx                    # Accueil
  globals.css                 # Tailwind + design tokens
  destinations/[slug]/        # Pages détail par époque
  reservation/                # Formulaire multi-étapes
  api/chat/route.ts           # Endpoint streaming de l'agent IA
components/
  ui/                         # Primitives (Button, Card, Dialog, ...)
  layout/                     # Navbar, Footer
  motion/                     # Wrappers d'animations
  hero/                       # Hero section
  destinations/               # Card, Gallery, sections détail
  chat/                       # ChatWidget, MessageList, MessageInput
  booking/                    # Étapes du formulaire
lib/
  destinations.ts             # Data des 3 destinations
  utils.ts                    # Helpers (cn, format, ...)
public/                       # Médias (vidéos + images des destinations)
```

---

## Démarrage local

```bash
npm install
cp .env.example .env.local    # Renseigner MISTRAL_API_KEY
npm run dev
```

Application disponible sur [http://localhost:3000](http://localhost:3000).

### Variables d'environnement

| Nom | Description |
| --- | --- |
| `MISTRAL_API_KEY` | Clé API [Mistral](https://console.mistral.ai/) utilisée par l'agent conversationnel |

---

## Scripts disponibles

| Commande | Action |
| --- | --- |
| `npm run dev` | Démarre le serveur de développement (Turbopack) |
| `npm run build` | Build de production |
| `npm run start` | Démarre le build de production |
| `npm run lint` | Lint le projet |

---

## Déploiement

Le projet est conçu pour être déployé sur **Vercel** :

1. Push sur le repository GitHub
2. Importer le projet sur [Vercel](https://vercel.com/new)
3. Renseigner `MISTRAL_API_KEY` dans les variables d'environnement Vercel
4. Le déploiement est automatique à chaque push sur `main` (preview deployments sur les branches)

---

## Agent conversationnel — contexte du prompt Mistral

L'endpoint `POST /api/chat` (`app/api/chat/route.ts`) envoie à Mistral un **message système** (`system`) construit dynamiquement, puis l'historique de la conversation utilisateur.

### Modèle et paramètres

| Paramètre | Valeur |
| --- | --- |
| Provider | `@ai-sdk/mistral` (Vercel AI SDK) |
| Modèle | `mistral-small-latest` |
| `temperature` | `0.6` |
| Runtime | Edge (`export const runtime = "edge"`) |
| Variable d'env | `MISTRAL_API_KEY` |

### Rôle du concierge (system prompt)

Le modèle incarne **Aldébaran**, concierge IA de TimeTravel Agency (agence fondée en 2089). Il doit :

- conseiller sur le choix parmi les **3 destinations uniquement** ;
- répondre aux questions pratiques sur l'agence et le voyage temporel ;
- adopter un ton **élégant, posé, légèrement littéraire**, avec vouvoiement ;
- rester **concis** (3–4 phrases par défaut) ;
- **ne jamais inventer de prix** (renvoi vers consultation préliminaire) ;
- rediriger vers `/reservation` pour une réservation ;
- suggérer `/destinations/[slug]` pour découvrir les visuels ;
- pouvoir évoquer la **charte temporelle 2089** (non-altération des lignes temporelles).

### Données injectées automatiquement

Le catalogue n'est pas codé en dur dans le prompt : il est **généré à partir de** `lib/destinations.ts` à chaque requête. Pour chaque destination, le system prompt inclut :

- nom, époque, slogan, durée, difficulté ;
- description longue ;
- liste des **moments forts** (`highlights`) ;
- **conseils du voyageur** (`travelTips`).

Les messages utilisateur (widget chat, suggestions FAQ) sont convertis via `convertToModelMessages()` puis streamés avec `streamText()` → réponse SSE côté client (`useChat` + `DefaultChatTransport`).

---

## Prompts utilisés pour réaliser le projet (assistance IA)

Cette section documente les **instructions données à l'assistant de développement** (Cursor) pour construire la webapp. Elles complètent le brief pédagogique (captures Phase 1) et ne sont pas envoyées à Mistral.

### Brief initial et cadrage technique

- Présentation du **brief projet** (TimeTravel Agency, 3 destinations, agent IA, réservation).
- Choix explicite de **Next.js 16.2.6 App Router**, déploiement **Vercel**, assets dans `public/`.
- Demande d'une **UI soignée avec animations Framer Motion** (`motion`).
- Première livrable demandée : **plan d'actions** + **README** posant le contexte et la stack.

### Stack IA et exécution

- Utilisation de l'**API Mistral** (plutôt qu'OpenAI) pour l'agent conversationnel.
- Réalisation du projet **en autonomie** sur les phases 0 → 6 (setup → polish), avec **commits par phase**.
- Direction artistique **premium** (noir profond, or champagne, serif, espacements généreux).
- Fourniture du fichier **`.env`** avec `MISTRAL_API_KEY` pour les tests.

### Itérations et correctifs

- Correction de la page **`/destinations/[slug]`** (overlay Dialog bloquant l'écran).
- Intégration des vidéos **`Paris 1889.mp4`**, **`Crétacé -65M années.mp4`**, **`Florence.mp4`** en hero des pages destination.
- Correctifs UI : texte masqué (« Ce que vous allez vivre »), titre d'accueil coupé (`SplitText`), accessibilité Dialog (clés React + `DialogDescription`).

### Documentation (ce README)

- Ajout de l'**auteur Tom JEGOU**.
- Ajout des blocs **contexte prompt Mistral**, **assets Gemini** (`pictures_prompts/`) et **prompts projet** (cette section).

---

## Auteur du projet

Rendu individuel sur Moodle — **auteur du dépôt et de l'implémentation documentée : Tom JEGOU**.
