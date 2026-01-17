export type Blog = {
  id: number;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
};

const API = "http://localhost:3001";

export async function getBlogs(): Promise<Blog[]> {
  const res = await fetch(`${API}/blogs`);
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return res.json();
}

export async function getBlogById(id: number): Promise<Blog> {
  const res = await fetch(`${API}/blogs/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }
  return res.json();
}
export type CreateBlogInput = Omit<Blog, "id">;

export async function createBlog(payload: CreateBlogInput): Promise<Blog> {
  const res = await fetch(`${API}/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to create blog");
  }
  return res.json();
}
