import { createRouter, createRootRoute, Scripts, createFileRoute, lazyRouteComponent, Link } from '@tanstack/react-router';
import { jsxs, jsx } from 'react/jsx-runtime';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { Sun, Moon } from 'lucide-react';
import { ThemeProvider, useTheme } from 'next-themes';

function ModeToggle() {
  const { theme, setTheme } = useTheme();
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
      className: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 w-10",
      "aria-label": "Toggle theme",
      children: [
        /* @__PURE__ */ jsx(Sun, { className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
        /* @__PURE__ */ jsx(Moon, { className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle theme" })
      ]
    }
  );
}
function Header() {
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsxs("div", { className: "container flex h-14 items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "mr-4 flex", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "mr-6 flex items-center space-x-2", children: /* @__PURE__ */ jsx("span", { className: "font-bold text-xl", children: "Structures" }) }),
      /* @__PURE__ */ jsx("nav", { className: "flex items-center space-x-6 text-sm font-medium", children: /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "transition-colors hover:text-foreground/80",
          activeProps: { className: "text-foreground" },
          inactiveProps: { className: "text-foreground/60" },
          children: "Folders"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-1 items-center justify-end space-x-2", children: /* @__PURE__ */ jsx("nav", { className: "flex items-center", children: /* @__PURE__ */ jsx(ModeToggle, {}) }) })
  ] }) });
}
function Providers({ children }) {
  return /* @__PURE__ */ jsx(ThemeProvider, { attribute: "class", defaultTheme: "system", enableSystem: true, children });
}
const appCss = "/assets/styles-DN6ZQxdD.css";
const Route$1 = createRootRoute({
  head: () => ({
    meta: [
      { title: "Structures - Project Organization Visualizer" },
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        name: "description",
        content: "Visualize, document, and share project organization standards with an interactive VS Code-like interface"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsxs(Providers, { children: [
        /* @__PURE__ */ jsx(Header, {}),
        /* @__PURE__ */ jsx("main", { className: "flex-1", children })
      ] }),
      /* @__PURE__ */ jsx(
        TanStackDevtools,
        {
          config: {
            position: "bottom-right"
          },
          plugins: [
            {
              name: "Tanstack Router",
              render: /* @__PURE__ */ jsx(TanStackRouterDevtoolsPanel, {})
            }
          ]
        }
      ),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter = () => import('./index-DvdI6yuw.mjs');
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$1
});
const rootRouteChildren = {
  IndexRoute
};
const routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  return createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
};

export { getRouter };
//# sourceMappingURL=router-CUG6pnVy.mjs.map
