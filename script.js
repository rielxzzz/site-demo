const form = document.getElementById("paymentForm");
const code = document.getElementById("code");
const expiry = document.getElementById("expiry");
const cvv = document.getElementById("cvv");
const result = document.getElementById("result");

const APPROVED_CODES = new Set(
  Array.from({ length: 100 }, (_, i) => `DEMO-${String(i + 1).padStart(4, "0")}`)
);

code.addEventListener("input", () => {
  code.value = code.value.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 9);
});

expiry.addEventListener("input", () => {
  let v = expiry.value.replace(/\D/g, "").slice(0, 4);
  if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
  expiry.value = v;
});

cvv.addEventListener("input", () => {
  cvv.value = cvv.value.replace(/\D/g, "").slice(0, 4);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = code.value.trim();

  if (!APPROVED_CODES.has(value)) {
    result.className = "result error";
    result.textContent = "✕ Código não autorizado para esta demonstração.";
    return;
  }

  if (!/^\d{2}\/\d{2}$/.test(expiry.value) || cvv.value.length < 3) {
    result.className = "result error";
    result.textContent = "Preencha os campos de teste de validade e CVV.";
    return;
  }

  result.className = "result success";
  result.textContent = "✓ Código de teste aprovado com sucesso.";
});
