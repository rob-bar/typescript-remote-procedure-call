import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server/index.js";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});

/**
 * Inferring types
 */
const users = await trpc.users;
console.log("Users:", users);

const createdUser = await trpc.createUser.mutate({
  name: "Alice",
  description:
    "A passionate software developer with a keen interest in open-source projects.",
});

const createdSecondUser = await trpc.createUser.mutate({
  name: "Bob",
  description:
    "A digital artist who loves to explore the intersection of technology and art.",
});

const user = await trpc.getUserById.query("1");
console.log("User 1:", user);

const userBob = await trpc.getUserById.query("2");
console.log("User 2:", userBob);
