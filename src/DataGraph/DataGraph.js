import React from 'react';
import io from 'socket.io-client';
import * as action from './actions';
import { connect } from 'react-redux';
import LineGraph from './LineGraph';
let socket;

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

class DataGraph extends React.Component {
    constructor(props) {
        super(props);
        socket = io.connect('http://localhost:8080');

        socket.on('hardwareData', res => {
            props.updateHardwareData(res);
        });
    }

    render() {

        const percentage = Math.floor(100 * (this.props.hardwareData.usedmem / this.props.hardwareData.totalmem));

        if (!this.props.hardwareData.totalmem) {
            return null;
        }
        return (
            <div className="container">
                <h1 className="mt-5">RAM</h1>
                <div className="progress"  style={{height: "30px"}}>
                    <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{width: `${percentage}%`}}
                        aria-valuenow={this.props.hardwareData.usedmem}
                        aria-valuemin="0"
                        aria-valuemax={this.props.hardwareData.totalmem}
                    >{formatBytes(this.props.hardwareData.usedmem)}/{formatBytes(this.props.hardwareData.totalmem)}</div>
                </div>

                <LineGraph data={this.props.hardwareData.memHistory} maxMem={Math.ceil(getSizeInGigaByte(this.props.hardwareData.totalmem))} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        hardwareData: state.hardwareData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateHardwareData: (data) => dispatch(action.updateHardwareData(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGraph);