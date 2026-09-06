
// server/plugins/migrations.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from 'drizzle-orm/node-postgres/migrator';

export default defineNitroPlugin(async () => {
    // Your exact code, wrapped so Nuxt runs it on boot:
    const db = drizzle(process.env.DATABASE_URL as string);
    try {
        await migrate(db, { migrationsFolder: './server/database/migrations' });
    }

    catch (error) {
        console.error('Error running migrations')
        process.exit(1)
    }
});