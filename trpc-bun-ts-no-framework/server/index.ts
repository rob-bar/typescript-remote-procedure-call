import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
import { db } from "./db.js";
import { publicProcedure, router } from "./trpc.js";

const appRouter = router({
  users: publicProcedure.query(async () => {
    const users = await db.user.read();
    return users;
  }),

  getUserById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    console.log(input);
    const user = await db.user.readById(input);
    return user;
  }),

  createUser: publicProcedure
    .input(z.object({ name: z.string(), description: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;

      const user = await db.user.create(input);
      return user;
    }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);
