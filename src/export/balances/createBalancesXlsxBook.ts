import { ProductBalance } from "@velesstan/interfaces";
import xlsx from "xlsx";

export const createBalancesXlsxBook = (balances: ProductBalance[]): Buffer => {
  const wb = xlsx.utils.book_new();
  console.log("Inside function");
  console.log(`Total balances: ${balances.length}`);
  return Buffer.alloc(0);
};
