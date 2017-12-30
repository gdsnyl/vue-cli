// 定义一个全局Key
const KEY = 'buyGoods';
// 从localStorage中获取到数据

export function getItem() {
    var jsongString = localStorage.getItem(KEY);
    // 如果localStorage中没有这个key对应的数据则返回一个空对象
    if (!jsongString){
        return {};
    }
    //   如果有值，则将这个字符串转换成对象返回
    return JSON.parse(jsongString);

 }

// 设置localStorage中的数据gobj:{gid:88,count:1}
export function setItem(gobj) {
    // 从localStorage中获取购买商品的对象
    var obj = getItem();
    // 判断gobj.gid的值在obj中是否存在， 如果存在将gobj.count的值叠加上去即可obj:{88:1}
    if (obj[gobj.gid]){
        obj[gobj.gid] = obj[gobj.gid] + gobj.count;
    }else{
        // 如果不存在，则动态向obj对象中添加一个商品的购买数量
        obj[gobj.gid] = gobj.count;
    }
    // 将obj存储会loacalStorage中
    localStorage.setItem(KEY, JSON.stringify(obj));
}


// 覆盖一个值
export function setItemReplace(gobj) {
    // 1.0 从localStorage中获取购买商品的对象
    var obj = getItem();

    obj[gobj.gid] = gobj.count;

    //  将obj存储会loacalStorage中
    localStorage.setItem(KEY, JSON.stringify(obj));
}

// 删除localSrotorage中的数据
export function removeItem(goodsid) {
    //拿到商品数据
    var obj = getItem();
//    删除obj中对应的属性
 delete obj[goodsid];
//  写回localStorage
    localStorage.setItem(KEY,JSON.stringify(obj));
}