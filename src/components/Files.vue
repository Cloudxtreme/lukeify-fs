<template>
    <div id="files-vue">
        <h2><span v-if="fileCount != null">{{ fileCount }} </span>files</h2>
        <ul>
            <li v-for="file in allFiles">
                <a v-bind:href="file.url" target="_blank">
                    <img v-bind:src="file.url" alt="file" />
                </a>
            </li>
        </ul>

        <button v-if="!hasReachedEnd" v-on:click="fetch">More</button>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'files',
        data() {
            return {
                'fileCount': null,
                'allFiles': [],
                'hasReachedEnd': true
            };
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

<style>
    #files-vue {
        text-align:left;
    }
</style>