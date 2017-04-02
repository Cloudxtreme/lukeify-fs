<template>
    <div id="files-vue">
        <h2><span v-if="fileCount != null">{{ fileCount }} </span>files</h2>
        <ul>
            <li v-for="file in allFiles">
                <a v-bind:href="file.filename" target="_blank">
                    <img v-bind:src="file.filename"
                         v-on:mouseenter="displayUrlCopyInput(file, true)"
                         v-on:mouseleave="displayUrlCopyInput(file, false)"
                         alt="file" />
                    <input class="url-copy" type="text" v-show="file.isDisplayingUrlCopyInput" />
                </a>
            </li>
        </ul>

        <p id="no-files" v-if="fileCount === 0">Nothing here :(</p>

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
            },
            'displayUrlCopyInput': function(file, shouldDisplay) {
                this.$set(file, 'isDisplayingUrlCopyInput', shouldDisplay);
            }
        }
    }
</script>

<style scoped>
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

    li {
        border-radius:5px;
        border:5px solid #BDBDBD;
        display: inline-block;
    }

    img {
        display: block;
        width: 200px;
        height: 200px;
        object-fit: cover;
    }

    input {
        display: none;
        position: absolute;
        bottom: 10px;
        left: 0px;
        right: 0px;
        margin: 0px auto;
        border: 3px solid rgb(98, 98, 98);
        background: transparent none repeat scroll 0% 0%;
        padding: 10px 0px;
    }
</style>