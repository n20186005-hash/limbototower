# Menara Keagungan Limboto Guide — Complete Website Archive

This archive contains a portable copy of the bilingual website, its complete source files, all supplied image assets, and a locally built production output.

## Folders

| Folder | Contents |
| --- | --- |
| `website/` | Editable React/Vite source code, configuration, content research, design notes, and local copies of every image actually used by the page. |
| `website/client/public/assets/` | The four images referenced by the website: location photograph, brand mark, illustrated tower texture, and coordinate seal. The source has been rewritten to use these local paths. |
| `assets-original/` | All seven original static image files supplied during site creation, including source/original variants and the unused wayfinding texture. |
| `production-build/` | A freshly built production copy created from `website/`. It contains the locally copied, deployable image assets and has no `/manus-storage/` image references. |

## Run or rebuild locally

Install Node.js 22+ and pnpm, then run the following from `website/`:

```bash
pnpm install
pnpm dev
```

To create a fresh production build, run:

```bash
pnpm build
```

## Asset attribution

The location photograph `menara-keagungan-limboto-cc-by-sa.jpg` is credited in the website and was obtained as **Muh. Irfan Fikry, CC BY-SA 4.0 via Wikimedia Commons**. Retain this attribution and comply with the licence when redistributing or adapting the photograph.

The remaining PNG illustrations are custom visual assets generated for this website. The research notes and content sources are retained in `website/research_notes.md`.
