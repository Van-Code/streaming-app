import ShortUniqueId from "short-unique-id";
const uid = new ShortUniqueId({ length: 10 });

export const generateId = function () {
  return uid.rnd();
};
export const users = [
  {
    name: "Van",
    id: "yFe7sunYM9",
  },
  {
    name: "Anton",
    id: "qsh4TH48HN",
  },
];
