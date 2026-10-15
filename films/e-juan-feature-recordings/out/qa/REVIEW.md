# Review evidence

## Pass 1: capture framing and UI truth

Reviewed full-resolution preview frames for all four device types before recording. The first dry run exposed an ancestor-scroll issue: tapping nested app controls shifted the outer scaled mockup. Capture-stage ancestors now use `overflow: clip`; the actual app's scroll areas remain available. A complete nine-chapter dry run passed for all four clients, with full-device bounds asserted after each chapter and no page errors.

Director lens: use one continuous real-device walkthrough, no slide inserts or decorative transitions. Each chapter performs a recognizable main task and holds its result. Allow an additional pause at the thumb-docked citizen composer before typing. End on a working screen rather than a blank outro.

Art/UI lens: retain supplied identity and actual UI; mockup edges and the LGU stand remain visible. Caption and title sit outside the device, with the supplied blue stage behind them. The phone UI is enlarged for portrait viewing; staff UI retains its native responsive layout in a larger landscape recording. Clinical/stock/gateway/role/sync demo boundaries remain visible. No actual messages or calls are triggered.

## Pass 2: encoded outputs

Reviewed the four encoded nine-frame contact sheets and full-resolution capture previews. The phones' titles and feature captions initially crossed a yellow stage arc; the final phone exports use a solid supplied-blue plate so every added label stays readable. All four mockups remain complete and captions stay outside them. The two phone exports retain the handset; BHW retains its landscape tablet bezel; LGU retains the monitor chin and stand. No open blocking visual issues were found in the sampled frames.

`verification.json` passed for every final MP4: exactly 72 seconds, 4,320 decoded frames, H.264/yuv420p, 60 fps output and complete BT.709 color tags. Color metadata was corrected in the H.264 bitstream without re-encoding the pictures. Each file played in Chrome with its media time advancing and no media error. Playback was sampled at the start; full-duration frame decoding was checked separately. All recorded application-file hashes still match the current source.

Final sizes: Citizen 9.18 MB; Native SMS 5.66 MB; BHW 11.88 MB; LGU 12.19 MB. Silent recordings intentionally have no audio track. Native source footage is 25 fps and the 60 fps output repeats source frames. This is prototype walkthrough evidence, not verification of live clinical, telecom, municipal or physical-device integrations.
