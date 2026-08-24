// One-off: tell Bing/Yandex about every URL in sitemap.xml via IndexNow so
// they crawl without waiting for discovery. Not wired into the build —
// run manually (`npm run seo:submit`) after publishing new/changed pages.
import { readFile } from 'node:fs/promises'

const HOST = 'www.thelifemitra.com'
const KEY = '360064a942ce4dbfa55f26a2dc806289' // must match public/<key>.txt

const sitemap = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
})

console.log(`[indexnow] submitted ${urlList.length} urls — ${res.status} ${res.statusText}`)
