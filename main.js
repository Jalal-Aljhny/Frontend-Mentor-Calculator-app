let result = document.querySelector("main section.result .result");
let keys = document.querySelectorAll("section.keys .container div button");
let operator;
let errorMsg = document.querySelector("section .error");
let themesBtn = document.querySelectorAll("header .container > div div small");
let switcher = document.querySelector("header .container > div div div span");
let container = document.querySelector("header .container > div div div");

keys.forEach((key) => {
  key.addEventListener("click", () => {
    errorMsg.style = "transform: translateX(-50%) scale(0);opacity :0";
    if (key.dataset.key == "del") {
      operator = "delete";
    } else if (key.dataset.key == "reset") {
      operator = "reset";
    } else if (key.dataset.key == "equal") {
      operator = "equal";
    } else if (key.dataset.key == "multi") {
      result.innerHTML += "*";
    } else {
      result.innerHTML += key.innerHTML;
      operator = "";
    }
    calc(operator);
  });
});
function calc(operator) {
  if (operator == "reset") {
    result.innerHTML = "";
  } else if (operator == "delete") {
    if (result.innerHTML.length == 1) {
      result.innerHTML = "";
      window.location.reload();
    } else {
      result.innerHTML = result.innerHTML.slice(0, -1);
    }
  } else if (operator == "equal") {
    try {
      if (
        Object.is(eval(result.innerHTML), NaN) == false &&
        Object.is(eval(result.innerHTML), undefined) == false
      ) {
        result.innerHTML = eval(result.innerHTML);
      } else {
        errorMsg.style = "transform: translateX(-50%) scale(1);opacity :1";
      }
    } catch {
      errorMsg.style = "transform: translateX(-50%) scale(1);opacity :1";
    }
  }
}
if (window.localStorage.getItem("theme") != null) {
  document.body.className = `${window.localStorage.getItem("theme")}`;
}

themesBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.body.className = `theme-${btn.innerHTML}`;
    window.localStorage.setItem("theme", `theme-${btn.innerHTML}`);
  });
});

let themeOneDist = Math.floor(((themesBtn[0].offsetLeft + 7) * 4) / 100);
let themeTwoDist = Math.floor(((themesBtn[1].offsetLeft + 7) * 4) / 100);
let themeThreeDist = Math.floor(((themesBtn[2].offsetLeft + 7) * 4) / 100);
let arr = [];
arr[0] = themeOneDist;
arr[1] = themeTwoDist;
arr[2] = themeThreeDist;
switcher.addEventListener("dragstart", () => {
  switcher.style.opacity = "0.5";
});
switcher.addEventListener("dragend", (e) => {
  switcher.style.opacity = "1";
  for (let i = 0; i < 3; i++) {
    if (Math.floor((e.clientX * 4) / 100) == arr[i]) {
      document.body.className = `theme-${i + 1}`;
      window.localStorage.setItem("theme", `theme-${i + 1}`);
    }
  }
});
