document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("searchBtn");   // <-- exact ID
  const input = document.getElementById("search");
  const result = document.getElementById("result");

  function sanitize(str) {
    return str.replace(/[<>&"'`]/g, m => ({
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      '"': "&quot;",
      "'": "&#39;",
      "`": "&#96;"
    }[m]));
  }

  async function runSearch() {
    const raw = input.value.trim();
    const safe = sanitize(raw);
    const url = raw
      ? `superheroes.php?query=${encodeURIComponent(safe)}`
      : `superheroes.php`;

    result.innerHTML = "<em>Searching…</em>";

    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
     result.innerHTML = html || "<p style='color:pink;'>Superhero not found</p>";
    } catch (e) {
      console.error(e);
      result.innerHTML = "<p>There was a problem fetching results.</p>";
    }
  }

  btn.addEventListener("click", runSearch);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") runSearch();
  });
});
