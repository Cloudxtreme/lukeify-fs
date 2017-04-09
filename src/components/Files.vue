<template>
    <div id="files-vue">
        <h2><span v-if="fileCount != null">{{ fileCount }} </span>{{ fileCount !== 1 ? "files" : "file" }}</h2>
        <ul>
            <li v-for="file in allFiles" v-bind:key="file.filename" v-bind:file="file" is="file"></li>
        </ul>

        <p id="no-files" v-if="fileCount === 0">Nothing here :(</p>

        <button v-if="!hasReachedEnd" v-on:click="fetch">More</button>
    </div>
</template>

<script>
    import axios from 'axios';
    import File from './File';

    export default {
        name: 'files',
        data() {
            return {
                'fileCount': null,
                'allFiles': [],
                'hasReachedEnd': true
            };
        },
        components: {
            File
        },
        created: function() {
            axios.get('/api/filecount').then(res => {
                this.fileCount = res.data.count;
            });
            axios.get('/api/files/0/20').then(res => {
                this.allFiles = this.allFiles.concat(res.data.files);
            });
        },
        methods: {
            'fetch': function() {
                let currentFilePosition = this.allFiles.length;
                axios.get('/api/files/' + currentFilePosition + '/20').then(res => {
                    this.hasReachedEnd = res.data.files.length < 20;
                    this.allFiles = this.allFiles.concat(res.data.files);

                }).catch(res => {
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    #files-vue {
        text-align:left;
    }

    #no-files {
        font-size:20px;
        text-align:center;
    }

    ul {
        list-style-type: none;
    }

    file, li {
        border-radius:5px;
        border:5px solid #BDBDBD;
        display: inline-block;
    }
</style>