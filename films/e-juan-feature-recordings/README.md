# E-JUAN feature recordings

**Transparent-background versions: `out/fast/transparent/`.** These are the latest requested deliverables: fast VP9 WebM videos with a real alpha channel, cropped around the full device with a small transparent margin. The blue stage, external title and chapter captions are removed. Application UI colors and device bezels stay intact; the LGU stand is included. Matching PNG posters also preserve alpha. Standard MP4 cannot retain this transparency.

```
rtk proxy node films/e-juan-feature-recordings/transparent.cjs --prepare
rtk proxy node films/e-juan-feature-recordings/transparent.cjs citizen sms bhw lgu
rtk proxy node films/e-juan-feature-recordings/verify-transparent.cjs
```

Static alpha masks are derived from the original device DOM geometry, including rounded corners and the LGU stand polygon. This avoids chroma-keying blue UI controls. Validation decodes alpha explicitly and checks it again in Chrome over a checkerboard.

**Latest versions: `out/fast/`.** The user removed the one-minute minimum and asked for faster demo pacing. These edits cut the fixed holds, mildly accelerate typing/navigation, and retain all main feature flows and the full mockups. Native SMS combines its duplicate routine scroll into one clinic/reference scene. No footage is fabricated or replaced by slides.

Reproduce the fast revisions from the repository root:

```
rtk proxy node films/e-juan-feature-recordings/fast-edit.cjs citizen sms bhw lgu
rtk proxy node films/e-juan-feature-recordings/verify-fast.cjs
```

`fast-edit.json` contains source in/out points, speed and chapter coverage. Updated MP4s, posters and retimed SRT captions are in `out/fast/`; edit decisions, scene contact sheets and validation are under `out/fast/qa/`.

Four separate, silent 72-second recordings of the current prototype. Citizen App and Native SMS keep the phone mockup; BHW keeps the landscape tablet; LGU keeps the monitor and stand. The supplied blue branding stage remains visible throughout. Short on-screen feature captions are included, with matching SRT sidecars.

Deliverables are in `out/`: `01-E-JUAN-Citizen-App.mp4`, `02-E-JUAN-Native-SMS.mp4`, `03-E-JUAN-BHW-Tablet.mp4`, and `04-E-JUAN-LGU-Command-Center.mp4`. Posters use the same stems with `.png`. Technical evidence and contact sheets are in `out/qa/`.

Phone videos: 1080 × 1920. Staff videos: 2560 × 1440. MP4s are H.264, yuv420p, BT.709 and 60 fps. Playwright's original browser recordings are 25 fps; export repeats those source frames instead of synthesizing UI motion. No audio was requested or added.

The recordings operate real current controls in isolated browser contexts. Resident details and stock operations are fictional. SMS, LGU roles and BHW sync receipts are explicitly demo behavior. No messages, phone calls, emergency requests or municipal submissions occur. The BHW demo does not access the user's saved vault. Capture-only CSS centers/enlarges the existing device; it does not modify the application files.

Reproduce from the repository root while its HTTP server runs at `http://127.0.0.1:4173/`:

```
rtk proxy node films/e-juan-feature-recordings/record.cjs citizen sms bhw lgu --dry
rtk proxy node films/e-juan-feature-recordings/record.cjs citizen sms bhw lgu
rtk proxy node films/e-juan-feature-recordings/export.cjs
rtk proxy node films/e-juan-feature-recordings/tag-color.cjs
rtk proxy node films/e-juan-feature-recordings/verify.cjs
```

`timeline.json` defines the chapter grid, captions and output names. `stage.css` controls capture framing. Raw WebM footage and capture event logs remain in `source/`. The export removes setup footage and keeps 72 recorded seconds. Verification checks full decoding, frame count, dimensions, codec/color tags, duration, browser playback and source-file hashes. Review contact sheets alongside the capture previews to assess mockup framing and feature coverage.

All four final outputs passed verification. See `out/qa/verification.json` for measured specifications and `out/qa/REVIEW.md` for the two visual-review passes. Phone titles and captions receive a supplied-blue backing plate during export to keep them readable over the yellow arc. No application code was changed while making these recordings.
