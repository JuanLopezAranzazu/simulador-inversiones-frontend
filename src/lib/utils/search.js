export function searchItems(items, search) {
  return items.filter((items) => {
    return Object.keys(items).some((key) => {
      if (typeof items[key] === "string" && key !== "_id") {
        return items[key].toLowerCase().includes(search.toLowerCase());
      }
    });
  });
}
