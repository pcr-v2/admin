import prisma from "@/lib/prisma";

export default async function getMe() {
  const test = await prisma.user.findFirst({
    where: {
      name: "test",
    },
  });

  console.log(test);
}
