<template comment>
  <div class="h-screen w-full relative p-0 m-0 overflow-hidden flex justify-center items-center text-white">
    <!-- CECI EST UN MOT CLÉ : Ornithorynque -->
    <div class="relative z-20 bg-black/60 p-4 rounded-lg flex flex-col items-center backdrop-blur-sm">
      <h1 class="text-3xl font-bold text-center">l'<span class="text-orange">O</span>util de <span class="text-orange">R</span>echerche <span class="text-orange">A</span>sura <span class="text-orange">N</span>ordique <span class="text-orange">G</span>randiose et <span class="text-orange">E</span>norme <br/>(<span class="text-orange">ORANGE</span>)</h1>
      <input class="w-full my-4 px-4 py-2 bg-orange/20 border border-orange rounded-lg mt-8" type="text" placeholder="Insérez un mot ici" v-model="word" @keyup.enter="searchWord()">
      <button class="px-4 py-2 bg-orange rounded-lg text-black uppercase font-bold mb-8 transition hover:bg-orange/80 flex items-center" :class="{ 'bg-orange/80': searching, 'cursor-wait': searching }" @click="searchWord()">
        <breeding-rhombus-spinner :animation-duration="searching ? 2000 : 0" :size="30" color="#000" class="mr-4 my-2"/>
        Rechercher le mot
      </button>
      <div>
        <h2 class="text-xl text-white transiton" v-if="searching">Recherche...</h2>
        <div v-else class="transiton">
          <h2 class="text-xl text-danger transiton" v-if="error">Aucun mot correspondant</h2>
          <h2 class="text-xl text-success transiton" v-else-if="!error && indice">Ceci est le bon mot ! Voici ton indice : <br/>{{ indice.indice }}</h2>
        </div>
      </div>
    </div>
    <div class="void absolute z-10 w-full h-screen bg-black/60 top-0 left-0"></div>
    <img class="w-full object-cover h-screen absolute top-0 left-0" src="~/assets/img/wallpaper.jpeg" alt="background">
  </div>
</template>


<script>
import { BreedingRhombusSpinner } from 'epic-spinners'

export default{
  name: 'app',
  data(){
    return{
      error: false,
      searching: false,
      waiting: true,
      word: '',
      indice: null
    }
  },
  components: {
    BreedingRhombusSpinner
  },
  methods: {
    async getWords(){
      const words = await $fetch('/api/words')
      return words ? words : []
    },
    async searchWord(){
      this.searching = true
      this.waiting = false
      const response = await this.getWords()
      this.indice = response.find(word => word.name.toLowerCase() === this.word.toLowerCase())

      setTimeout(() => {
        if(this.indice){
          this.error = false
        }else{
          this.error = true
        }
        this.searching = false
      }, "2000");
    }
  }
}
</script>