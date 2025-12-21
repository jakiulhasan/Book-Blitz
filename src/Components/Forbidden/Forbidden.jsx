import React from "react";
import { ShieldAlert, ArrowLeft, Home, LockKeyhole } from "lucide-react";
import { motion } from "framer-motion";

const Forbidden = () => {
  // Animation variants for the lock icon
  const lockVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5,
        rotate: {
          repeat: Infinity,
          repeatDelay: 2,
          duration: 0.5,
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Animated Icon Section */}
        <motion.div
          variants={lockVariants}
          initial="initial"
          animate="animate"
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-error/20 blur-3xl rounded-full"></div>
            <div className="bg-base-100 p-8 rounded-full shadow-2xl relative border border-base-300">
              <LockKeyhole size={80} className="text-error" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>

        {/* Error Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-9xl font-black text-base-content/10 left-0 right-0 -top-10 select-none mt-30">
            403
          </h1>
          <h2 className="text-3xl font-bold mb-2 relative">Access Forbidden</h2>
          <p className="text-base-content/60 mb-8">
            Wait a second! You don't have the required permissions to view this
            page. If you believe this is a mistake, please contact your
            administrator.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="btn btn-outline gap-2"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
            <a href="/" className="btn btn-primary gap-2">
              <Home size={18} />
              Return Home
            </a>
          </div>
        </motion.div>

        {/* Support Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-8 border-t border-base-300"
        >
          <p className="text-sm flex items-center justify-center gap-2 text-base-content/40">
            <ShieldAlert size={14} />
            Security ID: <span className="font-mono">ERR_403_AUTH_X</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Forbidden;
