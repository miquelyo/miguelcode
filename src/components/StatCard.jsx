import { motion as Motion } from 'framer-motion';
import CountUp from 'react-countup';

function StatCard({ title, value, icon }) {
  const cardVariants = { 
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <Motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      // DIUBAH: Kelas disamakan dengan gaya "Welcome" card
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 flex flex-col justify-between space-y-4 shadow-xl"
    >
      {/* Baris Atas: Judul dan Ikon */}
      <div className="flex justify-between items-start">
        <p className="text-sm text-gray-300 font-medium">{title}</p>
        <div className="text-lg">
          {icon}
        </div>
      </div>

      {/* Baris Bawah: Nilai Statistik */}
      <div className="leading-none">
        <span className="text-3xl font-bold text-white">
          <CountUp end={value || 0} duration={2.5} />
        </span>
      </div>
    </Motion.div>
  );
}

export default StatCard;

