import { ProductBalance } from "@velesstan/interfaces";
import xlsx from "xlsx";

export const createBalancesXlsxBook = (balances: ProductBalance[]): Buffer => {
  const wb = xlsx.utils.book_new();
  const sheet = xlsx.utils.aoa_to_sheet([
    [
      "№",
      "Категория",
      "Код",
      "Название",
      "Остаток на начало",
      "Приход",
      "Расход",
      "Остаток на конец",
    ],
    ...balances.map(
      (
        {
          code,
          title,
          category,
          unit,
          startBalance,
          endBalance,
          income,
          outcome,
        },
        index
      ) => [
        index + 1,
        category,
        code,
        title,
        `${startBalance} ${unit}`,
        `${income} ${unit}`,
        `${outcome} ${unit}`,
        `${endBalance} ${unit}`,
      ]
    ),
  ]);
  wb.SheetNames.push("Остатки");
  wb.Sheets["Остатки"] = sheet;
  return xlsx.write(wb, { bookType: "xlsx", type: "buffer" });
};
