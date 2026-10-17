<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep SLN's public content as editorial sections on the home route and use shared media assets in `src/assets`; this keeps the cinematic sequence cohesive and asset references centralized.
- Keep LED and non-LED inventory as subsections of the single Media section and Gallery as a separate home section; this preserves one coherent booking experience while separating visual examples.
- Render the primary brand image through the shared Wordmark component, use CDN pointer imports for brand imagery, and keep a real raster favicon in public; this centralizes all logo placements while making the favicon deployment-independent.
- Keep section-specific color contexts and scoped control selectors in the shared stylesheet; this prevents hero, contact-form, and floating-control styles from leaking into each other.
