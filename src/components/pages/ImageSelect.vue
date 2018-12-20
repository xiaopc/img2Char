<template>
  <div id="select-panel">
    <div class="picInput-outer">
      <picture-input 
        ref="pictureInput"
        margin="16" 
        accept="image/jpeg,image/png" 
        size="3" 
        button-class="btn"
        :custom-strings="{
          tap: '<small>🐾<br>轻触选择图片<br>(暂不支持动图)</small>',
          drag: '<small>🐾<br>把图片拖进来<br>或者点击选择<br>(暂不支持动图)</small>',
          change: '换一张'
        }"
        @change="onChange">
      </picture-input>      
    </div>
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input'

export default {
  name: 'ImageSelect',
  components: {
    PictureInput
  },
  props: {
    settings: Object
  },
  methods: {
    onChange (image) {
      if (image) {
        this.$emit('setImage', image)
        this.$emit('gotoPage', 'Settings')
      } else {
        alert('你的浏览器不资瓷 FileReader API，请使用现代浏览器。')
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.picInput-outer {
  max-width: calc(80vh - 4rem);
  position: absolute;
  left: 0;
  right: 0;
  margin: auto; 
}

.control-group {
  padding: 0.5rem;
}
.control-label {
  padding: 1rem 1rem 1rem 0;
  min-width: 60pt;
  display: inline-block;
}

input {
  outline: none;
  border: none;
  border-bottom: 2px solid #ddd;
  font-size: 20pt;
  transition: 0.5s all;
}

input:focus {
  border-bottom: 2px solid #999;
}

@media (max-width: 750px) {
  input {
    max-width: 280px;
  }
}

</style>
