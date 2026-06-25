const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin mx-auto"></div>

        <h2 className="text-2xl font-bold text-cyan-700 mt-6">
          MediCare Connect
        </h2>

        <p className="text-slate-500 mt-2">
          Loading your healthcare data...
        </p>
      </div>
    </div>
  );
};

export default Loading;