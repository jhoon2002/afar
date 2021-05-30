import Vue from "vue"
import VueRouter from "vue-router"
//import { AclRule } from 'vue-acl'
import Blank from "@/views/Blank.vue"
import Mock from "@/views/Mock.vue"
// import Layout from "@/views/Layout.vue"
import SubLayout from "@/views/SubLayout.vue"
import VueCookies from 'vue-cookies'
import { checkToken, syncCookies } from "@/apis/access.js"
import store from "@/store"
import moment from "moment"

Vue.use(VueRouter)

// const Test = () => import("@/views/admin/Test.vue");

const routes = [
    {
        name: "권한 확인",
        path: "/error",
        component: () => import("@/views/error/error.vue"),
        invisible: true
    },
    {
        name: "사용자등록1",
        path: "/regist1",
        component: Mock,
        invisible: true,
        meta: {
            rule: ['*']
        }
    },
    {
        name: "사용자등록2",
        path: "/regist2",
        component: Mock,
        invisible: true,
        meta: {
            rule: ['*']
        }
    },
    {
        name: "로그인",
        path: "/",
        component: () => import("@/views/Index.vue"),
        invisible: true,
        meta: {
            rule: ['*']
        }
    },
    {
        name: "자동 로그아웃",
        path: "/auto-logout",
        component: () => import("@/views/Autologout.vue"),
        invisible: true,
        meta: {
            rule: ['*']
        }
    },
    {
        name: "일반",
        icon: "",
        path: "/",
        component: SubLayout,
        invisible: true,
        isShow: false,
        isOn: false,
        meta: {isDirectory: true},
        children: [
            {
                name: "첫화면",
                path: "/main",
                component: () => import("@/views/Main.vue"),
                invisible: true,
                meta: {
                    rule: ['*']
                },
            },
            {
                name: "마이 페이지",
                path: "/mypage",
                component: () => import("@/views/Mypage.vue"),
                invisible: true,
                meta: {
                    rule: ['*']
                },
            },
        ]
    },
    {
        name: "문서",
        icon: "mdi-file-document-edit-outline",
        path: "/document",
        component: SubLayout,
        isShow: false,
        isOn: false,
        meta: { isDirectory: true },
        children: [
            {
                name: "문서 작성",
                path: "/document/create",
                component: () => import("@/views/document/Create.vue"),
                props: true,
                isShow: false,
                isOn: false,
                meta: {
                    rule: ["isLogged"]
                }
            },
            {
                name: "나의 문서",
                path: "/document/my",
                component: Blank,
                isShow: false,
                isOn: false,
                meta: {
                    isDirectory: true
                },
                children: [
                    {
                        name: "종료 문서",
                        path: "/document/my/complete",
                        component: () => import("@/views/document/Create.vue"),
                        props: true,
                        isShow: false,
                        isOn: false,
                        meta: {
                            rule: ["isLogged"]
                        }
                    },
                    {
                        name: "진행 문서",
                        path: "/document/my/processing",
                        component: () => import("@/views/document/Create.vue"),
                        props: true,
                        isShow: false,
                        isOn: false,
                        meta: {
                            rule: ["isLogged"]
                        }
                    },
                    {
                        name: "공유 문서",
                        path: "/document/my/share",
                        component: () => import("@/views/document/Create.vue"),
                        props: true,
                        isShow: false,
                        isOn: false,
                        meta: {
                            rule: ["isLogged"]
                        }
                    },
                ]
            },
            {
                name: "문서등록대장",
                path: "/admin/document/list",
                component: () => import("@/views/document/Create.vue"),
                props: true,
                isShow: false,
                isOn: false,
                meta: {
                    rule: ["isLogged"]
                }
            },
            /*
          {
            name: "tiptap",
            path: "/admin/document/editor",
            component: () => import("@/views/document/Editor.vue"),
            props: true,
            isShow: false,
            isOn: false,
            meta: {
              model: "document",
              rule: ["isLogged"]
            }
          },
          {
            name: "tiptapEx",
            path: "/admin/document/editor2",
            component: () => import("@/views/document/Editor2.vue"),
            props: true,
            isShow: false,
            isOn: false,
            meta: {
              model: "document",
              rule: ["isLogged"]
            }
          },
            */
        ]
    },
    {
        name: "사용자",
        icon: "mdi-card-account-details-outline",
        path: "/admin/user",
        component: SubLayout,
        isShow: false,
        isOn: false,
        meta: { isDirectory: true },
        children: [
            {
                name: "사용자 관리",
                path: "/admin/user/user",
                component: () => import("@/views/user/User.vue"),
                props: true,
                isShow: false,
                isOn: false,
                meta: {
                    rule: ["isAdmin"]
                }
            },
            {
                name: "조직 관리",
                path: "/admin/user/organ",
                component: () => import("@/views/user/Organ.vue"),
                isShow: false,
                isOn: false,
                meta: {
                    rule: ["isAdmin"]
                }
            },
            {
                name: "이미지",
                path: "/admin/user/photo",
                component: () => import("@/views/user/Photo.vue"),
                isShow: false,
                isOn: false,
                meta: {
                    rule: ["isAdmin"]
                }
            }
        ]
    },
    /*
    {
      name: "게시판 관리",
      icon: "mdi-view-headline",
      path: "/admin/board",
      component: SubLayout,
      isShow: false,
      isOn: false,
      meta: { isDirectory: true },
      children: [
        {
          name: "글쓰기",
          path: "/admin/board/create",
          component: () => import("@/views/board/Create.vue"),
          props: true,
          isShow: false,
          isOn: false,
          meta: {
            model: "board",
            rule: ["isAdmin"]
          }
        },
        {
          name: "파일 업로드",
          path: "/admin/board/file",
          component: () => import("@/views/board/File.vue"),
          props: true,
          isShow: false,
          isOn: false,
          meta: {
            model: "board",
            rule: ["isAdmin"]
          }
        },
        {
          name: "자유게시판",
          path: "/admin/board/free",
          component: () => import("@/views/board/Free.vue"),
          props: true,
          isShow: false,
          isOn: false,
          meta: {
            model: "board",
            rule: ["isAdmin"]
          }
        }
      ]
    },
    {
      name: "인사 관리",
      icon: "mdi-account-circle",
      path: "/admin/person",
      component: SubLayout,
      isShow: false,
      isOn: false,
      meta: {
        isDirectory: true
      },
      children: [
        {
          name: "인사기록카드",
          path: "/admin/person/card",
          component: Mock,
          isShow: false,
          isOn: false,
          meta: {
            rule: ["isAdmin"]
          }
        },
        {
          name: "증명서",
          path: "/admin/person/certi",
          component: Blank,
          isShow: false,
          isOn: false,
          meta: {
            isDirectory: true
          },
          children: [
            {
              name: "증명서 현황",
              path: "/admin/person/certi/list",
              component: Mock,
              isShow: false,
              isOn: false,
              meta: {
                rule: ["isAdmin"]
              }
            },
            {
              name: "증명서 작성",
              path: "/admin/person/certi/wirte",
              component: Mock,
              isShow: false,
              isOn: false,
              meta: {
                rule: ["isAdmin"]
              }
            }
          ]
        },
        {
          name: "급여",
          path: "/admin/person/pay",
          component: Blank,
          isShow: false,
          isOn: false,
          meta: {
            isDirectory: true
          },
          children: [
            {
              name: "급여 현황",
              path: "/admin/person/pay/list",
              component: Mock,
              isShow: false,
              isOn: false,
              meta: {
                rule: ["isAdmin"]
              }
            },
            {
              name: "급여 입력",
              path: "/admin/person/pay/write",
              component: Mock,
              isShow: false,
              isOn: false,
              meta: {
                rule: ["isAdmin"]
              }
            }
          ]
        }
      ]
    },
    {
      name: "복무 관리",
      icon: "mdi-bus-multiple",
      path: "/admin/work",
      component: SubLayout,
      isShow: false,
      isOn: false,
      meta: {
        isDirectory: true
      },
      children: [
        {
          name: "휴가 관리",
          path: "/admin/work/off",
          component: Blank,
          isShow: false,
          isOn: false,
          meta: {
            isDirectory: true
          },
          children: [
            {
              name: "휴가 설정",
              path: "/admin/work/off/set",
              component: Mock,
              isShow: false,
              isOn: false,
              meta: {
                rule: ["isAdmin"]
              }
            },
            {
              name: "휴가 현황",
              path: "/admin/work/off/book-list",
              component: Mock,
              isShow: false,
              isOn: false,
              meta: {
                rule: ["isAdmin"]
              }
            }
          ]
        },
        {
          name: "시간외근무",
          path: "/admin/work/overtime",
          component: Blank,
          isShow: false,
          isOn: false,
          meta: {
            isDirectory: true
          },
          children: [
            {
              name: "시간외근무 설정",
              path: "/admin/work/overtime/set",
              component: Mock,
              isShow: false,
              isOn: false,
              meta: {
                rule: ["isAdmin"]
              }
            },
            {
              name: "시간외근무 현황",
              path: "/admin/work/overtime/pre-list",
              component: Mock,
              isShow: false,
              isOn: false,
              meta: {
                rule: ["isAdmin"]
              }
            }
          ]
        },
        {
          name: "출장",
          path: "/admin/work/trip",
          component: Blank,
          isShow: false,
          isOn: false,
          meta: {
            isDirectory: true
          },
          children: [
            {
              name: "출장 현황",
              path: "/admin/work/trip/list",
              component: Mock,
              isShow: false,
              isOn: false,
              meta: {
                rule: ["isAdmin"]
              }
            }
          ]
        }
      ]
    },
    {
      name: "규정/양식 관리",
      icon: "mdi-book-open-variant",
      path: "/admin/law",
      component: SubLayout,
      isShow: false,
      isOn: false,
      meta: {
        isDirectory: true
      },
      children: [
        {
          name: "규정",
          path: "/admin/law/rule",
          component: Mock,
          isShow: false,
          isOn: false,
          meta: {
            rule: ["isAdmin"]
          }
        },
        {
          name: "양식",
          path: "/admin/law/form",
          component: Mock,
          isShow: false,
          isOn: false,
          meta: {
            rule: ["isAdmin"]
          }
        }
      ]
    }
    */
];
/*
const routes = [
  {
    name: "첫화면",
    icon: "mdi-home",
    path: "/",
    component: Mock,
    invisible: true
  },
  {
  name: "전자문서",
    icon: "mdi-file-document-edit-outline",
  path: "/docu",
  component: Blank,
  isShow: false,
  isOn: false,
  meta: {
    isDirectory: true
  },
  children: [{
    name: "문서작성",
    path: "/docu/write",
    component: Mock,
    meta: {
      title: "문서작성",
    },
    isShow: false,
    isOn: false
  },
    {
      name: "처리할 문서",
      path: "/docu/confirm",
      component: Blank,
      meta: {
        isDirectory: true,
      },
      isShow: false,
      isOn: false,
      children: [{
        name: "결재대기함",
        path: "/docu/confirm/standby",
        component: Mock,
        isShow: false,
        isOn: false,
      },
        {
          name: "발송대기함",
          path: "/docu/confirm/send",
          component: Mock,
          isShow: false,
          isOn: false,
        },
      ],
    },
    {
      name: "처리한 문서",
      path: "/docu/confirmed",
      component: Blank,
      meta: {
        isDirectory: true,
      },
      isShow: false,
      isOn: false,
      children: [{
        name: "완료문서함",
        path: "/docu/confirmed/complete",
        component: Mock,
        isShow: false,
        isOn: false,
      },
        {
          name: "진행문서함",
          path: "/docu/confirmed/progress",
          component: Mock,
          isShow: false,
          isOn: false,
        },
      ],
    },
    {
      name: "공유/공람",
      path: "/docu/share",
      component: Blank,
      meta: {
        isDirectory: true,
      },
      isShow: false,
      isOn: false,
      children: [{
        name: "받은문서",
        path: "/docu/share/receive",
        component: Mock,
        isShow: false,
        isOn: false,
      },
        {
          name: "지정문서",
          path: "/docu/share/assign",
          component: Mock,
          isShow: false,
          isOn: false,
        },
      ],
    },
    {
      name: "문서등록대장",
      path: "/docu/docu-list",
      component: Mock,
      isShow: false,
      isOn: false,
    },
    {
      name: "비전자문서등록",
      path: "/docu/none-elec",
      component: Mock,
      isShow: false,
      isOn: false,
    }
  ]
},
  {
    name: "복무관리",
    icon: "mdi-airplane",
    path: "/work",
    component: Blank,
    isShow: false,
    isOn: false,
    meta: {
      isDirectory: true
    },
    children: [{
      name: "처리할 복무",
      path: "/work/confirm",
      component: Mock,
      isShow: false,
      isOn: false
    },
      {
        name: "시간외근무",
        path: "/work/overtime",
        component: Blank,
        meta: {
          isDirectory: true,
        },
        isShow: false,
        isOn: false,
        children: [{
          name: "사전신청",
          path: "/work/overtime/pre",
          component: Mock,
          isShow: false,
          isOn: false,
        },
          {
            name: "사전신청내역",
            path: "/work/overtime/pre-list",
            component: Mock,
            isShow: false,
            isOn: false,
          },
          {
            name: "출근/퇴근지정",
            path: "/work/overtime/set",
            component: Mock,
            isShow: false,
            isOn: false,
          },
          {
            name: "시간외내역",
            path: "/work/overtime/overtime-list",
            component: Mock,
            isShow: false,
            isOn: false,
          },
        ],
      },
      {
        name: "출장",
        path: "/work/trip",
        component: Blank,
        meta: {
          isDirectory: true,
        },
        isShow: false,
        isOn: false,
        children: [{
          name: "관내출장",
          path: "/work/trip/inside",
          component: Mock,
          isShow: false,
          isOn: false,
        },
          {
            name: "국내출장",
            path: "/work/trip/domestic",
            component: Mock,
            isShow: false,
            isOn: false,
          },
          {
            name: "국외출장",
            path: "/work/trip/foreign",
            component: Mock,
            isShow: false,
            isOn: false,
          },
          {
            name: "출장내역",
            path: "/work/trip/trip-list",
            component: Mock,
            isShow: false,
            isOn: false,
          },
        ],
      },
    ],
  },
  {
    name: "규정/양식",
    icon: "mdi-book-open-variant",
    path: "/law",
    component: Blank,
    isShow: false,
    isOn: false,
    meta: {
      isDirectory: true
    },
    children: [{
      name: "법령/규정/지침",
      path: "/law/rule",
      component: Mock,
      isShow: false,
      isOn: false,
    },
      {
        name: "각종양식",
        path: "/law/form",
        component: Mock,
        isShow: false,
        isOn: false,
      },
    ],
  },
  {
    name: "커뮤니티",
    icon: "mdi-human-male-male",
    path: "/comm",
    component: Blank,
    isShow: false,
    isOn: false,
    meta: {
      isDirectory: true
    },
    children: [{
      name: "공지사항",
      path: "/comm/notice",
      component: Mock,
      isShow: false,
      isOn: false,
    },
      {
        name: "질의답변",
        path: "/comm/qna",
        component: Mock,
        isShow: false,
        isOn: false,
      },
    ],
  },
  {
    name: "인사/급여",
    icon: "mdi-face-recognition",
    path: "/person",
    component: Blank,
    isShow: false,
    isOn: false,
    meta: {
      isDirectory: true
    },
    children: [{
      name: "인사정보",
      path: "/person/info",
      component: Mock,
      isShow: false,
      isOn: false,
    },
      {
        name: "급여내역",
        path: "/person/pay",
        component: Mock,
        isShow: false,
        isOn: false,
      },
    ],
  },
  {
    name: "사용자등록1",
    path: "/regist1",
    component: Mock,
    invisible: true
  },
  {
    name: "사용자등록2",
    path: "/regist2",
    component: Mock,
    invisible: true
  },
  {
    name: "로그인",
    path: "/token",
    component: Mock,
    invisible: true
  },
];
 */
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

function showAndOn(to, routes, i) {
    let matchedPath;
    if (to.matched[i]) matchedPath = to.matched[i].path;
    else matchedPath = "~~~";

    for (let route of routes) {
        if (route.path == matchedPath) { //경로 일치
            //if (to.matched[i+1]) { //하위가 더 있는 경우 즉, 디렉터리
            if (route.children) { //하위가 더 있는 경우 즉, 디렉터리
                route.isShow = true;
                showAndOn(to, route.children, i+1); //재귀함수
            } else { //하위에 더 이상 없는 경우 즉, 파일(최종메뉴)
                route.isOn = true;
            }
        } else {
            if (route.children) {
                //route.isShohw = false;
                showAndOn(to, route.children, i+1); //재귀함수
            }
            route.isOn = false;
        }
    }
}

router.beforeEach(async (to, from, next) => {

    console.log(`%c<라우터 진입>%c ${moment().format("HH:mm:ss")} ` +
        `Cookie token: %c ${ VueCookies.get("token") && VueCookies.get("token").slice(-5) } %c `  +
        `Store token: ${ store.state.user.token && store.state.user.token.slice(-5) } ` +
        `Store _id: ${ store.state.user._id && store.state.user._id.slice(-5) }`,
        'color: #f50092', '', 'background: #777; color: white', '')

    if (to.meta.isDirectory) {
        return next(false)
    }

    //브라우저를 refresh 하거나 다시 접속하면 store 정보가 reset 되면서 cookie 와 store 의 불일치 발생
    //이를 먼저 동기화 시킴
    if (VueCookies.get("token") && !store.state.user.token) {
        await syncCookies()
    }

    if (!store.state.user.token) {
        /*--- 아래 코드가 없으면 ROOT 이동 시, 무한루프에 빠짐 ---*/
        if (to.path === "/" || to.path === "/auto-logout") {
            return next()
        }
        /* ---*/
        return next("/")
    }

    //토큰 검사
    await checkToken()

    //검사 후 이동
    if (store.state.user.token) { //로그인 유지 상태
        //ROOT 접근 시, main 으로 이동
        if (to.path === "/") {
            return next("/main")
        }
        //그 밖의 경우, 해당 경로로 이동
        showAndOn(to, routes, 0)
        return next()

    } else { //토큰이 유효하지 않아서 로그아웃된 상태
        // 아래 코드가 없으면 to 가 ROOT 인 경우 이동 시, 무한루프에 빠짐
        if (to.path === "/") {
            return next()
        }
        // 그 밖에 경우, ROOT 로 이동
        return next("/auto-logout")
        // return next("/")
    }
})

export default router
