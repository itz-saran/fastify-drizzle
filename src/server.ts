import Fastify, {
	type FastifyBaseLogger,
	type FastifyHttpOptions,
} from "fastify";
import type http from "http";

type OptionsType = FastifyHttpOptions<http.Server, FastifyBaseLogger>;

const initServer = (opts: OptionsType = {}) => {
	const server = Fastify(opts);
	return server;
};

export default initServer;
