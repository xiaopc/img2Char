<template>
  <div class="breadcrumb">
    <form :input="$emit('change', settings)" class="bread-form">
      <div class="bread-item" v-for="item in settings.list" :key="item.name">
        <input type="radio" :id="item.name" :value="item.name" v-model="settings.current" class="bread-radio">
        <label :for="item.name" class="bread-label">{{ item.text }}</label>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    settings: Object
  },
  computed: {
  },
  methods: {
  },
  mounted: function() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.breadcrumb {
  margin: 1em 0;
  background: linear-gradient(60deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.06));
}

.bread-form {
  display: flex;
}

.bread-item {
  flex: 1;
}

.bread-radio {
  position: absolute;
  left: -999em;
}

.bread-label {
  display: block;
  padding: 10pt 0;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0);
  cursor: pointer;
}

.bread-radio:checked ~ .bread-label {
  box-shadow: 2px 2px 25px rgba(0,0,0,0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
}

@media (max-width: 750px) {
}

</style>
