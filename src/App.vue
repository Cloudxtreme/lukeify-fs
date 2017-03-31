<template>
    <div id="app-vue">
        <h1>lukeify fs</h1>
        <p v-if="!authenticated" id="statement">Personal cloud-based file system and storage. Enter the application key to authenticate.</p>

        <form v-if="!authenticated">
            <input id="key-entry" name="key-entry" type="text" v-model="key" v-on:keyup="authenticate" placeholder="key" />
        </form>

        <dropzone
                id="dropzone"
                ref="dropzone"
                useCustomDropzoneOptions
                :dropzoneOptions="opts"
                url="/api/upload"
                v-on:vdropzone-success="showSuccess"
                v-on:vdropzone-sending-multiple="appendKey"
                v-on:vdropzone-file-added="allowUpload"
                v-if="authenticated">
        </dropzone>
        <button v-on:click="upload" :disabled="isUploadDisabled" v-if="authenticated">Upload</button>

        <files></files>

        <footer><span>Written by @lukealization. <a href="https://github.com/LukeNZ/lukeify-fs">github.com/LukeNZ/lukeify-fs</a></span></footer>
    </div>
</template>

<script>
    import Dropzone from 'vue2-dropzone';
    import debounce from 'lodash.debounce';
    import axios from 'axios';
    import Files from './components/Files';

    export default {
        name: 'app',
        data () {
            return {
                authenticated: false,
                key: "",
                opts: { clickable: true, autoProcessQueue: false, uploadMultiple: true, maxFilesize: 1024, method: 'put' },
                isUploadDisabled: true
            }
        },
        components: {
            Dropzone,
            Files
        },
        created: function() {
            if (localStorage.getItem('appKey') !== null) {
                this.key = localStorage.getItem('appKey');
                this.authenticate();
            }
        },
        methods: {
            'authenticate': debounce(function() {
                axios.post('/api/auth', { key: this.key }).then(res => {
                    this.authenticated = true;
                    localStorage.setItem('appKey', this.key);
                    // flash blue
                }).catch(res => {
                    this.authenticated = false;
                    // flash red
                });
            }, 1000),
            'allowUpload': function() {
                this.isUploadDisabled = false;
            },
            'appendKey': function(file, xhr, formData) {
                console.log(xhr);
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

<style>
    html {
        margin:0 100px;
    }

    @media (max-width: 800px) {
        html {
            margin:0 20px;
        }
    }

    html, body {
        background-color:#FAFAFA;
    }

    body {
        text-align:center;
    }

    h1, h2, h3, h4, h5, h6, p, a, span {
        font-family:Catamaran;
        font-weight:100;
    }

    h1 {
        font-size:48px;
        text-align:center;
        margin:1em;
        padding:0;
        color:#465560;
    }

    #statement {
        text-align:center;
        color:#465560;
        margin:1em;
    }

    form {
        text-align:center;
    }

    #key-entry {
        background-color:transparent;
        border:none;
        border-bottom:2px solid #AAA;
        font-size:16px;
        margin:2em;
        padding:4px 10px;
        font-family:Inconsolata;
        width:320px;
        color:#465560;
    }

    .vue-dropzone {
        border:2px dashed #e5e5e5 !important;
        border-radius:10px;
    }

    button {
        ont-family: Catamaran;
        margin: 1em auto;
        font-size: 16px;
        border: none;
        background-color: cornflowerblue;
        color: white;
        width: 200px;
        padding: 10px 0;
        border-radius: 3px;
        cursor:pointer;
    }

    button:hover {
        background-color:dodgerblue;
    }

    button:active {
        background-color:darkorange;
    }

    button:disabled {
        background-color:#AAA;
        cursor:unset;
    }

    footer {
        position:fixed;
        bottom:0;
        margin:1em;
    }

    footer span, footer a {
        font-size:12px;
        text-decoration: none;
    }
</style>