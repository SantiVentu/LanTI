# Lanti

**Lanti** is a personal, experimental project born out of a hobby — the early foundation 
of a digital studio brand, built hand-in-hand with [Claude Code](https://claude.com/claude-code).

This is a solo, individual project developed in collaboration with a graphic designer, 
combining design and AI-assisted development to explore what Lanti could become. 
It's currently in an experimental stage, with the long-term goal of growing into a 
fully realized, professional digital studio.

## About

- 🎨 **Design-driven**: shaped alongside a graphic designer, with visual identity at its core
- 🤖 **Built with AI**: developed using Claude Code as a hands-on coding partner
- 🌱 **Experimental**: still evolving — ideas, structure, and direction may change as the project grows
- 🎯 **Long-term goal**: turn Lanti into an established digital studio brand

## Status

This project is a hobby / side project in active exploration. Not production-ready yet — 
built for learning, experimenting, and laying the groundwork for something bigger.

---

*A solo project, created and maintained independently.*
*Best regards.*




## Tech Stack

### Core
| | |
|---|---|
| **[Next.js](https://nextjs.org)** `16.2` | App Router, React Server Components, image & font optimization |
| **[React](https://react.dev)** `19.2` | UI layer — functional components and hooks only |
| **[TypeScript](https://www.typescriptlang.org)** `5` | Strict typing across the codebase — no `any` |

### Styling
| | |
|---|---|
| **CSS Modules** | Default styling system — one `.module.css` per component |
| **[Tailwind CSS](http| Scoped to componentssourced from 21st (Magic MCP); brand tokens mapped via `@theme` |
| **[PostCSS](https://postcss.org)** `8.5` | CSS build pipeline |

### Motion
| | |
|---|---|
| **[GSAP](https://gsap.com)** `3.15` | Scroll-driven timelines, pinning,
scrub sequences (Scroll
| **[Framer Motion](https://motion.dev)** `12.40` | Component enter/exit, gestures, layout transitions |
| **[Lenis](https://len.3` | Smooth scroll,synced with ScrollTrigger's update loop |
                                                                           ### 3D
| | |
|---|---|                                                                  | **[Three.js](https://L engine — particles,depth, rotating geometry |
| **[React Three Fiber](https://r3f.docs.pmnd.rs)** `9.6` | React renderer for Three.js |
| **[Drei](https://drei.docs.pmnd.rs)** `10.7` | Helpers and abstractions for R3F |

### Tooling
| | |
|---|---|
| **[Playwright](https://playwright.dev)** `1.60` | Browser automation and visual checks |
| **[ESLint](https://es `eslint-config-next` |
| **[Groq SDK](https://groq.com)** `1.2` | LLM client |
