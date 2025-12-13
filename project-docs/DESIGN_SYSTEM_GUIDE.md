# Design System Documentation
## Wise Wealth - Multi-Currency Asset Management Platform

**Version:** 1.0  
**Date:** December 10, 2025  
**Status:** Living Document  
**Maintained By:** Design & Development Team

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Design Principles](#2-design-principles)
3. [Brand Identity](#3-brand-identity)
4. [Color System](#4-color-system)
5. [Typography](#5-typography)
6. [Spacing & Layout](#6-spacing--layout)
7. [Iconography](#7-iconography)
8. [Components](#8-components)
9. [Patterns](#9-patterns)
10. [Animation & Motion](#10-animation--motion)
11. [Accessibility](#11-accessibility)
12. [Responsive Design](#12-responsive-design)
13. [Dark Mode](#13-dark-mode)
14. [Data Visualization](#14-data-visualization)
15. [Forms & Inputs](#15-forms--inputs)
16. [Implementation Guide](#16-implementation-guide)
17. [Resources](#17-resources)

---

## 1. Introduction

### 1.1 Purpose

This design system serves as the single source of truth for all design decisions in the Wise Wealth application. It ensures consistency, accelerates development, and maintains high-quality user experience across all features and platforms.

### 1.2 Design Philosophy

Wise Wealth's design is inspired by modern fintech leaders like Wise and Revolut, emphasizing:

- **Clarity**: Financial data should be easy to understand at a glance
- **Trust**: Professional, secure, and reliable visual language
- **Efficiency**: Quick access to important information and actions
- **Delight**: Thoughtful interactions that make complex tasks enjoyable
- **Accessibility**: Inclusive design for all users

### 1.3 Design Inspiration

**Primary References**:
- **Wise** (wise.com) - Multi-currency handling, clean interface, trust-building design
- **Revolut** (revolut.com) - Modern card-based UI, smooth animations, premium feel
- **Personal Capital** - Portfolio visualization, financial dashboard patterns
- **Plaid** - Financial data presentation, connection flows

**Visual Direction**:
- Clean, minimal interfaces with strategic use of color
- Card-based layouts with subtle shadows and depth
- Smooth, purposeful animations
- Professional yet approachable aesthetic
- Data-dense but organized presentation

---

## 2. Design Principles

### 2.1 Core Principles

#### 1. **Financial Clarity**
> Present complex financial data in simple, digestible formats

**Implementation**:
- Use clear visual hierarchy (size, weight, color)
- Group related information in cards
- Highlight critical numbers (total value, gains/losses)
- Use color meaningfully (green for gains, red for losses)
- Provide context for all numbers (currency, percentage, time period)

#### 2. **Trust & Security**
> Build confidence through professional, reliable design

**Implementation**:
- Consistent, predictable interactions
- Professional color palette (blues, navys)
- Subtle animations that feel polished
- Clear security indicators
- Transparent data handling

#### 3. **Progressive Disclosure**
> Show essential information first, details on demand

**Implementation**:
- Dashboard shows overview, boards show details
- Collapsible sections for advanced features
- Quick Add vs Detailed Add forms
- Tooltips and help text on hover/focus
- Expandable cards for more information

#### 4. **Efficiency First**
> Minimize steps to accomplish common tasks

**Implementation**:
- Command palette for quick navigation (Cmd/Ctrl + K)
- Quick Add for fast asset entry
- Keyboard shortcuts throughout
- Batch operations where possible
- Smart defaults in forms

#### 5. **Responsive Elegance**
> Beautiful and functional across all devices

**Implementation**:
- Mobile-first component design
- Touch-friendly targets (min 44x44px)
- Adaptive layouts (not just responsive)
- Optimized performance on all devices
- Consistent experience across screen sizes

#### 6. **Delightful Interactions**
> Add polish through thoughtful micro-interactions

**Implementation**:
- Smooth page transitions (300-400ms)
- Button press feedback (scale, color change)
- Loading states that inform
- Success celebrations (subtle animations)
- Hover states that preview actions

---

## 3. Brand Identity

### 3.1 Brand Personality

**Wise Wealth embodies**:
- **Professional**: Serious about finance, not stuffy
- **Modern**: Current technology and design trends
- **Trustworthy**: Reliable, secure, transparent
- **Empowering**: Puts users in control
- **Intelligent**: Smart features, AI insights
- **Global**: Multi-currency, international perspective

### 3.2 Voice & Tone

**General Voice**: Professional, clear, helpful, confident

**Contextual Tone**:
- **Dashboard/Overview**: Informative, reassuring
- **Data Entry**: Guiding, efficient
- **Errors**: Helpful, solution-oriented
- **Success**: Encouraging, celebratory (subtle)
- **AI Advisor**: Knowledgeable, conversational
- **Onboarding**: Welcoming, educational

### 3.3 Logo & Branding

**Logo Requirements** (TBD - placeholder guidelines):
- Simple, memorable mark
- Works in blue (primary) and white (reversed)
- Scalable from 16px to large formats
- Optional: Incorporate currency or wealth symbolism

**Brand Assets**:
- Wordmark: "Wise Wealth"
- Tagline: "Track. Analyze. Optimize." (optional)
- App Icon: Distinct, recognizable at small sizes

---

## 4. Color System

### 4.2 Primary Colors
Consistent with our "Deep Navy" theme, the palette is optimized for dark mode first.

*   **Background (Deep Navy)**: `#020617` (Slate 950) - The foundation of the app.
*   **Surface (Midnight)**: `#0f172a` (Slate 900) - For cards and panels, often used with glassmorphism `backdrop-blur`.
*   **Primary Accent (Electric Blue)**: `#3B82F6` (Blue 500) - For primary actions, active states, and brand trust.
*   **Secondary (Teal)**: `#14B8A6` (Teal 500) - For highlights and secondary actions.
*   **Text (White/Grey)**: High contrast white for readability against the dark background.

### 4.3 Semantic Colors
*   **Success**: Green (`#10B981`)
*   **Warning**: Amber (`#F59E0B`)
*   **Error**: Red (`#EF4444`)
*   **Info**: Blue (`#3B82F6`)
#### Brand Teal (Accent)
```css
--color-accent-50:  #F0FDFA;
--color-accent-100: #CCFBF1;
--color-accent-200: #99F6E4;
--color-accent-300: #5EEAD4;
--color-accent-400: #2DD4BF;
--color-accent-500: #14B8A6;   /* Base - accent elements */
--color-accent-600: #0D9488;   /* Darker - accent hover */
--color-accent-700: #0F766E;
--color-accent-800: #115E59;
--color-accent-900: #134E4A;
```

**Usage**:
- Secondary buttons: `--color-accent-500`
- Highlights and badges
- Precious metals indicators
- Charts (secondary color)
- Success states (alternative to green)

#### Gold (Accent - Premium)
```css
--color-gold-50:  #FFFBEB;
--color-gold-100: #FEF3C7;
--color-gold-200: #FDE68A;
--color-gold-300: #FCD34D;
--color-gold-400: #FBBF24;
--color-gold-500: #F59E0B;   /* Base - premium features */
--color-gold-600: #D97706;
--color-gold-700: #B45309;
--color-gold-800: #92400E;
--color-gold-900: #78350F;
```

**Usage**:
- Premium features badge
- Gold asset indicators
- Highlight special insights
- Upgrade prompts (future)
- Awards and achievements

### 4.3 Semantic Colors

#### Success (Green)
```css
--color-success-50:  #ECFDF5;
--color-success-100: #D1FAE5;
--color-success-200: #A7F3D0;
--color-success-300: #6EE7B7;
--color-success-400: #34D399;
--color-success-500: #10B981;   /* Base */
--color-success-600: #059669;
--color-success-700: #047857;
--color-success-800: #065F46;
--color-success-900: #064E3B;
```

**Usage**:
- Positive gains/returns ("+5.2%", "+$1,234")
- Success messages and toasts
- Goal progress (above target)
- Positive trends (up arrows)
- Confirmation states

#### Warning (Amber)
```css
--color-warning-50:  #FFFBEB;
--color-warning-100: #FEF3C7;
--color-warning-200: #FDE68A;
--color-warning-300: #FCD34D;
--color-warning-400: #FBBF24;
--color-warning-500: #F59E0B;   /* Base */
--color-warning-600: #D97706;
--color-warning-700: #B45309;
--color-warning-800: #92400E;
--color-warning-900: #78350F;
```

**Usage**:
- Warning messages
- Budget approaching limit (80-99%)
- Important notifications
- Caution states
- Pending actions

#### Error/Danger (Red)
```css
--color-error-50:  #FEF2F2;
--color-error-100: #FEE2E2;
--color-error-200: #FECACA;
--color-error-300: #FCA5A5;
--color-error-400: #F87171;
--color-error-500: #EF4444;   /* Base */
--color-error-600: #DC2626;
--color-error-700: #B91C1C;
--color-error-800: #991B1B;
--color-error-900: #7F1D1D;
```

**Usage**:
- Negative losses ("-3.2%", "-$567")
- Error messages and validation
- Destructive actions (delete)
- Budget exceeded (100%+)
- Critical alerts
- Negative trends (down arrows)

#### Info (Blue)
```css
--color-info-50:  #EFF6FF;
--color-info-100: #DBEAFE;
--color-info-200: #BFDBFE;
--color-info-300: #93C5FD;
--color-info-400: #60A5FA;
--color-info-500: #3B82F6;   /* Base */
--color-info-600: #2563EB;
--color-info-700: #1D4ED8;
--color-info-800: #1E40AF;
--color-info-900: #1E3A8A;
```

**Usage**:
- Informational messages
- Help tooltips
- Neutral notifications
- Documentation links
- Onboarding hints

### 4.4 Neutral Colors (Gray Scale)

#### Light Theme Grays
```css
--color-gray-50:  #F9FAFB;   /* Backgrounds, surfaces */
--color-gray-100: #F3F4F6;   /* Hover backgrounds */
--color-gray-200: #E5E7EB;   /* Borders, dividers */
--color-gray-300: #D1D5DB;   /* Disabled borders */
--color-gray-400: #9CA3AF;   /* Placeholder text */
--color-gray-500: #6B7280;   /* Secondary text */
--color-gray-600: #4B5563;   /* Body text (secondary) */
--color-gray-700: #374151;   /* Body text */
--color-gray-800: #1F2937;   /* Headings */
--color-gray-900: #111827;   /* Primary text */
--color-gray-950: #030712;   /* Deepest text */
```

#### Dark Theme Grays (Slate)
```css
--color-slate-50:  #F8FAFC;
--color-slate-100: #F1F5F9;
--color-slate-200: #E2E8F0;
--color-slate-300: #CBD5E1;   /* Dark mode text (secondary) */
--color-slate-400: #94A3B8;
--color-slate-500: #64748B;
--color-slate-600: #475569;
--color-slate-700: #334155;   /* Dark mode borders */
--color-slate-800: #1E293B;   /* Dark mode surfaces */
--color-slate-900: #0F172A;   /* Dark mode background */
--color-slate-950: #020617;   /* Darkest background */
```

### 4.5 Color Usage Guidelines

#### Do's ✅
- Use primary blue for main actions and brand elements
- Use semantic colors consistently (green = positive, red = negative)
- Maintain sufficient contrast (WCAG AA minimum 4.5:1)
- Use lighter shades for backgrounds, darker for text
- Test colors in both light and dark modes

#### Don'ts ❌
- Don't use red for positive values or green for negative
- Don't rely solely on color to convey information
- Don't use too many colors at once (max 3-4 per view)
- Don't use bright, saturated colors for large areas
- Don't use color-400 or lighter for body text (poor contrast)

### 4.6 Color Accessibility

All color combinations meet **WCAG 2.1 Level AA** standards:

| Background | Text | Contrast Ratio | Status |
|------------|------|----------------|--------|
| White (#FFFFFF) | Gray-900 (#111827) | 16.6:1 | AAA ✅ |
| White (#FFFFFF) | Gray-700 (#374151) | 10.5:1 | AAA ✅ |
| White (#FFFFFF) | Primary-600 (#2563EB) | 6.3:1 | AA ✅ |
| Gray-50 (#F9FAFB) | Gray-900 (#111827) | 16.1:1 | AAA ✅ |
| Primary-500 (#3B82F6) | White (#FFFFFF) | 5.2:1 | AA ✅ |
| Slate-900 (#0F172A) | Slate-50 (#F8FAFC) | 17.3:1 | AAA ✅ |

### 4.7 Color Tokens (CSS Variables)

```css
### 4.7 Color Tokens (Tailwind v4 / CSS Variables)
These values are sourced directly from `globals.css` and use the OKLCH color space for vibrant, perception-based colors.

```css
/* Base Theme (Light - Default) */
:root {
  --background: oklch(1 0 0);                /* White */
  --foreground: oklch(0.145 0 0);            /* Almost Black */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  
  /* Primary: Deep Violet/Blue */
  --primary: oklch(0.33 0.126 270.67);
  --primary-foreground: oklch(0.985 0 0);
  
  /* Secondary: Teal */
  --secondary: oklch(0.709 0.111 169.57);
  --secondary-foreground: oklch(0.145 0 0);
  
  /* Accent: Gold */
  --accent: oklch(0.705 0.163 85.08);
  --accent-foreground: oklch(0.145 0 0);
  
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
}

/* Dark Theme (Deep Navy - Active Default) */
.dark {
  /* Deep Navy Background */
  --background: oklch(15.02% 0.038 274.63); /* #020617 Slate-950 equivalent */
  --foreground: oklch(0.985 0 0);           /* White */
  
  /* Slightly lighter Navy for Cards (Glassmorphism base) */
  --card: oklch(21.02% 0.038 274.63);       /* #0f172a Slate-900 equivalent */
  --card-foreground: oklch(0.985 0 0);
  
  /* Electric Blue for Dark Mode Visibility (approx #60A5FA) */
  --primary: oklch(0.65 0.18 265);
  --primary-foreground: oklch(0.985 0 0);
  
  /* Secondary & Accent remain consistent */
  --secondary: oklch(0.709 0.111 169.57);
  --secondary-foreground: oklch(0.145 0 0);
  --accent: oklch(0.705 0.163 85.08);
  --accent-foreground: oklch(0.145 0 0);
  
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  
  --border: oklch(1 0 0 / 10%);             /* Subtle white borders */
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
}
```
```

---

## 5. Typography

### 5.1 Type Philosophy

Typography in Wise Wealth prioritizes:
- **Readability**: Clear, comfortable reading across all devices
- **Hierarchy**: Obvious information structure
- **Professionalism**: Modern, business-appropriate typeface
- **Performance**: System fonts for fast loading

### 5.2 Font Family

#### Primary Font: Inter
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Roboto', 'Helvetica Neue', Arial, sans-serif;
```

**Why Inter?**
- Designed specifically for screen readability
- Excellent at small sizes (crucial for financial data)
- Professional and modern
- Open source and widely available
- Great number rendering (important for financial app)
- Comprehensive character set and weights

**Fallbacks**:
1. Inter (primary)
2. -apple-system (Apple devices)
3. BlinkMacSystemFont (Chrome on Mac)
4. Segoe UI (Windows)
5. Roboto (Android)
6. Helvetica Neue (older Apple)
7. Arial (universal fallback)
8. sans-serif (system default)

#### Monospace Font (for numbers, code)
```css
font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
```

**Usage**:
- Large financial numbers in dashboard
- Account numbers
- Transaction IDs
- Code snippets (if any)
- Technical data

### 5.3 Type Scale

#### Desktop Scale
```css
--font-size-xs:   0.75rem;   /* 12px - tiny labels, captions */
--font-size-sm:   0.875rem;  /* 14px - small text, secondary info */
--font-size-base: 1rem;      /* 16px - body text, paragraphs */
--font-size-lg:   1.125rem;  /* 18px - large body, intro text */
--font-size-xl:   1.25rem;   /* 20px - H3, card titles */
--font-size-2xl:  1.5rem;    /* 24px - H2, section headers */
--font-size-3xl:  1.875rem;  /* 30px - H1, page titles */
--font-size-4xl:  2.25rem;   /* 36px - Hero text */
--font-size-5xl:  3rem;      /* 48px - Large displays */
--font-size-6xl:  3.75rem;   /* 60px - Portfolio total (dashboard) */
```

#### Mobile Scale (Adjusted)
```css
--font-size-xs:   0.75rem;   /* 12px */
--font-size-sm:   0.8125rem; /* 13px */
--font-size-base: 0.9375rem; /* 15px - slightly smaller for mobile */
--font-size-lg:   1rem;      /* 16px */
--font-size-xl:   1.125rem;  /* 18px */
--font-size-2xl:  1.25rem;   /* 20px */
--font-size-3xl:  1.5rem;    /* 24px */
--font-size-4xl:  1.875rem;  /* 30px */
--font-size-5xl:  2.25rem;   /* 36px */
--font-size-6xl:  2.5rem;    /* 40px */
```

### 5.4 Font Weights

```css
--font-weight-normal:    400;  /* Regular - body text */
--font-weight-medium:    500;  /* Medium - emphasis, labels */
--font-weight-semibold:  600;  /* Semibold - headings, buttons */
--font-weight-bold:      700;  /* Bold - strong emphasis, large numbers */
```

**Usage Guidelines**:
- **400 (Regular)**: Body text, descriptions, paragraphs
- **500 (Medium)**: Form labels, secondary headings, tabs
- **600 (Semibold)**: Primary headings (H1-H3), button text, card titles
- **700 (Bold)**: Large financial numbers, critical data, emphasis

### 5.5 Line Heights

```css
--line-height-tight:  1.25;   /* Headings, large numbers */
--line-height-snug:   1.375;  /* Subheadings */
--line-height-normal: 1.5;    /* Body text (default) */
--line-height-relaxed: 1.625; /* Long-form content */
--line-height-loose:  2;      /* Very spacious (rarely used) */
```

**Usage**:
- **1.25 (Tight)**: H1, H2, large dashboard numbers
- **1.375 (Snug)**: H3, H4, card titles
- **1.5 (Normal)**: All body text, descriptions
- **1.625 (Relaxed)**: Help text, documentation
- **2 (Loose)**: Special cases only

### 5.6 Letter Spacing

```css
--letter-spacing-tighter: -0.05em;  /* Large headings */
--letter-spacing-tight:   -0.025em; /* Subheadings */
--letter-spacing-normal:  0;        /* Body text */
--letter-spacing-wide:    0.025em;  /* Labels, buttons */
--letter-spacing-wider:   0.05em;   /* All caps text */
--letter-spacing-widest:  0.1em;    /* Spaced headings */
```

### 5.7 Text Styles (Predefined)

#### Headings

**H1 - Page Title**
```css
.text-h1 {
  font-size: 1.875rem;      /* 30px */
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.025em;
  color: var(--color-text-primary);
}
```

**H2 - Section Header**
```css
.text-h2 {
  font-size: 1.5rem;        /* 24px */
  font-weight: 600;
  line-height: 1.375;
  letter-spacing: -0.025em;
  color: var(--color-text-primary);
}
```

**H3 - Subsection Header**
```css
.text-h3 {
  font-size: 1.25rem;       /* 20px */
  font-weight: 600;
  line-height: 1.375;
  color: var(--color-text-primary);
}
```

**H4 - Card Title**
```css
.text-h4 {
  font-size: 1.125rem;      /* 18px */
  font-weight: 500;
  line-height: 1.5;
  color: var(--color-text-primary);
}
```

#### Body Text

**Body - Large**
```css
.text-body-lg {
  font-size: 1.125rem;      /* 18px */
  font-weight: 400;
  line-height: 1.625;
  color: var(--color-text-primary);
}
```

**Body - Base**
```css
.text-body {
  font-size: 1rem;          /* 16px */
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-text-primary);
}
```

**Body - Small**
```css
.text-body-sm {
  font-size: 0.875rem;      /* 14px */
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-text-secondary);
}
```

#### Labels & UI Text

**Label**
```css
.text-label {
  font-size: 0.875rem;      /* 14px */
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.025em;
  color: var(--color-text-secondary);
  text-transform: uppercase;
}
```

**Caption**
```css
.text-caption {
  font-size: 0.75rem;       /* 12px */
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-text-tertiary);
}
```

#### Financial Numbers

**Display Number - Hero (Portfolio Total)**
```css
.text-display-hero {
  font-size: 3.75rem;       /* 60px desktop, 40px mobile */
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.025em;
  font-family: 'JetBrains Mono', monospace;
  color: var(--color-text-primary);
}
```

**Display Number - Large (Card Totals)**
```css
.text-display-lg {
  font-size: 2.25rem;       /* 36px */
  font-weight: 700;
  line-height: 1.25;
  font-family: 'JetBrains Mono', monospace;
  color: var(--color-text-primary);
}
```

**Display Number - Medium (Metrics)**
```css
.text-display-md {
  font-size: 1.5rem;        /* 24px */
  font-weight: 600;
  line-height: 1.25;
  font-family: 'JetBrains Mono', monospace;
  color: var(--color-text-primary);
}
```

**Inline Number (in text)**
```css
.text-number {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
```

#### Special Text Styles

**Link**
```css
.text-link {
  color: var(--color-action-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 150ms ease;
}

.text-link:hover {
  color: var(--color-action-primary-hover);
  text-decoration: underline;
}
```

**Muted**
```css
.text-muted {
  color: var(--color-text-tertiary);
}
```

**Success**
```css
.text-success {
  color: var(--color-positive);
  font-weight: 600;
}
```

**Error**
```css
.text-error {
  color: var(--color-negative);
  font-weight: 600;
}
```

### 5.8 Typography Best Practices

#### Do's ✅
- Use a maximum of 3 font sizes on a single page
- Maintain consistent line-height for reading comfort
- Use font-weight to establish hierarchy before increasing size
- Use monospace fonts for financial numbers and data
- Ensure text is readable at minimum 16px on mobile

#### Don'ts ❌
- Don't use more than 2 font families in the app
- Don't use font sizes smaller than 12px
- Don't use ALL CAPS for long text (only labels/buttons)
- Don't use italic for emphasis (use weight instead)
- Don't center-align long paragraphs

---

## 6. Spacing & Layout

### 6.1 Spacing Philosophy

Consistent spacing creates visual rhythm and improves scannability. Wise Wealth uses a **4px base unit** system with a clear scale.

### 6.2 Spacing Scale

```css
--spacing-0:   0;         /* 0px - no spacing */
--spacing-px:  1px;       /* 1px - borders, dividers */
--spacing-0.5: 0.125rem;  /* 2px - tight inline elements */
--spacing-1:   0.25rem;   /* 4px - base unit */
--spacing-2:   0.5rem;    /* 8px - small gaps */
--spacing-3:   0.75rem;   /* 12px - compact spacing */
--spacing-4:   1rem;      /* 16px - default spacing */
--spacing-5:   1.25rem;   /* 20px - comfortable spacing */
--spacing-6:   1.5rem;    /* 24px - section spacing */
--spacing-8:   2rem;      /* 32px - large spacing */
--spacing-10:  2.5rem;    /* 40px - component spacing */
--spacing-12:  3rem;      /* 48px - section breaks */
--spacing-16:  4rem;      /* 64px - page sections */
--spacing-20:  5rem;      /* 80px - major sections */
--spacing-24:  6rem;      /* 96px - page padding (large) */
```

### 6.3 Spacing Usage

#### Component Internal Spacing
```css
/* Card padding */
padding: var(--spacing-6);          /* 24px - standard */
padding: var(--spacing-4);          /* 16px - compact */
padding: var(--spacing-8);          /* 32px - spacious */

/* Button padding */
padding: var(--spacing-2) var(--spacing-4);     /* 8px 16px - small */
padding: var(--spacing-3) var(--spacing-6);     /* 12px 24px - medium */
padding: var(--spacing-4) var(--spacing-8);     /* 16px 32px - large */

/* Input padding */
padding: var(--spacing-3) var(--spacing-4);     /* 12px 16px - standard */
```

#### Component Spacing (Gaps)
```css
/* Stack (vertical) spacing */
gap: var(--spacing-2);    /* 8px - tight */
gap: var(--spacing-4);    /* 16px - standard */
gap: var(--spacing-6);    /* 24px - comfortable */

/* Grid spacing */
gap: var(--spacing-4);    /* 16px - compact */
gap: var(--spacing-6);    /* 24px - standard */
gap: var(--spacing-8);    /* 32px - spacious */
```

#### Section Spacing
```css
/* Between cards/components */
margin-bottom: var(--spacing-6);   /* 24px - standard */
margin-bottom: var(--spacing-8);   /* 32px - section end */

/* Between major sections */
margin-bottom: var(--spacing-12);  /* 48px - clear break */
margin-bottom: var(--spacing-16);  /* 64px - major section */
```

### 6.4 Layout Grid

#### Desktop Grid
```css
.container {
  max-width: 1440px;         /* Maximum content width */
  margin: 0 auto;
  padding: 0 var(--spacing-8); /* 32px horizontal padding */
}

.grid-cols-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-6);     /* 24px gap */
}
```

#### Responsive Containers
```css
/* Full width container */
.container-full {
  width: 100%;
  padding: 0 var(--spacing-4); /* 16px on mobile */
}

/* Centered container with max-width */
.container-centered {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-6);
}

/* Reading container (narrower for text) */
.container-reading {
  max-width: 768px;
  margin: 0 auto;
  padding: 0 var(--spacing-6);
}
```

### 6.5 Layout Patterns

#### Sidebar + Main Content
```css
.app-layout {
  display: grid;
  grid-template-columns: 240px 1fr; /* Sidebar + Main */
  min-height: 100vh;
}

/* Mobile: Stack vertically */
@media (max-width: 768px) {
  .app-layout {
    grid-template-columns: 1fr;
  }
}
```

#### Dashboard Grid
```css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-6);
}
```

#### Two Column Layout
```css
.two-column {
  display: grid;
  grid-template-columns: 2fr 1fr; /* Main + Sidebar */
  gap: var(--spacing-8);
}

@media (max-width: 1024px) {
  .two-column {
    grid-template-columns: 1fr; /* Stack on tablet/mobile */
  }
}
```

### 6.6 Border Radius

```css
--radius-none: 0;
--radius-sm:   0.25rem;  /* 4px - small elements */
--radius-base: 0.5rem;   /* 8px - buttons, inputs */
--radius-md:   0.75rem;  /* 12px - cards */
--radius-lg:   1rem;     /* 16px - large cards */
--radius-xl:   1.5rem;   /* 24px - modals */
--radius-2xl:  2rem;     /* 32px - special elements */
--radius-full: 9999px;   /* Fully rounded - pills, avatars */
```

**Usage**:
- **4px**: Small badges, tags
- **8px**: Buttons, inputs, small cards
- **12px**: Standard cards, dropdowns
- **16px**: Large cards, panels
- **24px**: Modals, dialogs
- **Full**: Avatar images, pill buttons, status dots

### 6.7 Shadows (Elevation)

```css
/* Light Theme Shadows */
--shadow-xs:    0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm:    0 1px 3px 0 rgba(0, 0, 0, 0.1),
                0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-base:  0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-md:    0 10px 15px -3px rgba(0, 0, 0, 0.1),
                0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-lg:    0 20px 25px -5px rgba(0, 0, 0, 0.1),
                0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-xl:    0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Dark Theme Shadows (more prominent) */
[data-theme="dark"] {
  --shadow-xs:    0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-sm:    0 1px 3px 0 rgba(0, 0, 0, 0.4),
                  0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-base:  0 4px 6px -1px rgba(0, 0, 0, 0.4),
                  0 2px 4px -1px rgba(0, 0, 0, 0.3);
  --shadow-md:    0 10px 15px -3px rgba(0, 0, 0, 0.4),
                  0 4px 6px -2px rgba(0, 0, 0, 0.3);
  --shadow-lg:    0 20px 25px -5px rgba(0, 0, 0, 0.5),
                  0 10px 10px -5px rgba(0, 0, 0, 0.3);
  --shadow-xl:    0 25px 50px -12px rgba(0, 0, 0, 0.7);
}
```

**Usage**:
- **xs**: Subtle borders, input focus
- **sm**: Dropdowns, tooltips
- **base**: Cards (default), buttons
- **md**: Cards (hover), raised panels
- **lg**: Modals, popovers, command palette
- **xl**: Full-page overlays (rarely used)

### 6.8 Z-Index Scale

```css
--z-index-base:      0;      /* Default stacking */
--z-index-dropdown:  100;    /* Dropdowns */
--z-index-sticky:    200;    /* Sticky headers */
--z-index-fixed:     300;    /* Fixed elements */
--z-index-overlay:   400;    /* Modal overlays */
--z-index-modal:     500;    /* Modals, dialogs */
--z-index-popover:   600;    /* Popovers, tooltips */
--z-index-toast:     700;    /* Toast notifications */
--z-index-tooltip:   800;    /* Tooltips (highest) */
```

---

## 7. Iconography

### 7.1 Icon System

**Library**: Lucide React  
**Website**: lucide.dev  
**License**: ISC (permissive)

**Why Lucide?**
- Consistent design language
- Extensive icon library (1000+ icons)
- React-optimized components
- Customizable size and stroke
- Excellent financial/business icons
- Active development and support

### 7.2 Icon Sizes

```css
--icon-size-xs:   0.75rem;   /* 12px - inline with text */
--icon-size-sm:   1rem;      /* 16px - buttons, small UI */
--icon-size-base: 1.25rem;   /* 20px - standard UI */
--icon-size-lg:   1.5rem;    /* 24px - headings, emphasis */
--icon-size-xl:   2rem;      /* 32px - feature icons */
--icon-size-2xl:  3rem;      /* 48px - empty states */
--icon-size-3xl:  4rem;      /* 64px - hero sections */
```

**Usage**:
- **12px**: Inline with small text, badges
- **16px**: Buttons (small), list items
- **20px**: Sidebar navigation, standard buttons, inputs
- **24px**: Page headers, card headers, large buttons
- **32px**: Feature callouts, onboarding
- **48px**: Empty states, placeholders
- **64px**: Large empty states, error pages

### 7.3 Icon Stroke Width

```css
--icon-stroke-thin:     1;      /* Lightweight icons */
--icon-stroke-regular:  1.5;    /* Default */
--icon-stroke-medium:   2;      /* Emphasized icons */
--icon-stroke-bold:     2.5;    /* Strong emphasis */
```

**Default**: 1.5 (regular) for most icons

### 7.4 Standard Icons

#### Navigation & Actions
```typescript
import {
  Home,           // Dashboard
  TrendingUp,     // Stocks, performance
  Coins,          // Precious metals
  Building,       // Real estate
  DollarSign,     // Currency
  Wallet,         // Bank accounts
  Briefcase,      // Business investments
  Package,        // Other assets
  Receipt,        // Expenses
  ArrowUpCircle,  // Income
  Target,         // Savings goals
  Heart,          // Medical insurance
  Sparkles,       // AI Advisor
  Search,         // Search/command palette
  Settings,       // Settings
  User,           // Profile
  LogOut,         // Logout
  Menu,           // Mobile menu
  X,              // Close
  Plus,           // Add
  Edit,           // Edit
  Trash2,         // Delete
  MoreVertical,   // More options
  ChevronDown,    // Expand/dropdown
  ChevronRight,   // Navigate forward
  ChevronLeft,    // Navigate back
  ArrowUp,        // Sort/increase
  ArrowDown,      // Sort/decrease
} from 'lucide-react';
```

#### Status & Indicators
```typescript
import {
  CheckCircle,    // Success
  XCircle,        // Error
  AlertCircle,    // Warning
  Info,           // Information
  AlertTriangle,  // Caution
  Clock,          // Pending/time
  Loader,         // Loading
  TrendingUp,     // Positive trend
  TrendingDown,   // Negative trend
} from 'lucide-react';
```

#### Financial & Data
```typescript
import {
  BarChart,       // Charts/analytics
  PieChart,       // Portfolio breakdown
  TrendingUp,     // Performance
  Calendar,       // Date selection
  Filter,         // Filtering
  Download,       // Export
  Upload,         // Import
  Eye,            // View
  EyeOff,         // Hide
  Lock,           // Security
  Unlock,         // Unlocked
  Shield,         // Protection
  CreditCard,     // Payment method
  Repeat,         // Recurring
} from 'lucide-react';
```

### 7.5 Icon Usage Guidelines

#### Do's ✅
- Use icons consistently for the same actions
- Pair icons with labels for clarity (especially navigation)
- Use appropriate size for context (20px for nav, 16px for buttons)
- Use same stroke width throughout application (1.5)
- Add aria-labels for accessibility when icon is standalone

#### Don'ts ❌
- Don't mix icon libraries (stick to Lucide)
- Don't use different icons for the same action
- Don't use icons without labels in critical actions
- Don't use decorative icons excessively
- Don't scale icons beyond their intended size range

### 7.6 Icon Colors

Icons inherit color from text by default, but can use semantic colors:

```tsx
// Default (inherits text color)
<TrendingUp className="w-5 h-5" />

// Success (green)
<TrendingUp className="w-5 h-5 text-green-600" />

// Error (red)
<TrendingDown className="w-5 h-5 text-red-600" />

// Primary (blue)
<Info className="w-5 h-5 text-blue-600" />

// Muted (gray)
<Clock className="w-5 h-5 text-gray-400" />
```

---

## 8. Components

### 8.1 Component Philosophy

Components in Wise Wealth are:
- **Reusable**: Built once, used everywhere
- **Composable**: Can be combined to create complex UIs
- **Accessible**: WCAG AA compliant by default
- **Consistent**: Follow design system tokens
- **Documented**: Clear props and usage examples

### 8.2 Button

#### Variants

**Primary**
```tsx
<button className="
  px-6 py-3 
  bg-blue-600 hover:bg-blue-700 active:bg-blue-800
  text-white font-semibold
  rounded-lg
  transition-colors duration-150
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
">
  Primary Action
</button>
```

**Secondary**
```tsx
<button className="
  px-6 py-3
  bg-white hover:bg-gray-50 active:bg-gray-100
  text-gray-900 font-semibold
  border border-gray-300
  rounded-lg
  transition-colors duration-150
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
">
  Secondary Action
</button>
```

**Outline**
```tsx
<button className="
  px-6 py-3
  bg-transparent hover:bg-blue-50 active:bg-blue-100
  text-blue-600 font-semibold
  border border-blue-600
  rounded-lg
  transition-colors duration-150
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
">
  Outline
</button>
```

**Ghost**
```tsx
<button className="
  px-6 py-3
  bg-transparent hover:bg-gray-100 active:bg-gray-200
  text-gray-700 font-semibold
  rounded-lg
  transition-colors duration-150
  focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
">
  Ghost
</button>
```

**Destructive**
```tsx
<button className="
  px-6 py-3
  bg-red-600 hover:bg-red-700 active:bg-red-800
  text-white font-semibold
  rounded-lg
  transition-colors duration-150
  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
">
  Delete
</button>
```

#### Sizes

```tsx
// Small
<button className="px-3 py-1.5 text-sm">Small</button>

// Medium (default)
<button className="px-4 py-2 text-base">Medium</button>

// Large
<button className="px-6 py-3 text-lg">Large</button>

// Extra Large
<button className="px-8 py-4 text-xl">Extra Large</button>
```

#### States

```tsx
// Disabled
<button disabled className="opacity-50 cursor-not-allowed">
  Disabled
</button>

// Loading
<button disabled className="opacity-75 cursor-wait">
  <Loader className="w-4 h-4 animate-spin mr-2" />
  Loading...
</button>

// Icon + Text
<button>
  <Plus className="w-4 h-4 mr-2" />
  Add Asset
</button>

// Icon Only
<button className="p-2">
  <Search className="w-5 h-5" />
</button>
```

### 8.3 Card

**Standard Card**
```tsx
<div className="
  bg-white dark:bg-slate-800
  rounded-lg
  shadow-sm
  p-6
  border border-gray-200 dark:border-slate-700
">
  {/* Card content */}
</div>
```

**Hover Card**
```tsx
<div className="
  bg-white dark:bg-slate-800
  rounded-lg
  shadow-sm hover:shadow-md
  p-6
  border border-gray-200 dark:border-slate-700
  transition-shadow duration-200
  cursor-pointer
">
  {/* Card content */}
</div>
```

**Stat Card**
```tsx
<div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
  <div className="flex items-center justify-between mb-2">
    <p className="text-sm font-medium text-gray-600 dark:text-slate-300">
      Total Portfolio Value
    </p>
    <TrendingUp className="w-5 h-5 text-green-600" />
  </div>
  <p className="text-3xl font-bold text-gray-900 dark:text-white">
    $1,234,567
  </p>
  <p className="text-sm text-green-600 mt-2">
    +5.2% ($60,234)
  </p>
</div>
```

### 8.4 Input

**Text Input**
```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
    Asset Name
  </label>
  <input
    type="text"
    className="
      w-full
      px-4 py-3
      border border-gray-300 dark:border-slate-600
      rounded-lg
      bg-white dark:bg-slate-800
      text-gray-900 dark:text-white
      placeholder-gray-400 dark:placeholder-slate-500
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      transition-colors duration-150
    "
    placeholder="Enter asset name"
  />
</div>
```

**Input with Icon**
```tsx
<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <Search className="w-5 h-5 text-gray-400" />
  </div>
  <input
    type="text"
    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg"
    placeholder="Search assets..."
  />
</div>
```

**Error State**
```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Amount
  </label>
  <input
    type="number"
    className="
      w-full px-4 py-3
      border-2 border-red-500
      rounded-lg
      focus:outline-none focus:ring-2 focus:ring-red-500
    "
  />
  <p className="text-sm text-red-600 flex items-center">
    <AlertCircle className="w-4 h-4 mr-1" />
    Amount is required
  </p>
</div>
```

### 8.5 Select / Dropdown

```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Asset Category
  </label>
  <select className="
    w-full
    px-4 py-3
    border border-gray-300
    rounded-lg
    bg-white
    text-gray-900
    focus:outline-none focus:ring-2 focus:ring-blue-500
    appearance-none
    cursor-pointer
  ">
    <option>Precious Metals</option>
    <option>Stocks</option>
    <option>Real Estate</option>
    <option>Currencies</option>
  </select>
</div>
```

### 8.6 Badge

**Status Badges**
```tsx
// Success
<span className="
  inline-flex items-center
  px-3 py-1
  rounded-full
  text-xs font-medium
  bg-green-100 text-green-800
  dark:bg-green-900/30 dark:text-green-400
">
  Active
</span>

// Warning
<span className="
  inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
  bg-amber-100 text-amber-800
  dark:bg-amber-900/30 dark:text-amber-400
">
  Pending
</span>

// Error
<span className="
  inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
  bg-red-100 text-red-800
  dark:bg-red-900/30 dark:text-red-400
">
  Expired
</span>

// Info
<span className="
  inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
  bg-blue-100 text-blue-800
  dark:bg-blue-900/30 dark:text-blue-400
">
  New
</span>
```

### 8.7 Modal

```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center">
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
  
  {/* Modal */}
  <div className="
    relative
    bg-white dark:bg-slate-800
    rounded-xl
    shadow-xl
    max-w-2xl
    w-full
    mx-4
    max-h-[90vh]
    overflow-y-auto
  ">
    {/* Header */}
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Add New Asset
      </h2>
      <button className="p-2 hover:bg-gray-100 rounded-lg">
        <X className="w-5 h-5" />
      </button>
    </div>
    
    {/* Body */}
    <div className="p-6">
      {/* Modal content */}
    </div>
    
    {/* Footer */}
    <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
      <button className="px-6 py-2 border border-gray-300 rounded-lg">
        Cancel
      </button>
      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
        Save
      </button>
    </div>
  </div>
</div>
```

### 8.8 Toast Notification

```tsx
<div className="
  fixed bottom-4 right-4 z-50
  bg-white dark:bg-slate-800
  rounded-lg
  shadow-lg
  border border-gray-200 dark:border-slate-700
  p-4
  max-w-md
  flex items-start gap-3
">
  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
  <div className="flex-1">
    <p className="font-semibold text-gray-900 dark:text-white">
      Asset Added Successfully
    </p>
    <p className="text-sm text-gray-600 dark:text-slate-300 mt-1">
      Gold (100g) has been added to your portfolio.
    </p>
  </div>
  <button className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded">
    <X className="w-4 h-4" />
  </button>
</div>
```

### 8.9 Table

```tsx
<div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-700">
  <table className="w-full">
    <thead className="bg-gray-50 dark:bg-slate-800/50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Asset
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Quantity
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Value
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Gain/Loss
        </th>
      </tr>
    </thead>
    <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
      <tr className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <Coins className="w-5 h-5 text-amber-500 mr-3" />
            <span className="font-medium text-gray-900 dark:text-white">Gold</span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-slate-300">
          100g
        </td>
        <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900 dark:text-white">
          $6,234
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-green-600 font-semibold">+$234 (3.9%)</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### 8.10 Loading States

**Skeleton**
```tsx
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-5/6"></div>
</div>
```

**Spinner**
```tsx
<div className="flex items-center justify-center py-12">
  <Loader className="w-8 h-8 text-blue-600 animate-spin" />
</div>
```

**Loading Card**
```tsx
<div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 animate-pulse">
  <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
  <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded w-2/3 mb-3"></div>
  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/4"></div>
</div>
```

---

## 9. Patterns

### 9.1 Empty States

```tsx
<div className="flex flex-col items-center justify-center py-16 px-4">
  <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center mb-4">
    <Package className="w-8 h-8 text-gray-400" />
  </div>
  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
    No Assets Yet
  </h3>
  <p className="text-gray-600 dark:text-slate-300 text-center max-w-sm mb-6">
    Start building your portfolio by adding your first asset.
  </p>
  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
    <Plus className="w-4 h-4 mr-2 inline" />
    Add First Asset
  </button>
</div>
```

### 9.2 Error States

```tsx
<div className="flex flex-col items-center justify-center py-16 px-4">
  <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
    <AlertCircle className="w-8 h-8 text-red-600" />
  </div>
  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
    Something Went Wrong
  </h3>
  <p className="text-gray-600 dark:text-slate-300 text-center max-w-sm mb-6">
    We couldn't load your assets. Please try again.
  </p>
  <div className="flex gap-3">
    <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
      Go Back
    </button>
    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
      <Repeat className="w-4 h-4 mr-2 inline" />
      Try Again
    </button>
  </div>
</div>
```

### 9.3 Stat Display Pattern

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Stat Item */}
  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm font-medium text-gray-600 dark:text-slate-300">
        Total Assets
      </p>
      <TrendingUp className="w-5 h-5 text-blue-600" />
    </div>
    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
      47
    </p>
    <p className="text-sm text-gray-500 dark:text-slate-400">
      Across 5 categories
    </p>
  </div>
  
  {/* Add more stat items */}
</div>
```

### 9.4 Action Panel Pattern

```tsx
<div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg p-6 text-white">
  <div className="flex items-start justify-between">
    <div>
      <h3 className="text-xl font-semibold mb-2">
        Get AI-Powered Insights
      </h3>
      <p className="text-blue-100 mb-4">
        Let our AI analyze your portfolio and provide personalized recommendations.
      </p>
      <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50">
        View Insights
      </button>
    </div>
    <Sparkles className="w-12 h-12 opacity-80" />
  </div>
</div>
```

### 9.5 Comparison Table Pattern

```tsx
<div className="grid grid-cols-2 gap-6">
  {/* Left Column */}
  <div>
    <h4 className="text-sm font-medium text-gray-600 mb-4">Purchase Price</h4>
    <p className="text-2xl font-bold text-gray-900">$100,000</p>
    <p className="text-sm text-gray-500 mt-1">Jan 15, 2024</p>
  </div>
  
  {/* Right Column */}
  <div>
    <h4 className="text-sm font-medium text-gray-600 mb-4">Current Value</h4>
    <p className="text-2xl font-bold text-gray-900">$105,200</p>
    <p className="text-sm text-green-600 mt-1">
      +$5,200 (5.2%)
    </p>
  </div>
</div>
```

### 9.6 Timeline Pattern

```tsx
<div className="space-y-4">
  {/* Timeline Item */}
  <div className="flex gap-4">
    <div className="flex-shrink-0">
      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
        <Plus className="w-5 h-5 text-green-600" />
      </div>
    </div>
    <div className="flex-1">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-gray-900 dark:text-white">
            Added Gold (100g)
          </h4>
          <span className="text-sm text-gray-500">2 hours ago</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-slate-300">
          Purchase price: $6,000 | Current value: $6,234
        </p>
      </div>
    </div>
  </div>
  
  {/* Add more timeline items */}
</div>
```

---

## 10. Animation & Motion

### 10.1 Animation Philosophy

Animations in Wise Wealth serve specific purposes:
- **Feedback**: Confirm user actions
- **Hierarchy**: Direct attention to important elements
- **Continuity**: Maintain context during transitions
- **Delight**: Add polish without distraction

**Principles**:
- **Purposeful**: Every animation has a reason
- **Fast**: 100-400ms for most animations
- **Natural**: Ease-out for entering, ease-in for exiting
- **Subtle**: Noticeable but not distracting
- **Performant**: Use transform and opacity only
- **Accessible**: Respect prefers-reduced-motion

### 10.2 Animation Timing

```css
--duration-instant:  0ms;       /* Immediate, no animation */
--duration-fast:     100ms;     /* Micro-interactions (hover, focus) */
--duration-base:     200ms;     /* Standard transitions (button states) */
--duration-moderate: 300ms;     /* Page elements (modals opening) */
--duration-slow:     400ms;     /* Page transitions */
--duration-slower:   600ms;     /* Complex transitions (rarely used) */
```

### 10.3 Easing Functions

```css
--ease-in:        cubic-bezier(0.4, 0, 1, 1);        /* Accelerating */
--ease-out:       cubic-bezier(0, 0, 0.2, 1);        /* Decelerating (default) */
--ease-in-out:    cubic-bezier(0.4, 0, 0.2, 1);      /* Smooth start and end */
--ease-bounce:    cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Playful bounce */
--ease-smooth:    cubic-bezier(0.25, 0.1, 0.25, 1);  /* Very smooth */
```

**Usage**:
- **Ease-out**: Elements entering the screen (modals, dropdowns, tooltips)
- **Ease-in**: Elements leaving the screen
- **Ease-in-out**: Elements transforming in place (expand/collapse)
- **Ease-bounce**: Success celebrations, occasional delight (use sparingly)

### 10.4 Common Animations

#### Page Transitions
```tsx
// Fade in
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: "easeOut" }
};

// Slide in from right
const slideInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3, ease: "easeOut" }
};

// Slide up
const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: "easeOut" }
};
```

#### Modal Animations
```tsx
// Modal overlay
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  transition: { duration: 0.2 }
};

// Modal content
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20,
    transition: { duration: 0.15, ease: "easeIn" }
  }
};
```

#### List Item Stagger
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};
```

#### Card Hover
```tsx
<motion.div
  whileHover={{ 
    y: -4, 
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" 
  }}
  transition={{ duration: 0.2, ease: "easeOut" }}
>
  {/* Card content */}
</motion.div>
```

#### Button Press
```tsx
<motion.button
  whileTap={{ scale: 0.97 }}
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.1 }}
>
  Click Me
</motion.button>
```

### 10.5 Loading Animations

```tsx
// Spinner
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
>
  <Loader className="w-6 h-6" />
</motion.div>

// Pulse
<motion.div
  animate={{ opacity: [0.5, 1, 0.5] }}
  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
>
  Loading...
</motion.div>

// Progress bar
<motion.div
  initial={{ scaleX: 0 }}
  animate={{ scaleX: progress / 100 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  style={{ transformOrigin: "left" }}
  className="h-2 bg-blue-600 rounded-full"
/>
```

### 10.6 Accessibility: Reduced Motion

Always respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

In React/Motion:

```tsx
import { useReducedMotion } from 'motion/react';

const shouldReduceMotion = useReducedMotion();

const variants = shouldReduceMotion ? {
  // No animation
  initial: {},
  animate: {},
  exit: {}
} : {
  // Full animation
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};
```

### 10.7 Performance Best Practices

#### Do's ✅
- Animate `transform` and `opacity` only
- Use `will-change` for complex animations (sparingly)
- Keep animations under 400ms
- Use CSS animations for simple transitions
- Use Motion/Framer Motion for complex orchestration
- Test on lower-end devices

#### Don'ts ❌
- Don't animate `width`, `height`, `top`, `left`, `margin`, `padding`
- Don't animate during critical user tasks
- Don't use too many simultaneous animations
- Don't use animations that cause layout shifts
- Don't animate large images without optimization

---

## 11. Accessibility

### 11.1 Accessibility Goals

Wise Wealth aims for **WCAG 2.1 Level AA** compliance across all features.

### 11.2 Color Contrast

All text meets minimum contrast ratios:
- **Normal text** (< 24px): 4.5:1
- **Large text** (≥ 24px): 3:1
- **UI components**: 3:1

### 11.3 Keyboard Navigation

All interactive elements must be keyboard accessible:

```tsx
// Proper focus states
<button className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Click Me
</button>

// Skip to content link
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// Keyboard shortcuts
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Cmd/Ctrl + K for search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openCommandPalette();
    }
  };
  
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### 11.4 Screen Reader Support

**ARIA Labels**:
```tsx
// Icon-only button
<button aria-label="Add new asset">
  <Plus className="w-5 h-5" />
</button>

// Search input
<input
  type="search"
  placeholder="Search..."
  aria-label="Search assets"
/>

// Loading state
<div role="status" aria-live="polite" aria-busy="true">
  <Loader className="w-6 h-6 animate-spin" />
  <span className="sr-only">Loading assets...</span>
</div>
```

**Semantic HTML**:
```tsx
// Use proper headings hierarchy
<h1>Dashboard</h1>
<section>
  <h2>Portfolio Overview</h2>
  <h3>Asset Breakdown</h3>
</section>

// Use semantic elements
<nav>...</nav>
<main>...</main>
<aside>...</aside>
<footer>...</footer>
```

### 11.5 Focus Management

```tsx
// Trap focus in modals
import { FocusTrap } from '@/components/ui/FocusTrap';

<FocusTrap active={isModalOpen}>
  <div className="modal">
    {/* Modal content */}
  </div>
</FocusTrap>

// Return focus after modal closes
useEffect(() => {
  const previousActiveElement = document.activeElement;
  
  return () => {
    if (previousActiveElement instanceof HTMLElement) {
      previousActiveElement.focus();
    }
  };
}, []);
```

### 11.6 Form Accessibility

```tsx
<form>
  {/* Proper label association */}
  <label htmlFor="asset-name" className="block mb-2">
    Asset Name
  </label>
  <input
    id="asset-name"
    type="text"
    aria-required="true"
    aria-invalid={errors.name ? "true" : "false"}
    aria-describedby="name-error"
  />
  {errors.name && (
    <p id="name-error" className="text-red-600 text-sm mt-1" role="alert">
      {errors.name.message}
    </p>
  )}
  
  {/* Fieldset for radio groups */}
  <fieldset>
    <legend className="font-semibold mb-2">Asset Type</legend>
    <label>
      <input type="radio" name="type" value="gold" />
      Gold
    </label>
    <label>
      <input type="radio" name="type" value="silver" />
      Silver
    </label>
  </fieldset>
</form>
```

### 11.7 Alternative Text

```tsx
// Meaningful images
<img 
  src="/gold-bar.jpg" 
  alt="100 gram gold bar from Emirates NBD" 
/>

// Decorative images
<img 
  src="/background-pattern.svg" 
  alt="" 
  role="presentation" 
/>

// Icon with text
<div>
  <TrendingUp className="w-5 h-5" aria-hidden="true" />
  <span>Portfolio up 5.2%</span>
</div>
```

---

## 12. Responsive Design

### 12.1 Breakpoints

```css
/* Mobile First Approach */
/* Base styles: 320px - 767px (mobile) */

/* Tablet */
@media (min-width: 768px) {
  /* md: Tablet styles */
}

/* Desktop */
@media (min-width: 1024px) {
  /* lg: Desktop styles */
}

/* Large Desktop */
@media (min-width: 1280px) {
  /* xl: Large desktop styles */
}

/* Extra Large */
@media (min-width: 1536px) {
  /* 2xl: Extra large screens */
}
```

### 12.2 Responsive Patterns

#### Navigation

**Mobile**: Hamburger menu
```tsx
<div className="lg:hidden">
  <button onClick={() => setMobileMenuOpen(true)}>
    <Menu className="w-6 h-6" />
  </button>
</div>

<aside className={`
  fixed inset-y-0 left-0 z-50 w-64 bg-white
  transform transition-transform duration-300
  ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
  lg:translate-x-0 lg:static
`}>
  {/* Sidebar content */}
</aside>
```

**Desktop**: Persistent sidebar
```tsx
<div className="hidden lg:block w-64 flex-shrink-0">
  {/* Sidebar always visible */}
</div>
```

#### Grid Layouts

```tsx
// Responsive grid
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  xl:grid-cols-4 
  gap-4 md:gap-6
">
  {/* Grid items */}
</div>

// Auto-fit grid
<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
  {/* Automatically adjusts columns */}
</div>
```

#### Typography

```tsx
// Responsive text sizes
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Portfolio Overview
</h1>

<p className="text-sm md:text-base">
  Body text that scales
</p>
```

#### Spacing

```tsx
// Responsive padding
<div className="p-4 md:p-6 lg:p-8">
  {/* Padding increases on larger screens */}
</div>

// Responsive gaps
<div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
  {/* Gap increases on larger screens */}
</div>
```

### 12.3 Touch Targets

Minimum **44x44px** on mobile:

```tsx
// Mobile-friendly button
<button className="
  p-3 
  min-w-[44px] 
  min-h-[44px]
  flex items-center justify-center
">
  <Plus className="w-5 h-5" />
</button>
```

### 12.4 Responsive Tables

```tsx
// Stack on mobile, table on desktop
<div className="overflow-x-auto">
  <table className="w-full min-w-[600px]">
    {/* Table content */}
  </table>
</div>

// Or use card layout on mobile
<div className="hidden lg:block">
  <table>{/* Table */}</table>
</div>

<div className="lg:hidden space-y-4">
  {/* Card layout for mobile */}
  {data.map(item => (
    <div key={item.id} className="bg-white rounded-lg p-4">
      {/* Card representation */}
    </div>
  ))}
</div>
```

---

## 13. Dark Mode

### 13.1 Implementation

```tsx
// Toggle dark mode
const [theme, setTheme] = useState<'light' | 'dark'>('light');

useEffect(() => {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}, [theme]);

// Toggle button
<button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
  {theme === 'light' ? <Moon /> : <Sun />}
</button>
```

### 13.2 Dark Mode Colors

Use semantic tokens that adapt:

```tsx
// Background
className="bg-white dark:bg-slate-900"

// Surface (cards)
className="bg-gray-50 dark:bg-slate-800"

// Text
className="text-gray-900 dark:text-white"
className="text-gray-600 dark:text-slate-300"

// Borders
className="border-gray-200 dark:border-slate-700"

// Shadows (darker in dark mode)
className="shadow-sm dark:shadow-slate-900/50"
```

### 13.3 Dark Mode Best Practices

#### Do's ✅
- Use pure black (#000000) sparingly (use navy/slate instead)
- Adjust shadow opacity for dark mode
- Test color contrast in both modes
- Provide smooth transition between modes
- Use dark mode specific images/logos if needed

#### Don'ts ❌
- Don't just invert colors
- Don't use pure white text on pure black (#FFFFFF on #000000 is too harsh)
- Don't forget to test charts and data visualizations
- Don't rely solely on brightness to differentiate modes

---

## 14. Data Visualization

### 14.1 Chart Colors

**Primary Palette** (for different data series):
```css
--chart-1: #3B82F6;  /* Blue */
--chart-2: #14B8A6;  /* Teal */
--chart-3: #F59E0B;  /* Amber */
--chart-4: #8B5CF6;  /* Purple */
--chart-5: #EC4899;  /* Pink */
--chart-6: #10B981;  /* Green */
```

**Semantic Colors**:
```css
--chart-positive: #10B981;  /* Green for gains */
--chart-negative: #EF4444;  /* Red for losses */
--chart-neutral:  #6B7280;  /* Gray for neutral */
```

### 14.2 Chart Types & Usage

**Line Chart**: Trends over time (portfolio value, asset price history)
**Bar Chart**: Comparisons across categories (expense by category)
**Pie/Donut Chart**: Portfolio composition (asset allocation)
**Area Chart**: Cumulative values over time (total assets growth)

### 14.3 Chart Styling

```tsx
// Recharts example
<LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
  <XAxis 
    dataKey="date" 
    stroke="#6B7280"
    style={{ fontSize: '12px' }}
  />
  <YAxis 
    stroke="#6B7280"
    style={{ fontSize: '12px' }}
  />
  <Tooltip 
    contentStyle={{
      backgroundColor: '#FFFFFF',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}
  />
  <Line 
    type="monotone" 
    dataKey="value" 
    stroke="#3B82F6" 
    strokeWidth={2}
    dot={{ fill: '#3B82F6', r: 4 }}
  />
</LineChart>
```

### 14.4 Data Visualization Best Practices

#### Do's ✅
- Use consistent colors for same data across charts
- Provide tooltips with exact values
- Label axes clearly
- Use appropriate chart type for data
- Keep charts simple and focused
- Test color combinations for colorblind users

#### Don'ts ❌
- Don't use 3D charts (hard to read accurately)
- Don't use more than 6 colors in a single chart
- Don't truncate Y-axis to exaggerate changes
- Don't use pie charts for more than 5-6 categories
- Don't forget to show units (%, $, etc.)

---

## 15. Forms & Inputs

### 15.1 Form Layout

```tsx
<form className="space-y-6">
  {/* Form section */}
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Basic Information</h3>
    
    {/* Form field */}
    <div className="space-y-2">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Asset Name *
      </label>
      <input
        id="name"
        type="text"
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>
    
    {/* Two column layout */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <input type="number" className="w-full px-4 py-3 border rounded-lg" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Unit
        </label>
        <select className="w-full px-4 py-3 border rounded-lg">
          <option>Gram</option>
          <option>Ounce</option>
        </select>
      </div>
    </div>
  </div>
  
  {/* Form actions */}
  <div className="flex justify-end gap-3 pt-6 border-t">
    <button type="button" className="px-6 py-3 border rounded-lg">
      Cancel
    </button>
    <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg">
      Save Asset
    </button>
  </div>
</form>
```

### 15.2 Validation States

**Success**:
```tsx
<div className="relative">
  <input 
    className="w-full px-4 py-3 pr-10 border-2 border-green-500 rounded-lg" 
  />
  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
</div>
<p className="text-sm text-green-600 mt-1">Valid email address</p>
```

**Error**:
```tsx
<div className="relative">
  <input 
    className="w-full px-4 py-3 pr-10 border-2 border-red-500 rounded-lg" 
    aria-invalid="true"
  />
  <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600" />
</div>
<p className="text-sm text-red-600 mt-1" role="alert">
  This field is required
</p>
```

**Warning**:
```tsx
<div className="relative">
  <input className="w-full px-4 py-3 pr-10 border-2 border-amber-500 rounded-lg" />
  <AlertTriangle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600" />
</div>
<p className="text-sm text-amber-600 mt-1">
  This value seems unusually high. Please verify.
</p>
```

### 15.3 Form Best Practices

#### Do's ✅
- Use clear, descriptive labels above inputs
- Provide helpful placeholder text
- Show inline validation on blur
- Use appropriate input types (email, tel, number, date)
- Mark required fields clearly
- Group related fields
- Provide clear error messages with solutions

#### Don'ts ❌
- Don't use placeholder text as labels
- Don't validate too early (on first keystroke)
- Don't use vague error messages ("Invalid input")
- Don't hide required field indicators
- Don't use too many required fields

---

## 16. Implementation Guide

### 16.1 Getting Started

**Install Dependencies**:
Refer to `project-docs/tech-stack.md` for the authoritative list of dependencies and versions.


**Setup Tailwind CSS v4**:
```css
/* src/styles/globals.css */
@import "tailwindcss";

/* Design tokens defined here */
```

### 16.2 Using Design Tokens

```tsx
// Use Tailwind utility classes
<div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
    Portfolio Overview
  </h2>
  <p className="text-gray-600 dark:text-slate-300">
    Your total portfolio value across all assets.
  </p>
</div>

// Or use CSS variables
<div style={{ 
  backgroundColor: 'var(--color-surface)',
  padding: 'var(--spacing-6)',
  borderRadius: 'var(--radius-lg)'
}}>
  Content
</div>
```

### 16.3 Component Development Workflow

1. **Check design system** for existing components
2. **Use design tokens** for colors, spacing, typography
3. **Follow patterns** for layouts and interactions
4. **Add accessibility** features (ARIA, keyboard nav)
5. **Test responsiveness** on mobile, tablet, desktop
6. **Test both themes** (light and dark)
7. **Document** new patterns if created

### 16.4 File Organization

```
src/
├── components/
│   ├── ui/              # Base design system components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   ├── layout/          # Layout components
│   ├── charts/          # Chart components
│   └── shared/          # Shared business components
├── styles/
│   └── globals.css      # Design tokens and Tailwind config
└── utils/
    ├── animation-variants.ts
    └── ...
```

---

## 17. Resources

### 17.1 Design Tools

- **Figma**: Design mockups and prototypes
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Icon library
- **Coolors**: Color palette generation
- **Contrast Checker**: WCAG contrast verification

### 17.2 Documentation

- **Tailwind CSS**: tailwindcss.com
- **Lucide React**: lucide.dev
- **Motion**: motion.dev
- **Recharts**: recharts.org
- **React Hook Form**: react-hook-form.com
- **WCAG Guidelines**: w3.org/WAI/WCAG21/quickref

### 17.3 Inspiration

- **Wise** (wise.com) - Multi-currency design
- **Revolut** (revolut.com) - Modern fintech UI
- **Dribbble** - Financial dashboard designs
- **Mobbin** - Mobile app design patterns

### 17.4 Testing Tools

- **Chrome DevTools**: Responsive design mode
- **Lighthouse**: Performance and accessibility audits
- **Axe DevTools**: Accessibility testing
- **Color Oracle**: Color blindness simulator

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Dec 10, 2025 | Initial design system documentation created |

---

## Feedback & Contributions

This design system is a living document. For suggestions, improvements, or questions:
- Submit feedback to the design team
- Propose changes via pull request
- Report inconsistencies or gaps

---

**Design System Owner**: Design & Development Team  
**Last Updated**: December 10, 2025  
**Status**: Active - Version 1.0

---

*End of Design System Documentation*

## 18. Premium Features & A++ Enhancements

### 18.1 "Magical" UI Elements
To achieve the "A++" class feel, specific premium interactions are required beyond standard Tailwind utilities.

#### Glassmorphism Card
Used for Authentication cards and floating modals.
```css
.bg-glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

#### Neon Glow Branding
The logo and primary accents use a specialized glow effect.
- **Container**: Gradient `from-primary/30 to-primary/10`
- **Shadow**: `shadow-[0_0_20px_-5px_var(--color-primary)]`
- **Interaction**: Scales up (`scale-105`) and intensifies glow on hover.

### 18.2 Interaction Standards

#### Button "Finger" Cursor
**ALL** buttons must strictly enforce `cursor-pointer`. This is globally applied to the `Button` primitive.

#### "White Flash" Hover
Social buttons (Google/Apple) use a high-contrast hover state for tactile responsiveness.
- **Default**: `bg-white/5 text-muted-foreground`
- **Hover**: `bg-white text-black border-white` (Solid white flash)

### 18.3 Validation & Feedback

#### Custom Validation Only
**Native browser tooltips are BANNED.**
- Forms must use `noValidate` to suppress default popups.
- Errors must be displayed as custom red text or Toasts.

#### Premium Toasts (Sonner)
Toasts use a custom "A++" design system:
- **Error**: Deep Red Background (`bg-red-950/80`) + Glowing Red Border.
- **Success**: Deep Teal + Glowing Border.
- **Effect**: `backdrop-blur-xl` to match the glassmorphism theme.
