<template>
    <a v-bind:href="file.filename" target="_blank">
        <img v-bind:src="file.filename"
             v-on:mouseenter="displayUrlCopyInput(file, true)"
             v-on:mouseleave="displayUrlCopyInput(file, false)"
             alt="file" />
        <input class="url-copy" type="text" v-show="file.isDisplayingUrlCopyInput" />
    </a>
</template>

<script>
    export default {
        name: 'file',
        data() {
            return {

            };
        },
        props: ['file'],
        methods: {
            'displayUrlCopyInput': function(file, shouldDisplay) {
                this.$set(file, 'isDisplayingUrlCopyInput', shouldDisplay);
            }
        }
    }
</script>

<style lang="scss" scoped>
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