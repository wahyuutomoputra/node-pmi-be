export function useRupiah(angka: number = 0): string {
  try {
    const reverse = angka.toString().split("").reverse().join("");
    const ribuanMatches = reverse.match(/\d{1,3}/g);

    if (!ribuanMatches) return "Rp0";

    const ribuan = ribuanMatches.join(".").split("").reverse().join("");
    return "Rp" + ribuan;
  } catch (error) {
    return "Rp0";
  }
}
