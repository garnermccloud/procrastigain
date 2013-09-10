when = function(conditionFunc, execFunc, interval){
    if (conditionFunc()){
        execFunc();
    }else{
        setTimeout(function(){ when(conditionFunc, execFunc, interval);}, interval);
    }
};
