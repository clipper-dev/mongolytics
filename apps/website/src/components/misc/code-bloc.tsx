import { CopyButton } from "@/components/misc/copy-button";

interface CodeBlockProps {
  code: string;
  title?: string;
}

export function CodeBlock({ code, title }: CodeBlockProps) {
  return (
    <div className="my-6">
      {title && <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>}
      <div className="relative rounded-md bg-card p-4 not-prose">
        <div className="absolute top-2 right-2">
          <CopyButton textToCopy={code} />
        </div>
        <pre className="text-sm overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}