/* eslint "react/prefer-stateless-function": "off" */

import React from "react";
import { withRouter } from "react-router-dom";
import URLSearchParams from "url-search-params";

class ProductFilter extends React.Component {
  constructor({ location: { search } }) {
    super();
    const params = new URLSearchParams(search);
    this.state = {
      category: params.get("category") || "",
      priceMin: params.get("priceMin") || "",
      priceMax: params.get("priceMax") || "",
      changed: false,
    };

    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangePriceMin = this.onChangePriceMin.bind(this);
    this.onChangePriceMax = this.onChangePriceMax.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.showOriginalFilter = this.showOriginalFilter.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      location: { search: prevSearch },
    } = prevProps;
    const {
      location: { search },
    } = this.props;
    if (prevSearch !== search) {
      this.showOriginalFilter();
    }
  }

  onChangeStatus(e) {
    this.setState({ category: e.target.value, changed: true });
  }

  onChangePriceMin(e) {
    const priceString = e.target.value;
    if (priceString.match(/^\d*$/)) {
      this.setState({ priceMin: e.target.value, changed: true });
    }
  }

  onChangePriceMax(e) {
    const priceString = e.target.value;
    if (priceString.match(/^\d*$/)) {
      this.setState({ priceMax: e.target.value, changed: true });
    }
  }

  showOriginalFilter() {
    const {
      location: { search },
    } = this.props;
    const params = new URLSearchParams(search);
    this.setState({
      category: params.get("category") || "",
      priceMin: params.get("priceMin") || "",
      priceMax: params.get("priceMax") || "",
      changed: false,
    });
  }

  applyFilter() {
    const { category, priceMin, priceMax } = this.state;
    const { history } = this.props;
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (priceMin) params.set("priceMin", priceMin);
    if (priceMax) params.set("priceMax", priceMax);

    const search = params.toString() ? `?${params.toString()}` : "";
    history.push({ pathname: "/products", search });
  }

  render() {
    const { category, changed } = this.state;
    const { priceMin, priceMax } = this.state;
    return (
      <div>
        Products:{" "}
        <select value={category} onChange={this.onChangeStatus}>
          <option value="">(All)</option>
          <option value="Shirts">Shirts</option>
          <option value="Jeans">Jeans</option>
          <option value="Jackets">Jackets</option>
          <option value="Sweaters">Sweaters</option>
          <option value="Accessories">Accessories</option>
        </select>{" "}
        Price between:{" "}
        <input size={5} value={priceMin} onChange={this.onChangePriceMin} />
        {" - "}
        <input
          size={5}
          value={priceMax}
          onChange={this.onChangePriceMax}
        />{" "}
        <button type="button" onClick={this.applyFilter}>
          Apply
        </button>{" "}
        <button
          type="button"
          onClick={this.showOriginalFilter}
          disabled={!changed}
        >
          Reset
        </button>
      </div>
    );
  }
}

export default withRouter(ProductFilter);
