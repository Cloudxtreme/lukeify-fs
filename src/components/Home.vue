<template>
    <div>
        <dropzone
            id="dropzone"
            ref="dropzone"
            useCustomDropzoneOptions
            v-bind:dropzoneOptions="opts"
            url="/api/files"
            v-on:vdropzone-success="showSuccess"
            v-on:vdropzone-sending-multiple="appendKey"
            v-on:vdropzone-file-added="allowUpload">
        </dropzone>
        <button v-on:click="upload" :disabled="isUploadDisabled">Upload</button>
        <files></files>
    </div>
</template>

<script>
    import Dropzone from 'vue2-dropzone';
    import Files from './Files';

    export default {
        name: 'home',
        components: {
            Dropzone, Files
        },
        data() {
            return {
                opts: {
                    clickable: true,
                    autoProcessQueue: false,
                    uploadMultiple: true,
                    maxFilesize: 1024,
                    thumbnailWidth: 200,
                    thumbnailHeight: 200,
                    method: 'put',
                    paramName: function() {
                        return 'files'
                    }
                },
                isUploadDisabled: true
            };
        },
        methods: {
            'allowUpload': function() {
                this.isUploadDisabled = false;
            },

            'appendKey': function(file, xhr, formData) {
                xhr.setRequestHeader('App-Key', localStorage.getItem('appKey'));
            },

            'showSuccess': function(file) {
                alert("File uploaded");
            },

            'upload': function() {
                this.isUploadDisabled = true;
                this.$refs.dropzone.processQueue();
            }
        }
    }
</script>

<style lang="scss">
    $dz-preview-margin:10px;
    $dz-preview-size:200px;
    $dz-border:2px;
    $dz-padding:20px;

    #dropzone.vue-dropzone {
        border:#{$dz-border} dashed #e5e5e5 !important;
        border-radius:10px;
        min-height:$dz-preview-size + ($dz-preview-margin * 2) + ($dz-padding * 2) + ($dz-border * 2);
        cursor:pointer;

        .dz-message {
            margin:6em 0;
        }

        .dz-preview {
            margin:$dz-preview-margin;

            .dz-image {
                width:$dz-preview-size;
                height:$dz-preview-size;
            }

            .dz-details {
                background-color:transparent;
            }

            &:not(.dz-processing) .dz-progress {
                animation:none;
            }

            .dz-progress {
                height:10px;
                left:0;
                bottom:0;
                top:auto;
                width:$dz-preview-size;
                background:none;
                margin:0;
                border-radius:0;

                .dz-upload {
                    background-color:#6bc958;
                }
            }
        }
    }
</style>