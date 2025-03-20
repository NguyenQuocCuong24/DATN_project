export const findSuggestedOrdinalNo = (
  data: any[],
  filterKey: string
): number | null => {
  if (data.length < 1) {
    return 1;
  }

  // Lấy danh sách các số đã có, sắp xếp tăng dần
  const sortedOrdinalNos = data
    .map((item) => Number(item[filterKey]))
    .sort((a, b) => a - b);

  // Kiểm tra nếu 1 chưa tồn tại trong danh sách
  if (!sortedOrdinalNos.includes(1)) {
    return 1;
  }

  // Tìm khoảng trống giữa các số liên tiếp
  for (let i = 0; i < sortedOrdinalNos.length - 1; i++) {
    const current = sortedOrdinalNos[i];
    const next = sortedOrdinalNos[i + 1];

    if (next - current > 1) {
      return current + 1;
    }
  }

  // Nếu không có khoảng trống, gợi ý số tiếp theo
  return sortedOrdinalNos[sortedOrdinalNos.length - 1] + 1;
};
