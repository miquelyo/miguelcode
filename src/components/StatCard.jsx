// src/components/StatCard.jsx
import { motion as Motion } from 'framer-motion';
import CountUp from 'react-countup';

function StatCard({ title, value, subtitle, className }) { 
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <Motion.div 
      className={`bg-gray-800 p-4 rounded-xl shadow-lg ${className || ''}`}
      variants={cardVariants} // Varian tetap digunakan oleh parent
      
      // BARU: Tambahkan properti whileHover untuk animasi saat disentuh mouse
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <p className="text-xs text-gray-400">{title}</p>
      <div className="mt-1">
        <span className="text-3xl font-bold text-white">
          <CountUp end={value} duration={2.5} />
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </Motion.div>
  );
}

export default StatCard;