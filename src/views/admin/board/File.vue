<template>
    <v-card>
        <v-card-title>
            파일 업로드 테스트
        </v-card-title>
        <v-card-text>
            <!--
            <form class="uploadForm" action="/api/posts" method="post" enctype="multipart/form-data">
                <label class="control-label">Select File</label>
                <input name="test" id="input-1" type="file" class="file">
                <input type="submit" value="submit" />
            </form>
            -->
            <v-row no-gutters>
                <v-col cols="4"></v-col>
                <v-col cols="4">
                    <file-pond
                            name="test"
                            ref="pond"
                            class-name="my-pond"
                            label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>"
                            allow-multiple="true"
                            server="/api/posts"
                            accepted-file-types="image/*, application/*"
                            v-bind:files="myFiles"
                            v-on:init="handleFilePondInit"
                    />
                </v-col>
                <v-col cols="4"></v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    // Import Vue FilePond
    import vueFilePond from 'vue-filepond'

    // Import FilePond styles
    import 'filepond/dist/filepond.min.css'

    // Import FilePond plugins
    // Please note that you need to install these plugins separately

    // Import image preview plugin styles
    import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

    // Import image preview and file type validation plugins
    import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

    // Create component
    const FilePond = vueFilePond(
        FilePondPluginFileValidateType,
        FilePondPluginImagePreview
    )
    export default {
        name: 'FilePondDemo',
        data: function() {
            return { myFiles: [] }
        },
        components: {
            FilePond
        },
        methods: {
            handleFilePondInit: function() {
                console.log('FilePond has initialized');

                // example of instance method call on pond reference
                this.$refs.pond.getFiles();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
