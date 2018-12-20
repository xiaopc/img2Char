<template>
  <div id="settings-panel">
    <div id="preview"
         :style="{position: `absolute`, width: `calc(100% - 6rem)`, height: `calc(100% - 15em)`, zIndex: `-1`, backgroundImage:`url(${settings.image})`, backgroundRepeat:`no-repeat`, backgroundPosition:`center`, backgroundSize: `contain`, filter: `blur(5px)`}"></div>
    <form :input="$emit('setConfig', settings.config)" id="settings-form">
      <div class="control-group">
        <label class="control-label">转换类型</label>
        <div class="control-area">
          <div class="control-item">
            <input type="radio" id="mode-color" value="color" v-model="settings.config.mode">
            <label for="mode-color">彩色</label>
          </div>
          <div class="control-item">
            <input type="radio" id="mode-gray" value="gray" v-model="settings.config.mode">
            <label for="mode-gray">黑白</label>            
          </div>
        </div>
      </div>
      <div class="control-group">
        <label class="control-label">放大倍率</label>
        <div class="control-area">
          <input type="text" id="ratio" v-model.number="settings.config.ratio">
          <label for="ratio"><br>(宽度 6px = 1 窄字符)</label>
        </div>
      </div>
      <div class="control-group">
        <label class="control-label">使用字符</label>
        <div class="control-area">
          <input type="text" id="chars" v-model="settings.config.chars">
          <label for="chars" v-if="settings.config.mode==`gray`"><br>按复杂到简单排序文字，效果更好。</label>
        </div>
      </div>
      <div class="control-group" v-if="settings.config.mode==`color`">
        <label class="control-label"></label>
        <div class="control-area">
          <input type="checkbox" id="charRand" v-model="settings.config.charRand">
          <label for="charRand">打乱顺序</label>
        </div>
      </div>
      <div class="control-group">
        <label class="control-label">字符宽度</label>
        <div class="control-area">
          <div class="control-item">
            <input type="radio" id="charWidth-en" value="1" v-model="settings.config.charWidth">
            <label for="charWidth-en">窄字符(英文标点)</label>
          </div>
          <div class="control-item">
            <input type="radio" id="charWidth-cn" value="2" v-model="settings.config.charWidth">
            <label for="charWidth-cn">宽字符(中文标点)</label>
          </div>
        </div>
      </div>
      <button @click="gotoRes">生成</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  props: {
    settings: Object
  },
  computed: {
  },
  methods: {
    gotoRes: function(e){
      e.preventDefault()
      this.$emit('gotoPage', 'Result')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#settings-panel {
  background-color: rgba(255, 255, 255, 0.6);
}

#settings-form {
  position: absolute;
  max-width: 30rem;
  left: 0;
  right: 0;
  margin: auto;
  padding: 0 2rem;
}

</style>
