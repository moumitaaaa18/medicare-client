import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PatientSuccessStories = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(Array.isArray(data) ? data.slice(0, 3) : []))
      .catch(() => setReviews([]));
  }, []);

  return (
    <section className="px-6 py-16 bg-gradient-to-br from-cyan-50 to-blue-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <p className="text-cyan-600 font-semibold">Patient Stories</p>
        <h2 className="text-4xl font-bold text-slate-900 mt-2">
          Patient Success Stories
        </h2>
        <p className="text-slate-500 mt-3">
          Real feedback from patients who used MediCare Connect.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {reviews.length === 0 ? (
            <>
              <Story name="Ayesha Rahman" text="Booking a doctor was fast and simple. The dashboard helped me track everything easily." />
              <Story name="Tanvir Ahmed" text="I found a trusted doctor and completed my appointment without any confusion." />
              <Story name="Nusrat Jahan" text="The system made online healthcare service more organized and user friendly." />
            </>
          ) : (
            reviews.map((review) => (
              <Story
                key={review._id}
                name={review.patientName || "Patient"}
                text={review.review || "Great healthcare experience."}
                rating={review.rating}
              />
            ))
          )}
        </div>
      </motion.div>
    </section>
  );
};

const Story = ({ name, text, rating = 5 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6 text-left"
  >
    <p className="text-yellow-500">{"⭐".repeat(Number(rating || 5))}</p>
    <p className="text-slate-600 mt-4">"{text}"</p>
    <h3 className="font-bold text-slate-900 mt-5">{name}</h3>
  </motion.div>
);

export default PatientSuccessStories;