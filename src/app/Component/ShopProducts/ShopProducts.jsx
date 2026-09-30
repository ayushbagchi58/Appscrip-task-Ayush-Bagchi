"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import styles from "./ShopProducts.module.css";
import {
  gridVariants,
  cardVariants,
  wishlistVariants,
} from "./productsAnimations";
import { getWomensProducts, getMensProducts, getBeautyProducts, getFragranceProducts } from "../../API/Functions/Products-api-functions/allProducts.api";


function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);

  const isOutOfStock = product.availabilityStatus === "Out of Stock" || product.stock === 0 || product.stock < 3;

  return (
    <motion.article
      className={styles.card}
      variants={cardVariants}
      aria-label={product.title}
    >
     
      <Link href={`/product/${product.id}`} aria-label={`View ${product.title}`}>
        <div className={styles.imageWrapper}>

         
          {isOutOfStock && (
            <div className={styles.outOfStock} aria-label="Out of stock">
              <span className={styles.outOfStockText}>OUT OF STOCK</span>
            </div>
          )}

          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className={styles.productImage}
            unoptimized
          />
        </div>
      </Link>

     
      <div className={styles.cardInfo}>
        <h2 className={styles.productName}>{product.title}</h2>
        <div className={styles.priceRow}>
          <p className={styles.priceText}>
            <Link href="/signin">Sign in</Link>
            {" "}or{" "}
            <Link href="/register">Create an account</Link>
            {" "}to see pricing
          </p>
          <motion.button
            className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlistActive : ""}`}
            onClick={() => setWishlisted((v) => !v)}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            variants={wishlistVariants}
            whileTap="tap"
          >
            <Heart
              size={16}
              strokeWidth={1.5}
              fill={wishlisted ? "#e53935" : "none"}
            />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}


export default function ShopProducts({ onProductsLoaded, sortBy = "recommended", selectedCategories = ["all"] }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getWomensProducts(),
      getMensProducts(),
      getBeautyProducts(),
      getFragranceProducts(),
    ])
      .then(([womens, mens, beauty, fragrance]) => {
        const all = [
          ...womens.products,
          ...mens.products,
          ...beauty.products,
          ...fragrance.products,
        ];
        setProducts(all);
        if (onProductsLoaded) onProductsLoaded(all.length);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = selectedCategories.includes("all")
    ? products
    : products.filter((p) => selectedCategories.includes(p.category));

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.meta?.createdAt || 0) - new Date(a.meta?.createdAt || 0);
      case "popular":
        return b.rating - a.rating;
      case "price-high-low":
        return b.price - a.price;
      case "price-low-high":
        return a.price - b.price;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className={styles.grid} style={{ alignItems: "center", justifyItems: "center" }}>
        <p style={{ gridColumn: "1/-1", padding: "48px", color: "#888", fontSize: "13px" }}>
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <motion.section
      className={styles.grid}
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      aria-label="Product listing"
    >
      {sortedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.section>
  );
}
