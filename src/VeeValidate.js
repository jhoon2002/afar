import Vue from "vue";

import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import { required, numeric, length, min, max, email, regex, confirmed } from 'vee-validate/dist/rules';

import ko from 'vee-validate/dist/locale/ko.json';

import { isUserId, isJumin } from "@/apis/db.js"

import { util } from "@/apis/util.js"

localize('ko', ko);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

extend('required', {
    ...required,
    message: "필수 입력"
});
extend('length', length);
extend('numeric', {
    ...numeric,
    message: "숫자만 입력 가능"
});
extend('min', {
    ...min,
    params: ['length'],
    message: "최소 {length}자 이상"

});
extend('max', {
    ...max,
    params: ['length'],
    message: "최대 {length}자 이내"

});
extend('email', {
    ...email,
    message: "이메일 형식 불일치"
});
extend('regex', {
    ...regex,
    message: "형식 불일치"
});
extend('name', {
    validate(value) {
        let pattern = /^([a-zA-Z]+\s?|[가-힣])+[a-zA-Z가-힣]$/;
        return pattern.test(value);
    },
    message: "특수문자나 공백(한글 경우) 사용 불가"
});

extend("jumin", {
    validate(value) {
        let pattern = /^[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])[1-4][0-9]{6}$/;
        return pattern.test(value);
    },
    message: "'―' 없이 숫자만 13자리 입력"
});

extend("juminValidate", {
    validate(value) {
        return util.juminValidate(value)
    },
    message: "올바르지 않은 주민등록번호"
});

extend("cellphone", {
    validate(value) {
        let pattern = /^01[01679][0-9]{7,8}$/;
        return pattern.test(value);
    },
    message: "'―' 없이 숫자만 10~11자리"
});
extend('words', {
    validate(value) {
        let pattern = /^([a-zA-Z가-힣0-9]+\s?)+[a-zA-Z가-힣0-9]$/;
        return pattern.test(value);
    },
    message: "한글, 영문, 숫자만 가능"
});
extend('id', {
    validate(value) {
        let pattern = /^[a-z0-9][a-z0-9_-]{2,19}$/;
        return pattern.test(value);
    },
    message: "영문 소문자, 숫자, '_', '-' (총 3~20자)"
});
extend('password', {
    validate(value) {
        let pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}$/;
        return pattern.test(value);
    },
    message: "영문, 숫자 포함 6~20자"
});
extend('confirmed', {
    ...confirmed,
    message: "입력한 비밀번호와 불일치"
});
extend('duplicated', {
    async validate(userId) {
        try {
            const response = await isUserId(userId)
            if (response.status === 200) {
                return false
            }
            return true //response.status === 204
        } catch {
            return false //접속 에러
        }
    },
    message: "사용 중인 아이디로 이용 불가"
});
extend('juminDuplicated', {
    async validate(juminNo) {
        if (juminNo.length === 13) {
            try {
                const response = await isJumin(juminNo)
                if (response.status === 200) {
                    return false
                }
                return true //response.status === 204
            } catch {
                return false //접속 에러
            }
        }
    },
    message: "이미 등록된 주민등록번호"
});