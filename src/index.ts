type BeseObject = {
  a: string;
  b: string;
  [key: string]: string;
};
//findKeysのvalに新しく型を指定
type SecondObject = {
  a: string;
  b: string;
  bb: string;
  bbb: string;
  [key: string]: string;
};

type AllObject = BeseObject | SecondObject;


class ObjectWrapper<T extends AllObject > {
    // private _obj: T;
    /***
     * 引数のオブジェクトのコピーを this._objに設定
     */
      // Object.assignメゾットでthis_objをコピーする
    constructor(private _obj: T) {
      this._obj = Object.assign({},_obj);
    }
  
    /**
     * this._objのコピーを返却
     * @return Object
     */
    get obj(){
      return {...this._obj};
    }
  
    /**
     * this._obj[key] に valを設定。keyがthis._objに存在しない場合、falseを返却
     * @param key オブジェクトのキー
     * @param val オブジェクトの値
     */
    // keyof T とすることで、オブジェクトのキーをユニオン型に変更できる
    set(key: keyof T, val: T[keyof T]): boolean {
      if (this._obj[key] !== undefined){
        this._obj[key] = val;
        console.log(this._obj);
        return this._obj.hasOwnProperty(key);
      }
      return this._obj.hasOwnProperty(key);
    }
  
    /**
     * 指定したキーの値のコピーを返却
     * 指定のキーが存在しない場合 undefinedを返却
     * @param key オブジェクトのキー
     */
    get(key:keyof T) {
    
      if (this._obj [key] === undefined) {
        return undefined;
      }
      return this._obj[key];
    }
  
    /**
     * 指定した値を持つkeyの配列を返却。該当のものがなければ空の配列を返却。
     */
    findKeys(val: T[keyof T]): (keyof T)[]{
      if (this._obj.hasOwnProperty(val) === false){
        return [];
      } 
      console.log(this._obj);
      return this.obj.keys(val);
    }
  }
  
  /**
   * check script
   * 完成したら、以下のスクリプトがすべてOKになる。 
   */
  const obj1 = { a: '01', b: '02' };
  const wrappedObj1 = new ObjectWrapper(obj1);
    ``
  if (wrappedObj1.obj.a === '01') {
    console.log('OK: get obj()');
  } else {
    console.error('NG: get obj()');
  }
  
  if (
    //key: keyof T　つまりobj1でクラス初期化されているためkeyof obj1となりobj1内のキー以外ではコンパイルエラーとなる
    // wrappedObj1.set('c', '03') === false &&// set{key: "a"| "b",val: string}が返されている
    wrappedObj1.set('b', '04') === true &&
    wrappedObj1.obj.b === '04'
  ) {
    console.log('OK: set(key, val)');
  } else {
    console.error('NG: set(key, val)');
  }
  
  if (wrappedObj1.get('b') === '04' 
  // && wrappedObj1.get('c') 
  // === undefined
  ) {
    console.log('OK: get(key)');
  } else {
    console.error('NG: get(key)');
  }
  
  const obj2 = { a: '01', b: '02', bb: '02', bbb: '02' };
  const wrappedObj2 = new ObjectWrapper(obj2);
  const keys = wrappedObj2.findKeys('02');
  if (
    wrappedObj2.findKeys('03').length === 0 &&
    keys.includes('b') &&
    keys.includes('bb') &&
    keys.includes('bbb') &&
    keys.length === 3
  ) {
    console.log('OK: findKeys(val)');
  } else {
    console.error('NG: findKeys(val)');
  }
