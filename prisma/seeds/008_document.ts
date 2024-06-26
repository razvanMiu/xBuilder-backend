import { PrismaClient } from '@prisma/client';

const documentFields = [
  'uuid',
  'parent',
  'id',
  'path',
  'created',
  'modified',
  'type',
  'position_in_parent',
  'version',
  'versions',
  'owner',
  'lock',
  'workflow_state',
  'workflow_history',
  'sharing',
];

export default async function main(prisma: PrismaClient) {
  console.log('Seeding 0008_document');
  console.log('HERE', await prisma.user.findFirst());
}

// import { dropRight, last, map, omit } from 'lodash';
// import { promises as fs } from 'fs';
// import moment from 'moment';
// import { v4 as uuid } from 'uuid';

// import { dirExists, log, mapAsync, stripI18n } from '../helpers';
// import { Document, Model } from '../models';

// const { config } = require(`${process.cwd()}/config`);

// const documentFields = [
//   'uuid',
//   'parent',
//   'id',
//   'path',
//   'created',
//   'modified',
//   'type',
//   'position_in_parent',
//   'version',
//   'versions',
//   'owner',
//   'lock',
//   'workflow_state',
//   'workflow_history',
//   'sharing',
// ];

// const versionFields = ['uuid', 'version', 'id', 'created', 'actor', 'document'];

// export const seed = async (knex) => {
//   const trx = await knex.transaction();

//   try {
//     await Promise.all(
//       map(config.profiles, async (profilePath) => {
//         if (dirExists(`${profilePath}/documents`)) {
//           const children = {};
//           const files = map(
//             await fs.readdir(`${profilePath}/documents`),
//             (file) => dropRight(file.split('.')).join('.'),
//           ).sort();
//           await mapAsync(files, async (file) => {
//             const document = stripI18n(
//               require(`${profilePath}/documents/${file}`),
//             );
//             const slugs = file.split('.');
//             const id = last(slugs) === '_root' ? 'root' : last(slugs);
//             const path = last(slugs) === '_root' ? '/' : `/${slugs.join('/')}`;
//             const parent =
//               last(slugs) === '_root'
//                 ? undefined
//                 : (
//                     await Document.fetchOne(
//                       {
//                         path: `/${dropRight(slugs).join('/')}`,
//                       },
//                       {},
//                       trx,
//                     )
//                   ).uuid;
//             const position_in_parent = parent ? children[parent] || 0 : 0;
//             if (parent) {
//               children[parent] = parent in children ? children[parent] + 1 : 1;
//             }

//             const versionCount =
//               'versions' in document ? document.versions.length : 1;

//             // Insert document
//             const insert = await Document.create(
//               {
//                 uuid: document.uuid || uuid(),
//                 version:
//                   'version' in document ? document.version : versionCount - 1,
//                 id,
//                 path,
//                 parent,
//                 position_in_parent:
//                   document.position_in_parent || position_in_parent,
//                 lock: document.lock || {
//                   locked: false,
//                   stealable: true,
//                 },
//                 owner: document.owner || 'admin',
//                 workflow_state: document.workflow_state || 'published',
//                 workflow_history: JSON.stringify(
//                   document.workflow_history || [],
//                 ),
//                 type: document.type || 'Page',
//                 created: document.created || moment.utc().format(),
//                 modified: document.modified || moment.utc().format(),
//                 json: omit(document, documentFields),
//               },
//               {},
//               trx,
//             );

//             // Create versions
//             const versions =
//               'versions' in document
//                 ? map(document.versions, (version, index) => ({
//                     version: version.version || index,
//                     created: version.created || moment.utc().format(),
//                     actor: version.actor || 'admin',
//                     id: version.id || id,
//                     json: omit(version, versionFields),
//                   }))
//                 : [
//                     {
//                       version: 0,
//                       created: document.created || moment.utc().format(),
//                       actor: document.owner || 'admin',
//                       id,
//                       json: omit(document, documentFields),
//                     },
//                   ];

//             // Insert versions
//             await mapAsync(versions, async (version) => {
//               await insert.createRelated('_versions', version, trx);
//             });

//             // Insert sharing data for users
//             const sharingUsers = document.sharing?.users || [];
//             await mapAsync(sharingUsers, async (user) =>
//               mapAsync(
//                 user.roles,
//                 async (role) =>
//                   await insert
//                     .$relatedQuery('_userRoles', trx)
//                     .relate({ id: role, user: user.id }),
//               ),
//             );

//             // Insert sharing data for groups
//             const sharingGroups = document.sharing?.groups || [];
//             await mapAsync(sharingGroups, async (group) =>
//               mapAsync(
//                 group.roles,
//                 async (role) =>
//                   await insert
//                     .$relatedQuery('_groupRoles', trx)
//                     .relate({ id: role, group: group.id }),
//               ),
//             );

//             // Index object
//             await insert.index(trx);
//           });
//         }
//       }),
//     );
//     await trx.commit();
//     log.info('Documents imported');
//   } catch (err) {
//     await trx.rollback();
//     log.error(err);
//   }
// };
