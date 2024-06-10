import axios from "axios";

const BASE_URL = "/api/hankook";

const service = axios.create({
  baseURL: BASE_URL,
});

export async function fetchGetStockData(params) {
  const resp = await service.get(`/request`, {
    params: {
      marketCode: params.marketCode,
      stockCode: params.stockCode,
      startDate: params.startDate,
      endDate: params.endDate,
      period: params.period,
      prc: params.prc,
    },
  });

  return resp.data;
}
