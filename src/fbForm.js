import React from 'react';

class Fbform extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          isloaded: false,
          keyw: '',
          nature:'Apparel',
          brand: '',
          obj: 'Brand Awareness',
          show: <div></div>,
        };
        this.brandChange = this.brandChange.bind(this);
        this.natureChange = this.natureChange.bind(this);
        this.keywChange = this.keywChange.bind(this);
        this.objChange = this.objChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    keywChange(event) {
        this.setState({keyw: event.target.value});
      }

      objChange(event) {
        this.setState({obj: event.target.value});
      }

      natureChange(event) {
        this.setState({nature: event.target.value});
      }

      brandChange(event) {
        this.setState({brand: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        var first = '';
        var middle = '';
        var last = '';

        if (this.state.obj === 'Brand Awareness') {
          first = 'Hey '+ this.state.keyw +', fulfill your needs at '+this.state.brand+'!';
          last = 'Check us out at //url';
        } else if (this.state.obj === 'Promotion / Sales') {
          first = 'Flash Sale! '+ this.state.brand +' is having a storewide discount this coming week!';
          last = 'Use this promo code to grab yours now! //code';
        } else if (this.state.obj === 'Conversion') {
          first = 'Add to cart now to enjoy an additional 30% OFF your purchases!';
          last = 'Download our app now at //url, grab it now before it is too late!';
        }

        if (this.state.nature === 'Apparel') {
          middle = 'If you are looking for the best apparel store, you are at the right place!';
        }else if (this.state.nature === 'Appliances') {
          middle = 'Get your daily electronics here with the cheapest price in town.';
        }else if (this.state.nature === 'Food and Beverage') {
          middle = 'Satisfy your tastebud here with '+ this.state.brand+'.';
        }else if (this.state.nature === 'Services') {
          middle = 'Advance your best experience with our friendly staffs here in '+ this.state.brand+'.';
        }

        this.setState({
          show: 
            <div>
              <h1>Suggested Copy:</h1>
              <h3 className="text-left">{first} {middle} {last}</h3>
            </div>
        });
      }
    
      render() {
        return (
          <div className="row pt-5 pl-5 text-left">
            <div className="col-4">
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
            <label>
              Ads Objective:
              <select className="form-control" value={this.state.obj} onChange={this.objChange}>
                <option value="Brand Awareness">Brand Awareness</option>
                <option value="Promotion / Sales">Promotion / Sales</option>
                <option value="Conversion">Conversion</option>
              </select>
            </label>
            </div>
            <div className="form-group">
            <label>
                Brand Name:
                <input className="form-control" type="text" value={this.state.brand} onChange={this.brandChange} required />
              </label>
              </div>
              <div className="form-group">
              <label>
              Product Nature:
              <select className="form-control" value={this.state.nature} onChange={this.natureChange}>
                <option value="Apparel">Apparel</option>
                <option value="Appliances">Appliances</option>
                <option value="Food and Beverage">Food and Beverage</option>
                <option value="Services">Services</option>
              </select>
            </label>
            </div>
            <div className="form-group">
              <label>
                Target Group:
                <input className="form-control" type="text" value={this.state.keyw} onChange={this.keywChange} required />
              </label>
              <div className="d-flex"><input className="btn btn-primary" type="submit" value="Submit" /></div>
              </div>
            </form>
            </div>
            <div className="col-8 pr-5">
            {this.state.show}
            </div>
          </div>
        );
      }
}

export default Fbform;