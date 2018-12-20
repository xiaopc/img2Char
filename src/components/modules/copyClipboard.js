// https://stackoverflow.com/questions/23934656/javascript-copy-rich-text-contents-to-clipboard

export function copyToClip(str, rich = false) {
  function listener(e) {
    if (rich) {
      e.clipboardData.setData("text/html", str);      
    }
    e.clipboardData.setData("text/plain", str);
    e.preventDefault();
  }
  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);
}