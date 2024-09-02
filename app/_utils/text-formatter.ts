const toTitleCase = (str: string | undefined | null): string => {
  if (typeof str !== "string" || !str) {
    return "";
  }

  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
  });
};

export { toTitleCase };
