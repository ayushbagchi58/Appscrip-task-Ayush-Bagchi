"use client";

import { useState } from "react";
import ShopHero from "./Component/ShopHero/ShopHero";
import ShopFilterHeader from "./Component/ShopFilterHeader/ShopFilterHeader";
import ShopFilters from "./Component/ShopFilters/ShopFilters";
import ShopProducts from "./Component/ShopProducts/ShopProducts";

export default function Home() {
  const [filterOpen, setFilterOpen] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedCategories, setSelectedCategories] = useState(["all"]);

  return (
    <main>
      <ShopHero />

     
      <div style={{ maxWidth: "1480px", margin: "0 auto", width: "100%" }}>
        <ShopFilterHeader
          filterVisible={filterOpen}
          onFilterToggle={() => setFilterOpen((v) => !v)}
          itemCount={totalProducts}
          onSortChange={setSortBy}
        />
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <ShopFilters
            mobileOpen={filterOpen}
            onClose={() => setFilterOpen(false)}
            filterVisible={filterOpen}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
          />
          <ShopProducts
            onProductsLoaded={(count) => setTotalProducts(count)}
            sortBy={sortBy}
            selectedCategories={selectedCategories}
          />
        </div>
      </div>
    </main>
  );
}
