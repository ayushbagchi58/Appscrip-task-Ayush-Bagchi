"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronDown, Check } from "lucide-react";
import styles from "./ShopFilterHeader.module.css";
import { barVariants, dropdownVariants, itemVariants } from "./filterAnimations";


const filterHeaderData = {
  itemCount: 3425,
  sortOptions: [
    { id: "recommended",   label: "RECOMMENDED" },
    { id: "newest",        label: "NEWEST FIRST" },
    { id: "popular",       label: "POPULAR" },
    { id: "price-high-low",label: "PRICE : HIGH TO LOW" },
    { id: "price-low-high",label: "PRICE : LOW TO HIGH" },
  ],
};

export default function ShopFilterHeader({ onFilterToggle, filterVisible = true, itemCount, onSortChange }) {
  const [sortOpen, setSortOpen] = useState(false);
  const [selected, setSelected] = useState("recommended");
  const dropdownRef = useRef(null);

  const selectedLabel = filterHeaderData.sortOptions.find(
    (o) => o.id === selected
  )?.label;

  
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(id) {
    setSelected(id);
    setSortOpen(false);
    if (onSortChange) onSortChange(id);
  }

  return (
    <motion.div
      className={styles.wrapper}
      variants={barVariants}
      initial="hidden"
      animate="visible"
      aria-label="Shop filter header"
      suppressHydrationWarning
    >
      
      <div className={styles.left}>
        <span className={styles.itemCount} aria-live="polite">
          {(itemCount ?? filterHeaderData.itemCount).toLocaleString()} ITEMS
        </span>

        <button
          className={styles.filterToggle}
          onClick={onFilterToggle}
          aria-label={filterVisible ? "Hide filter" : "Show filter"}
        >
          <span className={styles.chevronLeft}>
            <ChevronLeft size={13} strokeWidth={2} />
          </span>
          <span className={styles.filterTextDesktop}>
            {filterVisible ? "HIDE FILTER" : "SHOW FILTER"}
          </span>
          <span className={styles.filterTextMobile}>FILTER</span>
        </button>
      </div>

      
      <div className={styles.right} ref={dropdownRef}>
        <button
          className={styles.sortBtn}
          onClick={() => setSortOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={sortOpen}
          aria-label="Sort products"
        >
          {selectedLabel}
          <ChevronDown
            size={14}
            strokeWidth={2}
            className={`${styles.chevronDown} ${sortOpen ? styles.chevronOpen : ""}`}
          />
        </button>

        <AnimatePresence>
          {sortOpen && (
            <motion.ul
              className={styles.dropdown}
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="listbox"
              aria-label="Sort options"
            >
              {filterHeaderData.sortOptions.map(({ id, label }, i) => (
                <motion.li
                  key={id}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  role="option"
                  aria-selected={selected === id}
                >
                  <button
                    className={`${styles.dropdownItem} ${selected === id ? styles.dropdownItemActive : ""}`}
                    onClick={() => handleSelect(id)}
                  >
                    {selected === id && (
                      <Check size={12} strokeWidth={2.5} className={styles.checkIcon} />
                    )}
                    {label}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
