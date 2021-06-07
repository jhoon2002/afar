import Vue from "vue";
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import { required, numeric, length, min, max, email, regex, confirmed } from 'vee-validate/dist/rules';
import ko from 'vee-validate/dist/locale/ko.json';
import { isUserId, isJumin } from "@/apis/db.js"
import { util } from "@/apis/util.js"
import http from "@/apis/http"

localize('ko', ko);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

extend('required', {
    ...required,
    message: "필수 입력"
});
// extend('length', length);
extend('length', {
    ...length,
    params: ['length'],
    message: "{length}자 입력"
});
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

//TRUE: PASS(green), FALSE: FAIL(red)
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
    message: "올바르지 않은 번호"
});

extend("jumin-multi", {
    params: ["jumin1", "jumin2"],
    validate: (value, { jumin1, jumin2 } ) => {
        const jumin = jumin1 + jumin2 + value
        return util.juminValidate(jumin)
    },
    message: "올바르지 않은 번호"
});

extend("juminSex", {
    validate: value => {
        return value !== "9" && value !== "0"
    },
    message: "형식에 맞지 않습니다."
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
    message: "사용 중인 아이디"
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

// 주민등록번호 앞번호 검증
extend('jumin1', {
    params: ["jumin2"],
    validate: (value, { jumin2 }) => {
        if (!jumin2) return true
        // console.log("value", value, jumin2)
        const ymd = util.toBirthday(value + jumin2, false, "")
        // console.log("ymd", ymd)
        // console.log("결과", util.isValidDate(ymd))
        return util.isValidDate(ymd)
    },
    message: "잘못된 번호"
});

//회원 가입시 가입된 주민등록번호 여부 검사
extend('isJumin', {
    params: ["jumin1", "jumin2"],
    validate: async (value, { jumin1, jumin2 } ) => {
        const jumin = jumin1 + jumin2 + value
        try {
            const res = await http.get("/api/users/jumin/" + jumin)

            // 미등록자 => PASS(green)
            if (res.status === 200 && !res.data.user) {
                // console.log("미등록자 pass green")
                return true
            }

            // 사전 등록자(아이디는 아직 없고, 주민번호만 보유) => PASS(green)
            if (res.status === 200 && !res.data.user.userId) {
                // console.log("사전 등록자 pass green")
                return true
            }

            // 정상 등록자(아아디와 주민번호 모두 보유) => FAIL(red)
            if (res.status === 200) {
                // console.log("정상 등록자 fail red")
                return "이미 등록된 번호"
            }

        } catch { // 시스템 에러는 검증이 불가하므로 false, 에러 메시지가 문제.. 이미 등록된 번호로 나옴
            return '시스템 에러(관리자에 문의)'
        }
    }
});

extend('alwaysFalse', {
    validate: () => {
        return false
    },
    message: "　"
});

extend('agree', {
    validate: (value) => {
        return value
    },
    message: "필수 동의"
});