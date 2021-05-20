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
                        size="65"
                        class="mt-1"
                >
                    <v-icon large>ri-user-line</v-icon>
                </v-avatar>
                <div
                        class="d-block mx-auto"
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
                                    class="ml-2"
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

                                    <v-btn
                                            v-if="image.src"
                                            outlined
                                            class="ml-2"
                                            @click="crop()"
                                    >
                                        <v-icon left>mdi-download</v-icon>
                                        결과 다운로드
                                    </v-btn>

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
                                >
                                    수정 완료
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-menu>
                    <v-btn
                            icon
                            small
                            style="margin-left: -0.6rem"
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
                <div class="text-body-1">
                    {{ user.cellphone.substr(0, 3) }}-{{ user.cellphone.substr(3, 4) }}-{{ user.cellphone.substr(7, 4) }}
                </div>
                <div class="text-body-2 mt-2">
                    이메일
                </div>
                <div class="text-body-1">
                    {{ user.email }}
                </div>
            </div>
        </v-sheet>
    </v-card>
</template>
<script>
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
                user_id: "607e68e6bd257006b866e7ba",
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
                }
            }
        },
        methods: {
            crop() {
                const { canvas } = this.$refs.cropper.getResult();
                canvas.toBlob((blob) => {
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
        },
        destroyed() {
            // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
            if (this.image.src) {
                URL.revokeObjectURL(this.image.src);
            }
        },
        async mounted() {
            try {
                const ret = await this.$http.get("/api/users/" + this.user_id)
                this.user = ret.data.user
            } catch {
                //
            }
        }
    }
</script>