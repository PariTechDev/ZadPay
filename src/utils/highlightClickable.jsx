export const highlightClickableElements = () => {
    const clickableElements = document.querySelectorAll("[data-clickable='true']");
    clickableElements.forEach((el) => {
      el.classList.add("highlight");
      setTimeout(() => el.classList.remove("highlight"), 1000);
    });
  };
  