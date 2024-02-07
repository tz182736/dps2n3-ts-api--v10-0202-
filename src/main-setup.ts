// * 20231228  (tz182736): before create admin panely, we will use this to setup new database temporary
import * as path from 'path';
const moduleUrl = path.resolve(import.meta.url).replace(/%20/g, ' '); // Resolve relative paths
const filePath = path.resolve(`file://${process.argv[1]}`).replace(/%20/g, ' '); // Resolve file:// URL

import * as userRepository from './drizzle_orm/repository/DpsUserRepository.js';
import * as groupRepository from './drizzle_orm/repository/DpsGroupRepository.js';

if (moduleUrl === filePath) {
    (async () => {
        try {
            await groupRepository.insertGroups(1, '999', 1, true);
            await userRepository.insertUser(1, 'User', '', 1);
            await groupRepository.insertUsersGroups(1, 1, true, true, true);

            await groupRepository.insertGroups(2, 'TrialGroup-1', 1, true);
            await userRepository.insertUser(2, 'u1', 'p1', 1, "KwiEmkkFqKeARRmNXFDvb" );
            await groupRepository.insertUsersGroups(2, 2, true, true, true);

            await groupRepository.insertGroups(3, 'TrialGroup-2', 1, true);
            await groupRepository.insertUsersGroups(2, 3, true, true, true);
            await userRepository.insertUser(3, 'u2', 'p2', 1, "u2key");
            await groupRepository.insertUsersGroups(3, 2, true, true, true);

        } catch (err) {
            // handle the error here, do not rethrow it
            console.error(`!~20 main-setup : ${err}`);
        }
    })();
} 