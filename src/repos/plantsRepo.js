import {client,pool} from '../db/database.js';
import Plants from '../models/PLantModel.js';
import unsplash from "../api/unsplash.js";

class PlantsRepo{
    async save(unsplashId){
        const query = {
            text: 'INSERT INTO plants (unsplash_id) VALUES ($1);',
            values: [unsplashId],
        }
        const result = await pool.query(query);
        return result.rows[0];
    }
}