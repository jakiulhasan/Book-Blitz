const Newsletter = () => {
  return (
    <section className="bg-blue-600 text-white p-10 rounded-lg text-center">
      <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
      <p className="mb-6">Subscribe to get the latest books and offers.</p>
      <div className="flex justify-center gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 rounded text-black bg-white"
        />
        <button className="bg-black px-6 py-2 rounded">Subscribe</button>
      </div>
    </section>
  );
};

export default Newsletter;
