import React, { Component } from 'react'

export default class TeamInfo extends Component {

    componentDidMount() {

    }

    render() {
        const { team } = this.props;
        if (!team) {
            return <div />;
        }
        return (
            <span style= { { color: team.color } }>
                <span>{ team.name }, </span>
                <span>{ team.roster.length } players</span>
            </span>
        )
    }
}