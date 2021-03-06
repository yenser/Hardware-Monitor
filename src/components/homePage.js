import React from 'react';
import moment from 'moment';

const HomePage = (props) => {

    const assembleNetwork = (network) => {
        if(network === null) return <div id="accordion"></div>;
        
        const types = Object.keys(network);
        const networkList = types.map((face, index) => {
            const netItem = network[face].map((net, netIndex) => {
                return (
                    <div key={netIndex}>
                        <strong>Address:</strong> {net.address}<br />
                        <strong>Netmask:</strong> {net.netmask}<br />
                        <strong>Family:</strong> {net.family}<br />
                        <strong>Mac:</strong> {net.mac}<br />
                        <strong>Internal:</strong> {net.internal}<br />
                        <strong>Cidr:</strong> {net.cidr}<br /><br />
                    </div>
                );
            });
            return (
                <div key={index} className="card">
                    <div className="card-header" id={`heading-${index}`}>
                        <h5 className="mb-0">
                            <button
                                className="btn btn-link collapsed"
                                data-toggle="collapse"
                                data-target={`#collapse${index}`}
                                aira-expanded="false"
                                aria-controls={`#collapse${index}`}
                            >{types[index]}</button>
                        </h5>
                    </div>
                    <div id={`collapse${index}`} className="collapse" aria-labelledby={`heading-${index}`} data-parent="accordion">
                        <div className="card-body">
                            {netItem}
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div id="accordion">
                {networkList}
            </div>
        )
    }

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <h1 className="mt-2">Welcome {props.user ? props.user.username : null}</h1>
                </div>
            </div>

            {props.system ?

                <div className="row">
                    <div className="col-md-4">
                        <h3 className="mt-5">System Info</h3>
                        <h5><strong>Type:</strong> {props.system.type}</h5>
                        <h5><strong>Platform:</strong> {props.system.platform}</h5>
                        <h5><strong>Version:</strong> {props.system.release}</h5>
                        <h5><strong>Architechture:</strong> {props.system.arch}</h5>
                        <h5><strong>Computer Name:</strong> {props.system.name}</h5>
                        <h5><strong>Uptime:</strong> {moment().startOf('day').seconds(props.system.uptime).format('H:mm:ss')}</h5>
                    </div>
                    {/* <div className="col-md-6">
                        <h3 className="mt-5">Network Info</h3>
                        {assembleNetwork(props.network)}
                    </div> */}
                </div>

                : null}

        </div>
    );
}

export default HomePage;