export function whatsappUrl(number: string, message: string) {
  const normalized = number.replace(/\D/g, "").replace(/^0/, "62");
  return normalized ? `https://wa.me/${normalized}?text=${encodeURIComponent(message)}` : "";
}

export function emailUrl(email: string, subject: string, message: string) {
  if (!email) return "";
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}

export async function copyMessage(message: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(message);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = message;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Clipboard tidak tersedia");
}
