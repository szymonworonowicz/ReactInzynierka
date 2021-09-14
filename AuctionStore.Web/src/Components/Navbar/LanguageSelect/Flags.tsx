import Flag from "react-flagkit";

const pl = <Flag country="PL" />
const en = <Flag country="GB" />

export const Flags = new Map<string, JSX.Element>([
  ["pl", pl],
  ["en", en],
]);
