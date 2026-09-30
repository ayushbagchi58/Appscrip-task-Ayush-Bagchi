"use client";

import { motion } from "framer-motion";
import styles from "./ShopHero.module.css";
import {
  containerVariants,
  fadeUpVariants,
  fadeInVariants,
  lineVariants,
  letterVariants,
} from "./heroAnimations";


const heroData = {
  title: "DISCOVER OUR PRODUCTS",
  description:
    "Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus scelerisque. Dolor integer scelerisque nibh amet mi ut elementum dolor.",
};


function AnimatedTitle({ title }) {
  return (
    <h1 className={styles.title} aria-label={title}>
      {title.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          aria-hidden="true"
          style={{ display: char === " " ? "inline-block" : "inline-block", minWidth: char === " " ? "0.3em" : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </h1>
  );
}

export default function ShopHero() {
  return (
    <section className={styles.hero} aria-labelledby="shop-hero-title">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
      >
      
        <motion.div className={styles.titleWrapper} variants={fadeUpVariants}>
          <AnimatedTitle title={heroData.title} />
        </motion.div>

       
        <motion.div
          className={styles.divider}
          variants={lineVariants}
        />

       
        <motion.p
          className={styles.description}
          variants={fadeInVariants}
        >
          {heroData.description}
        </motion.p>
      </motion.div>
    </section>
  );
}
