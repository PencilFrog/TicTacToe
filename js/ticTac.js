
// #SoupCan

var $table = $("<table></table>");
$("body").append($table);

var gameOver = false;
var tie = false;
var player = 1;
var PlayerScore = [0, 0];
var board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

var checkWinningPosition = function(player, x1, y1, x2, y2, x3, y3) {
	var cell1 = board[y1][x1];
	var cell2 = board[y2][x2];
	var cell3 = board[y3][x3];
	if (cell1 == player && cell2 == player && cell3 == player) {
		PlayerScore[player - 1] += 1;
		$ticTacScoreP1.text("P1 | " + PlayerScore[0]);
		$ticTacScoreP2.text("P2 | " + PlayerScore[1]);
		$ticTacMessage.text("Player " + player + " wins!");
		gameOver = true;
	}
};

var checkTie = function() {
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (board[i][j] == 0) {
				return;
			}
		}
	}
	gameOver = true;
	tie = true;
};

var checkWinner = function(player) {
	checkWinningPosition(player, 0, 0, 0, 1, 0, 2);
	checkWinningPosition(player, 1, 0, 1, 1, 1, 2);
	checkWinningPosition(player, 2, 0, 2, 1, 2, 2);
	checkWinningPosition(player, 0, 0, 1, 0, 2, 0);
	checkWinningPosition(player, 0, 1, 1, 1, 2, 1);
	checkWinningPosition(player, 0, 2, 1, 2, 2, 2);
	checkWinningPosition(player, 0, 0, 1, 1, 2, 2);
	checkWinningPosition(player, 2, 0, 1, 1, 0, 2);
	if (gameOver == false) {
		checkTie();
	}
};

var setCellClick = function($cell, i, j) {
	$cell.click(function() {
		if (gameOver == false){
			if ($cell.text() == ""){
				if (player == 1) {
					board[i][j] = 1;
					$cell.text("X");
					$cell.addClass("taken");
					checkWinner(player);
					player = 2;
				} else {
					board[i][j] = 2;
					$cell.text("O");
					$cell.addClass("taken");
					checkWinner(player);
					player = 1;
				}
			}
		}
		if (gameOver == false){
			$ticTacMessage.text("Player " + player + "'s Turn");
		}
		if (tie == true) {
			$ticTacMessage.text("It's a Tie!");
		}
	});
};

var restart = function() {
	board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
	gameOver = false;
	tie = false;
	$ticTacMessage.text("Player " + player + " Starts");

	for (var row = 3; row < 6; row++) {
		for (var cell = 1; cell < 4; cell++) {
			var $tmpCell = $("tr:nth-of-type(" + row + ") td:nth-of-type(" + cell + ")");
			$tmpCell.removeClass();
			$tmpCell.text("");
		}
	}
};


var $ticTacTitle = $("<tr></tr>").html("<th colspan = 3>TicTacToe</th>");
var $ticTacScoreRow = $("<tr></tr>");
var $ticTacScoreP1 = $("<th></th>").text("P1 | " + PlayerScore[0]);
	$ticTacScoreP1.addClass("score");
var $ticTacScoreP2 = $("<th></th>").text("P2 | " + PlayerScore[1]);
	$ticTacScoreP2.addClass("score");
var $ticTacRestart = $("<td onclick='restart()'></td>").text("Restart");
	$ticTacRestart.addClass("restart");


$table.append($ticTacTitle);
$table.append($ticTacScoreRow);
$ticTacScoreRow.append($ticTacScoreP1);
$ticTacScoreRow.append($ticTacRestart);
$ticTacScoreRow.append($ticTacScoreP2);


for (var i = 0; i < 3; i++) {
	var $tr = $("<tr></tr>");
	for (var j = 0; j < 3; j++) {
		var $td = $("<td></td>");
		$tr.append($td);
		setCellClick($td, i, j);
	}
	$table.append($tr);
}

var $ticTacMessageRow = $("<tr></tr>");
$table.append($ticTacMessageRow);

var $ticTacMessage = $("<th colspan = 3>Player 1 Starts</th>");
$ticTacMessageRow.append($ticTacMessage);
$ticTacMessage.addClass("message");



