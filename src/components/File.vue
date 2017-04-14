<template>
    <li>
        <a v-bind:href="file.filename" target="_blank">
            <img v-bind:src="file.filename" alt="file" v-on:click="toggleExpando(file)"/>
        </a>
    </li>
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
            toggleExpando: function(file) {
                this.$emit('toggle-expando', file);
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