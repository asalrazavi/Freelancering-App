import http from "./httpService";

export function recommendApi(data) {
  return http.post(`/recommend/recommend`, data).then(({ data }) => data.data);
}
