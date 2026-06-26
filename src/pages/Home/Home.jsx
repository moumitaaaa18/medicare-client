import FeaturedDoctors from "../../components/FeaturedDoctors";
import { useEffect } from "react";



const Home = () => {
  useEffect(() => {
  document.title = "Home | MediCare Connect";
}, []);
  return (
    <div>
      <section className="bg-gradient-to-r from-cyan-500 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Health, Our Priority
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Book appointments with trusted doctors and manage your healthcare
            from one simple platform.
          </p>

          <a href="/find-doctors" className="btn bg-white text-blue-700 border-0">
            Find Doctors
          </a>
        </div>
      </section>

      <FeaturedDoctors />
    </div>
  );
};

export default Home;