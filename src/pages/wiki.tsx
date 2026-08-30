import { useQuery } from '@tanstack/react-query';
import { wikiApi } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export function WikiPage() {
  const { data: tree, isLoading } = useQuery({
    queryKey: ['wiki-tree'],
    queryFn: wikiApi.tree,
  });

  const renderTree = (nodes: any[], depth = 0) => (
    <ul className={depth > 0 ? 'ml-4 border-l pl-4' : ''}>
      {nodes.map((node) => (
        <li key={node.id} className="py-1">
          <Link to={`/wiki/${node.slug}`} className="text-primary hover:underline">
            {node.title}
          </Link>
          {node.children?.length > 0 && renderTree(node.children, depth + 1)}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Wiki</h1>
      <Card>
        <CardHeader>
          <CardTitle>Pages</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : tree?.length ? (
            renderTree(tree)
          ) : (
            <p className="text-muted-foreground">No wiki pages yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function WikiPageDetail({ slug }: { slug: string }) {
  const { data: page, isLoading } = useQuery({
    queryKey: ['wiki-page', slug],
    queryFn: () => wikiApi.get(slug),
  });

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;
  if (!page) return <p className="text-muted-foreground">Page not found.</p>;

  return (
    <div className="space-y-6">
      <div>
        <Link to="/wiki" className="text-sm text-muted-foreground hover:underline">← Back to Wiki</Link>
        <h1 className="mt-2 text-3xl font-bold">{page.title}</h1>
        {page.tags?.length > 0 && (
          <div className="mt-2 flex gap-2">
            {page.tags.map((tag: string) => (
              <span key={tag} className="rounded bg-secondary px-2 py-0.5 text-xs">{tag}</span>
            ))}
          </div>
        )}
      </div>
      <div className="prose max-w-none">
        {page.content}
      </div>
    </div>
  );
}
