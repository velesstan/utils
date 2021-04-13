import { Product, Category } from "@velesstan/interfaces";
import xlsx from "xlsx";

interface ProductData {
  category: Category;
  products: Omit<Product, "category" | "requires">[];
}

export const createProductsXlsxBook = (productData: ProductData[]): Buffer => {
  const wb = xlsx.utils.book_new();
  for (let i = 0; i < productData.length; i++) {
    const { category, products } = productData[i];
    const ws = xlsx.utils.aoa_to_sheet([
      ["№", "Код", "Название", "Цена розн.", "Цена опт."],
      ...products.map(
        ({ code, title, price_retail, price_wholesale }, index) => [
          index + 1,
          code,
          title,
          price_retail,
          price_wholesale,
        ]
      ),
    ]);
    wb.SheetNames.push(category.title);
    wb.Sheets[category.title] = ws;
  }
  return xlsx.write(wb, { bookType: "xlsx", type: "buffer" });
};
