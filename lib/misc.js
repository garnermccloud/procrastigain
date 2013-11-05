timeouts = [];

when = function(conditionFunc, execFunc, interval){
    if (conditionFunc()){
        execFunc();
    }else{
        timeouts.push( setTimeout(function(){ when(conditionFunc, execFunc, interval);}, interval) );
    }
};
