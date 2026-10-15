# Fast transparent demo review

All four files passed `verify-transparent.cjs`. VP9 WebM alpha was confirmed by explicit libvpx decoding and again by drawing the video into a Chrome canvas. Outside pixels have alpha zero; device interiors remain opaque. Full-duration decoding returned the planned frame counts, and all four files played without media errors. Checkerboard screenshots demonstrate the transparent backgrounds, including the LGU monitor stand.

Durations: Citizen App 29.634 s; Native SMS 24.517 s; BHW Tablet 26.367 s; LGU Command Center 27.700 s. Original nine-chapter feature coverage is retained except the duplicate native-SMS routine scroll, which is combined into its clinic/reference chapter. Long idle holds are removed; actions run at 1.0–1.5x, with readable result holds. Device position is continuous across cuts.

The blue stage and external titles/captions are excluded by the device matte and crop. Rounded frame edges and the monitor stand follow measured DOM geometry. Matching posters contain alpha as well; viewers that ignore PNG/WebM alpha may show hidden RGB backing. The Chrome checkerboard previews and alpha tests are authoritative evidence of transparency.

Silent prototype walkthroughs; no live clinic, SMS, municipal or physical-device integration is claimed. The 72-second originals and fast MP4 alternatives remain available separately.
