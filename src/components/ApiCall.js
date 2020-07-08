export function FetchProfile() {
  let apiUrl = "https://api.exchangeratesapi.io/latest?base=GBP";
  return fetch(apiUrl).then(res => res.json());
}


