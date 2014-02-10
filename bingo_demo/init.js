window.onload = function(){
    bingo = piler(range(100));
    bingo.shuffle();
    
    bingo.createElement = function(parElm, fn){
        var len = bingo.length();
        var balls = {};
        
        mainPanel = createMainPanel(parElm);
        for (var _i = 0; _i < len; _i++){
            balls[_i] = createChilds({parent: mainPanel, childs: range(1), className:"ball", id: _i});
            var ball = balls[_i][0];
            var front = fn({parent:ball, childs:range(1), className: "front", textContent: _i});
            var back = fn({parent:ball, childs:range(1), className: "back"});
        }
        return {mainPanel: mainPanel, balls: balls};
    }
    
    parentNode = document.getElementById('main');
    objs = bingo.createElement(parentNode, createChilds);
    
    for (var _i = 0; _i < Object.keys(objs.balls).length; _i++){
        rotateElement(objs.balls[_i][0], random(360), random(360), random(360));
    }
    
    var button = document.getElementsByClassName('bingoButton')[0];
    button.addEventListener('click', fn, 'false');
    button.addEventListener('webkitTransitionEnd', nonAct, 'false');
    button.addEventListener('MozTransitionEnd', nonAct, 'false');
    button.addEventListener('mozTransitionEnd', nonAct, 'false');
    button.addEventListener('transitionEnd', nonAct, 'false');
    button.addEventListener('transitionend', nonAct, 'false');

    
    outBox = [];
    
    var positionX = 0;
    var positionY = 0;
    
    function fn(e){
        e.target.className = "bingoButtonActive";
        for (var _i = 0; _i < Object.keys(objs.balls).length; _i++){
            if(objs.balls[_i][0].className !== 'outBox'){
                rotateElement(objs.balls[_i][0], random(360), random(360), random(360));
            }
        }
        
        outBox.push(bingo.draw());
        
        var number = outBox[outBox.length -1];
        var elm = document.getElementById(number);
  
        var transMatrix = translate(positionX, positionY, 0);
        var matrix3d = matrixToMatrix3d(transMatrix);
        compatiTransform(elm, matrix3d);
        
        elm.className = 'outBox';
        elm.firstChild.style.background = 'linear-gradient(0deg, pink, white)'
        positionX += 30;
        if (positionX > 450){
            positionY += 30;
            positionX =0;
        }
    }
    
    function nonAct(e){
        e.target.className = "bingoButton";
    }
}