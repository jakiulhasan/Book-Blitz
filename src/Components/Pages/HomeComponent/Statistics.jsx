const Statistics = () => {
  const stats = [
    { label: "Books Available", value: "25,000+" },
    { label: "Active Readers", value: "12,000+" },
    { label: "Authors", value: "1,500+" },
    { label: "Countries Served", value: "35+" },
  ];

  return (
    <section className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      {stats.map((stat, index) => (
        <div key={index} className="p-6 bg-gray-100 rounded-lg">
          <h2 className="text-3xl font-bold">{stat.value}</h2>
          <p className="text-gray-600">{stat.label}</p>
        </div>
      ))}
    </section>
  );
};

export default Statistics;
