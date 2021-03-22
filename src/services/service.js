import { response } from "../data/events-data";

export default function getData() {
  const data = response;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 100);
  });
}
