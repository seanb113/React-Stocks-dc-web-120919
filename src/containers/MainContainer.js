import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

    constructor(){
    super()
    this.state = {
      stocks: [],
      displayStocks: [],
      portfolioStocks: [],
      sort: null
    }
  }

  componentDidMount(){
    fetch("http://localhost:3000/stocks")
    .then(res =>  res.json())
    .then(data => {
      this.setState({
        stocks: data,
        displayStocks: data
      })
    })
  }

  addPortfolio = (stock) => {
    this.state.portfolioStocks.includes(stock) 
    ?
    alert("Nope")
    :
    this.setState({
      portfolioStocks: [...this.state.portfolioStocks, stock]
    })
  }

  removePortfolio = (stock) => {
    let filtered = this.state.portfolioStocks.filter(s => s !== stock)
    this.setState({
      portfolioStocks: filtered
    })
  }

  filterStocks = (event) => {
    let filterType = event.target.value
    let filteredbyType = this.state.stocks.filter(s => s.type === filterType)
    this.setState({
      displayStocks: filteredbyType
    })
  }


    handleSort = (event) => {
      event.target.value === "Alphabetically"
      ?
      this.setState({sort: 'name'})
      :
      this.setState({sort: 'price'})
    }

    getSorted = () => {
      let value = this.state.sort
      return this.state.displayStocks.sort(
        (stock1, stock2) => stock1[value] > stock2[value] ? 1 : -1)
        
    }

  render() {
    return (
      <div>
        <SearchBar stocks={this.state.stocks} handleSort={this.handleSort} sort={this.state.sort} filterStocks={this.filterStocks}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.getSorted()} addPortfolio={this.addPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.portfolioStocks} removePortfolio={this.removePortfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
