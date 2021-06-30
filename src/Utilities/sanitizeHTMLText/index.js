import sanitizeHtml from "sanitize-html";
export default function sanitizeHTMLText(text) {
  // TODO: allow more coding embeds
  return sanitizeHtml(text, {
    allowedIframeHostnames: [],
  });
}
