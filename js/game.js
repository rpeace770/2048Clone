function Game(state) {
  this.state = state || [0, 2, 2, 0, 0, 16, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2]
}

Game.prototype.toString = function() {
  var new_string = ""
  var count = 1
  this.state.forEach(function(num) {
    if(count % 4 == 0) {
      new_string += (num.toString() + "\n")
    } else {
      new_string += num.toString();
    }
    count += 1
  })
  return new_string;
}

Game.prototype.move = function(direction) {

  if(direction === "right") {
    var chunk_array = horizontalSplit(this.state);
    var newState = checkRight(chunk_array);
    this.state = _.flatten(newState);
    this.fertilizeBlock();
    console.log(this.toString());
    // call add right function
  } else if(direction === "left") {
    var chunk_array = horizontalSplit(this.state);
    var newState = checkLeft(chunk_array);
    this.state = _.flatten(newState);
    this.fertilizeBlock();
    console.log(this.toString());
    // call add left function
  } else if(direction === "up") {
    var chunk_array = horizontalSplit(this.state);
    var verticalChunks = verticalSplit(chunk_array[0], chunk_array[1], chunk_array[2], chunk_array[3]);
    var newState = checkLeft(verticalChunks);
    var unzippedArrays = _.zip(newState[0],newState[1], newState[2], newState[3]);
    this.state = _.flatten(unzippedArrays);
    this.fertilizeBlock();
    console.log(this.toString());
  } else {
    var chunk_array = horizontalSplit(this.state);
    var verticalChunks = verticalSplit(chunk_array[0], chunk_array[1], chunk_array[2], chunk_array[3]);
    var newState = checkRight(verticalChunks);
    var unzippedArrays = _.zip(newState[0],newState[1], newState[2], newState[3]);
    this.state = _.flatten(unzippedArrays);
    this.fertilizeBlock();
    console.log(this.toString());
  }
}

var horizontalSplit = function(whole_array) {
  var array1 = whole_array.slice(0, 4);
  var array2 = whole_array.slice(4, 8);
  var array3 = whole_array.slice(8, 12);
  var array4 = whole_array.slice(12, 16);
  var chunk_array = [array1, array2, array3, array4];
  return chunk_array;
}

var verticalSplit = function(array1, array2, array3, array4) {
  var vertArrays = _.zip(array1, array2, array3, array4)
  return vertArrays
}

var checkRight = function(chunk_array) {
  largeArray = [];
  chunk_array.forEach(function(single_array) {
    var arrayNoZeroes = _.compact(single_array);
    var built_array = addNumbersRight(arrayNoZeroes);
    // make sure a full array of zeroes stays zeroes
    var addBackZeroes = enlargenArray(built_array, "right");
    // NEED TO BUILD ENLARGEN METHOD
    largeArray.push(addBackZeroes);
  })
  return largeArray;
}

var checkLeft = function(chunk_array) {
   largeArray = [];
    chunk_array.forEach(function(single_array) {
      var arrayNoZeroes = _.compact(single_array);
      var built_array = addNumbersLeft(arrayNoZeroes);
      // make sure a full array of zeroes stays zeroes
      var addBackZeroes = enlargenArray(built_array, "left");
      // NEED TO BUILD ENLARGEN METHOD
      largeArray.push(addBackZeroes);
    })
  return largeArray;

}

var enlargenArray = function(built_array, direction) {
  if(direction === "left") {
    while (built_array.length < 4) {
      built_array.push(0);
    }
  }
  else if(direction === "right") {
    while (built_array.length < 4) {
      built_array.unshift(0);
    }
  }
  return built_array;
}
var addNumbersRight = function(arrayNoZeroes) {
  // console.log(arrayNoZeroes)
  var built_array = [];
  for(var i = 0; i < arrayNoZeroes.length; i++) {
    if(arrayNoZeroes[i] === arrayNoZeroes[i + 1]) {
      // combine them
      var total = arrayNoZeroes[i] + arrayNoZeroes[i + 1];
      // leave 0 in first position and added num in the second position
      built_array.push(total);
      // skip to next position
      i += 1
    } else {
      built_array.push(arrayNoZeroes[i]);
    }
  }
  return built_array;
}

var addNumbersLeft = function(arrayNoZeroes) {
  // console.log(arrayNoZeroes)
  var built_array = [];
  for(var i = (arrayNoZeroes.length - 1); i >= 0; i--) {
    if(arrayNoZeroes[i] === arrayNoZeroes[i - 1]) {
      // combine them
      var total = arrayNoZeroes[i] + arrayNoZeroes[i - 1];
      // leave 0 in first position and added num in the second position
      built_array.unshift(total);
      // skip to next position
      i -= 1
    } else {
      built_array.unshift(arrayNoZeroes[i]);
    }
  }
  return built_array;
}

Game.prototype.fertilizeBlock = function() {
  // shit out a number 2 in random 0 spot
  var placeTwo = _.indexOf(this.state, 0);
  this.state[placeTwo] = 2;
}

var game = new Game([128, 2, 0, 0, 128, 4, 16, 8, 0, 2, 2, 0, 4, 8, 8, 64]);
game.toString();
game.move("down");
game.move("right");

