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

- Keep the portfolio on the index route, with section anchors for its work, studio, services, and contact sections, so the visual story stays continuous.
- Define studio typography, colors, layout styles, and control variants centrally in the design system so the portfolio stays consistent.
- Booking requests use a shared client/server validation schema and a public server function with an insert-only publishable client; no visitor can read or change private requests.
- Booking receipts mean requested, not confirmed, and must not imply that a date is reserved, a payment collected, or an email sent.
- Keep package definitions in one client-safe catalog shared by the package display and booking flow so labels stay consistent.
- Keep package recommendations in the shared catalog and open the existing booking flow with the recommended identifier so no parallel enquiry path or pricing source is introduced.
- Apply one-time viewport entrances through the studio motion hook with centrally defined CSS and reduced-motion opt-out so content remains visible without JavaScript.
- Label the bundled image montage as a mood reel, not a client film, because it is concept imagery.

- Derive booking package validation from the shared catalog; preserve historical database package identifiers when extending choices so existing requests remain valid.
- Serve supplied quotations and extracted logo through asset pointers, with a small local favicon derived from the same logo, to keep binary branding consistent.
- Serve uploaded portfolio photos through asset pointers and preserve their landscape proportions in the gallery so event compositions remain visible.
- Keep curated photo collections in a client-safe portfolio catalog, describing only visible subjects rather than inventing client identities or event facts.
- Use the shared booking validation and submission flow for inline shoot enquiries so privacy and receipt meaning remain consistent with package requests.
- Serve supplied films through asset pointers with WebM and fast-start MP4 sources so playback works across browsers without bundling large media.
- Prepare brand marks by isolating the solid emblem with an image edit and lifting thin script lettering from the original separately with a saturation key, then compositing; hand-keying a whole lockup erases fine strokes and leaves glow residue.
