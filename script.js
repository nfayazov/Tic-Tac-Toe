var cellArray = new Array();
var turn = 'X';
var hasWinner = false;
var isRestart = false;

function Cell(obj) {
	this.content = ""; 
	this.obj = obj;
	this.setSymbol = function(symbol) {
		this.content = symbol;
		this.obj.innerHTML = symbol;
	}
}

function render() {
	var grid = document.getElementById("grid");
	for (var row = 0; row < 3; row++) {

		var tableRow = grid.insertRow(row);
		tableRow.className = "tableRow;"

		for (var cell = 0; cell < 3; cell++) {

			var tableCell = tableRow.insertCell(cell);
			tableCell.className = "tableCell";

			//create cell instance
			var newCell = new Cell(tableCell);
			cellArray.push(newCell);
		}
	}
	if (!isRestart) {
		$("#container").append("<div id='restart'>Restart</div>");
		isRestart = true;
	}
}

function checkWin() {
	if (cellArray[0].content != "" && cellArray[0].content == cellArray[1].content && cellArray[0].content == cellArray[2].content) {
		hasWinner = true;
		$("h3").html(cellArray[0].content + " WINS");
	} else if(cellArray[3].content != "" && cellArray[3].content == cellArray[4].content && cellArray[3].content == cellArray[5].content) {
		hasWinner = true;
		$("h3").html(cellArray[3].content + " WINS");
	} else if(cellArray[6].content != "" && cellArray[6].content == cellArray[7].content && cellArray[6].content == cellArray[8].content) {
		hasWinner = true;
		$("h3").html(cellArray[6].content + " WINS");
	} else if(cellArray[0].content != "" && cellArray[0].content == cellArray[4].content && cellArray[0].content == cellArray[8].content) {
		hasWinner = true;
		$("h3").html(cellArray[0].content + " WINS");
	} else if(cellArray[1].content != "" && cellArray[1].content == cellArray[4].content && cellArray[1].content == cellArray[7].content) {
		hasWinner = true;
		$("h3").html(cellArray[1].content + " WINS");
	} else if(cellArray[2].content != "" && cellArray[2].content == cellArray[4].content && cellArray[2].content == cellArray[6].content) {
		hasWinner = true;
		$("h3").html(cellArray[2].content + " WINS");
	} else if (cellArray[0].content != "" && cellArray[0].content == cellArray[3].content && cellArray[0].content == cellArray[6].content) {
		hasWinner = true;
		$("h3").html(cellArray[0].content + " WINS");
	} else if(cellArray[2].content != "" && cellArray[2].content == cellArray[5].content && cellArray[2].content == cellArray[8].content) {
		hasWinner = true;
		$("h3").html(cellArray[2].content + " WINS");
	}
	if (hasWinner) {
		$("h3").css("color", "red");
		$(".tableCell").off("click");
	}
}

function checkDraw() {
	var allFilled = true;
	cellArray.forEach(function(element) {
     	if (element.content == "") allFilled = false;
	})
	if (allFilled && !hasWinner) $("h3").html("DRAW");
}

function changedTurn(turn) {
	$("h3").html("Turn: " + turn);
	checkDraw();
	checkWin();
}

function clickON() {

	var $cells = $(".tableCell");
	$cells.on("click", function() {
		var index = ($(this).parent().index()*3) + $(this).index();
		var cell = cellArray[index];
		if (cell.content == "") {
			if (turn == "X") {
				cell.setSymbol("X");
				turn = "O";
			} else {
				cell.setSymbol("O");
				turn = "X";
			}			
			changedTurn(turn);
		}
	});

}

function restart() {
	$("#restart").click(function() {
		var grid = document.getElementById("grid");
		while (grid.hasChildNodes()) {
    		grid.removeChild(grid.lastChild);
    	}

    	//setting vars back to original values
    	cellArray = [];
    	turn = "X";
    	hasWinner = false;
    	$("h3").css("color", "black");
    	$("h3").html("Turn: " + turn);

    	render();
    	clickON();
	})
}


$(document).ready(function() {

	render();
	clickON();
	restart();
	
});