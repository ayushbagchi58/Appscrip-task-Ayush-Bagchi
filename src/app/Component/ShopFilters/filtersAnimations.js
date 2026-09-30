

export const sidebarVariants = {
  hidden: { opacity: 0, x: -24, width: 0, minWidth: 0 },
  visible: {
    opacity: 1,
    x: 0,
    width: 260,
    minWidth: 260,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

export const accordionVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.18, ease: "easeOut" },
  }),
};

export const checkboxVariants = {
  unchecked: { scale: 1 },
  checked: {
    scale: [1, 1.15, 1],
    transition: { duration: 0.2 },
  },
};

export const drawerVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};
