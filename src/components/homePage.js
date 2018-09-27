import React from 'react';
import { connect } from 'react-redux';

class HomePage extends React.Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <h1 className="mt-2">Welcome {this.props.user ? this.props.user.username : null}</h1>
                    </div>
                </div>

                {this.props.system ?

                    <div className="row">
                        <div className="col-4">
                            <h3 className="mt-5">System Info</h3>
                            <h5>Type: {this.props.system.type}</h5>
                            <h5>Platform: {this.props.system.platform}</h5>
                            <h5>Version: {this.props.system.release}</h5>
                            <h5>Architechture: {this.props.system.arch}</h5>
                            <h5>Computer Name: {this.props.system.name}</h5>
                            <h5>Uptime: {this.props.system.uptime}</h5>
                        </div>
                        {/* <div className="col-4">
                            <h3 className="mt-5">Network Info</h3>
                        </div> */}
                    </div>
                
                :null}
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.hardwareData.user,
        system: state.hardwareData.system,
        network: state.hardwareData.network
    }
};

export default connect(mapStateToProps)(HomePage);