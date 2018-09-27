import React from 'react';
import { connect } from 'react-redux';
import Table from './table';

class Cpu extends React.Component {

    render() {
        if (!this.props.cpus) {
            return null;
        }

        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <h1 className="mt-2">CPU</h1>
                        <Table cpus={this.props.cpus} />
                     </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cpus: state.hardwareData.cpus
    }
}

export default connect(mapStateToProps)(Cpu);