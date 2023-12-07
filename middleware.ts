import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/cooks",
    "/cooks/:id",
    "/recipes",
    "/recipes/:id",
    "/api/cooks",
    "/api/cooks/:id",
    "/api/recipes",
    "/api/recipes/:id",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
