import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db/drizzle'; // Adjust the import according to your setup
import { Quests } from '@/db/schema'; // Adjust the import according to your schema file

export default async function updateQuest(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id, title, description, rewardPoints, expiresAt } = req.body;

    try {
        const updatedQuest = await db.update(Quests).set({
            title,
            description,
            reward_points: rewardPoints,
            expires_at: expiresAt,
        }).where({ id }).returning();

        return res.status(200).json(updatedQuest);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating quest', error });
    }
}

