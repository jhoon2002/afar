<template>
    <validation-observer
            ref="observer"
            v-slot="{ invalid, validated, handleSubmit, validate }"
    >
        <v-row no-gutters>
            <v-col cols="6">
                <v-card class="pa-10">
                    <v-form>

                        <validation-provider name="게시판ID" :rules="{ required: true }" v-slot="{ errors, valid }">
                            <v-select label="게시판ID" v-model="boardid" :items="['free', 'notice']"
                                      :error-messages="errors" :success="valid"
                                      prepend-icon="mdi-clipboard-edit-outline"
                            ></v-select>
                        </validation-provider>

                        <validation-provider name="ID" :rules="{ required: true }" v-slot="{ errors, valid }">
                            <v-text-field label="ID" v-model="userid"
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

                        <validation-provider name="파일" :rules="{ required: false }" v-slot="{ errors, valid }">
                            <v-file-input label="파일" v-model="file"
                                          :error-messages="errors" :success="valid"
                            ></v-file-input>
                        </validation-provider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="mr-4">초기화</v-btn>
                            <v-btn class="mr-4" @click="validate()">Validate</v-btn>
                            <v-btn color="primary" @click="handleSubmit(submit)">확인</v-btn>
                        </v-card-actions>

                    </v-form>
                </v-card>
            </v-col>
            <v-col cols="6"></v-col>
        </v-row>
    </validation-observer>
</template>
<script>
    export default {
        data: function() {
            return {
                boardId: "",
                userId: "",
                name: "",
                subject: "",
                content: "",
                file: ""
            }
        },
        methods: {
            // submit () {
            //     this.$refs.observer.validate();
            // },
            // onSubmit(event) {
            //         event.preventDefault();
            //     //alert("Form submitted!");
            // }
        }
    }
</script>