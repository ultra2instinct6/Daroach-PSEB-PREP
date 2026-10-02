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

## Memory cards and purchased access

- The home screen, PSEB MCQs, PSEB flashcards, lecture decks and ABIM share
  the same four learner slots. ABIM answers, saved concepts and SRS are
  stored per slot, alongside that learner's PSEB study progress.
- License activation belongs to the device, not a learner slot. Switching,
  resetting or importing a slot does not remove the browser's activation.
  The disclaimer must be acknowledged on every new page visit, including
  reloads caused by switching learner slots.
- Slot/card backups include study progress, **not license keys or disclaimer
  acceptance**. On another browser/device, enter the purchased receipt key
  and accept the disclaimer before using imported ABIM progress.
- Older exports that included activation fields still restore learner
  progress; those device fields are omitted with a console warning and
  cannot overwrite the destination browser's activation.
- PSEB MCQ history, PSEB flashcard grading and ABIM SRS are mirrored into
  IndexedDB by the offline storage layer. The study engines wait for slot
  and backup restoration before reading progress. This helps when only
  localStorage is lost, but is not a guarantee against deleting all site
  data. Keep exported backups and your Gumroad receipt.

License query parameters are removed before analytics and checkout scripts
execute, including on failed verification. An invalid redirect takes
precedence over a cached activation for that visit. Uppercase presentation
does not silently change the entered key's value.
The service worker does not cache ABIM URLs containing receipt or admin
parameters. Opening a receipt URL requires a network connection; ordinary
ABIM and PSEB pages keep their existing offline caching.

## Medical & AI disclaimer

The Medical & AI Disclaimer is the first screen on **every ABIM page visit**,
before license entry, checkout or study. This applies to first-time visitors,
returning activated users and purchase/receipt redirects. Acknowledgement
lasts only for the current page visit: the old
`bolo_abim_disclaimer_accepted` value is no longer read or written and
cannot skip this notice. Existing stored data is not erased.

After acknowledgement, unlicensed visitors see the Gumroad activation and
purchase screen; cached license holders proceed to study. Receipt-key
verification is deferred until acknowledgement, but URL credentials are
still removed immediately. The disclaimer appears again on a new visit
after purchasing, not as a redundant second prompt within the same visit.

The modal cannot be dismissed by outside clicks or Escape. The study
wrapper remains inert/hidden, background shortcuts are blocked, and focus
stays within the dialog's theme and acceptance controls. No storage write
is required to acknowledge this per-visit notice.

Both the disclaimer and activation screens honor the learner's saved
Neon/Classic theme. Each includes a theme switch, which updates the same
`bolo.theme.v1` preference used by the study tool and the rest of the site.

## Study home and flashcard sections

After the access screens, Study Home presents two selectable panels:
**Test Bank** for Tutor/Timed Mock blocks and **Flashcard Review** for
the learner's saved core concepts. The practice launcher no longer opens
automatically, so returning learners can go directly to review.

Flashcard Review offers an all-system or individual-system selector,
**Review due cards**, and **Practice all saved cards**. Both grading paths
update the existing SRS schedule; practice-all includes not-yet-due cards.
Empty sections show disabled review actions and a route to the Test Bank.
No concepts are automatically enrolled by merely opening this section.

The header's Review shortcut still works from the Test Bank and submitted
question review. An unsubmitted block must be ended/submitted first, so
switching sections cannot discard a block or pause a Mock deadline.
Study Home, Test Bank, and review-exit actions preserve saved progress;
the submitted block's debrief remains available during the current visit.

## Important security limits

The study footer and activation screen include a trademark/non-affiliation
and educational-use notice. The study footer is in normal document flow
below the coffee link, not a floating overlay. This disclosure is not a
legal determination of fair use or a guarantee against trademark claims.

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
node --test Scripts/test_memory_card.js
node --test Scripts/test_abim_navigation.js
node Scripts/audit_abim.js
node Scripts/audit_mcq.js
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
