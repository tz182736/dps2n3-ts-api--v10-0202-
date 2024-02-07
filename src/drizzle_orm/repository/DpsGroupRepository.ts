// TODO: (tz182736) pending further development till server admin portal development.
import { eq, lt, gte, ne, and } from 'drizzle-orm';

import { dbDps2n3 } from '../dps_database.js';
import { dpsUser } from '../schemas/DpsUser.js';
import { SaleGp_select, dpsGroup } from '../schemas/DpsGroup.js';
import { users_groups } from '../schemas/Dps_users_groups.js';


export async function findAll() {
    return await dbDps2n3.select().from(dpsUser).all();
}

export async function findByName(groupId: number): Promise<SaleGp_select | undefined> {

    return await dbDps2n3.select().from(dpsGroup).where(eq(dpsGroup.groupId, groupId)).get();
}

export async function findUserByGroupId(groupId: number) {

    const rows = await dbDps2n3
        .select({ userId: dpsUser.userId, userName: dpsUser.userName })
        .from(dpsUser)
        .leftJoin(users_groups, eq(dpsUser.userId, users_groups.userId))
        .where(eq(users_groups.groupId, groupId));

    return rows;
}

export async function insertGroups(groupId: number, groupName: string, groupStatus: number, active: boolean) {
    const result = await dbDps2n3.insert(dpsGroup).values([{ groupId, groupName, groupStatus, active }]).returning();
    return result.length > 0 ? result[0] : null;
}

export async function insertUsersGroups(userId: number, groupId: number, editLockedItem: boolean, deleteLockedItem: boolean, active: boolean) {
    const result = await dbDps2n3.insert(users_groups).values([{ userId, groupId, editLockedItem, deleteLockedItem, active }]).returning();
    return result.length > 0 ? result[0] : null;
}

export async function updateUsersGroups(userId: number, groupId: number, active: boolean) {
    return await dbDps2n3.update(users_groups).set({ groupId, active }).where(and(
        eq(users_groups.userId, userId),
        eq(users_groups.groupId, groupId)
    )).execute();
}

export const deletedStoreGroup = async (id: number) => await dbDps2n3.delete(dpsGroup).where(eq(users_groups.id, id)).execute();

