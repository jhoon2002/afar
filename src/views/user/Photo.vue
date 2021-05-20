<template>
    <v-card>
        <div>
            <cropper
                    ref="cropper"
                    check-orientation
                    :src="image.src"
                    style="border: 1px solid grey; width: 30rem; height: 30rem;"
            />
            <v-btn
                    icon
                    @click="reset()"
            >
                <v-icon>mdi-refresh</v-icon>
            </v-btn>

            <v-chip
                    v-if="image.type"
                    color="black"
                    dark
                    small
                    style="position: absolute; top: 20px; left: 20px"
            >
                {{ image.type }}
            </v-chip>
        </div>
        <div>
            <v-btn
                    outlined
                    @click="$refs.file.click()"
            >
                <input
                        ref="file"
                        type="file"
                        accept="image/*"
                        @change="loadImage($event)"
                        style="display: none"
                />
                <v-icon left>mdi-upload</v-icon>
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
    </v-card>
</template>
<script>
    import { Cropper } from 'vue-advanced-cropper';
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
        components: {
            Cropper,
        },
        data() {
            return {
                image: {
                    src: null,
                    type: null,
                },
            };
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
        },
        destroyed() {
            // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
            if (this.image.src) {
                URL.revokeObjectURL(this.image.src);
            }
        },
    };
</script>
<style scoped>
</style>