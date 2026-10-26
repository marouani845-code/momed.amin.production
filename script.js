
const grid = document.getElementById("productGrid");

document.getElementById("year").textContent =
  new Date().getFullYear();

function safeText(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[c]);
}

function renderProductions() {
  grid.innerHTML = window.PRODUCTIONS.map(product => {
    const checkoutReady =
      /^https:\/\//.test(product.checkoutUrl) &&
      !product.checkoutUrl.includes("_HERE");

    return `
      <article class="card">
        <div class="cover ${safeText(product.cover)}">♫</div>
        <div class="card-content">
          <small>${safeText(product.genre)}</small>
          <h3>${safeText(product.title)}</h3>
          <p>${safeText(product.details)}</p>
          <audio controls preload="none">
            <source src="${safeText(product.preview)}" type="audio/mpeg">
            Your browser does not support audio.
          </audio>
          <div class="buy-row">
            <span class="price">${safeText(product.price)}</span>
            ${
              checkoutReady
                ? `<a class="button" href="${safeText(product.checkoutUrl)}"
                     target="_blank" rel="noopener noreferrer">Buy ↗</a>`
                : `<button class="button" disabled
                     title="Checkout link has not been configured">
                     Add checkout link
                   </button>`
            }
          </div>
        </div>
      </article>
    `;
  }).join("");
}

renderProductions();
