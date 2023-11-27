import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

type options = {
	connectionUrl: string;
};
export let db: ReturnType<typeof drizzle<typeof schema>>;

const initDB = async (opts: options) => {
	try {
		const client = postgres(opts.connectionUrl, { max: 1 });
		db = drizzle(client);
		await migrate(db, {
			migrationsFolder: "src/db/migrations",
		}).then(() => {
			console.log("DB_MIGRATED");
		});
	} catch (error) {
		console.log("DB_ERROR", error);
	}
};

export default initDB;
