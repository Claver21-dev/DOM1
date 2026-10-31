document.addEventListener("DOMContentLoaded", () => {
  const totalElement = document.querySelector(".total");
  const productsContainer = document.querySelector(".list-products");
  const searchForm = document.querySelector(".search-form");

  // Le formulaire de recherche est décoratif : on évite le rechargement de la page
  if (searchForm) {
    searchForm.addEventListener("submit", (event) => event.preventDefault());
  }

  // Récupérer le prix d'un produit (data-price="100")
  function getUnitPrice(card) {
    return Number(card.dataset.price);
  }

  // Calculer et afficher le prix total
  function updateTotal() {
    let total = 0;

    document.querySelectorAll(".list-products .card").forEach((card) => {
      const quantity = Number(card.querySelector(".quantity").textContent);
      total += quantity * getUnitPrice(card);
    });

    totalElement.textContent = `${total.toFixed(2)} $`;
  }

  // Gérer les clics (délégation d'événements)
  productsContainer.addEventListener("click", (event) => {
    // Le clic peut tomber sur l'icône <i> ou sur le <button> : on remonte au bouton
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const card = button.closest(".card");
    if (!card) return;

    const quantityElement = card.querySelector(".quantity");
    let quantity = Number(quantityElement.textContent);

    switch (button.dataset.action) {
      case "increase":
        quantity++;
        quantityElement.textContent = quantity;
        updateTotal();
        break;

      case "decrease":
        if (quantity > 0) {
          quantity--;
          quantityElement.textContent = quantity;
          updateTotal();
        }
        break;

      case "delete":
        card.closest(".product").remove();
        updateTotal();
        break;

      case "like": {
        const isLiked = button.classList.toggle("liked");
        button.setAttribute("aria-pressed", String(isLiked));
        break;
      }
    }
  });

  updateTotal();
});
