import React from 'react';
import KeywordSearch from './keywordSearch.js';

class Copy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloaded: true,
            type: 'ADS',
            obj: '',
            primarykeys: [],
            headlinekeys: [],
            desckeys: [],
            generated: false,
            copy_type: '',
            copy_obj: '',
            copy_primarykeys: [],
            copy_headlinekeys: [],
            copy_desckeys: [],
        };
    };

    changeType = (e) => {
        const val = e.target.value;
        this.setState({
            type: val
        })
    }

    handleSubmit = () => {
        if (this.state.obj === '' || this.state.primarykeys === [] || this.state.headlinekeys === [] || this.state.desckeys === []) {
            alert('Please fill in all the fields')
        } else {
            this.setState({
                generated: false,
                copy_type: this.state.type,
                copy_obj: this.state.obj,
                copy_primarykeys: this.state.primarykeys,
                copy_headlinekeys: this.state.headlinekeys,
                copy_desckeys: this.state.desckeys,
                isloaded: false
            })
            setTimeout(() => { this.setState({ generated: true, isloaded: true }) },500);
        }
    }

    changeObj = (e) => {
        this.setState({
            obj: e.target.value
        })
        console.log(e.target.value)
    }

    changeHead = (e) => {
        var spl = e.target.value.split(',')
        var filtered = spl.filter(function (el) {
            return el !== '';
        });
        this.setState({
            headlinekeys: filtered
        })
        console.log(this.state.headlinekeys)
    }

    changePri = (e) => {
        var spl = e.target.value.split(',')
        var filtered = spl.filter(function (el) {
            el.replace(' ','')
            return el !== '';
        });
        this.setState({
            primarykeys: filtered
        })
        console.log(this.state.primarykeys)
    }

    changeDesc = (e) => {
        var spl = e.target.value.split(',')
        var filtered = spl.filter(function (el) {
            el.replace(' ','')
            return el !== '';
        });
        this.setState({
            desckeys: filtered
        })
        console.log(this.state.desckeys)
    }

    

    render() {
        return (
            <div>
                <div className="row m-0 mb-5">
                    <div className="col">
                        <h5>Select Your Copy Type</h5>
                        <button onClick={this.changeType} value="ADS" className={this.state.type === 'ADS' ? "copy-btn active" : "copy-btn"}>Facebook Ads</button>
                        <button onClick={this.changeType} value="POST" className={this.state.type === 'POST' ? "copy-btn active" : "copy-btn"}>Facebook Post</button>
                        <div className="row">
                            <div className="col-md">
                                <h5>Ads Objective</h5>
                                <input type="text" onChange={this.changeObj}/>
                            </div>
                            <div className="col-md">
                                <h5>Keywords For Primary Text</h5>
                                <input type="text" placeholder="eg: keyword1,keyword2,..." onChange={this.changePri}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <h5>Keywords for Headline</h5>
                                <input type="text" placeholder="eg: keyword1,keyword2,..." onChange={this.changeHead}/>
                            </div>
                            <div className="col-md">
                                <h5>Keywords for Description</h5>
                                <input type="text" placeholder="eg: keyword1,keyword2,..." onChange={this.changeDesc}/>
                            </div>
                        </div>
                        <button onClick={this.handleSubmit} value="Submit" className="copy-btn active my-5">Generate your ads copy</button>
                    </div>
                    <div className="col">
                        <KeywordSearch />
                    </div>
                </div>
                {!this.state.generated && <div className="card-deck">
                    {!this.state.isloaded && <div style={{padding:"100px",textAlign:"center", width:"100%"}}>Loading</div>}
                    {this.state.isloaded && <div style={{padding:"100px",textAlign:"center", width:"100%"}}>Your copies will be shown here</div>}
                </div>}
                {this.state.generated && <div className="card-deck">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title border-bottom py-3">Ads Copy 1</h5>
                            <p className="card-text">Ads Type: {this.state.type}</p>
                            <p className="card-text">Ads Obj: {this.state.copy_obj}</p>
                            <p className="card-text">Ads Primary Keywords: {this.state.copy_primarykeys.map((tile, index) => (<span key={index}>{tile},</span>))}</p>
                            <p className="card-text">Ads headline Keywords: {this.state.copy_headlinekeys.map((tile, index) => (<span key={index}>{tile},</span>))}</p>
                            <p className="card-text">Ads Description Keywords: {this.state.copy_desckeys.map((tile, index) => (<span key={index}>{tile},</span>))}</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            <button type="button" className="btn btn-outline-primary px-4">Copy</button>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title border-bottom py-3">Ads Copy 2</h5>
                            <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            <button type="button" className="btn btn-outline-primary px-4">Copy</button>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title border-bottom py-3">Ads Copy 3</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            <button type="button" className="btn btn-outline-primary px-4">Copy</button>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }

}
  
export default Copy;