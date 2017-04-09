<template>
    <div>
        <p v-if="!authenticated" id="statement">Personal cloud-based file system and storage. Enter the application key to authenticate.</p>

        <form v-if="!authenticated" v-on:submit.prevent>
            <input id="key-entry"
                   name="key-entry"
                   type="text"
                   ref="keyf"
                   v-model="key"
                   autocomplete="off"
                   v-on:keyup="authenticate"
                   placeholder="key" />
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import debounce from 'lodash.debounce';

    export default {
        name: 'auth',
        data() {
            return {
                key: ""
            };
        },
        created: function() {
            if (localStorage.getItem('appKey') !== null) {
                this.key = localStorage.getItem('appKey');
                this.authenticate();
            }
        },
        methods: {
            'authenticate': debounce(function() {
                var self = this;
                var flash = function(num, color) {
                    if (num < 5) {
                        var style = self.$refs.keyf.style.borderBottomColor || window.getComputedStyle(self.$refs.keyf)['border-bottom-color'];
                        self.$refs.keyf.style.borderBottomColor = style !== color ? color : "#aaa";
                        setTimeout(function () {
                            flash(num + 1, color);
                        }, 130);
                    } else if (num === 5) {
                        self.$refs.keyf.style.borderBottomColor = color;
                        setTimeout(function () {
                            flash(num + 1, color);
                        }, 500);
                    } else {
                        if (color === "rgb(100, 149, 237)") {
                            self.$emit('authenticate');
                            localStorage.setItem('appKey', self.key);
                        }
                    }
                };

                if (this.key !== "") {
                    axios.post('/api/auth', { key: this.key }).then(res => {
                        flash(0, 'rgb(100, 149, 237)');
                    }).catch(res => {
                        flash(0, 'rgb(239, 104, 51)');
                    });
                } else {
                    self.$refs.keyf.style.borderBottomColor = "#AAA";
                }
            }, 1000)
        }
    }
</script>

<style lang="scss" scoped>
    form {
        text-align:center;
    }

    #key-entry {
        background-color:transparent;
        border:none;
        border-bottom:3px solid #AAA;
        font-size:16px;
        margin:2em;
        padding:4px 10px;
        font-family:Inconsolata;
        width:320px;
        color:#465560;
    }
</style>