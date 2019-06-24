// 构建 “障碍类”
function Block(img) {
    this.arr = [
        {row: 7, col: 8},
		{row: 7, col: 9},
		{row: 7, col: 10},
		{row: 8, col: 10},
		{row: 9, col: 10},
		{row: 10, col: 10},
		{row: 10, col: 11},
		{row: 10, col: 11},
		{row: 10, col: 12},
    ];
    this.img = img;
}