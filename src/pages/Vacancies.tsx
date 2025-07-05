const Vacancies = () => {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Open positions
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            We currently have no open positions.
          </p>
          <p className="text-lg text-gray-600 mb-8">
            However, if you really have the passion and talent to work with us, please fill out the form below. We will contact you if a suitable position opens up.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScmG9IoHf6YBjFZDQoZK3YQgEMdV9bGIk2S3HJzyZd3MR_XWg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-semibold text-lg"
          >
            APPLY HERE
          </a>
        </div>
      </div>
    </div>
  );
};

export default Vacancies;
