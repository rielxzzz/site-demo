const form = document.getElementById("paymentForm");
const cardNumber = document.getElementById("cardNumber");
const expiry = document.getElementById("expiry");
const cvv = document.getElementById("cvv");
const result = document.getElementById("result");

// Apenas cartões fictícios de demonstração.
// Não existe consulta a cartões reais e nenhum dado é enviado.
const TEST_CARDS = {
  "4242424242424242": "approved",
  "4000000000000002": "declined"
};

cardNumber.addEventListener("input", () => {
  let value = cardNumber.value.replace(/\D/g, "").slice(0, 16);
  cardNumber.value = value.replace(/(.{4})/g, "$1 ").trim();
});

expiry.addEventListener("input", () => {
  let value = expiry.value.replace(/\D/g, "").slice(0, 4);
  if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
  expiry.value = value;
});

cvv.addEventListener("input", () => {
  cvv.value = cvv.value.replace(/\D/g, "").slice(0, 4);
});

function showResult(type, message) {
  result.className = `result ${type}`;
  result.textContent = message;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const number = cardNumber.value.replace(/\D/g, "");
  const validTestCard = TEST_CARDS[number];

  if (number.length !== 16 || !validTestCard) {
    showResult(
      "error",
      "Use um cartão de teste da demonstração. Nenhum cartão real é consultado."
    );
    return;
  }

  if (!/^\d{2}\/\d{2}$/.test(expiry.value) || cvv.value.length < 3) {
    showResult("error", "Preencha validade e CVV usando dados fictícios.");
    return;
  }

  if (validTestCard === "approved") {
    showResult("success", "✓ Cartão de TESTE aprovado para a demonstração.");
  } else {
    showResult("error", "✕ Cartão de TESTE recusado para a demonstração.");
  }
});
