<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-img

        ref="img"
        class="my-3"
        contain
        height="200"
      ></v-img>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import SerialPort from 'serialport'
import * as t from 'theorem.js'
console.log(t.sha256("TheoremJS"));
import  qrcode from 'qrcode'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      image:null
    }
  },
  created(){
    SerialPort.list(function (err, ports) {
      ports.forEach(function(port) {
    console.log(port);
  })
})
run().catch(error => console.error(error.stack));
let _this =this
async function run() {
  const res = await qrcode.toDataURL('http://asyncawait.net');
_this.$refs.img.src=res
}
console.log(this.$refs)
  }
}
</script>
