# How to Add Diary Entries

Diary entries are stored in `/diary/entries.json`. To add a new entry, open that file and add a new JSON object to the array.

## Entry Format

```json
{
  "slug": "my-new-entry",
  "title": "My New Entry",
  "date": "2026-03-15",
  "tag": "life",
  "emoji": "🌟",
  "content": "Short preview shown on the card (keep to 1-2 sentences)...",
  "detail": "Full content shown on the detail page.\n\nUse \\n to separate paragraphs. This can be as long as you want.",
  "images": ["/src/assets/diary/photo1.jpg", "/src/assets/diary/photo2.jpg"]
}
```

## Fields

| Field     | Required | Description |
|-----------|----------|-------------|
| `slug`    | Yes      | URL-friendly identifier (lowercase, hyphens). Used in the detail page URL: `/diary/entry.html?slug=my-new-entry` |
| `title`   | Yes      | Entry title displayed on the card & detail page |
| `date`    | Yes      | Date in `YYYY-MM-DD` format. Entries are sorted newest-first |
| `tag`     | Yes      | Category tag. Options: `hobby`, `travel`, `food`, `life`, `tech` — or add any custom tag (it auto-creates a filter button) |
| `emoji`   | Yes      | Emoji displayed on the card header |
| `content` | Yes      | Short preview text shown on the diary grid card (truncated to 3 lines) |
| `detail`  | No       | Full-length content for the detail page. Use `\n` for paragraph breaks. If omitted, `content` is shown instead |
| `images`  | No       | Array of image paths for the detail page gallery. Leave as `[]` if no images |

## Adding Images

1. Place image files in `/src/assets/diary/` (or any subdirectory under `/src/assets/`)
2. Reference them in the `images` array with absolute paths from root, e.g., `"/src/assets/diary/hiking-cascades.jpg"`
3. Images appear as a responsive gallery grid on the detail page

## Example Entry

```json
{
  "slug": "spring-hike-rainier",
  "title": "Spring Hike at Rainier",
  "date": "2026-04-20",
  "tag": "travel",
  "emoji": "🏔️",
  "content": "Finally made it to Rainier this spring. The wildflowers were just starting to bloom & the views were unreal.",
  "detail": "Finally made it to Mount Rainier this spring. We took the Paradise trail & hiked up to about 6,500 feet.\n\nThe wildflowers were just starting to bloom — lupines, paintbrush, & avalanche lilies everywhere. The mountain was out in full glory with barely a cloud in the sky.\n\nWe packed lunch & sat at a viewpoint for about an hour just taking it all in. Already planning the next trip for summer when the higher trails open up.",
  "images": [
    "/src/assets/diary/rainier-trail.jpg",
    "/src/assets/diary/rainier-wildflowers.jpg",
    "/src/assets/diary/rainier-summit-view.jpg"
  ]
}
```

## Tips

- Entries appear automatically — no build step needed, just save the JSON file & refresh
- Tags auto-generate filter buttons on the diary page
- The `content` field should be a concise teaser (1-2 sentences) since it's truncated to 3 lines on the card
- Put the full story in `detail` — it supports multiple paragraphs via `\n`
- Slugs must be unique across all entries
