import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import ReactMarkdown from 'react-markdown';
import { Prism } from 'react-syntax-highlighter';
import { generateManifest } from 'material-icon-theme';

const vscDarkPlus = {
  "pre[class*=\"language-\"]": {
    "color": "#d4d4d4",
    "fontSize": "13px",
    "textShadow": "none",
    "fontFamily": "Menlo, Monaco, Consolas, \"Andale Mono\", \"Ubuntu Mono\", \"Courier New\", monospace",
    "direction": "ltr",
    "textAlign": "left",
    "whiteSpace": "pre",
    "wordSpacing": "normal",
    "wordBreak": "normal",
    "lineHeight": "1.5",
    "MozTabSize": "4",
    "OTabSize": "4",
    "tabSize": "4",
    "WebkitHyphens": "none",
    "MozHyphens": "none",
    "msHyphens": "none",
    "hyphens": "none",
    "padding": "1em",
    "margin": ".5em 0",
    "overflow": "auto",
    "background": "#1e1e1e"
  },
  "code[class*=\"language-\"]": {
    "color": "#d4d4d4",
    "fontSize": "13px",
    "textShadow": "none",
    "fontFamily": "Menlo, Monaco, Consolas, \"Andale Mono\", \"Ubuntu Mono\", \"Courier New\", monospace",
    "direction": "ltr",
    "textAlign": "left",
    "whiteSpace": "pre",
    "wordSpacing": "normal",
    "wordBreak": "normal",
    "lineHeight": "1.5",
    "MozTabSize": "4",
    "OTabSize": "4",
    "tabSize": "4",
    "WebkitHyphens": "none",
    "MozHyphens": "none",
    "msHyphens": "none",
    "hyphens": "none"
  },
  "pre[class*=\"language-\"]::selection": {
    "textShadow": "none",
    "background": "#264F78"
  },
  "code[class*=\"language-\"]::selection": {
    "textShadow": "none",
    "background": "#264F78"
  },
  "pre[class*=\"language-\"] *::selection": {
    "textShadow": "none",
    "background": "#264F78"
  },
  "code[class*=\"language-\"] *::selection": {
    "textShadow": "none",
    "background": "#264F78"
  },
  ":not(pre) > code[class*=\"language-\"]": {
    "padding": ".1em .3em",
    "borderRadius": ".3em",
    "color": "#db4c69",
    "background": "#1e1e1e"
  },
  ".namespace": {
    "Opacity": ".7"
  },
  "doctype.doctype-tag": {
    "color": "#569CD6"
  },
  "doctype.name": {
    "color": "#9cdcfe"
  },
  "comment": {
    "color": "#6a9955"
  },
  "prolog": {
    "color": "#6a9955"
  },
  "punctuation": {
    "color": "#d4d4d4"
  },
  ".language-html .language-css .token.punctuation": {
    "color": "#d4d4d4"
  },
  ".language-html .language-javascript .token.punctuation": {
    "color": "#d4d4d4"
  },
  "property": {
    "color": "#9cdcfe"
  },
  "tag": {
    "color": "#569cd6"
  },
  "boolean": {
    "color": "#569cd6"
  },
  "number": {
    "color": "#b5cea8"
  },
  "constant": {
    "color": "#9cdcfe"
  },
  "symbol": {
    "color": "#b5cea8"
  },
  "inserted": {
    "color": "#b5cea8"
  },
  "unit": {
    "color": "#b5cea8"
  },
  "selector": {
    "color": "#d7ba7d"
  },
  "attr-name": {
    "color": "#9cdcfe"
  },
  "string": {
    "color": "#ce9178"
  },
  "char": {
    "color": "#ce9178"
  },
  "builtin": {
    "color": "#ce9178"
  },
  "deleted": {
    "color": "#ce9178"
  },
  ".language-css .token.string.url": {
    "textDecoration": "underline"
  },
  "operator": {
    "color": "#d4d4d4"
  },
  "entity": {
    "color": "#569cd6"
  },
  "operator.arrow": {
    "color": "#569CD6"
  },
  "atrule": {
    "color": "#ce9178"
  },
  "atrule.rule": {
    "color": "#c586c0"
  },
  "atrule.url": {
    "color": "#9cdcfe"
  },
  "atrule.url.function": {
    "color": "#dcdcaa"
  },
  "atrule.url.punctuation": {
    "color": "#d4d4d4"
  },
  "keyword": {
    "color": "#569CD6"
  },
  "keyword.module": {
    "color": "#c586c0"
  },
  "keyword.control-flow": {
    "color": "#c586c0"
  },
  "function": {
    "color": "#dcdcaa"
  },
  "function.maybe-class-name": {
    "color": "#dcdcaa"
  },
  "regex": {
    "color": "#d16969"
  },
  "important": {
    "color": "#569cd6"
  },
  "italic": {
    "fontStyle": "italic"
  },
  "class-name": {
    "color": "#4ec9b0"
  },
  "maybe-class-name": {
    "color": "#4ec9b0"
  },
  "console": {
    "color": "#9cdcfe"
  },
  "parameter": {
    "color": "#9cdcfe"
  },
  "interpolation": {
    "color": "#9cdcfe"
  },
  "punctuation.interpolation-punctuation": {
    "color": "#569cd6"
  },
  "variable": {
    "color": "#9cdcfe"
  },
  "imports.maybe-class-name": {
    "color": "#9cdcfe"
  },
  "exports.maybe-class-name": {
    "color": "#9cdcfe"
  },
  "escape": {
    "color": "#d7ba7d"
  },
  "tag.punctuation": {
    "color": "#808080"
  },
  "cdata": {
    "color": "#808080"
  },
  "attr-value": {
    "color": "#ce9178"
  },
  "attr-value.punctuation": {
    "color": "#ce9178"
  },
  "attr-value.punctuation.attr-equals": {
    "color": "#d4d4d4"
  },
  "namespace": {
    "color": "#4ec9b0"
  },
  "pre[class*=\"language-javascript\"]": {
    "color": "#9cdcfe"
  },
  "code[class*=\"language-javascript\"]": {
    "color": "#9cdcfe"
  },
  "pre[class*=\"language-jsx\"]": {
    "color": "#9cdcfe"
  },
  "code[class*=\"language-jsx\"]": {
    "color": "#9cdcfe"
  },
  "pre[class*=\"language-typescript\"]": {
    "color": "#9cdcfe"
  },
  "code[class*=\"language-typescript\"]": {
    "color": "#9cdcfe"
  },
  "pre[class*=\"language-tsx\"]": {
    "color": "#9cdcfe"
  },
  "code[class*=\"language-tsx\"]": {
    "color": "#9cdcfe"
  },
  "pre[class*=\"language-css\"]": {
    "color": "#ce9178"
  },
  "code[class*=\"language-css\"]": {
    "color": "#ce9178"
  },
  "pre[class*=\"language-html\"]": {
    "color": "#d4d4d4"
  },
  "code[class*=\"language-html\"]": {
    "color": "#d4d4d4"
  },
  ".language-regex .token.anchor": {
    "color": "#dcdcaa"
  },
  ".language-html .token.punctuation": {
    "color": "#808080"
  },
  "pre[class*=\"language-\"] > code[class*=\"language-\"]": {
    "position": "relative",
    "zIndex": "1"
  },
  ".line-highlight.line-highlight": {
    "background": "#f7ebc6",
    "boxShadow": "inset 5px 0 0 #f7d87c",
    "zIndex": "0"
  }
};

function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function FoldersSidenav({
  structures,
  manifest,
  selectedElement,
  onElementClick
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const iconBaseUrl = "https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/main/icons/";
  const filteredStructures = structures.filter(
    (item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "p-4 border-b", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Explorer" }),
      /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Search...",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "w-full px-3 py-2 bg-background border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-2", children: filteredStructures.map((item) => /* @__PURE__ */ jsx(
      FolderItem,
      {
        item,
        manifest,
        iconBaseUrl,
        selectedElement,
        onElementClick,
        level: 0
      },
      item.name
    )) })
  ] });
}
function FolderItem({
  item,
  manifest,
  iconBaseUrl,
  selectedElement,
  onElementClick,
  level
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isSelected = selectedElement?.name === item.name;
  const handleClick = () => {
    if (hasChildren) {
      setExpanded(!expanded);
    }
    onElementClick(item.name);
  };
  const iconName = getIconName(item.name, item.type, expanded, manifest);
  const iconUrl = iconBaseUrl + iconName;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: handleClick,
        className: cn(
          "w-full flex items-center gap-1 px-2 py-1 rounded hover:bg-accent text-sm transition-colors",
          isSelected && "bg-accent"
        ),
        style: { paddingLeft: `${level * 12 + 8}px` },
        children: [
          item.type === "folder" && /* @__PURE__ */ jsx(
            ChevronRight,
            {
              className: cn(
                "w-4 h-4 transition-transform flex-shrink-0",
                expanded && "rotate-90"
              )
            }
          ),
          item.type !== "folder" && /* @__PURE__ */ jsx("span", { className: "w-4" }),
          /* @__PURE__ */ jsx("img", { src: iconUrl, alt: `${item.name} icon`, className: "w-4 h-4 flex-shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "truncate", children: item.name })
        ]
      }
    ),
    hasChildren && expanded && /* @__PURE__ */ jsx("div", { children: item.children.map((child) => /* @__PURE__ */ jsx(
      FolderItem,
      {
        item: child,
        manifest,
        iconBaseUrl,
        selectedElement,
        onElementClick,
        level: level + 1
      },
      child.name
    )) })
  ] });
}
function getIconName(name, type, expanded, manifest) {
  if (!name) return type === "folder" ? "folder.svg" : "file.svg";
  let iconKey;
  if (type === "folder") {
    const folderName = name.toLowerCase();
    if (expanded && manifest.folderNamesExpanded) {
      iconKey = manifest.folderNamesExpanded[folderName] || manifest.folderNamesExpanded[folderName.replace(/s$/, "")] || manifest.folderNamesExpanded[folderName.replace(/_/g, "")];
    }
    if (!iconKey && manifest.folderNames) {
      iconKey = manifest.folderNames[folderName] || manifest.folderNames[folderName.replace(/s$/, "")] || manifest.folderNames[folderName.replace(/_/g, "")];
    }
    if (!iconKey) {
      iconKey = expanded ? manifest.folderExpanded ?? "folder-open" : manifest.folder ?? "folder";
    }
  } else {
    const fileName = name.toLowerCase();
    iconKey = manifest.fileNames?.[fileName];
    if (!iconKey && fileName.includes(".")) {
      const parts = fileName.split(".");
      for (let i = 1; i < parts.length; i++) {
        const ext = parts.slice(i).join(".");
        if (manifest.fileExtensions?.[ext]) {
          iconKey = manifest.fileExtensions[ext];
          break;
        }
      }
    }
    if (!iconKey) {
      const ext = fileName.split(".").pop();
      if (ext && manifest.fileExtensions?.[ext]) {
        iconKey = manifest.fileExtensions[ext];
      }
    }
    if (!iconKey && manifest.languageIds) {
      const ext = fileName.split(".").pop();
      if (ext && manifest.languageIds[ext]) {
        iconKey = manifest.languageIds[ext];
      }
    }
    if (!iconKey) {
      iconKey = manifest.file ?? "file";
    }
  }
  const iconDef = manifest.iconDefinitions?.[iconKey];
  if (iconDef?.iconPath) {
    const parts = iconDef.iconPath.split("/");
    return parts[parts.length - 1];
  }
  return type === "folder" ? expanded ? "folder-open.svg" : "folder.svg" : "file.svg";
}
function MarkdownViewer({ content }) {
  return /* @__PURE__ */ jsx("div", { className: "markdown-content prose prose-neutral dark:prose-invert max-w-none", children: /* @__PURE__ */ jsx(
    ReactMarkdown,
    {
      components: {
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? /* @__PURE__ */ jsx(
            Prism,
            {
              style: vscDarkPlus,
              language: match[1],
              PreTag: "div",
              ...props,
              children: String(children).replace(/\n$/, "")
            }
          ) : /* @__PURE__ */ jsx("code", { className, ...props, children });
        }
      },
      children: content
    }
  ) });
}
async function fetchFolderSettings(settingsUrl) {
  try {
    let url = settingsUrl;
    if (!settingsUrl.startsWith("https://")) {
      url = settingsUrl + "settings.json";
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch settings: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to load folder settings", error);
    return null;
  }
}
async function fetchMarkdownContent(fileName, settingsUrl) {
  if (!fileName) {
    return null;
  }
  try {
    let url;
    if (settingsUrl.startsWith("https://")) {
      url = settingsUrl + "md/" + fileName.toLowerCase() + ".md.md";
    } else {
      url = `https://raw.githubusercontent.com/the-corner-inc/structures/main/public${settingsUrl}md/${fileName.toLowerCase()}.md`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Failed to load markdown content", error);
    return null;
  }
}
function findElementByName(structures, name) {
  for (const folder of structures) {
    if (folder.name === name) {
      return folder;
    }
    if (folder.children && folder.children.length > 0) {
      const found = findElementByName(folder.children, name);
      if (found) {
        return found;
      }
    }
  }
  return null;
}
function getManifest(config) {
  return generateManifest(config);
}
function IndexPage() {
  const [settings, setSettings] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [markdownContent, setMarkdownContent] = useState(null);
  const [loadingMarkdown, setLoadingMarkdown] = useState(false);
  const [manifest, setManifest] = useState(getManifest());
  const settingsUrl = "/assets/go/";
  useEffect(() => {
    async function loadSettings() {
      const data = await fetchFolderSettings(settingsUrl);
      if (data) {
        setSettings(data);
        if (data.manifestConfig) {
          setManifest(getManifest(data.manifestConfig));
        }
      }
    }
    loadSettings();
  }, [settingsUrl]);
  useEffect(() => {
    async function loadMarkdown() {
      if (!selectedElement) {
        setMarkdownContent(null);
        return;
      }
      setLoadingMarkdown(true);
      const content = await fetchMarkdownContent(selectedElement.name, settingsUrl);
      setMarkdownContent(content);
      setLoadingMarkdown(false);
    }
    loadMarkdown();
  }, [selectedElement, settingsUrl]);
  const handleElementClick = (name) => {
    if (!settings) return;
    const element = findElementByName(settings.structures, name);
    setSelectedElement(element);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex h-[calc(100vh-3.5rem)]", children: [
    /* @__PURE__ */ jsx("aside", { className: "w-80 border-r overflow-y-auto", children: /* @__PURE__ */ jsx(FoldersSidenav, { structures: settings?.structures || [], manifest, selectedElement, onElementClick: handleElementClick }) }),
    /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-6", children: [
      loadingMarkdown && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Loading..." }) }),
      !loadingMarkdown && markdownContent && /* @__PURE__ */ jsx(MarkdownViewer, { content: markdownContent }),
      !loadingMarkdown && !markdownContent && selectedElement && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground", children: [
        "No documentation available for ",
        selectedElement.name
      ] }) }),
      !selectedElement && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Select a file or folder to view its documentation" }) })
    ] }) })
  ] });
}

export { IndexPage as component };
//# sourceMappingURL=index-DvdI6yuw.mjs.map
