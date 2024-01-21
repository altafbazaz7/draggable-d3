export const checkIndexForTitle = (index: number) => {
  let value =
    index === 0
      ? "New York - Sites"
      : index === 1
      ? "New Jersy - Sites"
      : index === 2
      ? "Vermon - Sites"
      : index === 3
      ? "Massachusetts - Sites"
      : "California - Sites";
  return value;
};

export const checkIndexForChildren = (index: number) => {
  let value =
    index === 0
      ? ["Q2KEN-HK"]
      : index === 1
      ? ["Q2KEN-HA"]
      : index === 2
      ? ["Q2KEN-HZ"]
      : index === 3
      ? ["Q2KEN-HZ", "Q2KEN-HU"]
      : [
          "Q2KEN-HZ",
          "Q2KEN-HE",
          "Q2KEN-HI",
          "Q2KEN-HE",
          "Q2KEN-HR",
          "Q2KEN-HU",
        ];
  return value;
};
