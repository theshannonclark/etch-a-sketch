$(document).ready(function() {
  var $container = $("#etch-a-sketch");

  var etchasketch = new EtchASketch(16, 16);
  etchasketch.draw($container);

  $container.mousemove(function(e) {
    if ($(e.target).hasClass("inactive")){
      setCellActive(e.target, true);
    }
    e.stopPropagation();
  });

  $("#clearSketch").click(function() {
    etchasketch.clear($container);
  });
});

function EtchASketch(gridCellsX, gridCellsY) {
  this.gridCellsX = gridCellsX;
  this.gridCellsY = gridCellsY;
};

EtchASketch.prototype.draw = function(container) {
  var cellWidth = parseInt(container.css("width"), 10) / this.gridCellsX;
  var cellHeight = parseInt(container.css("height"), 10) / this.gridCellsY;
  
  var numCells = this.gridCellsX * this.gridCellsY;
  for (var i = 0; i < numCells; i++) {
    var $cell = createCell(cellWidth, cellHeight);
    container.append($cell);
  }
};

EtchASketch.prototype.clear = function($container) {
  var $cells = $container.children(".cell");
  for (var i = 0; i < $cells.length; i++) {
    setCellActive($cells[i], false);
  }
};

function createCell(width, height) {
  var $cell = $("<div>");
  $cell.css("width", width + "px").css("height", height + "px");
  $cell.addClass("cell inactive");
  
  return $cell;
}

function setCellActive(cell, active) {
  var $cell = $(cell);

  $cell.removeClass("inactive");
  $cell.removeClass("active");

  if (active) {
    $cell.addClass("active")
  } else {
    $cell.addClass("inactive");
  }
}
