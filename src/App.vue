<template>
  <div id="app">
    <h1 contenteditable class="title-inline">字符画生成器</h1>

    <breadcrumb :settings="panels" @change="handleTabChange"></breadcrumb>

    <component v-bind:is="panels.current" 
               :settings="settings" @setConfig="onGetConfig" @setImage="onGetImage" 
               @gotoPage="gotoPage"
               class="page"></component>
  </div>
</template>

<script>
import Breadcrumb from './components/Breadcrumb.vue'
import ImageSelect from './components/pages/ImageSelect.vue'
import Settings from './components/pages/Settings.vue'
import Result from './components/pages/Result.vue'

export default {
  name: 'app',
  components: {
    Breadcrumb,
    ImageSelect, Settings, Result
  },
  data: function(){
    return {
      panels: {
        list: [
          { name: 'ImageSelect', text: '选择图片' },
          { name: 'Settings', text: '设置参数' },
          { name: 'Result', text: '获得输出' },
        ],
        current: 'ImageSelect'
      },
      settings: {
        image: null,
        config: {
          mode: 'color',
          ratio: '1',
          chars: '@#&$%863!i1uazvno~;*^+-.',
          charWidth: '1',
          charRand: false,
        }
      },
    }
  },
  methods:{
    onGetConfig: function(e){
      this.settings.config = e
    },
    onGetImage: function(e){
      this.settings.image = e
    },
    handleTabChange: function(e){
      this.panels.current = e.current
    },
    gotoPage: function(e){
      this.panels.current = e
    }
  },
}
</script>

<style>
/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */
html{font-family:sans-serif;line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,footer,header,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}template{display:none}[hidden]{display:none}

@import url('https://fonts.loli.net/css?family=Major+Mono+Display');

a {
  color: #42b983;
}

pre {
  font-family: 'Major Mono Display', '等线', monospace;
  font-weight: bold;
  margin: 0;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-button {
  display: none;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 1px;
}

::-webkit-scrollbar-thumb {
  border-radius: 1px;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
}

button {
  border: none;
  outline: none;
  font-size: 16pt;
  word-break: keep-all;
  text-align: center;
  padding: 3pt 5pt;
  border: 2px solid rgba(0,0,0,0.2);
  background-color: rgba(255,255,255,0.6);
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 0.5) all;
}

button:hover, button.active {
  background-color: rgba(0,0,0,0.2);
}

.control-group{
  padding: 0.5rem;
  display: flex;
  max-width: 40rem;
}
.control-label {
  padding: 1rem 1rem 1rem 0;
  min-width: 60pt;
  display: inline-block;
  flex: 1;
}
.control-area {
  flex: 3;
  line-height: 3;
}
.control-item {
  display: inline-block;
}

input {
  outline: none;
  border: none;
  border-bottom: 2px solid #ddd;
  font-size: 20pt;
  background-color: transparent;
  transition: 0.5s all;
}

input:focus {
  border-bottom: 2px solid #999;
}

label {
  padding-right: 2rem;
}

#app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  max-width: 80vw;
  max-height: 80vh;
  margin: auto;
  padding: 3rem;
  box-shadow: 2px 2px 25px rgba(0,0,0,0.1);
  overflow: hidden;
}

.title-inline {
  outline: none;
  margin: 0 1rem 0 0;
  display: inline-block;
  font-weight: 300;
}

.page {
  height: calc(100% - 5em);
}

@media (max-width: 750px) {
  input {
    max-width: 50vw;
  }

  #app {
    max-height: 100%;
    max-width: 100%;
    padding: 2rem;
  }
}

</style>
