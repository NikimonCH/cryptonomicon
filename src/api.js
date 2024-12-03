const url = "https://min-api.cryptocompare.com/data/all/coinlist?summary=true";
export function apifetcher() {
  return fetch(url).then((response) => {
    return response.json().then((somejson) => {
      return somejson.Data;
    });
  });
}
