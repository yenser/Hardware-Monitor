import React from 'react';

class ProgressBar extends React.Component {

    getTotal(cpu) {
        var total = 0;
        for(var type in cpu.times) {
            total += cpu.times[type];
        }
        return total;
    }

    getAverageUsage() {
        var user = 0;
        var nice = 0;
        var sys = 0;
        var idle = 0;
        var irq = 0;

        this.props.cpus.map(cpu => {
            let total = this.getTotal(cpu);
            user += Math.round(100 * cpu.times['user'] / total);
            nice += Math.round(100 * cpu.times['nice'] / total);
            sys += Math.round(100 * cpu.times['sys'] / total);
            idle += Math.round(100 * cpu.times['idle'] / total);
            irq += Math.round(100 * cpu.times['irq'] / total);
            return null;
        });
        const length = this.props.cpus.length;
        user = user/length;
        nice = nice/length;
        sys = sys/length;
        idle = idle/length;
        irq = irq/length;

        return [user, nice, sys, idle, irq];
    }



    render() {

        const average = this.getAverageUsage();
        
        return (
            <div>
                <div className="progress" style={{height: "30px"}}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{width: `${average[0]}%`}} aria-valuenow={average[0]} aria-valuemin="0" aria-valuemax="100"></div>
                    <div className="progress-bar bg-danger" role="progressbar" style={{width: `${average[1]}%`}} aria-valuenow={average[1]} aria-valuemin="0" aria-valuemax="100"></div>
                    <div className="progress-bar bg-success" role="progressbar" style={{width: `${average[2]}%`}} aria-valuenow={average[2]} aria-valuemin="0" aria-valuemax="100"></div>
                    <div className="progress-bar bg-warning" role="progressbar" style={{width: `${average[4]}%`}} aria-valuenow={average[4]} aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className="row">
                    <h3 className="col">User {average[0]}%</h3>
                    <h3 className="col">Nice {average[1]}%</h3>
                    <h3 className="col">Sys {average[2]}%</h3>
                    <h3 className="col">Irq {average[4]}%</h3>
                    <h3 className="col">Idle {average[3]}%</h3>
                </div>
            </div>
        );
    }
}

export default ProgressBar;