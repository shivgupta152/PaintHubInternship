
var answer = ["B","B","B","B" ];
var markedAns=[];
var score=0;
var totalAttempt=0;
var totalCorrect=0;
function calscore() {


    // let ans

    for(var j =1; j<= answer.length;j++) {
        var x = document.getElementsByName(j);
        for (var i = 0; i < x.length; i++) {
            if (x[i].checked)
            {
                console.log(x[i].value);
                markedAns[j] = x[i].value;
                break;
            }
            else
                markedAns[j]=0;
        }

    }
    calc() ;
}

function calc() {
    for(var i =1;i<=answer.length;++i) {
        if (markedAns[i] === answer[i-1]) {
            // total score of test
            totalCorrect++;
        }
        if (markedAns[i]  ===  0) {
            totalAttempt++;
        }
    }
    console.log("Attempt"+(answer.length-totalAttempt))
    console.log("Correct"+totalCorrect);
    console.log(totalCorrect/answer.length)
    output()
}

function output() {

    var a = document.getElementById("totCorrect");
    a.innerHTML=totalCorrect;
    var b = document.getElementById("totAttempt");
    b.innerHTML = (answer.length-totalAttempt);
    var c = document.getElementById("totScore");
    c.innerHTML=totalCorrect;
    var d = document.getElementsByClassName("percentage")
    var i;
    for (i = 0; i < d.length; i++) {
        d[i].innerHTML = (totalCorrect/answer.length)*100
    }
};

function correctAns(){

    var x = document.getElementsByClassName("ans")
    for( var i=0;i<answer.length;++i){
        x[i].innerHTML ="✔";
    }

}

