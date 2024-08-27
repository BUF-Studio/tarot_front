export function clearNeedsDbCheckCookie() {
  document.cookie =
    "needsDbCheck=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
