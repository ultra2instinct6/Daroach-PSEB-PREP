# BOLO.ABIM activation

The ABIM page is an internal-medicine-only tool. It does not switch to the
legacy PSEB demo, even when opened without `?mode=abim`.

## Gumroad setup

- Product permalink: `bolo-abim`.
- Checkout: <https://deepakroar2.gumroad.com/l/bolo-abim>.
- Enable Gumroad license-key generation for the product.
- Use the purchase receipt key in the activation form. A redirect containing
  `?license_key=...` is also supported **if the checkout integration actually
  supplies that parameter**; this implementation does not assume Gumroad
  automatically adds it to an arbitrary redirect.
- Verification posts an URL-encoded body to
  `https://api.gumroad.com/v2/licenses/verify`, with `product_permalink`,
  `license_key`, and `increment_uses_count=true`. An activation attempt
  increases Gumroad's license use count; a cached revisit does not.
- Invalid, refunded, chargebacked, or disputed purchases remain locked.
- API/network failures are shown in the form. No real purchase or real
  license is sent by the automated tests.

The device-wide storage key is `bolo_abim_license_key`. The memory-card raw
storage helpers intentionally avoid learner-slot routing for this key:
one activation covers this browser's learner profiles. Study answers and
SRS data remain in their existing per-slot stores.
If activation cannot be saved (including a failed-write result from the
shared memory-card helper), the app warns explicitly and unlocks only for
the current visit.

License query parameters are removed before analytics and checkout scripts
execute, including on failed verification. An invalid redirect takes
precedence over a cached activation for that visit. Uppercase presentation
does not silently change the entered key's value.
The service worker does not cache ABIM URLs containing receipt or admin
parameters. Opening a receipt URL requires a network connection; ordinary
ABIM and PSEB pages keep their existing offline caching.

## Medical & AI disclaimer

After license activation, users must accept the Medical & AI Disclaimer
before the study engine starts. Only the exact stored value `"true"` for
`bolo_abim_disclaimer_accepted` skips the modal on later visits.
Acceptance is device-wide, separate from learner-slot study progress.
The license paywall takes priority for unlicensed visitors.

The modal cannot be dismissed by outside clicks or Escape. The study
wrapper remains inert/hidden, background shortcuts are blocked, and focus
stays on the acceptance control. If acceptance cannot be saved, an inline
error keeps the gate closed and allows retry after enabling local storage.

## Important security limits

**This is a client-side activation screen, not a secure paywall.**

The repository, HTML, JavaScript, and question-bank assets are public.
Visitors can download the bank, modify the client, or write the cached
activation key themselves. Per the requested cached-key behavior, any
nonempty cached value unlocks subsequent visits without contacting Gumroad;
refunds or revocations therefore cannot be enforced on those visits.
The service worker can also retain previously downloaded material.

No master password is embedded or accepted as a URL bypass. Publishing a
master password in client code or Git history would make it public, not
administrator authentication. URL `admin` parameters are removed and the
activation screen explains that this bypass is unsupported.

For enforced paid access, add a trusted backend/edge service that:

1. Verifies purchases with Gumroad and checks refund/dispute status.
2. Authenticates administrators server-side, with secrets in environment
   storage, not the repository.
3. Issues short-lived authenticated sessions using secure HttpOnly cookies.
4. Serves the question bank and paid content only after authorization.
5. Processes revocations/webhooks and prevents public/offline caching of
   protected responses.

GitHub Pages alone cannot perform those operations. Gumroad verification
also needs to allow browser CORS requests from the deployed origin; a
network/CORS error leaves the client locked. If the provider blocks browser
verification, deploy a same-origin verification service rather than a public
proxy or a fabricated successful response.

## Files and validation

- [Page and app integration](./abim.html).
- [Activation controller](./assets/abim-license.js).
- [Activation styles](./assets/abim-license.css).
- [Unit tests](./Scripts/test_abim_license.js).

Run:

```sh
node --test Scripts/test_abim_license.js
node --test Scripts/test_abim_service_worker.js
node Scripts/audit_abim.js
node Scripts/audit_decks.js
```

The gate starts locked, makes the study wrapper inert/hidden, blocks
background keyboard interactions, and starts the engine only after access
is granted. This does not erase study progress or recreate learner profiles.

Integration checks confirmed that the public Gumroad product opens in the
checkout overlay, the overlay closes without unlocking study content, and
Gumroad rejects an invalid key with a visible inline error. Successful
activation tests use synthetic API responses, not a real paid license.
Isolated browser checks also cover Tutor feedback, Labs, Classic theme,
flashcard grading/persistence, a 60-item Mock block with deferred feedback,
the question grid/flags/strikethrough, submission/debrief, missed-card
10-minute scheduling, timer-expiry submission, and device-wide activation
with separate learner-slot progress. Public PSEB checks cover home/search,
MCQ answer persistence, flashcard grading, and lecture navigation.
Before selling access, confirm license-key generation in the seller dashboard
and complete a seller-controlled purchase/receipt activation test.
