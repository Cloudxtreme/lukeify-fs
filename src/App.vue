<template>
    <div id="app-vue">
        <h1>lukeify fs</h1>
        <auth v-if="!authenticated" v-on:authenticate="authenticated = true"></auth>

        <transition name="authed">
            <home v-if="authenticated"></home>
        </transition>

        <footer>
            <span>Written by @lukealization. <a href="https://github.com/LukeNZ/lukeify-fs">github.com/LukeNZ/lukeify-fs</a></span>
            <a id="deauth" v-if="authenticated" v-on:click="deauth">De-auth</a>
        </footer>
    </div>
</template>

<script>
    import Auth from './components/auth';
    import Home from './components/home';

    export default {
        name: 'app',
        data () {
            return {
                authenticated: false
            }
        },
        components: {
            Auth,
            Home
        },
        methods: {
            'deauth': function() {
                localStorage.removeItem('appKey');
                this.authenticated = false;
            }
        }
    }
</script>

<style lang="scss">
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

    h1, h2, h3, h4, h5, h6, p, a, ul, li, span {
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

    ul {
        list-style-type: none;
        margin:0;
        padding:0;
    }

    #statement {
        text-align:center;
        color:#465560;
        margin:1em;
    }

    button {
        font-family: Catamaran;
        margin: 1em auto;
        font-size: 16px;
        border: none;
        background-color: cornflowerblue;
        color: white;
        width: 200px;
        padding: 10px 0;
        border-radius: 3px;
        cursor:pointer;

        &:hover {
            background-color:dodgerblue;
        }

        &:active {
            background-color:darkorange;
        }

        &:disabled {
            background-color:#AAA;
            cursor:unset;
        }
    }

    footer {
        position:fixed;
        bottom:0;
        margin:1em;
        width:calc(100% - 2em);
        left:0;
        text-align:left;

        span, a {
            font-size:12px;
        }
    }

    #deauth {
        float:right;
        cursor:pointer;
    }

    .authed-enter-active, .authed-leave-active {
        transition: opacity 0.5s ease-in-out;
        opacity:1;
    }
    .authed-enter, .authed-leave-to {
        opacity: 0;
    }
</style>