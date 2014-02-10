// random関数定義
var random = function(_num){
	return Math.floor(Math.random() * _num);	
}

// range関数定義
var range = function(_start, _end, _step){
	if (arguments.length <= 1){
		_end = _start || 0;
		_start = 0;
	}
	_step = arguments[2] || 1;
	
	var _length = Math.max(Math.ceil((_end - _start) / _step), 0);
	var _idx = 0;
	
	var _range = new Array(_length);
	while (_idx < _length){
		_range[_idx++] = _start;
		_start += _step;
	}
    return _range;
}



// 3D操作関連



//transform3d設定値をmatrix化
function matrix3dToArray(matrix3d){
	var re = /matrix3d\((.*)\)/;
	var vals = matrix3d.match(re)[1].replace(/ /g, "").split(",");
	vals = vals.map(Number)
	
	var matrix = [new Array(4),new Array(4),new Array(4),new Array(4)];
	
	matrix[0][0] = vals[0]; 
	matrix[0][1] = vals[1]; 
	matrix[0][2] = vals[2]; 
	matrix[0][3] = vals[3]; 
	matrix[1][0] = vals[4]; 
	matrix[1][1] = vals[5]; 
	matrix[1][2] = vals[6]; 
	matrix[1][3] = vals[7]; 
	matrix[2][0] = vals[8]; 
	matrix[2][1] = vals[9]; 
	matrix[2][2] = vals[10]; 
	matrix[2][3] = vals[11]; 
	matrix[3][0] = vals[12]; 
	matrix[3][1] = vals[13]; 
	matrix[3][2] = vals[14]; 
	matrix[3][3] = vals[15];
	
	return matrix; 
}

//非3dのtransform設定値をmatrix化
function matrixToArray(matrix3d){
	var re = /matrix\((.*)\)/;
	var vals = matrix3d.match(re)[1].replace(/ /g, "").split(",");
	vals = vals.map(Number)
	
	var matrix = [new Array(4),new Array(4),new Array(4),new Array(4)];
	
	matrix[0][0] = vals[0]; 
	matrix[0][1] = vals[1]; 
	matrix[0][2] = 0; 
	matrix[0][3] = 0; 
	matrix[1][0] = vals[2]; 
	matrix[1][1] = vals[3]; 
	matrix[1][2] = 0; 
	matrix[1][3] = 0; 
	matrix[2][0] = 0; 
	matrix[2][1] = 0; 
	matrix[2][2] = 1; 
	matrix[2][3] = 0; 
	matrix[3][0] = vals[4]; 
	matrix[3][1] = vals[5]; 
	matrix[3][2] = 0; 
	matrix[3][3] = 1;
	
	return matrix; 
}

//htmlオブジェクトから2d/3d matrix設定値を参照
//firefoxしか対応してないからそのうち書き直す
function getMatrix(element){
    function browserCheck(element){
        var matrix = getComputedStyle(element, null).getPropertyValue("-moz-transform");
        if(matrix){
            return matrix;
        }
        var matrix = getComputedStyle(element, null).getPropertyValue("-webkit-transform");
        if(matrix){
            return matrix;
        }
    }
    var matrix = browserCheck(element);
    var re = /matrix3d\((.*)\)/;
    if (matrix.match(re)){
        return matrix3dToArray(matrix);
    }
    var re = /matrix\((.*)\)/;
    if (matrix.match(re)){
        return matrixToArray(matrix);
    } 
    
    return [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
}


//matrixをtransform3d値に変換
function matrixToMatrix3d(matrix){
	var vals = [];

    vals[0] = matrix[0][0].toFixed(20);
    vals[1] = matrix[0][1].toFixed(20);
    vals[2] = matrix[0][2].toFixed(20);
    vals[3] = matrix[0][3].toFixed(20);
    vals[4] = matrix[1][0].toFixed(20);
    vals[5] = matrix[1][1].toFixed(20);
    vals[6] = matrix[1][2].toFixed(20);
    vals[7] = matrix[1][3].toFixed(20);
    vals[8] = matrix[2][0].toFixed(20);
    vals[9] = matrix[2][1].toFixed(20);
    vals[10] = matrix[2][2].toFixed(20);
    vals[11] = matrix[2][3].toFixed(20);
    vals[12] = matrix[3][0].toFixed(20);
    vals[13] = matrix[3][1].toFixed(20);
    vals[14] = matrix[3][2].toFixed(20);
    vals[15] = matrix[3][3].toFixed(20);
	
	var matrix3d = "matrix3d(" + 
					vals[0] + "," +
					vals[1] + "," +
					vals[2] + "," +
					vals[3] + "," +
					vals[4] + "," +
					vals[5] + "," +
					vals[6] + "," +
					vals[7] + "," +
					vals[8] + "," +
					vals[9] + "," +
					vals[10] + "," +
					vals[11] + "," +
					vals[12] + "," +
					vals[13] + "," +
					vals[14] + "," +
					vals[15] + ")";
	return matrix3d; 
}


//度/ラジアン変換
function deg2rad(deg){
	rad = deg * Math.PI / 180;
	return rad;
}


//平行移動
function translate(tx, ty, tz){
    var matrix = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[tx,ty,tz,1]];
    return matrix;
}

//角運動 X軸
function rotateX(rx){
    var rad = deg2rad(rx);
    var matrix = [
        [1,0,0,0],
        [0,Math.cos(rad),Math.sin(rad),0],
        [0,-Math.sin(rad),Math.cos(rad),0],
        [0,0,0,1]
    ]    
    return matrix;
}

//角運動 Y軸
function rotateY(ry){
    var rad = deg2rad(ry);
    var matrix = [
        [Math.cos(rad),0,-Math.sin(rad),0],
        [0,1,0,0],
        [Math.sin(rad),0,Math.cos(rad),0],
        [0,0,0,1]
    ]
    return matrix;
}

//角運動 Z軸
function rotateZ(rz){
    var rad = deg2rad(rz);
    var matrix = [
        [Math.cos(rad),Math.sin(rad),0,0],
        [-Math.sin(rad),Math.cos(rad),0,0],
        [0,0,1,0],
        [0,0,0,1]
    ]
    return matrix;
}

//
function rotateElement(elm, rx, ry, rz){
    var matrix = getMatrix(elm);
    
    if (rx !== 0){
        var rx = rotateX(rx);
        var matrix = numeric.dot(matrix, rx);
    }

    if (ry !== 0){
        var ry = rotateY(ry);
        var matrix = numeric.dot(matrix, ry);
    }

    if (rz !== 0){
        var rz = rotateY(rz);
        var matrix = numeric.dot(matrix, rz);
    }
    var matrix3d = matrixToMatrix3d(matrix);
    compatiTransform(elm, matrix3d);    
}


//
function compatiTransform(elm, matrix3d){
    if (elm.style.webkitTransform !== undefined){
        elm.style.webkitTransform = matrix3d;
    }
    if (elm.style.MozTransform !== undefined){
        elm.style.MozTransform = matrix3d;
    }    
}


//操作対象element生成関連
//対象の親オブジェクトにmainPanelつくる
function createMainPanel(parentNode, className){
    if(className === undefined){ className = 'mainPanel'}
    var element = document.createElement('div');
    element.id = "mainPanel";
//    element.textContent = "panel";
    element.className = "mainPanel";
    parentNode.appendChild(element);
    return element;
}

//親の下に子element生成
function createChilds(args){
    // args{ className, textContet, parent, childs }

    if(args.className === undefined){ args.className = 'childNode'}

    var childNodes = {};
    for (var _i = 0; _i < args.childs.length; _i++){
        var element = document.createElement('div');
        if(args.id !== undefined){ element.id = args.id ; }
        if(args.textContent !== undefined){ element.textContent = args.textContent ; }
        if(args.className !== undefined){ element.className = args.className ; } else { element.className = 'childNode';}
        args.parent.appendChild(element);
        childNodes[_i] = element;
    }
    return childNodes;
}



