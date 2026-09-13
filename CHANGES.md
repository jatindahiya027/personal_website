# Current portfolio implementation

- Restored original image colors and retained neutral white, gray, and black backgrounds, with blue actions and warm label accents.
- Kept project names and descriptions above centered artboards, reduced board dimensions to fit the viewport, and preserved every gallery image and control.
- Image masks now follow scrolling and finish when the board reaches the middle of the viewport. Project edge masks reduce adjacent content during transitions.
- Added a continuous layered-card slideshow using every project image, with six-second advance intervals, slow circular transitions, and blurred neighboring cards.
- Added a restrained grayscale landing shader capped at 480px/20fps, or 320px/15fps on constrained hardware.
- Expanded text animation across section headings, descriptions, biography, experience, capabilities, writing titles, and contact copy, with slow word reveals and masked entrances.
- Preserved the readable greeting, compact rounded header, résumé download, page transitions, native dialogs, reduced motion, and pause controls.
- Kept data-driven project routes, article filters, optional project/GitHub links, and static export.
