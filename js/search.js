const idx = lunr(function () {
  this.ref("id");
  this.field("title", { boost: 15 });
  this.field("tags");
  this.field("content", { boost: 10 });

  for (const key in window.store) {
    this.add({
      id: key,
      title: window.store[key].title,
      tags: window.store[key].category,
      content: window.store[key].content,
    });
  }
});

(() => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("query");
  if (!query) {
    return;
  }
  const results = idx.search(query);
  const searchResults = document.getElementById("results");

  if (results.length) {
    let resultList = "";
    for (const n in results) {
      const item = store[results[n].ref];
      resultList +=
        '<li><p><a href="' + item.url + '">' + item.title + "</a></p>";
      resultList += "<p>" + item.content.substring(0, 150) + "...</p></li>";
    }
    searchResults.innerHTML = resultList;
  } else {
    searchResults.innerHTML = "No se encontraron resultados.";
  }
})();
