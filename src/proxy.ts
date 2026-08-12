import createMiddleware from "next-intl/middleware";
import { routing } from "./routing";

const intlProxy = createMiddleware(routing);

export function proxy(request: Parameters<typeof intlProxy>[0]) {
  return intlProxy(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|studio|.*\\..*).*)"],
};
