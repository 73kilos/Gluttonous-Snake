// 构建 “地图类”
function Map(row, col, width, height) {
    this.row = row;
    this.col = col;
    this.width =width;
    this.height = height;
    this.arr = [];
    this.dom = document.createElement("div");
}
// 填充地图
Map.prototype.fill = function() {
    for (var i = 0; i < this.row; i++) {
        var row_box = document.createElement("div");
        row_box.className = "row";
        var row_arr = [];
        for (var j = 0; j < this.col; j++) {
            var col_box = document.createElement("span");
            col_box.className = "grid";
            row_box.appendChild(col_box);
            row_arr.push(col_box);
        }
        this.dom.appendChild(row_box);
        this.arr.push(row_arr);
        this.dom.className = "box";
    }
    document.body.appendChild(this.dom);
}
// 清屏
Map.prototype.clear = function() {
	for(var i = 0; i < this.arr.length; i++) {
		for(var j = 0; j < this.arr[i].length; j++) {
			this.arr[i][j].style.backgroundImage = "none";
		}
	}
}