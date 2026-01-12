const FAQ = () => {
  const faqs = [
    {
      q: "How can I borrow books?",
      a: "You can borrow books with an active membership.",
    },
    { q: "Is there any free plan?", a: "Yes, we offer limited free access." },
    {
      q: "Can I request new books?",
      a: "Absolutely! Use the request feature.",
    },
  ];

  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <h4 className="font-semibold">{faq.q}</h4>
            <p className="text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
