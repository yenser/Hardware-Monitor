import React from 'react';

const Table = (props) => {

    if (!props.cpus) return null;

    var cpus = props.cpus.map((cpu, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index + 1}</th>
                <th>{cpu.model}</th>
                <th>{cpu.speed}</th>
                <th>{cpu.times.user}</th>
                <th>{cpu.times.sys}</th>
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
                    <th scope="col">Sys</th>
                    <th scope="col">Idle</th>
                </tr>
            </thead>
            <tbody>
                {cpus}
            </tbody>
        </table>
    );
}

export default Table;