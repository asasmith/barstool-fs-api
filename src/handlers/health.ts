import { Request, Response } from 'express';

export async function getServerStatus (_req: Request, res: Response): Promise<void> {
    res.status(200).end();
}
