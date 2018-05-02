import Moment from 'moment'
import { EventEmitter } from 'events'

class BracketRendererService extends EventEmitter {
    constructor() {
        super();
        this.leftOffset = 0;
        this.topOffset = 20;
        this.templateBuilders = {
            2: (context, games) => this.build2TeamTemplate(context, games),
            8: (context, games) => this.build8TeamTemplate(context, games)
        }
        this.roundBracketHeights = {
            1: 100,
            2: 150,
            3: 300
        }
        this.gameTeamRects = [];
    }

    buildBracket(canvas, tournament) {
        if (!tournament)
            return;
        const renderer = this.templateBuilders[tournament.numTeams];
        if (!renderer) {
            throw new Error(`No renderer yet for a bracket with ${tournament.numTeams} teams.`)
        }
        if (tournament.type !== 1) {
            throw new Error("We only support single elimination right now.");
        }
        this.gameTeamRects.length = 0;
        const elemLeft = canvas.offsetLeft,
        elemTop = canvas.offsetTop;

        canvas.addEventListener('click', (event) => {
            var x = event.pageX - elemLeft,
            y = event.pageY - elemTop;

            // Collision detection between clicked offset and element.
            this.gameTeamRects.forEach((element) => {
                if (y > element.y && y < element.y + element.height 
                    && x > element.x && x < element.x + element.width) {
                        this.onTeamClick(tournament, element.gameId, element.teamNumber);
                }
            });
            
        }, false);
        const ctx = canvas.getContext('2d');
        ctx.font = "12pt -apple-system, system-ui, Segoe UI";
        renderer(ctx, tournament.games);
        this.gameTeamRects.forEach((element) => {
            ctx.strokeRect(element.x, element.y, element.width, element.height);
        });
    }

    onTeamClick(tournament, gameId, teamNumber) {
        const game = tournament.games.find(g => g.id === gameId);
        if (!game) {
            return;
        }
        const team = game[`team${teamNumber.toString()}`];
        if (!team.id || team.id === '') {
            alert("This is a placeholder team so they can't advance.");
            return;
        }
        game.winnerTeamId = team.id;
        const { advances } = game;
        if (!advances || !advances.gameNumber) {
            // champ game. last round
            this.emit("teamAdvanced");
            return;
        }
        const toGame = tournament.games.find(g => g.number === advances.gameNumber);
        const oldTeam = toGame[`team${advances.teamNumber.toString()}`];
        if (oldTeam && oldTeam.id) {
            // then they were set up as the winners of other games, wipe them out.
            tournament.games.filter(g => g.number > toGame.number).forEach(g => {
                if (g.team1.id === oldTeam.id) {
                    g.team1 = { name: "N/A", id: '', color: '', roster: [] };
                }
                if (g.team2.id === oldTeam.id) {
                    g.team2 = { name: "N/A", id: '', color: '', roster: [] };
                }
                if (g.winnerTeamId === oldTeam.id) {
                    g.winnerTeamId = '';
                }
            });
        }
        toGame[`team${advances.teamNumber.toString()}`] = team;
        this.emit("teamAdvanced");
    }

    scaleCanvas(ctx, numRounds) {
        const { width, height } = ctx.canvas;
        const w = (numRounds + 1) * 100;
        const xRatio = width / (w * 2 + (this.leftOffset + 50));
        //const yRatio = height / (100 + this.topOffset);
        ctx.scale(xRatio, xRatio);
    }

    build8TeamTemplate(ctx, games) {
        this.scaleCanvas(ctx, 3);
        let topOffset = this.topOffset;
        let leftOffset = this.leftOffset;

        //rd 1 games
        const rd1Games = games.filter(g => g.round === 1);
        ctx.canvas.height = rd1Games.length * 150;
        rd1Games.forEach(game => {
            topOffset = this.drawGame(game, ctx, leftOffset, topOffset)
        });

        //rd 2 games;
        leftOffset = leftOffset + 200;
        topOffset = 70;

        const rd2Games = games.filter(g => g.round === 2);
        rd2Games.forEach(game => {
            topOffset = this.drawGame(game, ctx, leftOffset, topOffset)
        });

        //rd 3 games;
        leftOffset = leftOffset + 200;
        topOffset = 145;

        const rd3Games = games.filter(g => g.round === 3);
        rd3Games.forEach(game => {
            topOffset = this.drawGame(game, ctx, leftOffset, topOffset, 3)
        });
    }

    drawGame(game, ctx, leftOffset, topOffset, numRounds=3) {
        ctx.beginPath();
        ctx.moveTo(leftOffset, topOffset);
        ctx.lineTo(200 + leftOffset, topOffset);

        let gameBracketHeight = this.roundBracketHeights[game.round];
        ctx.lineTo(200 + leftOffset, gameBracketHeight + topOffset);
        ctx.lineTo(leftOffset, gameBracketHeight + topOffset);
        ctx.font = "10pt -apple-system, system-ui, Segoe UI";

        ctx.stroke();

        ctx.strokeText(game.team1.name, leftOffset, topOffset - 5)
        ctx.strokeText(game.team2.name, leftOffset, topOffset + gameBracketHeight - 5)

        this.gameTeamRects.push( { gameId: game.id, teamNumber: 1, width: 200, height: 20, x: leftOffset, y: topOffset - 20 });
        this.gameTeamRects.push( { gameId: game.id, teamNumber: 2, width: 200, height: 20, x: leftOffset, y: topOffset + gameBracketHeight - 20 });


        ctx.font = "italic 9pt -apple-system, system-ui, Segoe UI";
        ctx.strokeText(game.location, leftOffset + 50, topOffset + (gameBracketHeight / 2) - 10);
        ctx.strokeText(new Moment(game.gameDate).format("MM/DD/YYYY h:mm a"), leftOffset + 50, topOffset + (gameBracketHeight / 2) + 5);

        ctx.font = "22pt -apple-system, system-ui, Segoe UI";
        ctx.strokeText(game.number, leftOffset + 2, topOffset + (gameBracketHeight / 2) + 5);

        const winnerTeam = this.getWinnerTeam(game);

        if (game.round === numRounds) {
            //this is the champ game
            ctx.moveTo(200 + leftOffset, (gameBracketHeight / 2) + topOffset);
            ctx.lineTo(400 + leftOffset, (gameBracketHeight / 2) + topOffset);
            ctx.stroke();
            if(winnerTeam && winnerTeam.name)
                ctx.strokeText(winnerTeam.name, 205 + leftOffset, (gameBracketHeight / 2) + topOffset - 5)
        }

        return topOffset + gameBracketHeight + (50 * (game.round === 1 ? 1 : game.round + 1));
    }

    build2TeamTemplate(ctx, games) {
        this.scaleCanvas(ctx, 1);

        //Game 1
        const game1 = games.find(g => g.number === 2);
        if (!game1) {
            throw new Error("Couldn't find game 1")
        }
        ctx.beginPath();
        ctx.moveTo(this.leftOffset, this.topOffset);
        ctx.lineTo(200 + this.leftOffset, this.topOffset);
        ctx.lineTo(200 + this.leftOffset, 100 + this.topOffset);
        ctx.lineTo(this.leftOffset, 100 + this.topOffset);

        ctx.moveTo(200 + this.leftOffset, this.topOffset + 50);

        ctx.lineTo(350 + this.leftOffset, 50 + this.topOffset);
        let winnerTeam = '';
        if (game1.winnerTeamId && game1.winnerTeamId !== '') {
            if (game1.winnerTeamId === game1.team1.id) {
                winnerTeam = game1.team1.name;
            }
            if (game1.winnerTeamId === game1.team2.id) {
                winnerTeam = game1.team2.name;
            }
            ctx.strokeText(winnerTeam, 205 + this.leftOffset, this.topOffset + 45)
        }

        ctx.stroke();

        ctx.strokeText(game1.team1.name, this.leftOffset, this.topOffset - 5)
        ctx.strokeText(game1.team2.name, this.leftOffset, this.topOffset + 95)

        ctx.font = "italic 9pt -apple-system, system-ui, Segoe UI";
        ctx.strokeText(game1.location, this.leftOffset + 50, this.topOffset + 40);
        ctx.strokeText(new Moment(game1.gameDate).format("MM/DD/YYYY h:mm a"), this.leftOffset + 50, this.topOffset + 55);

        ctx.font = "22pt -apple-system, system-ui, Segoe UI";
        ctx.strokeText(game1.number, this.leftOffset, this.topOffset + 55);
    }

    getWinnerTeam(game) {
        if (!game.winnerTeamId || game.winnerTeamId === '') {
            return null;
        }

        let winnerTeam = null;
        if (game.winnerTeamId === game.team1.id) {
            winnerTeam = game.team1;
        }
        if (game.winnerTeamId === game.team2.id) {
            winnerTeam = game.team2;
        }
        
        return winnerTeam;
    }

    build3TeamTemplate(ctx, games) {

    }
}

const svc = new BracketRendererService();
export default svc;