class CurrencyModel {
  amount: number;
  base: string;
  date: string;
  rates: { [key: string]: number };
}

export default CurrencyModel;
