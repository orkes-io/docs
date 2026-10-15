/* Keep the incoming paid attribution when a docs reader requests a demo.
   Do not create internal UTMs, read cookies, or forward arbitrary query data. */
(function () {
  const allowed = new Set([
    "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id",
    "gclid", "gbraid", "wbraid", "msclkid", "li_fat_id", "twclid",
    "hsa_acc", "hsa_cam", "hsa_grp", "hsa_ad", "hsa_src", "hsa_tgt",
    "hsa_kw", "hsa_mt", "hsa_net", "hsa_ver",
  ]);
  function updateLinks() {
    const source = new URLSearchParams(window.location.search);
    document.querySelectorAll("a[data-orkes-demo]").forEach((link) => {
      const target = new URL("https://orkes.io/demo");
      source.forEach((value, key) => {
        if (allowed.has(key)) target.searchParams.set(key, value);
      });
      link.href = target.href;
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateLinks, { once: true });
  } else {
    updateLinks();
  }
})();
