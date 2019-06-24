// 构建 “游戏类”
function Game(map, snake, food, block) {
    this.map = map;
    this.snake = snake;
    this.food = food;
    this.block = block;
    this.timer = null;
    this.flag = null;
    this.init();
}
// 定义初始化方法
Game.prototype.init = function() {
    this.renderMap();
    this.renderSnake();
    this.renderFood();
    this.renderBlock();
    this.bindEvent();
    this.start();
}
// 渲染地图
Game.prototype.renderMap = function() {
    this.map.fill();
}
// 渲染食物
Game.prototype.renderFood = function() {
    var row = this.food.row;
    var col = this.food.col;
    this.map.arr[row][col].style.backgroundImage = "url(" + this.food.img + ")";
    this.map.arr[row][col].style.backgroundSize = "cover";
}
// 渲染蛇
Game.prototype.renderSnake = function() {
    var head = this.snake.arr[this.snake.arr.length - 1];
    this.map.arr[head.row][head.col].style.backgroundImage = "url(" + this.snake.head_pic[this.snake.head_idx] + ")";
    for (var i = 1; i < this.snake.arr.length - 1; i++) {
        var row = this.snake.arr[i].row;
        var col = this.snake.arr[i].col;
        this.map.arr[row][col].style.backgroundImage = "url(" + this.snake.body_pic[0] + ")"
    }
    var tail = this.snake.arr[0];
    this.map.arr[tail.row][tail.col].style.backgroundImage = "url(" + this.snake.tail_pic[this.snake.tail_idx] + ")";
}
// 开始游戏
Game.prototype.start = function() {
    this.flag = true;
    var me = this;
    this.timer = setInterval(function() {
        me.snake.move();
        me.checkMap();
        me.checkFood();
        me.checkSnake();
        me.checkBlock();
        if (me.flag) {
            me.map.clear();
            me.renderFood();
            me.renderSnake();
            me.renderBlock();  
        }
    }, 200)
}
// 添加键盘绑定事件
Game.prototype.bindEvent = function() {
    var me = this;
    document.onkeydown = function(e) {
        var code = e.keyCode;
        if (code === 37 || code === 38 || code === 39 || code === 40) {
            me.snake.change(code);
        }
    }
}
// 游戏结束
Game.prototype.gameOver = function() {
    this.flag = false;
    clearInterval(this.timer);
    alert("Game Over !");
}
// 判定蛇的运动边界
Game.prototype.checkMap = function() {
    var head = this.snake.arr[this.snake.arr.length - 1];
    if (head.row <= 0 || head.col <= 0 || head.row >= this.map.row || head.col >= this.map.col) {
        this.gameOver();
    }
}
// 判定蛇吃到食物
Game.prototype.checkFood = function() {
    var head = this.snake.arr[this.snake.arr.length - 1];
    var food = this.food;
    if (head.row === food.row && head.col === food.col) {
        this.snake.growUp();
        this.resetFood();
    }
}
// 重置食物
Game.prototype.resetFood = function() {
    var row = parseInt(Math.random() * this.map.row);
    var col = parseInt(Math.random() * this.map.col);
    for (var i = 0; i < this.snake.arr.length; i++) {
        var one_snake = this.snake.arr[i];
        if (one_snake.row === row && one_snake.col === col) {
            this.resetFood();
            return;
        }
    }
    for (var i = 0; i < this.block.arr.length; i++) {
        var one_block = this.block.arr[i];
        if (one_block.row === row && one_block.col === col) {
            this.resetFood();
            return;
        }
    }
    this.food.resetFood(row, col);
}
// 判定蛇是否撞到自己
Game.prototype.checkSnake = function() {
    var head = this.snake.arr[this.snake.arr.length - 1];
    for (var i = 0; i < this.snake.arr.length - 1; i++) {
        var one_snake = this.snake.arr[i];
        if (one_snake.row === head.row && one_snake.col === head.col) {
            this.gameOver();
        }
    }
}
// 渲染障碍物
Game.prototype.renderBlock = function() {
    for (var i = 0; i < this.block.arr.length; i++) {
        var row = this.block.arr[i].row;
        var col = this.block.arr[i].col;
        this.map.arr[row][col].style.backgroundImage = "url(" + this.block.img + ")";
		this.map.arr[row][col].style.backgroundSize = "cover";
    }
}
// 判定蛇是否撞到障碍物
Game.prototype.checkBlock = function() {
    var head = this.snake.arr[this.snake.arr.length - 1];
    for (var i = 0; i < this.block.arr.length; i++) {
        var one_block = this.block.arr[i];
        if (head.row === one_block.row && head.col === one_block.col) {
            this.gameOver();
        }
    }
}