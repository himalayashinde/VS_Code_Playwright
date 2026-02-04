import type { Locator } from "@playwright/test";

export async function highlightLocator(locator: Locator) {
  await locator.evaluate((el) => {
    const node = el as HTMLElement;
    node.classList.add("pw-highlight");
    const style = document.getElementById("pw-highlight-style");
    if (!style) {
      const s = document.createElement("style");
      s.id = "pw-highlight-style";
      s.textContent = `
        .pw-highlight {
          outline: 2px solid red !important;
          outline-offset: 2px !important;
        }
      `;
      document.head.appendChild(s);
    }
  });
}
