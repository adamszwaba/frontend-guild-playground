import { createRouter } from "./context";
import { z } from "zod";
import { createNextApiHandler } from "@trpc/server/adapters/next";

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany();
    },
  })
  .query("pathnames", {
    async resolve({ ctx }) {
      return await ctx.prisma.pathnames.findMany();
    },
  })
  .mutation("pathnames", {
    input: z.object({ pathname: z.string() }),
    async resolve({ ctx, input }) {
      const existingPathname = await ctx.prisma.pathnames.findUnique({
        where: {
          pathname: input.pathname,
        },
      });
      if (existingPathname) {
        return await ctx.prisma.pathnames.update({
          where: {
            pathname: input.pathname,
          },
          data: {
            visitCount: existingPathname.visitCount + 1,
          },
        });
      }
      return await ctx.prisma.pathnames.create({
        data: {
          pathname: input.pathname,
        },
      });
    },
  });
