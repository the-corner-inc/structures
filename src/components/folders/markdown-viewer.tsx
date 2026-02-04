import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

interface MarkdownViewerProps {
    content: string | null
    loading: boolean
}

/**
 * Markdown Viewer Component
 * 
 * Renders markdown content with syntax highlighting
 * Uses react-markdown and prismjs
 */
export function MarkdownViewer({ content, loading }: MarkdownViewerProps) {
    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <p className="text-muted-foreground">Loading...</p>
            </div>
        )
    }

    if (!content) {
        return (
            <div className="prose dark:prose-invert max-w-none">
                <h1>Workin' on it</h1>
                <p>
                    Feel free to make a PR, it would be really appreciated ;)
                </p>
                <a
                    href="https://github.com/the-corner-inc/structures/tree/main/public/assets"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    https://github.com/the-corner-inc/structures/tree/main/public/assets
                </a>
            </div>
        )
    }

    return (
        <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown
                components={{
                    code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "")
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                            >
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        )
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}
