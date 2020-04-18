function funcScope() {
    var v1 = 123;
    if(true) {
        var v2 = 123;
        let ll = 'abc';
        console.log('let은 Block Scope, ll: ', ll);
    }
    // console.log('let은 Block Scope, ll : ', ll);
    console.log('var는 Function Scope, v2: ', v2);
}

funcScope();
// console.log('var은 Function Scope, v1 : ', v2);
