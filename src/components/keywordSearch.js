import React from 'react';
import axios from 'axios';

class Fbform extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          isloaded: true,
          error: false,
          keyw: '',
          keydata: null,
          ACCESS_TOKEN: 'EAAHXUi39ZBkUBAN0Qf8rYDypiEQdAdkF9XutBcy2kew2W2TzKNEBhjQDDSiDLsOdmX6XOgYLXylORl2bNZCWAFVLTlnFQoTZA7WPQZCuTHZAKnsD5RZBee53OBs4kTcvjYVA3DJIMWRFp4X7HsRAoZBMTpMTWmx98QZD',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        this.setState({keyw: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.keyw === '') {
            alert('Please enter a keyword')
        }else {
            this.setState({isloaded: false, error: false});
            axios.get(`https://graph.facebook.com/search?type=adinterest&q=[`+this.state.keyw+`]&limit=100&access_token=`+this.state.ACCESS_TOKEN)
                .then(res => {
                    const data = res.data.data;
                    this.setState({ keydata: data, isloaded: true });
                    console.log(data)
                })
                .catch(error => {
                    this.setState({ error: true, isloaded: true });
            })
        }
    }

    addComma = (num) => {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    }
    
      render() {
        return (
            <div className="m-3">
                <div className="keyword-div text-left">
                    <h2>Keywords Check <span className="exclaim">!</span></h2>
                    <div className="position-relative">
                        <input type="text" value={this.state.keyw} onChange={this.handleChange} />
                        <button className="search-btn" onClick={this.handleSubmit}>Search</button>
                    </div>
                    <h2 className="mt-3">Keywords Reached</h2>
                    <div className="keyword-table">
                        {this.state.keydata && this.state.isloaded && <table className="table table-striped">
                            <thead style={{borderBottom: '2px solid #DBDBDB'}}>
                                <tr>
                                <th scope="col">Keywords on Interest</th>
                                <th scope="col">Potential Reach</th>
                                <th scope="col">Interest</th>
                                <th scope="col">Topic</th>
                                <th scope="col">Disambiguation Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.keydata.map(tile => (
                                    <tr key={tile.id}>
                                        <th scope="row">{tile.name}</th>
                                        <td>{this.addComma(tile.audience_size)}</td>
                                        {tile.path.length && <td>{tile.path[0]}/{tile.path[1]}</td>}
                                        {!tile.path.length && <td> - </td>}
                                        {tile.topic && <td>{tile.topic}</td>}
                                        {!tile.topic && <td> - </td>}
                                        {tile.disambiguation_category && <td>{tile.disambiguation_category}</td>}
                                        {!tile.disambiguation_category && <td> - </td>}
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                        {!this.state.isloaded && <div className="m-5 text-center">Loading...</div>}
                        {!this.state.keydata && this.state.isloaded && !this.state.error && <div className="m-5 text-center">Search keyword to see results.</div>}
                        {!this.state.keydata && this.state.isloaded && this.state.error && <div className="m-5 text-center">No results found.</div>}
                        {this.state.keydata && this.state.isloaded && !this.state.keydata.length && <div className="m-5 text-center">No results found.</div>}
                    </div>
                </div>
            </div>
        );
      }
}

export default Fbform;