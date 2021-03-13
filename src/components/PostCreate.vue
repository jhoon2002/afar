<template>
    <v-dialog
            v-model="dialog"
            width="700"
            scrollable
            @keydown.esc="$emit('close')"
            @click:outside="$emit('close')"
    >
        <validation-observer
                ref="observer"
                v-slot="{ invalid, validated, handleSubmit, validate }"
        >
            <v-sheet class="pa-10">
                <v-form>
                    <validation-provider name="ID" :rules="{ required: true }" v-slot="{ errors, valid }">
                        <v-text-field label="ID" v-model="userId"
                                      :error-messages="errors" :success="valid"
                                      prepend-icon="mdi-card-account-details-outline"
                        ></v-text-field>
                    </validation-provider>

                    <validation-provider name="이름" :rules="{ required: true }" v-slot="{ errors, valid }">
                        <v-text-field label="이름" v-model="name"
                                      :error-messages="errors" :success="valid"
                                      prepend-icon="mdi-account-edit-outline"
                        ></v-text-field>
                    </validation-provider>

                    <validation-provider name="제목" :rules="{ required: true }" v-slot="{ errors, valid }">
                        <v-text-field label="제목" v-model="subject"
                                      :error-messages="errors" :success="valid"
                                      prepend-icon="mdi-page-layout-header"
                        ></v-text-field>
                    </validation-provider>

                    <validation-provider name="내용" :rules="{ required: true }" v-slot="{ errors, valid }">
                        <v-textarea label="내용" v-model="content"
                                    :error-messages="errors" :success="valid"
                                    prepend-icon="mdi-page-layout-body"
                        ></v-textarea>
                    </validation-provider>

                    <file-pond
                            name="test"
                            ref="pond"
                            label-idle="Drop files here..."
                            v-bind:allow-multiple="true"
                            accepted-file-types="image/*, text/*, application/*"
                            server="/api/posts"
                            v-bind:files="myFiles"
                            v-on:init="handleFilePondInit"

                    />

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="mr-4">초기화</v-btn>
                        <v-btn class="mr-4" @click="validate()">Validate</v-btn>
                        <v-btn color="primary" @click="handleSubmit(submit)">확인</v-btn>
                    </v-card-actions>

                </v-form>
            </v-sheet>
        </validation-observer>
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
        },
        created() {
        },
        mounted() {
        }
    }
</script>