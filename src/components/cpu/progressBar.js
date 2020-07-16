import React from 'react';

const getTotal = (cpu) => {
    let total = 0;
    for (let type in cpu.times) {

        total += cpu.times[type];
    }
    return total;
}

const getAverageUsage = (cpus) => {
    let user = 0;
    let sys = 0;
    let idle = 0;

    cpus.forEach(cpu => {
        const total = getTotal(cpu);
        user += Math.round(100 * (cpu.times['user'] / total));
        sys += Math.round(100 * (cpu.times['sys'] / total));
        idle += Math.round(100 * (cpu.times['idle'] / total));
    });
    const length = cpus.length;

    user = user / length;
    sys = sys / length;
    idle = idle / length;

    return {user, sys, idle};
}
const ProgressBar = (props) => {

    const average = getAverageUsage(props.cpus);

    return (
        <div>
            <div className="progress" style={{ height: "20px" }}>
                <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${average.user}%` }} aria-valuenow={average.user} aria-valuemin="0" aria-valuemax="100"></div>
                <div className="progress-bar bg-success" role="progressbar" style={{ width: `${average.sys}%` }} aria-valuenow={average.sys} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div className="row">
                <h3 className="col">User {average.user}%</h3>
                <h3 className="col">Sys {average.sys}%</h3>
                <h3 className="col">Idle {average.idle}%</h3>
            </div>
        </div>
    );
}

export default ProgressBar;