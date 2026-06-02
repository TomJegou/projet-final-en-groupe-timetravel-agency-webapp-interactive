# TimeTravel Agency — Webapp Interactive

> Projet final en groupe (4 personnes) — rendu individuel sur Moodle.
> Webapp moderne et immersive mettant en scène l'agence **TimeTravel Agency** et ses 3 destinations historiques :
> **Paris 1889**, **Crétacé (-65M années)** et **Renaissance Florence 1504**.

---

## Mission

Construire une présence web interactive permettant aux clients de :

- **Découvrir** les destinations temporelles via une interface immersive (vidéo, parallax, animations)
- **Interagir** avec un agent conversationnel IA qui guide et conseille
- **Personnaliser** leur voyage selon leurs préférences
- **Réserver** et planifier leur voyage temporel

Les visuels et vidéos des 3 destinations ont été générés lors d'un projet TimeTravel précédent et sont disponibles dans `public/`.

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

## Équipe

Projet réalisé en groupe de 4 personnes dans le cadre du module final.
Rendu individuel sur Moodle.
