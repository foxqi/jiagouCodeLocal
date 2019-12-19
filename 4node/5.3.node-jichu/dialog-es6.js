class Dialog{
    constructor(){
        this.time=3000;
    }
    static title='弹框';
    $show(){
        console.log('show')
    }
    $hide(){
        console.log('hide')
    }
}

module.exports=Dialog;