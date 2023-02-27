import { PrismaClient } from '@prisma/client';

import seed_008_document from './008_document';

const prisma = new PrismaClient();

async function main() {
  seed_008_document(prisma).catch((e) => console.error(e));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
