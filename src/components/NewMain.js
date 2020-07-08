import React from "react";
import { FetchProfile } from "./ApiCall";
import RequestExchangeRate from "./RequestExchangeRate";
import ConvertExchangeRates from "./ConvertExchangeRates";
import Title from "./Title";
import Clock from "./Clock";
import Footer from "./footer";
import "../components/css/base.css";

class ExchangeRatesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      isLoaded: false,
      value: "GBP",
      result: null,
      startcurrency: "GBP",
      endcurrency: "USD",
      amount: 1,
      defValue: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFromDropdown = this.handleFromDropdown.bind(this);
    this.handleConversion = this.handleConversion.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }
  // setting the retrieved data 
  componentDidMount() {
    FetchProfile().then((data) => {
      const defValue = data.rates.USD;
      this.setState((prevState) => ({
        isLoaded: true,
        defValue: defValue.toFixed(2),
        items: data
      }));
    });
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    const base = this.state.value;
    const basicUrl = "https://api.exchangeratesapi.io/latest?";
    if (base === "EUR") {
      return fetch(basicUrl)
        .then((res) => res.json())
        .then((data) => {
          this.setState(() => ({
            items: data,
            value: base
          }));
        });
    } else {
      return fetch(basicUrl + "base=" + base)
        .then((res) => res.json())
        .then((data) => {
          this.setState(() => ({
            items: data,
            value: base
          }));
        });
    }
  };

  
  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  };

  
  handleAmountChange = (event) => {
    event.preventDefault();
    this.setState({
      amount: event.target.value
    });
  };

  
  handleFromDropdown = (event) => {
    event.preventDefault();
    if (event.target.name === "start") {
      this.setState({
        startcurrency: event.target.value
      });
    }
    if (event.target.name === "end") {
      this.setState({
        endcurrency: event.target.value
      });
    }
  };

  
  handleConversion = (event) => {
    event.preventDefault();
    const basicUrl = "https://api.exchangeratesapi.io/latest?";
    const baseCurrencyFrom = this.state.startcurrency;
    const convertCurrencyTo = this.state.endcurrency;
    fetch(
      basicUrl + "base=" + baseCurrencyFrom + "&symbols=" + convertCurrencyTo
    )
      .then((res) => res.json())
      .then((res) => {
        const rateValue = res.rates[convertCurrencyTo];
        const convResult = this.state.amount * rateValue;
        this.setState((prevState) => ({
          result: convResult.toFixed(2)
        }));
      });
  };

  render() {
    const { isLoaded, items } = this.state;

    if (!isLoaded || !items.rates) {
      return <div>Loading...</div>;
    }

    let ratesKeys = Object.keys(items.rates)
      .sort()
      .map((rates) => {
        return {
          value: rates,
          display: rates
        };
      });

    return (
      <div>
        <div className="container">
          <div className="headerDiv">
            
            <Title title={this.props.title} />
            <Clock />
          </div>
          <div className="sideBySide">
          
            <div className="col1">
              <RequestExchangeRate
                items={this.state.items}
                base={this.state.items.base}
                rates={this.state.items.rates}
                value={this.state.value}
                newRatesArray={ratesKeys}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
              />
            </div>
            <div className="col2">
              <ConvertExchangeRates
                items={this.state.items}
                base={this.state.items.base}
                rates={this.state.items.rates}
                value={this.state.value}
                newRatesArray={ratesKeys}
                result={this.state.result}
                startcurrency={this.state.startcurrency}
                endcurrency={this.state.endcurrency}
                amount={this.state.amount}
                handleAmountChange={this.handleAmountChange}
                handleFromDropdown={this.handleFromDropdown}
                handleConversion={this.handleConversion}
                convFetchRes={this.state.convFetchRes}
                defValue={this.state.defValue}
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer footerText={this.props.footerText} />
        </div>
      </div>
    );
  }
}

export default ExchangeRatesApp;
