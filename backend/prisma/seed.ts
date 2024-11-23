import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed types
  const types = [
    { type: 'Electronics', typeID: '1' },
    { type: 'Clothing', typeID: '2' },
    { type: 'Books', typeID: '3' },
  ];
  for (const type of types) {
    await prisma.type.upsert({
      where: { typeID: type.typeID }, // ใช้ typeID ที่เป็น unique
      update: {},
      create: type,
    });
  }

  // Seed products
  const products = [
    { name: 'Laptop', price: 1000, code: 'P001', type: 'Electronics', image: null },
    { name: 'T-shirt', price: 20, code: 'P002', type: 'Clothing', image: null },
  ];
  for (const product of products) {
    await prisma.product.upsert({
      where: { code: product.code }, // ใช้ code ที่เป็น unique
      update: {},
      create: product,
    });
  }
}

main()
  .then(() => {
    console.log('Seeded successfully');
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
