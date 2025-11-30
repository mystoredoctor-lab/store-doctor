import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Edit, Trash2, X } from "lucide-react";
import { useState, useRef } from "react";
import { useBlogPosts, type BlogPost } from "@/hooks/useBlogPosts";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function AdminBlogPage() {
  const defaultBlogPosts = useBlogPosts();
  const [posts, setPosts] = useLocalStorage<BlogPost[]>("storedoctor_blog_posts_v2", defaultBlogPosts);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", author: "", category: "", content: "", imageUrl: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleSubmit = () => {
    if (editingId) {
      setPosts(posts.map(p => p.id === editingId ? { ...p, title: formData.title, author: formData.author, excerpt: formData.title.substring(0, 80), content: formData.content, image: formData.imageUrl } : p));
      setEditingId(null);
    } else {
      const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
      const slug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      setPosts([...posts, { 
        id: newId, 
        title: formData.title, 
        author: formData.author,
        slug,
        excerpt: formData.title.substring(0, 80),
        content: formData.content,
        category: formData.category || 'General',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime: '10 min read',
        image: formData.imageUrl || 'https://images.unsplash.com/photo-1677442d019cecf8920f254b09b04b24143f3f7fa?w=400&h=300&fit=crop'
      }]);
    }
    setFormData({ title: "", author: "", category: "", content: "", imageUrl: "" });
    setImagePreview("");
    setShowForm(false);
  };

  const handleEdit = (post: typeof posts[0]) => {
    setFormData({ title: post.title, author: post.author, category: post.category, content: post.content, imageUrl: post.image });
    setImagePreview(post.image);
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setImagePreview(dataUrl);
        setFormData({ ...formData, imageUrl: dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Create, edit, and manage blog posts.</p>
        </div>
        <Button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ title: "", author: "", category: "", content: "", imageUrl: "" }); setImagePreview(""); }} data-testid="button-new-post">
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Post" : "Create New Post"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Post title"
                  className="mt-2"
                  data-testid="input-post-title"
                />
              </div>
              <div>
                <Label>Author</Label>
                <Input 
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  placeholder="Author name"
                  className="mt-2"
                  data-testid="input-post-author"
                />
              </div>
            </div>
            <div>
              <Label>Category</Label>
              <Input 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                placeholder="e.g., Technology, SEO, Performance"
                className="mt-2"
                data-testid="input-post-category"
              />
            </div>
            <div>
              <Label>Featured Image</Label>
              <div className="mt-2 space-y-3">
                {imagePreview && (
                  <div className="relative w-32 h-24 rounded-lg overflow-hidden border">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => { setImagePreview(""); setFormData({...formData, imageUrl: ""}); if(fileInputRef.current) fileInputRef.current.value = ""; }}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                      data-testid="button-remove-image"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-2"
                  data-testid="input-post-image"
                />
                <p className="text-xs text-muted-foreground">Upload an image for this post. JPG, PNG supported.</p>
              </div>
            </div>
            <div>
              <Label>Content</Label>
              <Textarea 
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Post content (HTML supported)"
                className="mt-2 min-h-48"
                data-testid="textarea-post-content"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSubmit} data-testid="button-save-post">{editingId ? "Update" : "Create"} Post</Button>
              <Button variant="outline" onClick={() => { setShowForm(false); setEditingId(null); setFormData({ title: "", author: "", category: "", content: "", imageUrl: "" }); setImagePreview(""); }} data-testid="button-cancel-post">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Posts</CardTitle>
              <CardDescription>Total: {posts.length} posts</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search posts..." className="pl-10" data-testid="input-search-posts" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="space-y-3">
              {posts.map((post) => (
                <div key={post.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50" data-testid={`post-row-${post.id}`}>
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    {post.image ? (
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" data-testid={`post-image-${post.id}`} />
                    ) : (
                      <div className="w-full h-full bg-muted" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">{post.author}</p>
                    <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{post.date}</span>
                      <span>{post.category}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEdit(post)}
                      data-testid={`button-edit-post-${post.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                      data-testid={`button-delete-post-${post.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
