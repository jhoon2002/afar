export const util = {

    //\n을 <br/>로 변환
    htmlReturn: function (targetString) {
        if (targetString) {
            return targetString.replace(/\n/g, "<br/>")
        }
        return
    },

    //특정 검색 단어 마크업
    markWord: function (target, word, className) {
        if (target) {
            return target.replace(new RegExp(word, "g"), "<span class='" + className + "'>" + word + "</span>")
        }
        return target
    },

    //게시판 검색시 특정 필드(targetField)만 마크업
    markWordInBoard: function (target, word, targetField, selectedfields, className="searchWord") {
        if (target && selectedfields.includes(targetField)) {
            return this.markWord(target, word, className)
        }
        return target
    },

    //문자열 길이 구하기
    getByteLength: function(str) {
        let len = 0
        for (let i = 0; i < str.length; i++) {
            if (escape(str.charAt(i)).length === 6) {
                len++
            }
            len++
        }
        return len
    },

    //휴대폰 번호 '-' 표시 포함
    cellphonePhase: function (str) {
        if (!str) return
        let l = 0
        if (str.length === 10) {
            l = 3
        } else if (str.length === 11) {
            l = 4
        } else {
            return
        }
        return str.substr(0, 3) + "-" + str.substr(3, l) + "-" + str.substr(3+l, 3+4+l)
    }
}