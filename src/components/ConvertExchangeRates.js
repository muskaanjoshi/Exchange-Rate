import React from "react";

class ConvertExchangeRates extends React.Component {
  /* Function -Dropdown */
  displayDropDown = () => {
    return this.props.newRatesArray.map((rates) => (
      <option key={rates.value} value={rates.value}>
        {rates.display}{" "}
      </option>
    ));
  };

  render() {
    return (
      <div>
          
        <p className="titleStyles">Convert Exchange Rate</p>
          <hr />
        <p>1. Enter amount</p>
        <p>2. Choose the required Country Code</p>
        <p>3. Press CONVERT .</p>
        <form onSubmit={this.props.handleConversion}>
          <div>
              <label>Amount: </label>
              <input type="number" id="amount" placeholder="1" step="0.01" value={this.props.amount} onChange={this.props.handleAmountChange}/>
          </div>
          <div>
              <label className="formLabel">From: </label>
              <select
                name="start"
                value={this.props.startcurrency}
                onChange={this.props.handleFromDropdown}>
                {/* Dropdown 1 */}
                {this.displayDropDown()}
              </select>
          </div>
          <div>
              <label className="formLabel">To: </label>
              <select name="end" value={this.props.endcurrency} onChange={this.props.handleFromDropdown}>
                {/* Dropdown 2 */}
                {this.displayDropDown()}
              </select>
          </div>
          <input className="convertButton" type="submit" value="CONVERT" />
          <p className="convertResult">
            {this.props.amount} {this.props.startcurrency} = {" "}
            {this.props.result ? this.props.result : this.props.defValue}{" "}
            {this.props.endcurrency}
          </p>
        </form>
      </div>
    );
  }
}

export default ConvertExchangeRates;
