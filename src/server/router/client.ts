import { createTRPCClient } from "@trpc/client";
import { AppRouter } from ".";
import superjson from "superjson";
import { getBaseUrl } from "../../utils/getBaseUrl";

export const client = createTRPCClient<AppRouter>({
  url: `${getBaseUrl()}/api/trpc`,
  transformer: superjson,
});
