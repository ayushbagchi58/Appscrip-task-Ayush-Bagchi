"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import styles from "./ShopFilters.module.css";
import {
  sidebarVariants,
  accordionVariants,
  itemVariants,
  checkboxVariants,
  drawerVariants,
  overlayVariants,
} from "./filtersAnimations";
import { getAllCategories } from "../../API/Functions/Categories-api-functions/allCategories.api";


const filtersData = {
  customizable: { id: "customizable", label: "CUSTOMIZBLE" },
  filters: [
    {
      id: "categories",
      title: "CATEGORIES",
      options: [
        { id: "all",   label: "All" },
        { id: "men",   label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids",  label: "Kids" },
      ],
    },
    {
      id: "occasion",
      title: "OCCASION",
      options: [
        { id: "all",      label: "All" },
        { id: "casual",   label: "Casual" },
        { id: "formal",   label: "Formal" },
        { id: "party",    label: "Party" },
        { id: "festival", label: "Festival" },
      ],
    },
    {
      id: "work",
      title: "WORK",
      options: [
        { id: "all",         label: "All" },
        { id: "handwoven",   label: "Handwoven" },
        { id: "embroidered", label: "Embroidered" },
        { id: "block-print", label: "Block Print" },
      ],
    },
    {
      id: "fabric",
      title: "FABRIC",
      options: [
        { id: "all",    label: "All" },
        { id: "cotton", label: "Cotton" },
        { id: "silk",   label: "Silk" },
        { id: "wool",   label: "Wool" },
        { id: "linen",  label: "Linen" },
      ],
    },
    {
      id: "segment",
      title: "SEGMENT",
      options: [
        { id: "all",     label: "All" },
        { id: "premium", label: "Premium" },
        { id: "luxury",  label: "Luxury" },
        { id: "budget",  label: "Budget" },
      ],
    },
    {
      id: "suitable-for",
      title: "SUITABLE FOR",
      options: [
        { id: "all",     label: "All" },
        { id: "summer",  label: "Summer" },
        { id: "winter",  label: "Winter" },
        { id: "monsoon", label: "Monsoon" },
      ],
    },
    {
      id: "raw-materials",
      title: "RAW MATERIALS",
      options: [
        { id: "all",      label: "All" },
        { id: "organic",  label: "Organic" },
        { id: "recycled", label: "Recycled" },
        { id: "natural",  label: "Natural" },
      ],
    },
    {
      id: "pattern",
      title: "PATTERN",
      options: [
        { id: "all",     label: "All" },
        { id: "solid",   label: "Solid" },
        { id: "printed", label: "Printed" },
        { id: "striped", label: "Striped" },
        { id: "checks",  label: "Checks" },
      ],
    },
  ],
};


function FilterGroup({ filter, apiOptions, selectedExternal, onChangeExternal }) {
  const [open, setOpen] = useState(false);
  const [selectedInternal, setSelectedInternal] = useState(["all"]);

 
  const selected = selectedExternal ?? selectedInternal;

  const options = apiOptions ?? filter.options;

  function handleToggle(id) {
    if (selectedExternal !== undefined) {
    
      if (id === "all") { onChangeExternal(["all"]); return; }
      onChangeExternal((prev) => {
        const without = prev.filter((s) => s !== "all");
        if (without.includes(id)) {
          const next = without.filter((s) => s !== id);
          return next.length === 0 ? ["all"] : next;
        }
        return [...without, id];
      });
    } else {
     
      if (id === "all") { setSelectedInternal(["all"]); return; }
      setSelectedInternal((prev) => {
        const without = prev.filter((s) => s !== "all");
        if (without.includes(id)) {
          const next = without.filter((s) => s !== id);
          return next.length === 0 ? ["all"] : next;
        }
        return [...without, id];
      });
    }
  }

  const selectedLabels = options
    .filter((o) => selected.includes(o.id))
    .map((o) => o.label).join(", ") || "All";

  return (
    <div className={styles.filterGroup}>
      <button
        className={styles.filterHeader}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className={styles.filterTitle}>{filter.title}</span>
        <ChevronDown
          size={16} strokeWidth={1.5}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className={styles.filterBody}
            variants={accordionVariants}
            initial="hidden" animate="visible" exit="exit"
          >
            <div className={styles.filterContent}>
            
              {selectedExternal !== undefined && !selected.includes("all") && (
                <button
                  className={styles.clearAll}
                  onClick={() => onChangeExternal(["all"])}
                >
                  Clear All
                </button>
              )}
              <ul className={styles.optionList} role="group" aria-label={filter.title}>
                {options.map(({ id, label }, i) => (
                  <motion.li
                    key={id}
                    className={styles.optionItem}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden" animate="visible"
                  >
                    <input
                      type="checkbox"
                      id={`${filter.id}-${id}`}
                      checked={selected.includes(id)}
                      onChange={() => handleToggle(id)}
                    />
                    <label htmlFor={`${filter.id}-${id}`} className={styles.optionLabel}>
                      {label}
                    </label>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <p className={styles.selectedValue} style={{ paddingBottom: "14px" }}>
          {selectedLabels}
        </p>
      )}
    </div>
  );
}


function FilterContent({ onClose, selectedCategories, onCategoryChange }) {
  const [customizable, setCustomizable] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState(null);

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        const desired = ["beauty", "fragrances", "womens-dresses", "mens-shirts"];
        const filtered = desired
          .map((slug) => data.find((cat) => cat.slug === slug))
          .filter(Boolean);
        const options = [
          { id: "all", label: "All" },
          ...filtered.map((cat) => ({ id: cat.slug, label: cat.name })),
        ];
        setCategoryOptions(options);
      })
      .catch(() => setCategoryOptions(null));
  }, []);

  return (
    <>
      {onClose && (
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close filters">
          <X size={20} strokeWidth={1.5} />
        </button>
      )}
      <div className={styles.customRow}>
        <input
          type="checkbox"
          id="customizable"
          className={styles.checkbox}
          checked={customizable}
          onChange={() => setCustomizable((v) => !v)}
        />
        <label htmlFor="customizable" className={styles.customLabel}>
          {filtersData.customizable.label}
        </label>
      </div>
      {filtersData.filters.map((filter) => (
        <FilterGroup
          key={filter.id}
          filter={filter}
          apiOptions={filter.id === "categories" ? categoryOptions : undefined}
          selectedExternal={filter.id === "categories" ? selectedCategories : undefined}
          onChangeExternal={filter.id === "categories" ? onCategoryChange : undefined}
        />
      ))}
    </>
  );
}


export default function ShopFilters({ mobileOpen = false, onClose, selectedCategories, onCategoryChange, filterVisible = true }) {
  return (
    <>
      
      <AnimatePresence initial={false}>
        {filterVisible && (
          <motion.aside
            className={`${styles.sidebar} ${styles.desktopSidebar}`}
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            aria-label="Product filters"
          >
            <FilterContent
              selectedCategories={selectedCategories}
              onCategoryChange={onCategoryChange}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className={styles.overlay}
              variants={overlayVariants}
              initial="hidden" animate="visible" exit="exit"
              onClick={onClose}
              aria-hidden="true"
            />
            <motion.aside
              className={`${styles.sidebar} ${styles.mobileSidebar}`}
              variants={drawerVariants}
              initial="hidden" animate="visible" exit="exit"
              aria-label="Product filters"
            >
              <FilterContent
                onClose={onClose}
                selectedCategories={selectedCategories}
                onCategoryChange={onCategoryChange}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
