var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var ObjectWrapper = /** @class */ (function () {
    // private _obj: T;
    /***
     * 引数のオブジェクトのコピーを this._objに設定
     */
    // Object.assignメゾットでthis_objをコピーする
    function ObjectWrapper(_obj) {
        this._obj = _obj;
        this._obj = Object.assign({}, _obj);
    }
    Object.defineProperty(ObjectWrapper.prototype, "obj", {
        /**
         * this._objのコピーを返却
         * @return Object
         */
        get: function () {
            console.log(this._obj);
            return __assign({}, this._obj);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * this._obj[key] に valを設定。keyがthis._objに存在しない場合、falseを返却
     * @param key オブジェクトのキー
     * @param val オブジェクトの値
     */
    // keyof T とすることで、オブジェクトのキーをユニオン型に変更できる
    ObjectWrapper.prototype.set = function (key, val) {
        if (this._obj[key] !== undefined) {
            this._obj[key] = val;
            console.log(this._obj);
            return this._obj.hasOwnProperty(key);
        }
        return this._obj.hasOwnProperty(key);
    };
    /**
     * 指定したキーの値のコピーを返却
     * 指定のキーが存在しない場合 undefinedを返却
     * @param key オブジェクトのキー
     */
    ObjectWrapper.prototype.get = function (key) {
        if (this._obj[key] === undefined) {
            return undefined;
        }
        return this._obj[key];
    };
    /**
     * 指定した値を持つkeyの配列を返却。該当のものがなければ空の配列を返却。
     */
    //ここで指定したい関数は「Class初期化に使用したオブジェクトが持っている値の型」で定義したい
    // ↓これを'OK'にしたい
    //  const wrappedObj2 = new ObjectWrapper(obj2);
    //  const keys = wrappedObj2.findKeys('02');
    //  if (
    //    wrappedObj2.findKeys('03').length === 0 &&
    //    keys.includes('b') &&
    //    keys.includes('bb') &&
    //    keys.includes('bbb') &&
    //    keys.length === 3
    //  ) {
    //    console.log('OK: findKeys(val)');
    //  } else {
    //    console.error('NG: findKeys(val)');
    //  }
    ObjectWrapper.prototype.findKeys = function (val) {
        var _this = this;
        // Object.keysメゾットとfilterメゾットを用いて、this._objの配列から値を取って、その値とfindkeysで指定した値が一緒かどうかを判別する
        var result = Object.keys(this._obj).filter(function (key) {
            return _this._obj[key] = val;
        });
        return result;
    };
    return ObjectWrapper;
}());
/**
 * check script
 * 完成したら、以下のスクリプトがすべてOKになる。
 */
var obj1 = { a: '01', b: '02' };
var wrappedObj1 = new ObjectWrapper(obj1);
"";
if (wrappedObj1.obj.a === '01') {
    console.log('OK: get obj()');
}
else {
    console.error('NG: get obj()');
}
if (
//key: keyof T　つまりobj1でクラス初期化されているためkeyof obj1となりobj1内のキー以外ではコンパイルエラーとなる
// wrappedObj1.set('c', '03') === false &&// set{key: "a"| "b",val: string}が返されている
wrappedObj1.set('b', '04') === true &&
    wrappedObj1.obj.b === '04') {
    console.log('OK: set(key, val)');
}
else {
    console.error('NG: set(key, val)');
}
if (wrappedObj1.get('b') === '04'
    // && wrappedObj1.get('c') 
    === undefined) {
    console.log('OK: get(key)');
}
else {
    console.error('NG: get(key)');
}
var obj2 = { a: '01', b: '02', bb: '02', bbb: '02' };
var wrappedObj2 = new ObjectWrapper(obj2);
var keys = wrappedObj2.findKeys('02');
if (wrappedObj2.findKeys('03').length === 0 &&
    keys.includes('b') &&
    keys.includes('bb') &&
    keys.includes('bbb') &&
    keys.length === 3) {
    console.log('OK: findKeys(val)');
}
else {
    console.error('NG: findKeys(val)');
}
