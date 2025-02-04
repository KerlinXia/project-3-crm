const validators = {
    /**
     * 可区分全角字符/半角字符的长度校验。
     * @param min
     * @param max
     * @returns {Function}
     */
    length({min=0,max=100000000}){
        return function(rule, value,callback){
            //将一个全角字符替换成两个半角字符，以得到真实长度。
            let realLength = value.replace(/[\u0391-\uFFE5]/g,'aa').length;
            realLength <= max && realLength >= min ? callback() : max<100000000 ? callback('输入长度应在'+min+'到'+max+'个字符之间！') : callback('至少应输入'+min+'个字符！');
        }
    },
    password(){
        return function(rule, value,callback){
            let reg = new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}')
            const msg = "密码中必须包含大小写字母、数字、特称字符，至少8个字符，最多30个字符"
            if(!reg.test(value)){
                if(!callback)return msg;
                callback(msg)
            }
        }
    },
    email(){
        return function(rule, value,callback){
            let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
            const msg = "您输入的email地址不正确"
            if(!reg.test(value)){
                if(!callback) return msg;
                callback(msg)
            }
        }
    },
    install:function(Vue) {
        Vue.prototype.validators = validators;
    }
}

export default validators
