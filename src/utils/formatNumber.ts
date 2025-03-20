export function convertNumberWithCommasDecimal(
  number: number,
  decimalPlaces: number = 4
) {
  if (!number) return 0;
  // Nhân number với 100
  const multipliedNumber = number * 100;

  // Xử lý số chính xác với sai số nhỏ (floating-point error)
  const precisionFixedNumber =
    Math.round((multipliedNumber + Number.EPSILON) * 1e6) / 1e6;

  // Dùng parseFloat để loại bỏ số 0 không cần thiết ở phần thập phân
  const formattedNumber = parseFloat(
    precisionFixedNumber.toFixed(decimalPlaces)
  );

  // Sử dụng toLocaleString để định dạng số có dấu phẩy phần nghìn và loại bỏ số 0 thừa
  return formattedNumber.toLocaleString("en-US", {
    minimumFractionDigits: 0, // Không ép buộc phải có số thập phân nếu không cần thiết
    maximumFractionDigits: 6, // Giữ tối đa 6 chữ số thập phân
  });
}
