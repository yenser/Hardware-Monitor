import React from 'react';
import Table from './table';
import ProgressBar from './progressBar';

const Cpu = ({ cpus }) => {

    if (!cpus) return null;

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <h1 className="mt-2">CPU</h1>
                    <ProgressBar cpus={cpus} />
                    <Table cpus={cpus} />
                </div>
            </div>
        </div>
    );
}

export default Cpu;