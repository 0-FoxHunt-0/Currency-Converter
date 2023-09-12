import { useEffect, useState } from "react";
import "./App.css";
import currencyService from "../../Services/CurrencyService";
import CurrencyModel from "../../Models/CurrencyModel";

function App(): JSX.Element {
  const something = `?amount=100&from=EUR&to=USD`;
  const [selectedFrom, setSelectedFrom] = useState<string>("USD");
  const [selectedTo, setSelectedTo] = useState<string>("USD");
  const [output, setOutput] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  function sanitizeNumberInput(prevValue: number, input: string): number {
    if (!isNaN(+input)) return +input;
    else return prevValue;
  }

  useEffect(() => {
    async function handleAmountChange() {
      if (selectedFrom !== selectedTo) {
        const controller = new AbortController();
        const data: CurrencyModel = await currencyService.getCurrencyConversion(
          amount,
          selectedFrom,
          selectedTo,
          controller
        );
        setOutput(`The converted value is: ${data.rates[selectedTo]}`);
        return () => {
          controller.abort();
        };
      } else {
        setOutput("Please change one / both of the currencies");
      }
    }
    handleAmountChange();
  }, [amount, selectedFrom, selectedTo]);

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(sanitizeNumberInput(amount, e.target.value))}
      />
      <select
        value={selectedFrom}
        onChange={(e) => {
          setSelectedFrom(e.target.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={selectedTo}
        onChange={(e) => {
          setSelectedTo(e.target.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{amount === 0 ? "Please enter an amount to convert" : output}</p>
    </div>
  );
}

export default App;
