import { fillRoles } from './roles';

async function seedsStart() {
  await fillRoles();
}

seedsStart().catch((error) => {
  console.error(error);
  process.exit(1);
});
