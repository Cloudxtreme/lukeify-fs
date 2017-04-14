<template>
    <div id="files-vue">
        <h2><span v-if="fileCount != null">{{ fileCount }} </span>{{ fileCount !== 1 ? "files" : "file" }}</h2>

        <ul>
            <file v-for="file in allFiles" v-bind:key="file.filename" v-bind:file="file" v-on:toggle-expando="toggleExpando"></file>
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
                fileCount: null,
                allFiles: [],
                hasReachedEnd: true,
                shouldFetch: 50,
                expando: null
            };
        },
        components: {
            File
        },
        created: function() {
            axios.get('/api/filecount').then(res => {
                this.fileCount = res.data.count;
            });
            axios.get('/api/files/0/' + this.shouldFetch).then(res => {
                this.allFiles = this.allFiles.concat(res.data.files);
            });
        },
        methods: {
            // Determine the number of image files that should appear in each row,
            // and what the size of each image should be.
            determineRowSettings: function() {
                var rowWidth = window.innerWidth - (window.innerWidth < 800 ? 50 : 100);

            },

            // When "More" is clicked, fetch the next 50 images.
            fetch: function() {
                let currentFilePosition = this.allFiles.length;
                axios.get('/api/files/' + currentFilePosition + '/' + this.shouldFetch).then(res => {
                    this.hasReachedEnd = res.data.files.length < this.shouldFetch;
                    this.allFiles = this.allFiles.concat(res.data.files);

                }).catch(res => {
                });
            },

            toggleExpando: function() {

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

    file, li {
        border-radius:5px;
        border:5px solid #BDBDBD;
        display: inline-block;
    }
</style>