function validatePercentage(arr){
    const validPercentage = 100;
    let total = 0;
    for(i = 0; i < arr.length; i++){
        total = total + arr[i]
    }
    if(validPercentage === total){
        return true;
    }else{
        return false;
    }
}

