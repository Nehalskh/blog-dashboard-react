import { useBlog } from "@/hooks/useBlog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

type Props = {
  selectedId: number | null;
};

export default function BlogDetail({ selectedId }: Props) {
  const {
    data: blog,
    isLoading,
    isError,
    error,
    refetch,
  } = useBlog(selectedId);

  // Nothing selected yet
  if (!selectedId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Select a blog</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Click any blog on the left to see details here.
        </CardContent>
      </Card>
    );
  }

  // Loading
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="space-y-3">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </CardContent>
      </Card>
    );
  }

  // Error
  if (isError) {
    return (
      <Alert>
        <AlertTitle>Failed to load blog</AlertTitle>
        <AlertDescription className="mt-2 space-y-2">
          <div>{(error as Error)?.message ?? "Something went wrong."}</div>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!blog) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Blog not found</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Try selecting another blog.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      {blog.coverImage ? (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="h-56 w-full object-cover"
        />
      ) : null}

      <CardHeader className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {blog.category?.map((c: string) => (
            <Badge key={c} variant="secondary">
              {c}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-xl">{blog.title}</CardTitle>
        {blog.description ? (
          <p className="text-sm text-muted-foreground">{blog.description}</p>
        ) : null}
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="whitespace-pre-wrap leading-relaxed">{blog.content}</p>
      </CardContent>
    </Card>
  );
}
