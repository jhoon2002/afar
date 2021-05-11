import http from "@/apis/http";
import qs from "qs";
// const _ = require("lodash");

export function fetchCount(model, obj) {
    // let sp = _.cloneDeep(searchParams);
    // let pp = _.cloneDeep(pageParams);
    // let p = ignoreEmpty(Object.assign({}, sp, pp ));
    console.log("fetchCount in db.js: " + "/api/" + model + "/count", obj);
    return http.get("/api/" + model + "/count", {
        params: obj,
        paramsSerializer: params => {
            return qs.stringify(params, {allowDots: true, encode: false })
        }
    });
}

export function fetchData(model, obj) {
    // let sp = _.cloneDeep(searchParams);
    // let pp = _.cloneDeep(pageParams);
    // let p = ignoreEmpty(Object.assign({}, sp, pp ));
    // let p = (Object.assign({}, searchParams, pageParams));
    console.log("fetchData in db.js: " + "/api/" + model, obj);
    return http.get("/api/" + model, {
        params: obj,
        paramsSerializer: params => {
            return qs.stringify(params, {allowDots: true, encode: false })
        }
    });
}

export function fetchOne(model, id) {
    console.log("fetchOne in db.js: " + "/api/" + model + "/" + id);
    return http.get("/api/" + model + "/" + id);
}

export function fetchEmployee(userid) {
    console.log("fetchEmployee in db.js: " + "/api/employee/uid/" + userid);
    return http.get("/api/employee/uid/" + userid);
}

export function create(model, obj) {
    console.log("create in db.js: " + "/api/" + model + "/new", obj);
    return http.post("/api/" + model + "/new", obj);
}

export const isUserId = (userId) => {
    return http.post("/api/users/is-userid", { userId: userId})
}

export const isJumin = (juminNo) => {
    return http.post("/api/users/is-jumin", { jumin: juminNo})
}

export const getUsersByUserIdName = (keyword) => {
    if (!keyword) return
    return http.get("/api/users/is-useridname/" + keyword)
}
