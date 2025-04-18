import React from 'react';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-md mx-auto bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6 text-red-700 flex items-start justify-between"
    >
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
        <p>{message}</p>
      </div>
      <button 
        onClick={onDismiss}
        className="ml-4 text-red-500 hover:text-red-700 flex-shrink-0"
      >
        ×
      </button>
    </motion.div>
  );
};

export default ErrorMessage;