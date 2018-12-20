<template>
  <div id="result-panel">
    <div class="control-inline">
      <div class="control-group">
        <label class="control-label">文字大小</label>
        <div class="control-area">
          <input type="text" v-model="style.fontSize">
        </div>
      </div>
      <div class="control-group">
        <label class="control-label">行高</label>
        <div class="control-area">
          <input type="text" v-model="style.lineHeight">
        </div>
      </div>
      <button type="button" @click="doCopy" style="flex: 1;margin: 0 6%;">复制文本</button>
      <button type="button" @click="doPic" style="flex: 1;margin: 0 6%;">查看截图</button>
    </div>
    <div class="asc-result" v-if="isHTML" :style="style">
      <span v-html="result" ref="resultHTML"></span>
    </div>
    <div class="asc-result-pic" v-else>
      <img :src="imgUrl" style="width: 100%; height: 100%;">
    </div>
  </div>
</template>

<script>
import { staticImageBuffer } from '../modules/imageBuffer'
import { createPairsFunc, imageToGrayScaleText } from '../modules/grayScale'
import { pickCharsFunc, imageToRgbHTML } from '../modules/rgb'
import { copyToClip } from '../modules/copyClipboard'

export default {
  name: 'Result',
  props: {
    settings: Object
  },
  data: function() {
    return {
      result: "请先完成前两步",
      imgUrl: null,
      isHTML: true,
      style: {
        fontSize: '12px',
        lineHeight: '1.5',
      },
    }
  },
  computed: {
  },
  methods: {
    doCopy: function () {
      copyToClip(this.result, (this.settings.config.mode == 'color'))
    },
    doPic: async function () {
      if (!this.imgUrl) {
        const el = this.$refs.resultHTML
        this.imgUrl = await this.$html2canvas(el, {type: 'dataURL'})
      }
      this.isHTML = !this.isHTML
    }
  },
  mounted: function() {
    var vm = this
    if (vm.settings.image){
      vm.result = "转换中..."
      let img = new Image;
      img.onload = function(){
        let imgData = staticImageBuffer(img, vm.settings.config.ratio)
        if (vm.settings.config.mode == 'color'){
          let charGen = pickCharsFunc(vm.settings.config.chars, vm.settings.config.charRand)
          let res = imageToRgbHTML(imgData, vm.settings.config.charWidth, charGen)
          vm.result = ""
          res.forEach(line => {
            vm.result = vm.result + line + '<br>'
          })  
        } else {
          let str = vm.settings.config.chars + ((vm.settings.config.charWidth=='1') ? ' ' : '\u3000')
          let pairs = createPairsFunc(str)
          let res = imageToGrayScaleText(imgData, vm.settings.config.charWidth, pairs)
          vm.result = ""
          res.forEach(line => {
            vm.result = vm.result + '<pre>' + line + '</pre>'
          })          
        }
      };
      img.src = this.settings.image;
      if (vm.settings.config.charWidth=='2'){
        vm.style.lineHeight = '1'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


#result-panel {
  text-align: center;
}

.control-inline {
  display: flex;
}
.control-inline input {
  max-width: 100pt;
}

.control-group {
  padding: 0;
}

.control-label, .control-area {
  line-height: 2;
  padding: 1pt 1pt 1pt 0;
}

.asc-result, .asc-result-pic {
  font-family: 'Major Mono Display', '等线', monospace;
  font-weight: bold;
  display: inline-block;
  word-break: keep-all;
  white-space: nowrap;
  text-align: left;
  overflow: auto;
  max-height: calc(100% - 5em);
  max-width: calc(100% - 20pt);
  padding: 5pt 10pt;
  border: 1pt solid rgba(0, 0, 0, 0.02);
}

@media (max-width: 750px) {
  .control-inline {
    display: grid;
  }
}
</style>
