type User = {
  id: string;
  name: string;
  description: string;
};

const users: User[] = [];

export const db = {
  user: {
    read: async () => users,
    readById: async (id: string) => {
      return users.find((user) => user.id === id);
    },
    create: async (newUser: Omit<User, "id">) => {
      const user = {
        id: String(users.length + 1),
        ...newUser,
      };
      users.push(user);
      return user;
    },
  },
};
