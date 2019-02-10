<template>
  <v-app>
    <v-toolbar  app clipped-right flat dark  height="32" color="primary"  class="drag">
      App
      <v-spacer></v-spacer>
      <v-btn icon small class="window-button " @click="minimize" >
        <v-icon>mdi-window-minimize</v-icon>
      </v-btn>
      <v-btn icon small class="window-button" @click="isMax=!isMax">
        <v-icon   ref="maxs" v-html="isMax ? 'mdi-window-restore' : 'mdi-window-maximize'"></v-icon>
      </v-btn>
      <v-hover>
        <v-btn  icon small class="window-button"  slot-scope="{ hover }"
        :color="`${hover ? 'red' : 'transparent'}`" @click="close">
        <v-icon >mdi-window-close</v-icon>
      </v-btn>
    </v-hover>
  </v-toolbar>

  <v-navigation-drawer
  v-model="drawer"
  app
  right
  floating
  clipped
  fixed
  stateless

  >

  <v-layout row wrap class="px-2">

    <v-flex xs3 >
      <v-btn dark outline fab color="primary">
        <v-icon>mdi-arrow-top-left</v-icon>
      </v-btn>
    </v-flex >

    <v-flex xs3>
      <v-btn  depressed fab color="primary">
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-flex >
    <v-flex xs3>
      <v-btn dark outline fab color="primary">
        <v-icon>mdi-arrow-top-right</v-icon>
      </v-btn>
    </v-flex >
    <v-flex xs3>
      <v-btn depressed  dark fab color="blue" >
        M1
      </v-btn>
    </v-flex>
    <v-flex xs3>
      <v-btn  depressed fab  color="primary">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-flex >
    <v-flex xs3>
      <v-btn  depressed fab color="primary">
        <v-icon >home</v-icon>
      </v-btn>
    </v-flex >
    <v-flex xs3>
      <v-btn  depressed fab color="primary">
        <v-icon >mdi-arrow-right</v-icon>
      </v-btn>
    </v-flex >
    <v-flex xs3>
      <v-btn depressed  dark fab color="blue" >
        M2
      </v-btn>
    </v-flex>
    <v-flex xs3>
      <v-btn  dark outline fab color="primary">
        <v-icon>mdi-arrow-bottom-left</v-icon>
      </v-btn>
    </v-flex >
    <v-flex xs3>
      <v-btn depressed fab color="primary">
        <v-icon>mdi-arrow-down</v-icon>
      </v-btn>
    </v-flex >
    <v-flex xs3>
      <v-btn dark outline fab color="primary">
        <v-icon>mdi-arrow-bottom-right</v-icon>
      </v-btn>
    </v-flex >
    <v-flex xs3>
      <v-btn depressed  dark fab color="blue" >
        <v-icon medium>mdi-axis-z-arrow</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>

  <v-layout row wrap class="px-2">
    <v-flex xs7 offset-xs1>
      <v-text-field
      v-model="distance"
      name="name"
      :label="$t('jogPanel.distance')"
      suffix="nn"
      >
      <template slot="append">
        <v-icon>mdi-shuffle-variant</v-icon>
      </template>
    </v-text-field>
  </v-flex>
  <v-flex xs2 offset-xs1>
    <v-btn class="press" fab small depressed  color="primary"><v-icon medium>mdi-home-map-marker</v-icon></v-btn>
  </v-flex>

  <v-flex xs6 class="px-1">
    <v-btn depressed block dark color="orange">
      <v-icon>mdi-play</v-icon>
    </v-btn>
  </v-flex>
  <v-flex xs6 class="px-1">
    <v-btn depressed block dark color="red"><v-icon>mdi-stop</v-icon></v-btn>
  </v-flex>

  <v-flex xs3 class="px-1">
    <v-btn style="min-width: 0;" small depressed block color="primary">z</v-btn>
  </v-flex>
  <v-flex xs3 class="px-1">
    <v-btn style="min-width: 0;"   small depressed block color="primary">z</v-btn>
  </v-flex>
  <v-flex xs3 class="px-1">
    <v-btn  style="min-width: 0;"   small depressed block color="primary">z</v-btn>
  </v-flex>
  <v-flex xs3 class="px-1">
    <v-btn  style="min-width: 0;"  small depressed block color="primary">z</v-btn>
  </v-flex>
</v-layout>
{{$store.state.serialConnection.listPorts}}
</v-navigation-drawer>

<v-content >
  <v-layout row wrap  id="drawdiv" fluid fill-height>

    <v-toolbar
    color="white"
    absolute
    dense
    floating
    class="ma-3">
    <v-btn icon>
      <v-icon @click="getPorts">mdi-refresh</v-icon>
    </v-btn>

      <v-select
      v-model="selectPort"
      :items="$store.state.serialConnection.listPorts"
      item-text="comName"
      >

<template slot="item" slot-scope="props">
<span>{{props.item.comName}}</span>
<span>{{props.item.pnpId}}</span>
</template>
<template slot="selection" slot-scope="props">
<span>{{props.item.comName}}</span>
</template>

    </v-select>

    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>

  </v-toolbar>

</v-layout>

</v-content>

</v-app>
</template>

<script>
import * as svgLib from 'svg.js'
import * as panZoom from 'svg.panzoom.js'
import * as serialPort from 'serialport'
import * as electron from 'electron'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {

  },
  data () {
    return {
      isMax:null,
      drawer:true,
      image:null,
      distance:1,
      items:[
        'one',
        'two',
        'three'
      ],
      menu: [
        { title: 'Dashboard', icon: 'dashboard' },
        { title: 'Account', icon: 'account_box' },
        { title: 'Admin', icon: 'gavel' }
      ],
      title:'Preliminary report'
    }
  },
  computed:{
    ...mapActions('serialConnection',[]),
    selectPort: {
      get(){
        return this.$store.state.serialConnection.selectedPort
      },
      set(value){
        this.$store.commit('serialConnection/selectPort', value);
      }
    },
    ...mapGetters('serialConnection',[
      'assignPort'
    ]),
  },
  methods:{
    ...mapActions('serialConnection',[
      'getPorts'
    ]),
    minimize(){
      electron.remote.getCurrentWindow().minimize()
    },
    close(){
      electron.remote.getCurrentWindow().close()
    },
    draw() {
      let _this=this
      // const svgPath = fs.readFileSync('./static/Wikipedia_logo.svg')
      // var s = Snap(this.$refs.draw1)
      // // console.log(svgPath.toString());
      // var bigCircle = s.circle(150, 150, 100)
      const draw = svgLib('drawdiv')
      // .viewbox(0, 0, 250, 250)
      .size("100%", "100%")
      .panZoom({zoomMin: 0.5, zoomMax: 10, zoomFactor: 0.1})
      var pattern = draw.pattern(30, 30, function(add) {
        // add.rect(20,20).fill('#f06')
        add.line(0, 0, 0, 30).stroke({ width: .8, color: _this.$vuetify.theme.primary})
        add.line(0, 0, 30, 0).stroke({ width: .8, color: _this.$vuetify.theme.primary })
        // add.rect(10,10).move(10,10).fill('#fff')
      })
      // draw.polygon('0,0 100,0 100,100 0,100 0,0').fill('none').stroke({ width: 1 }).move(0, 0)
      draw.rect(900, 300).move(20, 20).radius(0).fill(pattern).stroke({ width: 1, color:_this.$vuetify.theme.primary })
      // draw.svg(svgPath.toString())
    }
  },
  watch: {
    isMax:function(){
      if(this.isMax){
        electron.remote.getCurrentWindow().maximize();
      }else {
        electron.remote.getCurrentWindow().restore();
      }
    }
  },
  mounted:function(){
    serialPort.list((err, ports) =>{
      console.log(ports);
    })
    this.draw()
    let _this = this
    _this.isMax = electron.remote.getCurrentWindow().isMaximized();
    electron.remote.getCurrentWindow().on('maximize',()=>{
      _this.isMax=electron.remote.getCurrentWindow().isMaximized();
    });
    electron.remote.getCurrentWindow().on('unmaximize',()=>{
      _this.isMax=electron.remote.getCurrentWindow().isMaximized();
    });
  }
}


</script>

<style>
.drag{
  -webkit-app-region: drag;
}
.window-button{
  -webkit-app-region: no-drag;
}
html{
  overflow:hidden;
}


</style>
