# TU Figma → frontend incremental contract

This site is a visual implementation of Figma 3wOR12HmvYis24oKXRExwg / HOME 22:293, not a redesign.

1. Read COLLABORATION.md and dist/module-map.js before changes. Fetch current design context for explicitly requested node IDs.
2. Limit changes to requested modules and their content. Do not regenerate the entire page or replace assets/copy with alternatives.
3. Each module root keeps its stable DOM id and data-node-id. Keep the Figma mapping updated if a node is replaced.
4. All local selectors must be scoped to the module class. Shared files (tokens.css, base.css, shared.js) have multiple consumers. Explain cross-module impacts before changing them outside a full calibration request.
5. dist/motion.js and dist/styles/motion.css are LOCKED during visual-only changes. Fullscreen selection and motion.maximumDim are also locked unless explicitly requested. Do not add parallax, smooth-scroll, snapping or animations.
6. Use exact exported Figma imagery/icons. Desktop comparison reference is 1920 × 1080; mobile fallback is not a designer-approved mobile baseline.
7. Before/after capture the affected module and check an untouched neighbor at the same viewport. Run calibration checks for desktop/mobile and motion. Report pending font/asset differences honestly.
8. Content replacement belongs in content.js; structural changes in the mapped component; visual changes in mapped scoped CSS. Avoid broad refactors for a single-node update.
9. Preserve the same registered Site and URL. No changes to access scope without a user request.
