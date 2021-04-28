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
    }
}