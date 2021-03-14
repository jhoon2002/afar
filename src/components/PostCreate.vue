<template>
    <v-dialog
            v-model="dialog"
            width="700"
            scrollable
            @keydown.esc="clear(), $emit('close')"
            @click:outside="clear(), $emit('close')"
    >
        <v-card elevation="0">
            <v-card-title class="grey lighten-2">
                글쓰기
                <v-spacer></v-spacer>
                <v-icon @click="clear(), $emit('close')">mdi-close</v-icon>
            </v-card-title>
            <v-card-text class="pt-5">
                <validation-observer ref="observer">
                    <v-form @submit.prevent="onSubmit" ref="vform">
                        <validation-provider name="아이디" :rules="{ required: true }" v-slot="{ errors, valid }">
                            <v-text-field label="아이디" v-model="userId" outlined ref="userId"
                                          :error-messages="errors" :success="valid"
                                          prepend-inner-icon="mdi-card-account-details-outline"
                            ></v-text-field>
                        </validation-provider>

                        <validation-provider name="이름" :rules="{ required: true }" v-slot="{ errors, valid }">
                            <v-text-field label="이름" v-model="name" outlined
                                          :error-messages="errors" :success="valid"
                                          prepend-inner-icon="mdi-account"
                            ></v-text-field>
                        </validation-provider>

                        <validation-provider name="제목" :rules="{ required: true }" v-slot="{ errors, valid }">
                            <v-text-field label="제목" v-model="subject" outlined
                                          :error-messages="errors" :success="valid"
                                          prepend-inner-icon="mdi-text-short"
                            ></v-text-field>
                        </validation-provider>

                        <validation-provider name="내용" :rules="{ required: true }" v-slot="{ errors, valid }">
                            <v-textarea label="내용" v-model="content" outlined
                                        :error-messages="errors" :success="valid"
                                        prepend-inner-icon="mdi-format-align-justify"
                            ></v-textarea>
                        </validation-provider>

                        <v-sheet class="grey--text text--darken-1 text-body-1">
                            <v-icon>
                                mdi-attachment
                            </v-icon>
                            첨부파일
                        </v-sheet>
                        <file-pond
                                name="test"
                                ref="pond"
                                label-idle="클릭하거나 여기에 파일 드롭"
                                :allow-multiple="true"
                                accepted-file-types="image/*, text/*, application/*"
                                server="/api/posts"
                                :files="myFiles"
                                @init="handleFilePondInit"
                        />
                    </v-form>
                </validation-observer>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="warning lighten-1" fab x-small elevation="0" dark class="mr-0"
                       @click="clear()">
                    <v-icon>mdi-refresh</v-icon>
                </v-btn>
                <v-btn color="success lighten-1" fab x-small elevation="0" class="mr-0" @click="$refs.observer.validate()">
                    <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn color="primary" elevation="0" @click="onSubmit()">확인</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>

    // Import Vue FilePond
    import vueFilePond from "vue-filepond";

    // Import FilePond styles
    import "filepond/dist/filepond.min.css";

    // Import FilePond plugins
    // Please note that you need to install these plugins separately

    // Import image preview plugin styles
    import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

    // Import image preview and file type validation plugins
    import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
    import FilePondPluginImagePreview from "filepond-plugin-image-preview";

    // Create component
    const FilePond = vueFilePond(
        FilePondPluginFileValidateType,
        FilePondPluginImagePreview
    );

    export default {
        name: "PostCreate",
        props: ["boardId", "dialog"],
        components: {
            FilePond
        },
        data: function () {
            return {
                userId: "",
                name: "",
                subject: "",
                content: "",
                myFiles: []
            }
        },
        methods: {
            onSubmit () {
                this.$refs.observer.validate().then(success => {
                    if (!success) {
                        this.$refs.userId.focus() //esc 키가 작동하도록 포커스를 유지
                        return
                    }
                    alert('Form has been submitted!');

                    // Wait until the models are updated in the UI
                    // this.$nextTick(() => {
                    //     this.$refs.form.reset();
                    // })
                })
            },
            submit () {
                this.$refs.observer.validate()
                this.$axios.post("/api/posts", {
                    boardId: this.boardId,
                    userId: this.userId,
                    subject: this.subject,
                    content: this.content
                })
            },
            handleFilePondInit: function () {
                console.log("FilePond has initialized");

                // FilePond instance methods are available on `this.$refs.pond`
            },
            clear() {
                this.userId = ""
                this.name = ""
                this.subject = ""
                this.content = ""
                this.myFiles = []
                this.$refs.observer.reset()
            }
        },
        created() {
        },
        mounted() {
        }
    }
</script>
<style scoped>

</style>
<style lang="scss" scoped>
    .vuetify-class {
        ::v-deep other-class {
            // your custom css properties
        }
    }
</style>