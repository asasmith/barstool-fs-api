import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const BoxscoreSchema = new Schema({
    game_id: String,
    league: String,
    away_team: {
        team_id: String,
        abbreviation: String,
        active: Boolean,
        first_name: String,
        last_name: String,
        conference: String,
        division: String,
        site_name: String,
        city: String,
        state: String,
        full_name: String
    },
    home_team: {
        team_id: String,
        abbreviation: String,
        active: Boolean,
        first_name: String,
        last_name: String,
        conference: String,
        division: String,
        site_name: String,
        city: String,
        state: String,
        full_name: String
    },
    away_period_scores: Array,
    home_period_scores: Array,
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

export const BoxscoreModel = mongoose.model('BoxscoreModel', BoxscoreSchema);
