import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/db/drizzle'; 
import { Quests } from '@/db/schema'; 

export default async function deleteQuest(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id } = req.body;

    try {
        await db.delete(Quests).where({ id });
        return res.status(204).end();
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting quest', error });
    }
}
