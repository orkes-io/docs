var script = document.createElement('script');
script.src = "https://app.termly.io/embed.min.js";

script.setAttribute("data-auto-block", "on");
script.setAttribute("data-website-uuid", "366ddc52-323f-4589-afeb-39d61e0cc6e9");

document.head.appendChild(script);

var canonicalLink = document.createElement('link');
canonicalLink.setAttribute("rel","canonical");
canonicalLink.setAttribute("href", `https://orkes.io${window.location.pathname}${window.location.search}`);

document.head.appendChild(canonicalLink);
