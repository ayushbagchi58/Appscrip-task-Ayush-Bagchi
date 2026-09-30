

export const barVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scaleY: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    scaleY: 0.95,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.2, ease: "easeOut" },
  }),
};
