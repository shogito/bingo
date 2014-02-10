function piler(_pile){
    
    var _initPile = [].concat(_pile);
    var _length = _pile.length;
    var _maxIdx = _pile.length - 1;

    var updateLength = function(){
        _length = _pile.length;
        _maxIdx = _pile.length - 1;
    }
    
    var random = function(_num){
        return Math.floor(Math.random() * _num);
    }
    
    var showIndexes = function(){
        return _pile.length;
    }
    
    var shuffle = function(){
        var _num = showIndexes();
        for (var _i = 1; _i <= _num ; _i++){
            var _idx = random(_num - _i);
            var _selected = _pile[_idx];
            var _end = _pile[_num - 1];
            _pile[_idx] = _end;
            _pile[_num - 1] = _selected;
        }
        // console.log(_pile);
    }
    
    var draw = function(_num){
        if(arguments.length !== 1){
            _num = random(_maxIdx);
        }
        
        var _drawed = _pile.splice(_num, 1);
        updateLength();
        return _drawed;
    }

    var reset = function(){
        _pile = [].concat(_initPile);
        updateLength();
    }
    
    var open = function(_idx, _num){
        _idx = _idx - 1 || 0;
        _num = arguments[1] || 1;
        
        return _pile.slice(_idx, _idx + _num);
    }

    var reverseOpen = function(_idx, _num){
        _idx = _idx - 1 || 0;
        _num = arguments[1] || 0;
        var _rsl = new Array(_num);
        var _start = _maxIdx - _idx;
        
        for (var _i = 0; _i < _num ; _i++){
            _rsl[_i] = _pile[_start - _i];
        }
        
        return _rsl;
    }
    
    var put = function(_put, _idx){
        _pile = _pile.concat(_put);
        updateLength();
        return _put;
    }
    
    var cut = function(_num){
        var _cut = _pile.splice(0, Math.ceil(_length/2));
        updateLength();
        return piler(_cut);
    }
    
    var concatPile = function(_pileObj){
        _pile = _pile.concat(_pileObj.opennAll());
        updateLength();
    }
    
    var uniqSearch = function(fn){
        var _rsl;
        for (var _i = 0; _i < _length; _i++){
            if (fn(_pile[_i])){
                return _i;
            }
        }
    }
    
    var uniqNumberSearch = function(_num){
        var fn = function(x){
            if(x === _num){
                return true;
            }
        }
        return uniqSearch(fn);
    }
    
    return {
        draw: draw,
        length: showIndexes,
        shuffle: shuffle,
        reset: reset,
        open: open,
        rOpen: reverseOpen,
        openAll: function() { return open(1, _length);},
        put: put,
        cut: cut,
        concat: concatPile,
        uniqSearch: uniqSearch,
        uniqNumberSearch: uniqNumberSearch
    };    
}