import { useEffect } from "react";

// Ganti SITE_URL begitu domain final sudah ada. Dipakai untuk og:url,
// canonical link, dan referensi absolut og:image.
const SITE_NAME = "Brownpage";
const SITE_URL = "https://brownpage.example";
const DEFAULT_DESCRIPTION =
  "Alat bantu gratis untuk barista dan penikmat kopi rumahan: kamus istilah kopi, kalkulator rasio & jadwal tuang, etalase tools, dan jurnal seduh.";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

function setMetaTag(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonicalLink(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Update document.title + meta description/OG/Twitter card untuk halaman aktif.
 *
 * Catatan: karena Brownpage adalah SPA (client-side render), perubahan ini
 * membantu tab judul browser dan crawler yang menjalankan JS (Googlebot
 * termasuk). Untuk preview link yang sempurna di WhatsApp/Twitter/Facebook
 * (yang tidak menjalankan JS), idealnya butuh prerendering atau SSR di
 * kemudian hari, tapi ini sudah jadi fondasi metadata yang benar.
 */
export default function usePageMeta({ title, description = DEFAULT_DESCRIPTION, path = "/", image }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Panduan Seduh Manual`;
    const url = `${SITE_URL}${path}`;
    const ogImage = image || DEFAULT_IMAGE;

    document.title = fullTitle;

    setMetaTag("name", "description", description);
    setMetaTag("property", "og:site_name", SITE_NAME);
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", url);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", ogImage);

    setCanonicalLink(url);
  }, [title, description, path, image]);
}
