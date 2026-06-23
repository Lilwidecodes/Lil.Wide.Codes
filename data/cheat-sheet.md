# Lil.Wide.Codes Design System & CSS Cheat Sheet
Reference sheet for variables, layouts, and coding standards used inside our platform.

---

## 1. Brand HSL Design Tokens

We configure colors using raw HSL vectors. This allows us to adjust themes, transparency levels, and glowing gradients dynamically.

| CSS Variable | Dark Theme Value (Default) | Light Theme Value | Purpose |
| :--- | :--- | :--- | :--- |
| `--bg-raw` | `224 25% 5%` | `220 30% 95%` | Global Backdrop |
| `--surface-raw` | `224 20% 9%` | `220 20% 90%` | Card Surfaces |
| `--accent-cyan-raw` | `180 100% 50%` | `195 100% 40%` | Primary Cyan Highlights |
| `--accent-blue-raw` | `217 100% 60%` | `217 100% 45%` | Primary Blue CTA buttons |
| `--accent-purple-raw` | `263 90% 65%` | `263 70% 50%` | Accent Violet Highlights |
| `--accent-orange-raw` | `16 100% 60%` | `16 95% 45%` | Status Tags / Offline Alerts |

### Quick HSL Usage
```css
/* Custom transparent surface border */
border: 1px solid rgba(var(--accent-cyan-raw), 0.15);

/* Neon backdrop gradient glows */
background: radial-gradient(circle, hsl(var(--accent-cyan-raw) / 0.1), transparent);
```

---

## 2. Typographic Standard

We employOutfit for clean headings and Fira Code for technical monospace blocks.

| Typographic Scale | Size | Line Height | Usage |
| :--- | :--- | :--- | :--- |
| `clamp(2.2rem, 5vw, 3.5rem)` | Heading 1 | `1.2` | Hero Titles |
| `clamp(1.6rem, 3vw, 2.25rem)` | Heading 2 | `1.2` | Section Titles |
| `var(--text-xl)` (1.5rem) | Heading 3 | `1.25` | Card Headers |
| `var(--text-md)` (1rem) | Body | `1.6` | Standard Paragraphs |
| `var(--text-xs)` (0.75rem) | Caption / Badge | `1.5` | Tech stacks / Tags |

---

## 3. Responsive Containers & Grid

Always structure containers cleanly without cluttering HTML markup.

### Responsive Container
```css
.container {
  width: 90%;
  max-width: 1200px;
  margin-inline: auto;
}
```

### Auto-Fit Grid Column Blueprint
```css
.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

---

## 4. UI Transition Controls

Ensure theme mode switches occur with a smooth visual fade.

```css
/* Apply transitions only to color properties, preventing layout resets */
.card, .btn, body {
  transition: 
    background-color 0.35s ease, 
    color 0.35s ease, 
    border-color 0.35s ease, 
    box-shadow 0.35s ease;
}
```

---

## 5. Engineering Principles Checklist

1. **Semantic First:** Never style generic `<div>` blocks when elements like `<section>`, `<article>`, `<header>`, or `<main>` are applicable.
2. **Framework Freedom:** Write clean modular CSS and Vanilla JS handlers to keep dependencies at zero.
3. **Responsive first:** Plan spacing using HSL viewports and test fluid layouts down to 320px.
4. **Master the State:** Let CSS handle styling states (e.g. `:hover`, `:active`) and use JS solely to toggle controller visibility classes.
