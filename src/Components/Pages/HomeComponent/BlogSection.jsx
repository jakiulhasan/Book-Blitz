const BlogSection = () => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-8">From Our Blog</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="p-5 border rounded-lg">
            <h3 className="font-semibold mb-2">How Reading Improves Focus</h3>
            <p className="text-sm text-gray-600">
              Discover how daily reading can boost your concentration and
              memory.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
