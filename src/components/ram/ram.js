import React from 'react';
import { connect } from 'react-redux';
import LineGraph from './LineGraph';


function formatBytes(a,b) {
    if(0===a) {
        return"0 Bytes";
    }
    var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));
    return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]
}

function getSizeInGigaByte(a) {
    var c = 1024;
    var f = Math.floor(Math.log(a)/Math.log(c));
    return parseFloat((a/Math.pow(c,f)).toFixed(2))
}

class Ram extends React.Component {
    render() {

        const percentage = Math.floor(100 * (this.props.ram.usedmem / this.props.ram.totalmem));

        if (!this.props.ram.totalmem) {
            return null;
        }
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <h1 className="mt-2">RAM</h1>

                        <div className="progress"  style={{height: "30px"}}>
                            <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{width: `${percentage}%`}}
                                aria-valuenow={this.props.ram.usedmem}
                                aria-valuemin="0"
                                aria-valuemax={this.props.ram.totalmem}
                            >{formatBytes(this.props.ram.usedmem)}/{formatBytes(this.props.ram.totalmem)}</div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <LineGraph data={this.props.ram.memHistory} maxMem={Math.ceil(getSizeInGigaByte(this.props.ram.totalmem))} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ram: state.hardwareData.ram
    }
};



export default connect(mapStateToProps)(Ram);