const FeaturedAuthors = () => {
  const authors = [
    "J.K. Rowling",
    "George R.R. Martin",
    "Dan Brown",
    "Paulo Coelho",
  ];

  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-8">Featured Authors</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {authors.map((author, index) => (
          <div key={index} className="p-4 border rounded-lg text-center">
            <h3 className="font-semibold">{author}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedAuthors;
