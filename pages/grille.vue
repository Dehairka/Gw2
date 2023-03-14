<template>
    <div class="divide-x divide-y flex flex-wrap">
        <span class="p-1 w-6 text-center" v-for="(letter, index) in 2000" :key="index">{{ randomLetterExceptChouette() }}</span>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        methods:{
            randomLetter(){
                return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
            },
            randomLetterExceptChouette(){
                const letters = "ABCDFGIJKLMNPQRSVWXYZ"
                const lettersExceptChouette = letters.replace("C", "")
                return lettersExceptChouette[Math.floor(Math.random() * lettersExceptChouette.length)]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>