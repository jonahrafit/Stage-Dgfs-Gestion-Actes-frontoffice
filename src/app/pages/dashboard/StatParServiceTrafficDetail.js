import React, { Component } from 'react'
import { color_of_background } from '../../service/apiService';
import ProgressBar from '../generalpage/ProgressBar';

function percent(nb, total) {
    return nb * 100 / total;
}

export default class StatParServiceTrafficDetail extends Component {

    render() {
        let statparservice = [];
        let statprops = this.props.data;
        let total = 0;
        for (let i = 0; i < statprops.length; i++) {
            total = total + statprops[i].value;
            statparservice.push({ 'id': i + 1, 'stat': statprops[i], 'color': color_of_background[i] });
        }
        return (
            <div>
                <div className="az-traffic-detail-item">
                    {statparservice.map((statps) => (
                        <ProgressBar key={statps.id} bgcolor={statps.color} text={statps.stat.nom}
                            completed={percent(statps.stat.value, total).toFixed(0)} />
                    ))}
                </div>
            </div>
        )
    }
}
