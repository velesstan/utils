import { Product } from "@velesstan/interfaces";
import xlsx from "xlsx";

interface ProductData {
  category: string;
  products: Product[];
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
    wb.SheetNames.push(category);
    wb.Sheets[category] = ws;
  }
  return xlsx.write(wb, { bookType: "xlsx", type: "buffer" });
};
