import initDB from "./db";
import initServer from "./server";
import dotenv from "dotenv";

dotenv.config();

const server = initServer({ logger: true });

async function main() {
	try {
		await initDB({
			connectionUrl: process.env.CONNECTION_STRING!,
		}).then(() => {
			console.log("DB connected");
		});

		await server.listen({ port: 3000 });
		console.log("Server listening on 3000");
	} catch (e) {
		console.log("Error on server initialization", e);
	}
}

main();
