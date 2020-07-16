import React from 'react';
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

const Ram = ({ram}) => {
            
        const percentage = Math.floor(100 * (ram.usedmem / ram.totalmem));

        if (!ram.totalmem) {
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
                                aria-valuenow={ram.usedmem}
                                aria-valuemin="0"
                                aria-valuemax={ram.totalmem}
                            >{formatBytes(ram.usedmem)}/{formatBytes(ram.totalmem)}</div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <LineGraph data={ram.memHistory} maxMem={Math.ceil(getSizeInGigaByte(ram.totalmem))} />
                    </div>
                </div>
            </div>
        );
}

const mapStateToProps = state => {
    return {
        ram: state.hardwareData.ram
    }
};



export default Ram;