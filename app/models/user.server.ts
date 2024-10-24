import { prisma } from "../services/prisma.server";

export const createUser = async (
  email: string,
  provider: string,
  name: string,
  photo: string
) => {
  const user = await prisma.user.create({
    data: {
      email,
      provider,
      name,
      photo,
    },
  });
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })
  return user;
};
