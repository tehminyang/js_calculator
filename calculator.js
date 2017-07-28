$(document).ready(function() {
  initScreen();
});

var formArr = [0];
var numArr = [];
var decArr = [];
var answer = 0;
var num1 = 0;
var num2 = 0;
var result;
var decFlag = false;
var ope;

function initScreen() {
  //num1 = 123456789.01;
  $(".calcScreen").html(num1);
  $(".formula").html(num1);
}

function errorState() {
  $(".calcScreen").html("error");
  $(".formula").html("error");
}

function decButtonClick() {
  if (!decFlag) {
    decFlag = true;
    $(".calcScreen").html(num1+'.');
    $(".formula").html(formArr.join("")+'.');
  }
}

function convertOpe (operator) {
  if (operator === 'divide') return '&divide;';
  if (operator === 'mult') return '&times;';
  if (operator === 'minus') return '&minus;';
  if (operator === 'plus') return '&#43;';
}

function allClear() {
  numArr = [];
  decArr = [];
  formArr = [];
  num1 = 0;
  num2 = 0;
  $(".calcScreen").html(num1);
  $(".formula").html(num1);
  decFlag = false;
}

function clearError() {
  numArr = [];
  decArr = [];
  num1 = 0;
  $(".calcScreen").html(num1);
  formArr.pop();
  $(".formula").html(formArr.join(""));
  decFlag = false;
}

function clearArrays() {
  numArr = [];
  decArr = [];
}

function numButtonClick(numb) {
  if (decFlag) {
    if (decArr.length < 2) {
      decArr.push(numb);
      updateScreen();
    } else {
      errorState();
    } 
  } else if (numArr.length < 9) {
    numArr.push(numb);
    updateScreen();
  } else {
    errorState();
  };
}

function opeButtonClick(operator) {
  decFlag = false;
  decArr = [];
  if (jQuery.isEmptyObject(formArr) || $.isNumeric(formArr[formArr.length-1])) {
    formArr.push(convertOpe(operator));
    $(".calcScreen").html(convertOpe(operator));
    $(".formula").html(formArr.join(""));
    clearArrays();
  }

}

function updateScreen() {
  if (decArr.length === 1) {
    num1 = numArr.join("")/1+decArr.join("")/10;
    $(".calcScreen").html(num1.toFixed(1));    
  } else if (decArr.length === 2) {
    num1 = numArr.join("")/1+decArr.join("")/100;
    $(".calcScreen").html(num1.toFixed(2));
  } else {
    num1 = (numArr.join("")/1);
    $(".calcScreen").html(num1.toFixed(0));
  }
  if ($.isNumeric(formArr[formArr.length-1])) {
    formArr[formArr.length-1] = num1;
  } else {
    formArr.push(num1);
  }
  $(".formula").html(formArr.join(""));  
}

function eqButtonClick() {
  if ($.isNumeric(formArr[formArr.length-1])) {
    answer = formArr[0];
    var i = 1;
    while (i < formArr.length-1) {
      console.log('ans='+answer);
      console.log('i='+i);
      console.log(formArr[i]);

      if (formArr[i] == '&divide;' && formArr[i+1] != 0) {
        answer /= formArr[i+1]
      } else {
        errorState();
      };
      if (formArr[i] == '&times;') {
        answer *= formArr[i+1]
      };
      if (formArr[i] == '&minus;') {
        answer -= formArr[i+1]
      };
      if (formArr[i] == '&#43;') {
        answer += formArr[i+1]
      }
      if (answer > 999999999 || answer < -999999999) {
        errorState();
        break;
      }
      i += 2;
      console.log('ans after='+answer);
    }
    answer = answer.toFixed(2);
    numArr = [answer];
    $(".calcScreen").html(answer);
    formArr = [answer];
    $(".formula").html(answer);
  }
}
