const p = document.querySelector(".exchange-paragraph");
document
  .querySelector(".get-exchange")
  .addEventListener("click", getExchangeFromButton);
document.querySelector(".swap").addEventListener("click", () => {
  const from = document.getElementById("from-select").value;
  const to = document.getElementById("to-select").value;
  document.getElementById("from-select").value = to;
  document.getElementById("to-select").value = from;
});

document.getElementById("text").addEventListener("input", (e) => {
  getExchange(e.target.value);
});

const rates = {
  usd: {
    inr: 90.27,
    gbp: 0.7561,
    jpy: 155.72,
  },
  inr: {
    usd: 1 / 90.27,
    gbp: (1 / 90.27) * 0.7561,
    jpy: (1 / 90.27) * 155.72,
  },
  gbp: {
    usd: 1 / 0.7561,
    inr: (1 / 0.7561) * 90.27,
    jpy: (1 / 0.7561) * 155.72,
  },
  jpy: {
    usd: 1 / 155.72,
    inr: (1 / 155.72) * 90.27,
    gbp: (1 / 155.72) * 0.7561,
  },
};

function getExchangeFromButton() {
  const from = document.getElementById("from-select").value;
  const to = document.getElementById("to-select").value;
  let res;
  if (from === to) {
    res = 1;
    p.innerHTML = res;
  } else {
    res = rates[from][to].toFixed(2);
    p.innerHTML = res;
  }
  const local = JSON.parse(localStorage.getItem("exchange")) || [];
  local.push(res);
  localStorage.setItem("exchange", JSON.stringify(local));
}

function getExchange(e) {
  const from = document.getElementById("from-select").value;
  const to = document.getElementById("to-select").value;

  const num = Number(e);
  if (from === to) {
    res = num;
    p.innerHTML = res;
  } else {
    res = (rates[from][to] * num).toFixed(2);
    p.innerHTML = res;
  }
  const local = JSON.parse(localStorage.getItem("exchange")) || [];
  local.push(res);
  localStorage.setItem("exchange", JSON.stringify(local));
}
