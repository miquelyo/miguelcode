import { motion as Motion } from 'framer-motion';
import CountUp from 'react-countup';

function ProgressStatCard({ title, value, subtitle }) { 
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <Motion.div 
      className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl h-full flex flex-col justify-between"
      variants={cardVariants}
    >
      <div>
        <div className="flex justify-between items-baseline">
          <p className="text-sm text-gray-300 font-semibold">{title}</p>
          <span className="text-2xl font-bold text-white">
            <CountUp end={value || 0} duration={2.5} suffix="%" />
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      </div>
      <progress className="progress progress-primary w-full mt-3" value={value || 0} max="100"></progress>
    </Motion.div>
  );
}

export default ProgressStatCard;