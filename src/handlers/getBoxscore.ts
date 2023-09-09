import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { BoxscoreModel } from '../models/boxscore';

const BASE_URL = 'https://chumley.barstoolsports.com/dev/data/games/';

export async function getBoxsore (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const boxscorUrl: string = `${BASE_URL}${id}.json`;
    const boxscore = await BoxscoreModel.findOne({ game_id: id });

    if (boxscore) {
        try {
            const lastUpdate = boxscore.updated_at.toString();
            const lastUpdateInMs = Date.parse(lastUpdate);

            const nowInMs = Date.now();
            const dataIsStale = nowInMs - lastUpdateInMs > 15000;

            if (dataIsStale) {
                const date = new Date(nowInMs);
                const dateAsString = date.toISOString();
                const { data } = await axios.get(boxscorUrl);

                const res = await boxscore.updateOne({
                    league: data.league,
                    away_team: {
                        team_id: data.away_team.team_id,
                        abbreviation: data.away_team.abbreviation,
                        active: data.away_team.active,
                        first_name: data.away_team.first_name,
                        last_name: data.away_team.last_name,
                        conference: data.away_team.conference,
                        division: data.away_team.division,
                        site_name: data.away_team.site_name,
                        city: data.away_team.city,
                        state: data.away_team.city,
                        full_name: data.away_team.full_name,
                    },
                    home_team: {
                        team_id: data.home_team.team_id,
                        abbreviation: data.home_team.abbreviation,
                        active: data.home_team.active,
                        first_name: data.home_team.first_name,
                        last_name: data.home_team.last_name,
                        conference: data.home_team.conference,
                        division: data.home_team.division,
                        site_name: data.home_team.site_name,
                        city: data.home_team.city,
                        state: data.home_team.state,
                        full_name: data.home_team.full_name
                    },
                    away_period_scores: data.away_period_scores,
                    home_period_scores: data.home_period_scores,
                    updated_at: dateAsString,
                });

                const updatedBoxscore = await BoxscoreModel.findOne({ game_id: id });

                res.json({ data: updatedBoxscore });
            } else {
                res.json({ data: boxscore });
            }
        } catch (error) {
            res.status(500).json({ message: 'server error' });
            next(error);
        }
    } else {
        try {
            const { data } = await axios.get(boxscorUrl);

            const newBoxscore = new BoxscoreModel({
                game_id: id,
                league: data.league,
                away_team: {
                    team_id: data.away_team.team_id,
                    abbreviation: data.away_team.abbreviation,
                    active: data.away_team.active,
                    first_name: data.away_team.first_name,
                    last_name: data.away_team.last_name,
                    conference: data.away_team.conference,
                    division: data.away_team.division,
                    site_name: data.away_team.site_name,
                    city: data.away_team.city,
                    state: data.away_team.city,
                    full_name: data.away_team.full_name,
                },
                home_team: {
                    team_id: data.home_team.team_id,
                    abbreviation: data.home_team.abbreviation,
                    active: data.home_team.active,
                    first_name: data.home_team.first_name,
                    last_name: data.home_team.last_name,
                    conference: data.home_team.conference,
                    division: data.home_team.division,
                    site_name: data.home_team.site_name,
                    city: data.home_team.city,
                    state: data.home_team.state,
                    full_name: data.home_team.full_name
                },
                away_period_scores: data.away_period_scores,
                home_period_scores: data.home_period_scores,
            });

            await newBoxscore.save();

            res.json({ data: newBoxscore });
        } catch (error) {
            res.status(500).json({ message: 'server error' });
            next(error);
        }
    }
}

