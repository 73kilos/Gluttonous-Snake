// 构建 “食物类”
function Food(x, y, img) {
    this.row = x;
    this.col = y;
    this.img = img;
}
// 重置食物
Food.prototype.resetFood = function(row, col) {
    this.row = row;
    this.col = col;
}