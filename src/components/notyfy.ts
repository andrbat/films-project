import "./notify.css";

export function addNotify(msg: string, isErr: boolean) {
  const div = document.createElement("div");
  div.classList.add("notify", isErr ? "notify-error" : "notify-simple");
  div.innerHTML = msg;
  document.body.appendChild(div);
  requestAnimationFrame(() => div.classList.add("notify-apear"));

  setTimeout(() => {
    div.classList.remove("notify-apear");
    setTimeout(() => document.body.removeChild(div), 1200);
  }, 2000);
}
