import React, { Component } from 'react'

export default class TeamEdit extends Component {

    constructor() {
        super();
        this.state = {
            isEditing: false
        }
    }

    handleInput(e) {
        const { team } = this.state;
        team[`${e.target.name}`] = e.target.value;
        this.setState({ team });
    }

    componentDidMount() {
        const { team } = this.props;
        const isNewTeam = true //!team || !team.id || team.id === '';
        const boundTeam = isNewTeam ? team : { ...team };
        this.setState({ isEditing: isNewTeam, autoSave: isNewTeam, team: boundTeam, originalTeam: { ...team } });
    }

    toggleEditing(e) {
        e.preventDefault();
        e.stopPropagation();
        const { isEditing } = this.state;
        this.setState({ isEditing: !isEditing });
    }

    cancel(e) {
        this.toggleEditing(e);
        this.setState({ team: { ...this.props.team } });
    }

    save(e) {
        e.preventDefault();
        e.stopPropagation();
        for (let p in this.props.team) {
            this.props.team[p] = this.state.team[p];
        }
        
        this.setState({ isEditing: false, originalTeam: { ...this.props.team } });
    }

    render() {
        const { isEditing, team, originalTeam, autoSave } = this.state;
        if (!team) {
            return <div />;
        }
        return (
            <div>
                <div>
                    <span>{ originalTeam.name }{ (originalTeam.color && originalTeam.color !== '') ? ', ' : '' }</span>
                    <span style={ { display: 'inline-block', marginRight: '2px', color: originalTeam.color } }>{ originalTeam.color }</span>
                    <button hidden={ autoSave } onClick={(e) => this.toggleEditing(e)} className="btn btn-secondary btn-sm">Edit</button>
                </div>
                <div hidden={ !isEditing }>

                    <div className="form-name">
                        <label htmlFor="t-name">Name</label>
                        <input value={team.name} onChange={(e) => this.handleInput(e)} type="text" className="form-control" name="name" id="t-name" placeholder="Enter name" />
                    </div>
                    <div className="form-color">
                        <label htmlFor="t-color">Color</label>
                        <input value={team.color} onChange={(e) => this.handleInput(e)} type="color" className="form-control" name="color" id="t-color" placeholder="Enter color" />
                    </div>
                    { !autoSave ? (
                        <div>
                            <button onClick={(e) => this.save(e)} className="btn btn-success btn-sm">Save</button>
                            <button onClick={(e) => this.cancel(e)} className="btn btn-light btn-sm">Cancel</button>
                        </div>
                    ) : <span /> }
                </div>
            </div>
        )
    }
}