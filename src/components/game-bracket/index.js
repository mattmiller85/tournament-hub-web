import React, { Component } from 'react'
import * as Moment from 'moment';

export default class GameBracket extends Component {

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate() {

    }

    updateCanvas() {
        const { game, round } = this.props;
        const ctx = this.refs.canvas.getContext('2d');// as CanvasRenderingContext2D;
        let height = (round - 1) * 200;
        if (height === 0) {
            height = 100;
        }

        const firstLineStarts = {
            "1": 20,
            "2": 60,
            "3": 110,
        };

        const secondLineStarts = {
            "1": 95,
            "2": 165,
            "3": 320,
        }

        const line1Height = firstLineStarts[round.toString()];
        const line2Height = secondLineStarts[round.toString()];

        ctx.font = "italic 20pt -apple-system, system-ui, Segoe UI";
        ctx.strokeText(game.number, 5, height * .6);

        ctx.font = "10pt -apple-system, system-ui, Segoe UI";
        ctx.strokeText(game.team1Description, 0, line1Height - 5);
        ctx.strokeText(game.team2Description, 0, line2Height - 5);

        ctx.font = "italic 9pt -apple-system, system-ui, Segoe UI";
        ctx.strokeText(game.location, 50, height / 2);
        ctx.strokeText(new Moment(game.gameDate).format("MM/DD/YYYY h:mm a"), 50, height * .65);

        ctx.beginPath();
        ctx.moveTo(0, line1Height);
        ctx.lineTo(200, line1Height);
        ctx.moveTo(200, line1Height);
        ctx.lineTo(200, line2Height);
        ctx.moveTo(200, line2Height);
        ctx.lineTo(0, line2Height);

        ctx.stroke();
    }

    render() {
        const { round } = this.props;
        let height = (round - 1) * 200;
        if (height === 0) {
            height = 100;
        }
        return (
            <div style={ { height: height + 'px' } }>
                <canvas ref="canvas" width={200} height={height} />
            </div>
        )
    }
}