import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BlogCard({ blog, onClick }: any) {
  return (
    <Card onClick={onClick} className="cursor-pointer transition hover:shadow-sm">
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {blog.category?.map((c: string) => (
            <Badge key={c} variant="secondary">{c}</Badge>
          ))}
        </div>
        <CardTitle className="text-base">{blog.title}</CardTitle>
        <CardDescription className="line-clamp-2">{blog.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
