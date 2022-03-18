import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

const transition = {
  duration: 0.5,
};

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      ...transition,
    },
  },
  out: {
    opacity: 0,
    y: "10vw",
    transition: { ...transition },
  },
};

const PageWrapper = ({ children }: Props) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      className="motion-wrapper"
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
