
import { eq, lt, gte, ne, sql, and } from 'drizzle-orm';

import { dbDps2n3 } from '../dps_database.js';
import { User_select, dpsUser } from '../schemas/DpsUser.js';
import { users_groups } from '../schemas/Dps_users_groups.js';
import { dpsGroup } from '../schemas/DpsGroup.js';

export const findAll = async () => await dbDps2n3.select().from(dpsUser).all();

export async function findByName(userName: string): Promise<User_select | undefined> {

    let condition = sql``;
    if (typeof userName !== "undefined") {
        condition = condition.append(eq(dpsUser.userName, userName));
    }
    // const result: User_select = await dbDps2n3.get(eq(user.userName, userName));
    const result = await dbDps2n3.select().from(dpsUser).where(eq(dpsUser.userName, userName)).get();
    return result;
}

export async function insertUser(userId: number, userName: string, password: string, userStatus:number, apiKey?: string, active: boolean = true) {
    const result = await dbDps2n3.insert(dpsUser).values([{ userId, userName, password, apiKey, userStatus, active }]).returning();
    return result.length > 0 ? result[0] : null;
}

export async function updateUser(id: number, userName: string, password: string, apiKey: string) {
    return await dbDps2n3.update(dpsUser).set({ password, apiKey }).where(eq(dpsUser.userName, userName)).execute();
}

export const deleteUser = async (id: number) => await dbDps2n3.delete(dpsUser).where(eq(dpsUser.userId, id)).execute();

export const upsertUserGroup = async (userName: string, groupId: number, editLockedItem: boolean, deleteLockedItem: boolean, active: boolean = true) => {

    const foundUser = dbDps2n3.select().from(dpsUser).where(eq(dpsUser.userName, userName)).get();
    if (!foundUser) throw new Error("~33: user name not found");

    const foundUsersGroups = dbDps2n3.select().from(users_groups).where(and(eq(users_groups.userId, foundUser.userId), eq(users_groups.groupId, groupId))).get();

    if (!foundUsersGroups) {
        await dbDps2n3.insert(users_groups).values([{ userId: foundUser.userId, groupId, editLockedItem, deleteLockedItem, active }]).returning();
    } else {
        await dbDps2n3.update(users_groups).set({ editLockedItem, deleteLockedItem, active }).where(and(eq(users_groups.userId, foundUser.userId), eq(users_groups.groupId, groupId))).execute();
    }
};
export const deleteUser_SaleGroup = async (userName: string, groupId: number) => {
    const foundUser = dbDps2n3.select().from(dpsUser).where(eq(dpsUser.userName, userName)).get();
    if (!foundUser) throw new Error("~33: user name not found");

    dbDps2n3.delete(users_groups).where(and(eq(users_groups.userId, foundUser.userId), eq(users_groups.groupId, groupId))).execute();

}

/** 20240126: find user group list in join table by apiKey. User must be authenticated and key is generated. */
export async function findGroupIdListByApikey(apiKey: string, status: number = 1): Promise<Array<number>> {
    const rows = await dbDps2n3
        .select({ groupId: users_groups.groupId })
        .from(dpsUser)
        .leftJoin(users_groups, eq(dpsUser.userId, users_groups.userId))
        .where(eq(dpsUser.apiKey, apiKey));

    // Extract and cast the groupId values
    const groupIdList = rows.map((row) => row.groupId) as number[];
    return groupIdList;
}

/** to be use in user data request by sale group */
export async function IsUser_hasSaleGroup(apiKey: string, groupId: number, status: number = 1): Promise<boolean> {
    const result = await dbDps2n3
        .select({ groupId: users_groups.groupId })
        .from(dpsUser)
        .leftJoin(users_groups, eq(dpsUser.userId, users_groups.userId))
        .where(and(eq(dpsUser.apiKey, apiKey), eq(users_groups.groupId, groupId)))
        .get();

    // Extract and cast the groupId values
    return (result && result != null) ? true : false;
}