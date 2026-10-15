# Four feature recordings

Latest revision: the user removed the one-minute minimum and requested brisk demos covering the main features. `fast-edit.json` cuts idle holds and runs actions at 1.0–1.5x. Updated deliverables go in `out/fast/`; the original 72-second recordings remain available. The same complete device mockups and actual feature flows are retained.

Subsequent user preference: transparent background. The latest delivery is `out/fast/transparent/`: cropped device-only VP9 WebM with real alpha, without the blue stage or external captions. Masking follows the existing device geometry rather than keying out blue, so the original UI is preserved. These files supersede the background stage choice for this revision.

Record the current working E-JUAN prototype, showing main features in their existing device mockups for at least one minute each. Deliver four separate MP4 files with captions and editable capture scripts.

Specs: Citizen App and Native SMS 1080x1920; BHW Tablet and LGU Command Center 2560x1440. Each export is 72 seconds, H.264/yuv420p BT.709, 60 fps container. Browser recording is natively 25 fps; the export repeats source frames rather than inventing interpolated UI. Silent recordings: narration and music were not requested.

User scope takes precedence over the cinematic-film defaults: this is authentic screen recording, not a new promotional animation. Use Playwright to operate real controls and FFmpeg to encode. Keep the supplied blue stage, flag colors, original logo, Juan artwork, native UI text, stock icons and device shells. Those existing product surfaces are brand-supplied exceptions to cinetic's invented-style bans. No invented logo, new UI, marketing claims, elaborate transitions, artificial data transport or soundtrack. No application source changes.

Isolated fresh browser contexts and fictional details only. The BHW practice store is separate from the user's saved vault. LGU roles, SMS replies, sync receipts and inventories remain clearly identified as demos. Never call a telephone number or send an actual message. A visible tap marker explains interactions. The same complete device stays visible throughout each recording.
