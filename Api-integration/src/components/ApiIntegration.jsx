import { useEffect, useState } from "react";

function ApiIntegration() {
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">📑 Posts</h1>

      {loading ? (
        <p className="text-gray-500">Loading posts...</p>
      ) : (
        <>
          {/* Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {posts.slice(0, visibleCount).map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {post.body}
                </p>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < posts.length && (
            <button
              onClick={loadMore}
              className="mt-10 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-lg transition"
            >
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default ApiIntegration;
