import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function PageTransition({ children, className = "" }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "spring", stiffness: 260, damping: 24, duration: 0.32 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
