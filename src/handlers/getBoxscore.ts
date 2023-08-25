import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

const BASE_URL = 'https://chumley.barstoolsports.com/dev/data/games/';

// ids
// 6c974274-4bfc-4af8-a9c4-8b926637ba74
// eed38457-db28-4658-ae4f-4d4d38e9e212

export async function getBoxsore (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    try {
        const boxscorUrl: string = `${BASE_URL}${id}.json`;
        const { data } = await axios.get(boxscorUrl);

        res.json({ data: data });
    } catch (error) {
        res.status(500).json({ message: 'server error' });
        next(error);
    }
}

