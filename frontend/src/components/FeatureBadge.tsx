
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FeatureBadgeProps {
  label: string;
  icon?: ReactNode;
}

const FeatureBadge = ({ label, icon }: FeatureBadgeProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="inline-flex items-center px-3 py-1.5 rounded-full bg-glucotrack-blue/10 text-glucotrack-blue text-sm font-medium"
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {label}
    </motion.div>
  );
};

export default FeatureBadge;
