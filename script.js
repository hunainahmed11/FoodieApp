const recommendationForm = document.querySelector("#recommendation-form");
const recommendationList = document.querySelector("#recommendation-list");
const openRecommendationButton = document.querySelector("#open-recommendation");
const closeFormButton = document.querySelector(".close-form");
const recommendationMessage = document.querySelector("#recommendation-message");
const successToast = document.querySelector("#success-toast");
let toastTimeout;

function showPopup(isVisible) {
  successToast.hidden = !isVisible;
  if (!isVisible) {
    return;
  }

  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    successToast.hidden = true;
  }, 3500);
}

function closeRecommendationForm() {
  recommendationForm.hidden = true;
  openRecommendationButton.focus();
}

openRecommendationButton.addEventListener("click", () => {
  recommendationForm.hidden = false;
  recommendationMessage.focus();
});

closeFormButton.addEventListener("click", closeRecommendationForm);

function addRecommendation() {
  const message = recommendationMessage.value.trim();

  if (!message) {
    recommendationMessage.focus();
    return;
  }

  const name = recommendationForm.elements.name.value.trim() || "A collaborator";
  const card = document.createElement("blockquote");
  card.className = "recommendation";

  const quoteMark = document.createElement("span");
  quoteMark.className = "quote-mark";
  quoteMark.setAttribute("aria-hidden", "true");
  quoteMark.textContent = "“";

  const quote = document.createElement("p");
  quote.textContent = message;

  const footer = document.createElement("footer");
  const avatar = document.createElement("span");
  avatar.className = "avatar avatar-green";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

  const attribution = document.createElement("span");
  const author = document.createElement("strong");
  author.textContent = name;
  const role = document.createElement("small");
  role.textContent = "Collaborator";
  attribution.append(author, role);
  footer.append(avatar, attribution);
  card.append(quoteMark, quote, footer);
  recommendationList.append(card);

  recommendationForm.reset();
  closeRecommendationForm();
  showPopup(true);
}

recommendationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addRecommendation();
});