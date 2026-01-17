import { useBlogs } from "@/hooks/useBlogs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import BlogCard from "./BlogCard";

export default function BlogList({ onSelect }: { onSelect: (id: number) => void }) {
  const { data, isLoading, isError, error, refetch } = useBlogs();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1,2,3].map((i) => (
          <div key={i} className="rounded-xl border p-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-3 h-6 w-3/4" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert>
        <AlertTitle>Failed to load blogs</AlertTitle>
        <AlertDescription className="mt-2">
          {(error as Error)?.message ?? "Something went wrong."}
          <button className="ml-2 underline" onClick={() => refetch()}>
            Retry
          </button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!data?.length) {
    return <p className="text-sm text-muted-foreground">No blogs yet. Create your first blog.</p>;
  }

  return (
    <div className="space-y-3">
      {data.map((b) => (
        <BlogCard key={b.id} blog={b} onClick={() => onSelect(b.id)} />
      ))}
    </div>
  );
}
