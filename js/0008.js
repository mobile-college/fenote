console.log('//0008//////////////////////////////');

// JS pattern

// 1、observer [观察者模式]
/*

class StateTracker{
        constructor(){
            this.observers = [];
            this.internalState= 10;
        }
        // 改变内部状态，触发状态的观察者列表
        change(val){
            this.internalState= val;
            this.observers.forEach(observer=>observer(val));
        }// 注册观察者
        registerObserver(ObserverFn){
            this.obserers.push(ObserverFn)
        }
    }

 */


// 2、publish/subscribe [订阅发布模式]
/*

class PubSubHandler{
        constructor(){
            this.eventPool = {};
        }
        //移除
        off(topicName){
            delete this.observers[topicName]
        }
        //发布
        trigger(topicName,...args){
            this.eventPool[topicName] &&
            this.eventPool[topicName].forEach(callback=>callback(...args));
        }
        //订阅
        on(topicName,callback){
            let topic = this.eventPool[topicName] ;
            if(!topic){
                this.eventPool[topicName] =[]
            }
            this.eventPool[topicName].push(callback)
        }
    }

 */

// 3、singleton[单例模式]
/*

var singleton = ()=>{
        var instance;
        var createInstance = ()=>{
            this.a = 1;
            this.b = 2;
        }// 单例模式方法入口
        return {
            getInstance:()=>{
                if(!instance){
                    instance = createInstance();
                }
                return instance;
            }
        }
    }
    var test = singleton();
    test.getInstance() == test.getInstance() //true


 */

// 4、decorator装饰者模式
/*

function decorator(sourceObj,decortorFn){
        decortorFn(sourceObj);
        return sourceObj
    }
    var d = {a:1};
    // d变为了{a:1,b:1}
    d = decorator(d,(d)=>{d.b=1});

 */

// 5、mixin混合模式
/*

class StateTracker{
        constructor(){
            this.raw = {
                a:1,
                b:2
            }
        }// 混合模式方法入口
        mixin(obj){
            Object.assign(this.raw,obj)
        }
    }

 */

/*

 observer模式在redux中的使用示例代码
    var store = createStore(reducer,initialState);
    //注册redux store，存储在 nextListeners数组
    var test = store.subscribe(()=>{console.log('我注册了！')});
    // 取消注册监听
    test.unsubscribe();

 publish/subscribe在jquery中的使用示例代码

    $(document).on('hello',()=>{console.log('hello')})
    $(document).trigger('hello');
    $(document).off('hello')

 decorator模式在react-redux中的实践
    //装饰器
    @connect(state=>state)
    class Container extends Component{
        render(){
            return JSON.stringify(this.props)
        }
    }

 */



console.log('////////////////////////////////////');
