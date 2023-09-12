import axios from "axios";
import appConfig from "../Utils/AppConfig";
import CurrencyModel from "../Models/CurrencyModel";

class CurrencyService {
  public async getCurrencyConversion(
    amount: number,
    from: string,
    to: string,
    controller?: AbortController
  ): Promise<CurrencyModel> {
    const response = await axios.get(appConfig.SITE_URL, {
      params: {
        amount: amount,
        from: from,
        to: to,
      },
      signal: controller?.signal,
    });
    const data: CurrencyModel = response.data;
    return data;
  }
}

const currencyService = new CurrencyService();

export default currencyService;
