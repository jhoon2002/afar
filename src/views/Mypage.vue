<template>
    <v-card
            v-if="user.name"
            width="500"
            class="pa-10"
    >
        <!--
        <v-breadcrumbs
                :items="items"
        ></v-breadcrumbs>
        -->

        <v-card-title class="pa-0">
            {{user.name}}
        </v-card-title>

        <v-sheet
                class="d-flex mt-8"
        >
            <div>
                <v-avatar
                        color="grey lighten-2"
                        size="75"
                        class="mt-1"
                >
                    <img :src="`${ $env.url + $store.state.user.faceURL }`"/>
                </v-avatar>
                <div
                        class="d-block text-center"
                 >
                    <v-menu
                            v-model="photoMenu"
                            :close-on-content-click="false"
                            :close-on-click="false"
                            max-width="350"
                            min-width="350"
                            offset-x
                    >
                        <template v-slot:activator="{ on, attr }">
                            <v-btn
                                    icon
                                    small
                                    v-bind="attr"
                                    v-on="on"
                            >
                                <v-icon small>mdi-pencil</v-icon>
                            </v-btn>
                        </template>

                        <v-card
                                elevation="0"
                        >
                            <v-card-title>
                                사진 수정
                                <v-spacer></v-spacer>
                                <v-btn
                                        icon
                                        style="margin-top: -6px; margin-right: -2px;"
                                        @click="photoMenu=false"
                                >
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-card-title>


                            <v-sheet
                                    class="d-flex px-5 pb-5"
                            >

                                <div>
                                    <cropper
                                            ref="cropper"
                                            check-orientation
                                            :src="image.src"
                                            :debounce="false"
                                            :stencil-props="{
                                                aspectRatio: 1/1,
                                            }"
                                            style="background: #e3e3e3; width: 10rem; height: 10rem;"
                                            @change="onChange"
                                    />

                                    <!--
                                    <v-btn
                                            icon
                                            @click="reset()"
                                            style="position: absolute; top: 12rem; left: 9rem"
                                    >
                                        <v-icon>mdi-refresh</v-icon>
                                    </v-btn>
                                    -->
                                    <!--
                                    <v-chip
                                            v-if="image.type"
                                            color="black"
                                            dark
                                            small
                                            style="position: absolute; top: 50px; left: 20px"
                                    >
                                        {{ image.type }}
                                    </v-chip>
                                    -->
                                    <v-btn
                                            outlined
                                            small
                                            @click="$refs.file.click()"
                                            class="d-block mt-3 mx-auto"
                                    >
                                        <input
                                                ref="file"
                                                type="file"
                                                accept="image/*"
                                                @change="loadImage($event)"
                                                style="display: none"
                                        />
                                        <v-icon
                                                left
                                                small
                                        >
                                            mdi-upload
                                        </v-icon>
                                        이미지 업로드
                                    </v-btn>
                                    <!--
                                    <v-btn
                                            v-if="image.src"
                                            outlined
                                            class="ml-2"
                                            @click="crop()"
                                    >
                                        <v-icon left>mdi-download</v-icon>
                                        결과 다운로드
                                    </v-btn>
                                    -->
                                </div>
                                <div class="ml-4">
                                    <preview
                                            :width="120"
                                            :height="120"
                                            :image="result.image"
                                            :coordinates="result.coordinates"
                                            style="border-radius: 50%; overflow: hidden;"
                                    />
                                </div>
                            </v-sheet>
                            <v-card-actions
                                    class="px-5 pb-5"
                            >
                                <v-spacer></v-spacer>
                                <v-btn
                                        outlined
                                        color="warning"
                                        style="padding-bottom: 2px"
                                        @click="photoMenu=false"
                                >
                                    취소
                                </v-btn>
                                <v-btn
                                        v-if="image.src"
                                        outlined
                                        color="secondary"
                                        class="ml-2"
                                        style="padding-bottom: 2px"
                                        @click="applyImage()"
                                >
                                    수정 완료
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-menu>
                    <v-btn
                            v-if="$store.state.user.face !== 'none.svg'"
                            icon
                            small
                            style="margin-left: -0.6rem"
                            @click="deleteImage()"
                    >
                        <v-icon small>mdi-close</v-icon>
                    </v-btn>
                </div>
            </div>
            <div class="ml-10">
                <div class="text-body-2">
                    이름
                </div>
                <div class="text-h6">
                    {{ user.name }}
                </div>
                <div class="text-body-2 mt-2">
                    생년월일
                </div>
                <div class="text-body-1">
                    {{ $util.toBirthday(user.jumin, true) }}
                </div>
                <div class="text-body-2 mt-2">
                    휴대폰
                </div>
                <div class="text-body-1 d-flex">

                    {{ user.cellphone.substr(0, 3) }}-{{ user.cellphone.substr(3, 4) }}-{{ user.cellphone.substr(7, 4) }}

                    <v-edit-dialog
                            :return-value.sync="kkk"
                            large
                            save-text="저장"
                            cancel-text="취소"
                            @save="save('cellphone')"
                            @cancel="cancel"
                            @open="open('cellphone')"
                            @close="close"
                            class="ml-2"
                    >
                        <v-btn
                                icon
                                small
                                color="secondary lighten-5"
                                class="pb-1"
                        >
                            <v-icon small>mdi-pencil</v-icon>
                        </v-btn>
                        <template v-slot:input>
                            <validation-observer ref="observer" v-slot="{}">
                                <validation-provider
                                        name="휴대폰"
                                        :rules="{ required: true, cellphone: true }"
                                        v-slot="{ errors, valid }">
                                    <v-text-field
                                            v-model="fcellphone"
                                            label="휴대폰"
                                            class="mt-4"
                                            :error-messages="errors"
                                            :success="valid"
                                    ></v-text-field>
                                </validation-provider>
                            </validation-observer>
                        </template>
                    </v-edit-dialog>

                </div>
                <div class="text-body-2 mt-2">
                    이메일
                </div>
                <div class="text-body-1 d-flex">
                    {{ user.email }}
                    <v-edit-dialog
                            :return-value.sync="kkk"
                            large
                            save-text="저장"
                            cancel-text="취소"
                            @save="save('email')"
                            @cancel="cancel"
                            @open="open('email')"
                            @close="close"
                            class="ml-2"
                    >
                        <v-btn
                                icon
                                small
                                color="secondary lighten-5"
                                class="pb-1"
                        >
                            <v-icon small>mdi-pencil</v-icon>
                        </v-btn>
                        <template v-slot:input>
                            <validation-observer ref="observer" v-slot="{}">
                                <validation-provider
                                        name="이메일"
                                        :rules="{ required: true, email: true }"
                                        v-slot="{ errors, valid }">
                                    <v-text-field
                                            v-model="femail"
                                            label="이메일"
                                            class="mt-4"
                                            :error-messages="errors"
                                            :success="valid"
                                    ></v-text-field>
                                </validation-provider>
                            </validation-observer>
                        </template>
                    </v-edit-dialog>

                </div>
                <div class="text-body-2 mt-2">
                    비밀번호
                </div>
                <div class="text-body-1 d-flex">
                    ******
                    <v-edit-dialog
                            :return-value.sync="kkk"
                            large
                            save-text="저장"
                            cancel-text="취소"
                            @save="save('email')"
                            @cancel="cancel"
                            @open="open('email')"
                            @close="close"
                            class="ml-2"
                    >
                        <v-btn
                                icon
                                small
                                color="secondary lighten-5"
                                class="pb-1"
                        >
                            <v-icon small>mdi-pencil</v-icon>
                        </v-btn>
                        <template v-slot:input>
                            <validation-observer ref="observer" v-slot="{}">
                                <v-sheet
                                        class="px-3 py-7"
                                >
                                    <validation-provider name="기존 비밀번호" :rules="{ required: true, password: true }" v-slot="{ errors, valid }">
                                        <v-text-field label="기존 비밀번호" v-model="foldPassword" :type="show1 ? 'text' : 'password'"
                                                      :error-messages="errors" :success="valid"
                                                      :append-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                                                      @click:append="show1 = !show1"
                                        />
                                    </validation-provider>
                                    <validation-provider name="신규 비밀번호" :rules="{ required: true, password: true }" vid="confirmation" v-slot="{ errors, valid }">
                                        <v-text-field label="신규 비밀번호" v-model="fpassword" :type="show1 ? 'text' : 'password'"
                                                      :error-messages="errors" :success="valid"
                                                      :append-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                                                      @click:append="show1 = !show1"
                                        />
                                    </validation-provider>
                                    <validation-provider name="신규 비밀번호 확인" :rules="{ required: true, confirmed:'confirmation' }" v-slot="{ errors, valid }">
                                        <v-text-field label="신규 비밀번호 확인" v-model="fconfirmPassword" :type="show1 ? 'text' : 'password'"
                                                      :error-messages="errors" :success="valid" :success-messages="valid ? '일치합니다.' : ''"
                                                      :append-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                                                      @click:append="show1 = !show1"
                                        />
                                    </validation-provider>
                                </v-sheet>
                            </validation-observer>
                        </template>
                    </v-edit-dialog>

                </div>
            </div>
        </v-sheet>
    </v-card>
</template>
<script>
    // import VueCookies from 'vue-cookies'
    import { Cropper, Preview } from 'vue-advanced-cropper';
    import 'vue-advanced-cropper/dist/style.css';
    import { saveAs } from 'file-saver';
    // This function is used to detect the actual image type,
    function getMimeType(file, fallback = null) {
        const byteArray = new Uint8Array(file).subarray(0, 4);
        let header = '';
        for (let i = 0; i < byteArray.length; i++) {
            header += byteArray[i].toString(16);
        }
        switch (header) {
            case '89504e47':
                return 'image/png';
            case '47494638':
                return 'image/gif';
            case 'ffd8ffe0':
            case 'ffd8ffe1':
            case 'ffd8ffe2':
            case 'ffd8ffe3':
            case 'ffd8ffe8':
                return 'image/jpeg';
            default:
                return fallback;
        }
    }
    export default {
        name: "Mypage",
        components: {
            Cropper,
            Preview
        },
        data: function () {
            return {
                temp_user_id: "607e68e6bd257006b866e7ba",
                user: {},
                items: [
                    {
                        text: '개인 정보',
                        disabled: false,
                        href: 'breadcrumbs_dashboard',
                    },
                    {
                        text: '소속 부서',
                        disabled: false,
                        href: 'breadcrumbs_link_1',
                    },
                    {
                        text: '작성 글',
                        disabled: false,
                        href: 'breadcrumbs_link_2',
                    },
                    {
                        text: '작성 코멘트',
                        disabled: false,
                        href: 'breadcrumbs_link_2',
                    },
                    {
                        text: '작성 문서',
                        disabled: false,
                        href: 'breadcrumbs_link_2',
                    },
                ],
                photoMenu: false,
                image: {
                    src: null,
                    type: null,
                },
                result: {
                    coordinates: null,
                    image: null
                },
                imgkey: 0,
                fcellphone: "",
                femail: "",
                foldPassword: "",
                fpassword: "",
                fconfirmPassword: "",
                kkk: "",
                show1: false
            }
        },
        methods: {
            crop() {
                const { canvas } = this.$refs.cropper.getResult();

                //console.log("canvas====", canvas)

                canvas.toBlob((blob) => {
                    //console.log("blob", blob)
                    saveAs(blob);
                }, this.image.type);
            },
            reset() {
                this.image = {
                    src: null,
                    type: null,
                };
            },
            loadImage(event) {
                // Reference to the DOM input element
                const { files } = event.target;

                // Ensure that you have a file before attempting to read it
                if (files && files[0]) {
                    // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
                    if (this.image.src) {
                        URL.revokeObjectURL(this.image.src);
                    }
                    // 2. Create the blob link to the file to optimize performance:
                    const blob = URL.createObjectURL(files[0]);
                    // 3. The steps below are designated to determine a file mime type to use it during the
                    // getting of a cropped image from the canvas. You can replace it them by the following string,
                    // but the type will be derived from the extension and it can lead to an incorrect result:
                    //
                    // this.image = {
                    //    src: blob;
                    //    type: files[0].type
                    // }
                    // Create a new FileReader to read this image binary data
                    const reader = new FileReader();
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onload = (e) => {
                        // Note: arrow function used here, so that "this.image" refers to the image of Vue component
                        this.image = {
                            // Read image as base64 and set it as src:
                            src: blob,
                            // Determine the image type to preserve it during the extracting the image from canvas:
                            type: getMimeType(e.target.result, files[0].type),
                            originalname: files[0].name
                        };
                    };
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsArrayBuffer(files[0]);
                }
            },
            onChange({ coordinates, image }) {
                this.result = {
                    coordinates,
                    image
                }
            },
            uploadImage() {
                const { canvas } = this.$refs.cropper.getResult()
                if (canvas) {
                    const form = new FormData();
                    canvas.toBlob( async (blob) => {
                        form.append('file', blob, this.$user_id() + "." + this.$util.getFileExt(this.image.originalname) )
                        form.append('user_id', this.$user_id())
                        try {
                            const { data: { file: { originalname } } } = await this.$http.post("/api/users/face", form)
                            const url = this.$env.facedir + originalname + "?t=" + new Date().getTime()
                            this.$store.commit("user/setFace", originalname)
                            this.$store.commit("user/setFaceURL", url)
                        } catch(e) {
                            console.log(e)
                        }
                    }, this.image.type);
                }
            },
            async applyImage() {
                try {
                    this.uploadImage()
                    this.photoMenu = false
                } catch(e) {
                    console.log("uploadImage 에러", e)
                }
            },
            /*
            updateImage() {
                const image = document.getElementById("theText")
                if(image.complete) {
                    let new_image = new Image();
                    //set up the new image
                    new_image.id = "theText"
                    new_image.src = this.$env.url + "/files/faces/607e68e6bd257006b866e7ba.jpg?t=" + new Date().getTime()
                    // insert new image and remove old
                    image.parentNode.insertBefore(new_image,image)
                    image.parentNode.removeChild(image)
                }
            },
            imageRefresh(img, timeout) {
                setTimeout(function() {
                        let d = new Date()
                        let http = img.src
                        if (http.indexOf("?d=") != -1) {
                            http = http.split("?d=")[0]
                        }
                        img.src = http + '?d=' + d.getTime()
                }, timeout)
            }
            */
            async deleteImage() {
                try {
                    console.log("삭제 경로", "/api/users/face/" + this.$user_id() + "/" + this.$store.state.user.face)
                    // return
                    await this.$http.delete("/api/users/face/" + this.$user_id() + "/" + this.$store.state.user.face)
                    this.$store.commit("user/resetFace")
                } catch(e) {
                    console.log(e)
                }
            },
            async save(field) {
                if ( !this.rule[field]( this['f' + field] ) ) {
                    this.snack = true
                    this.snackColor = "error"
                    this.snackText = "입력값이 지정 형식에 맞지 않아 저장하지 않았습니다."
                    return
                }

                try {
                    let param = {}
                    param[field] = this['f' + field]
                    const { data: { user } } = await this.$http.put("/api/users/" + this.$user_id(), param)
                    this.user = user
                    this.snack = true
                    this.snackColor = "success"
                    this.snackText = "저장했습니다."
                } catch {
                    this.snack = true
                    this.snackColor = "error"
                    this.snackText = "저장에 실패했습니다."
                }
                return
            },
            cancel() {
                this.snack = true
                this.snackColor = "warning"
                this.snackText = "취소했습니다."
            },
            open(field) {
                this['f' + field] = this.user[field]
                this.snack = true
                this.snackColor = "info"
                this.snackText = "수정 모드입니다."
            },
            close() {
                // console.log('Dialog closed')
            }
        },
        destroyed() {
            // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
            if (this.image.src) {
                URL.revokeObjectURL(this.image.src);
            }
        },
        async mounted() {
            try {
                const { data: { user } } = await this.$http.get("/api/users/" + this.temp_user_id)
                this.user = user
            } catch {
                //
            }
        }
    }
</script>