import React from 'react';
import { connect } from 'react-redux';

class Table extends React.Component {

    render() {
        if (!this.props.cpus) {
            return null;
        }

        var cpus = this.props.cpus.map((cpu, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <th>{cpu.model}</th>
                    <th>{cpu.speed}</th>
                    <th>{cpu.times.user}</th>
                    <th>{cpu.times.nice}</th>
                    <th>{cpu.times.sys}</th>
                    <th>{cpu.times.irq}</th>
                    <th>{cpu.times.idle}</th>
                </tr>
            );
        });


        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Model</th>
                        <th scope="col">Speed</th>
                        <th scope="col">User</th>
                        <th scope="col">Nice</th>
                        <th scope="col">Sys</th>
                        <th scope="col">Irq</th>
                        <th scope="col">Idle</th>
                    </tr>
                </thead>
                <tbody>
                    {cpus}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = state => {
    return {
        cpus: state.hardwareData.cpus
    }
}

export default connect(mapStateToProps)(Table);