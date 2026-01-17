import { useState } from "react";
import { useBlogs } from "./hooks/useBlogs";
import { useBlog } from "./hooks/useBlog";
import { useCreateBlog } from "./hooks/useCreateBlog";
import { toast } from "sonner";

export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const blogsQuery = useBlogs();
  const blogQuery = useBlog(selectedId);
  const createBlog = useCreateBlog();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryText, setCategoryText] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");


  function handleCreate(e: React.FormEvent) {
    e.preventDefault();

    const categories = categoryText
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    createBlog.mutate(
      {
        title,
        description,
        category: categories,
        coverImage,
        content,
        date: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          toast.success("Blog created ✅");

          // Clear only after success
          setTitle("");
          setDescription("");
          setCategoryText("");
          setCoverImage("");
          setContent("");
        },
        onError: (err: any) => {
          toast.error(err?.message ?? "Failed to create blog ❌");
        },
      },
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* LEFT */}
        <div className="md:col-span-5 bg-white rounded-lg border p-3">
          {/* Create form */}
          <form onSubmit={handleCreate} className="mb-4 space-y-2">
            <div className="font-semibold">Create Blog</div>

            <input
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <input
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Categories (comma separated) e.g. FINANCE, TECH"
              value={categoryText}
              onChange={(e) => setCategoryText(e.target.value)}
              required
            />

            <input
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Cover Image URL"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              required
            />

            <input
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <textarea
              className="w-full border rounded px-3 py-2 text-sm min-h-[100px]"
              placeholder="Full content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />

            {createBlog.isError && (
              <p className="text-sm text-red-600">
                {(createBlog.error as Error).message}
              </p>
            )}

            <button
              type="submit"
              disabled={createBlog.isPending}
              className="w-full bg-slate-900 text-white rounded px-3 py-2 text-sm disabled:opacity-60"
            >
              {createBlog.isPending ? "Creating..." : "Create"}
            </button>
          </form>

          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-semibold">Blogs</h1>
          </div>

          {blogsQuery.isLoading && (
            <p className="text-sm text-slate-500">Loading...</p>
          )}

          {blogsQuery.isError && (
            <p className="text-sm text-red-600">
              {(blogsQuery.error as Error)?.message || "Error loading blogs"}
            </p>
          )}

          {!blogsQuery.isLoading && !blogsQuery.isError && (
            <div className="space-y-3">
              {blogsQuery.data?.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedId(b.id)}
                  className={`w-full text-left rounded-lg border p-3 hover:bg-slate-50 transition ${
                    selectedId === b.id
                      ? "border-slate-900"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex flex-wrap gap-2 mb-2">
                    {b.category?.map((c) => (
                      <span
                        key={c}
                        className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <div className="font-semibold">{b.title}</div>
                  <div className="text-sm text-slate-600 line-clamp-2">
                    {b.description}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="md:col-span-7 bg-white rounded-lg border p-4">
          {!selectedId && (
            <p className="text-sm text-slate-600">
              Select a blog from the list.
            </p>
          )}

          {blogQuery.isLoading && (
            <p className="text-sm text-slate-500">Loading blog...</p>
          )}

          {blogQuery.isError && (
            <p className="text-sm text-red-600">
              {(blogQuery.error as Error).message}
            </p>
          )}

          {blogQuery.data && (
            <div className="space-y-4">
              <img
                src={blogQuery.data.coverImage}
                alt={blogQuery.data.title}
                className="w-full h-60 object-cover rounded-md"
              />

              <div>
                <h2 className="text-2xl font-bold">{blogQuery.data.title}</h2>
                <p className="text-sm text-slate-500 mt-1">
                  {new Date(blogQuery.data.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {blogQuery.data.category.map((c) => (
                  <span
                    key={c}
                    className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <p className="text-slate-700 whitespace-pre-line">
                {blogQuery.data.content}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
