# TASK: Rebuild Pickaxe Empire Website as a High-Fidelity Replica

Act as a senior frontend engineer, UI/UX reverse engineer, and visual reconstruction specialist.

Your task is to recreate the website at:

Reference URL: https://pickaxeempire.com/

I have also provided a full-page screenshot of the reference website and a local folder named **"Pickaxe Empire Assat"** containing downloaded website assets.

Use the screenshot, reference website, and local assets together. The screenshot represents the overall visual design and page structure that must be reproduced.

## 1. Primary Objective

Build a highly accurate, responsive replica of the reference website.

The result should closely match the original in:

- Overall layout and section ordering
- Page width, spacing, margins, and proportions
- Typography, font sizes, font weights, and line heights
- Background images, textures, gradients, and lighting
- Character artwork, game illustrations, icons, coins, and decorative elements
- Cards, buttons, borders, separators, and shadows
- Colors, especially the dark brown, black, gold, orange, and cream palette
- Responsive behavior across desktop, tablet, and mobile
- Hover states, animations, scrolling behavior, and interactive elements

Do not create a generic gaming landing page. Reconstruct the specific visual identity and layout of the supplied reference.

Aim for pixel-level similarity wherever the available assets and browser evidence allow it.

## 2. Inspect the Existing Project First

Before making changes:

1. Inspect the entire existing project structure.
2. Identify the framework, package manager, installed dependencies, and current entry points.
3. Inspect all files inside the "Pickaxe Empire Assat" directory and its subdirectories.
4. Identify image formats, dimensions, transparency, fonts, spritesheets, and video files.
5. Generate an asset inventory and preview relevant images where necessary.
6. Identify which assets correspond to each section of the reference website.
7. Inspect the reference website at https://pickaxeempire.com/ using the available browser or browser automation tools.
8. Examine the original website at desktop and mobile viewport sizes.
9. Record the dimensions and layout of the main sections before implementing them.

Do not delete or overwrite existing project files unnecessarily. Preserve working functionality and existing configuration.

If the original website cannot be accessed, use the supplied screenshot and local assets as the primary sources of truth.

## 3. Asset Matching Requirements

Use the supplied "Pickaxe Empire Assat" folder as the primary asset library.

Find and reuse the original matching assets instead of generating approximate replacements.

Pay particular attention to:

- Hero background and underground mine illustrations
- Hero character artwork
- Pickaxe Empire logos and branding
- Gold coins, emblems, and currency artwork
- World map and mine-location illustrations
- Legendary mine cards and their backgrounds
- Miner character sprites and character animations
- Mine tunnels, wooden beams, rocks, and cave textures
- Forge and upgrade panel artwork
- Daily reward, friends, referral, and task icons
- Footer background and decorative artwork
- Fonts, SVG icons, PNG images, WebP images, and WebM videos

Inspect transparent PNGs carefully. Preserve their alpha channels and aspect ratios.

Do not stretch images, introduce unwanted backgrounds, or replace transparent assets with opaque versions.

Use the correct `object-fit`, `object-position`, image sizing, and background positioning.

If a matching asset already exists locally, do not recreate it using CSS or AI-generated artwork.

Avoid unnecessary duplication of large assets.

## 4. Recreate Every Section in the Full-Page Screenshot

Implement the entire page, from the navigation bar to the footer.

### Section A — Header and Hero

Recreate the compact navigation/header, logo, navigation links, and top action button.

Reproduce the large hero composition featuring:

- Dark underground mine background
- Large "PICKAXE EMPIRE" headline
- Small uppercase introductory text
- Descriptive paragraph
- Primary "PLAY FREE" call-to-action
- Secondary website or branding element
- Large character artwork positioned on the right
- Warm orange lighting, shadows, and atmospheric effects
- The small statistics row beneath the hero

Use separate layers for background, artwork, and text whenever appropriate.

Ensure the character does not obscure the headline or buttons.

### Section B — How the Empire Works

Recreate the section heading and the four-step explanatory layout.

Match the original icons, number styling, card proportions, text alignment, and decorative background.

### Section C — Ten Legendary Mines

Recreate the heading, world map, mine-location markers, and mine cards.

Match the image proportions, card backgrounds, labels, spacing, and pagination or navigation controls if present.

Use the supplied mine artwork wherever available.

### Section D — A Crew That Never Sleeps

Recreate the illustrated mine tunnel with miner characters and surrounding mining props.

Reproduce the character row, information panels, labels, and background composition.

If miner spritesheets or animations are available, inspect their frame dimensions and implement the appropriate animation technique.

### Section E — Forge Your Level

Recreate the level progression and upgrade section.

Match the left-side information and progression content, right-side interface panel, controls, progress bars, numbers, and gold accents.

Keep the layout faithful to the reference instead of inventing a different dashboard.

### Section F — Loot Every Day

Recreate the daily reward, friends, tasks, referral, and other reward cards visible in the reference.

Match their individual dimensions, icon placement, typography, borders, and orange action buttons.

### Section G — PXE, The Coin of the Empire

Recreate the coin showcase with the large central gold coin or emblem, atmospheric background, surrounding informational panels, and transaction or token information table.

Preserve the original visual hierarchy and gold metallic appearance.

Do not invent token prices, balances, financial statistics, or real-time data. Use actual reference content when available, or clearly identified static placeholders when the original information cannot be recovered.

### Section H — Fair Play, By Law

Recreate the rules and fairness section, including its heading, icon-based information blocks, descriptions, and layout.

Match the original section's spacing and typography.

### Section I — Before You Dig In

Recreate the FAQ section.

Implement expandable and collapsible FAQ items if that behavior exists on the reference website.

Match the original question list, separators, icons, and accordion styling.

### Section J — Your Empire Awaits

Recreate the final call-to-action section with its illustrated cave background, central emblem, large headline, and primary button.

### Section K — Footer

Recreate the complete footer, including the logo, navigation columns, links, small print, copyright information, and decorative background.

Do not omit any section visible in the full-page screenshot.

## 5. Technology and Implementation

First inspect the current project's stack and preserve it if it is suitable.

If no project exists, use:

- React
- Vite
- TypeScript
- CSS Modules or organized component-level CSS
- Lucide icons only where matching original icons are unavailable

Use reusable React components for repeated elements such as cards, navigation items, miner characters, reward tiles, FAQ entries, and statistic blocks.

Keep the implementation modular and maintainable.

Suggested component structure:

- `Header`
- `HeroSection`
- `HowItWorksSection`
- `LegendaryMinesSection`
- `CrewSection`
- `ForgeSection`
- `DailyLootSection`
- `CoinSection`
- `FairPlaySection`
- `FaqSection`
- `FinalCtaSection`
- `Footer`

Separate data from presentation when practical.

Do not introduce unnecessary dependencies or replace the project's framework without a compelling reason.

## 6. Typography and Visual Styling

Inspect the supplied assets for original font files before choosing fallback fonts.

Match the reference's:

- Condensed display typography
- Large uppercase headlines
- Orange gradient headline accents
- Cream-colored body text
- Small uppercase labels with expanded letter spacing
- Fine gold separators and decorative lines
- Dark cinematic backgrounds
- Soft gradients and controlled shadows

Avoid generic modern SaaS styling, bright white backgrounds, excessive rounded cards, and oversized empty spaces.

Use CSS variables for the core color palette, spacing, and typography.

## 7. Responsive Design

The website must work at:

- Desktop: 1440px wide
- Laptop: 1280px wide
- Tablet: 768px wide
- Mobile: 390px wide
- Small mobile: 360px wide

Desktop should closely follow the supplied full-page reference.

On mobile:

- Reproduce the reference's actual responsive layout wherever observable.
- Keep headlines readable and prevent clipping.
- Scale and reposition the hero character correctly.
- Prevent horizontal overflow.
- Stack multi-column sections appropriately.
- Make buttons and interactive controls touch-friendly.
- Ensure maps, tables, cards, and character artwork remain usable.
- Preserve the dark visual identity and section backgrounds.

Do not simply shrink the desktop page proportionally.

## 8. Animations and Interactions

Inspect the reference website for actual behavior before implementing animations.

Where supported by the original:

- Add subtle hero lighting or particle effects.
- Reproduce button hover states.
- Add smooth scrolling where appropriate.
- Implement working navigation links.
- Implement mine-card navigation or selection.
- Implement FAQ accordion behavior.
- Implement relevant progress indicators and interface controls.
- Reuse existing sprite sheets for frame-based character animation.
- Use existing WebM files only where appropriate.

Avoid excessive animation, continuous heavy JavaScript loops, and unnecessary video playback.

Respect `prefers-reduced-motion`.

Ensure animations do not block the initial page render.

## 9. Functional Accuracy

All visible controls should have meaningful behavior.

Do not create fake functionality that appears to process real transactions.

For features that depend on Telegram, a backend, wallet connectivity, or live blockchain data:

- Inspect the original integration if accessible.
- Reproduce the frontend appearance.
- Implement only functionality supported by the existing project and available APIs.
- Clearly separate demo interactions from real services.
- Do not collect real wallet credentials or seed phrases.
- Do not invent successful deposits, withdrawals, rewards, or transactions.

If an integration requires credentials or a backend that is not available, implement a clearly isolated integration point rather than pretending the service works.

## 10. Visual Verification and Iteration

Do not stop after writing the initial code.

Run the application locally and use browser automation or screenshots to verify it.

Compare the local implementation against the supplied full-page screenshot and the reference website.

Check at least:

1. Desktop hero composition
2. Hero headline and character placement
3. Section order and overall page height
4. Background-image alignment
5. Legendary mine cards and map
6. Miner character positioning
7. Forge and reward panels
8. Coin showcase
9. FAQ and footer
10. Mobile layout and overflow

Take screenshots at comparable viewport dimensions.

Fix the most visually significant mismatches first. Then refine spacing, typography, image scale, gradients, and decorative details.

Repeat the screenshot comparison until the result is as close as reasonably possible.

Do not claim pixel-perfect accuracy without actually comparing screenshots.

## 11. Performance

Optimize the page without compromising visual fidelity.

- Reuse local assets.
- Prefer appropriately sized WebP or AVIF backgrounds when available and suitable.
- Preserve PNG transparency for character artwork.
- Lazy-load below-the-fold images when appropriate.
- Avoid loading all animations simultaneously.
- Avoid unnecessary React re-renders.
- Prevent layout shifts.
- Use responsive image sizing.
- Keep the initial hero render fast.

Do not convert animated assets into static images if the original animation is important.

## 12. Final Completion Checklist

Before finishing:

- Ensure every section from the reference is implemented.
- Ensure the correct local assets are used.
- Ensure all visible text is readable and correctly positioned.
- Ensure no missing-image icons or broken asset paths remain.
- Ensure no horizontal overflow exists.
- Ensure desktop and mobile layouts work.
- Ensure the project builds successfully.
- Resolve relevant console errors.
- Verify visible controls and animations.
- Confirm that the original project configuration remains intact.

Finally, provide a concise report containing:

1. What was implemented.
2. Which assets were reused.
3. Which interactions work.
4. Which features require backend or external credentials.
5. Any remaining visual differences or limitations.
6. The command to run the completed website locally.

**Execution instruction:** Start by inspecting the existing project and the complete "Pickaxe Empire Assat" folder. Then inspect the reference website, implement the full page, run it, compare screenshots, and refine the result. Do not stop at a plan or a mockup; complete the working implementation.