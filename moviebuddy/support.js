(() => {
  const input = document.querySelector("#support-query");
  const status = document.querySelector("#support-search-status");
  const topics = [...document.querySelectorAll("[data-support-topic]")];
  const groups = [...document.querySelectorAll("[data-support-group]")];
  if (!input || !status) return;

  input.addEventListener("input", () => {
    const query = input.value.trim().toLocaleLowerCase("de");
    let matches = 0;
    topics.forEach((topic) => {
      const visible = !query || topic.textContent.toLocaleLowerCase("de").includes(query);
      topic.hidden = !visible;
      if (visible) matches += 1;
    });
    groups.forEach((group) => {
      group.hidden = ![...group.querySelectorAll("[data-support-topic]")].some((topic) => !topic.hidden);
    });
    const english = document.documentElement.lang === "en";
    status.textContent = query ? english ? `${matches} help ${matches === 1 ? "topic" : "topics"} found` : `${matches} ${matches === 1 ? "Hilfethema" : "Hilfethemen"} gefunden` : "";
  });
})();
