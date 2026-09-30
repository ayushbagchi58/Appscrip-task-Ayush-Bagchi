

export const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const imageVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.04,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export const wishlistVariants = {
  rest: { scale: 1 },
  tap: { scale: 0.85, transition: { duration: 0.15 } },
};
