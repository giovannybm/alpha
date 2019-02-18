<template>
  <v-app >
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
      :suffix="units"
      >
      <template slot="append">
        <v-icon @click="changeUnit">mdi-shuffle-variant</v-icon>
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

      <v-list-tile-content>
        <v-list-tile-title v-html="props.item.comName"></v-list-tile-title>
        <v-list-tile-sub-title v-html="props.item.pnpId"></v-list-tile-sub-title>
      </v-list-tile-content>

    </template>
    <template slot="selection" slot-scope="props">
      <span>{{props.item.comName}}</span>
    </template>
  </v-select>

  <v-btn icon>
    <v-icon>mdi-lan-connect</v-icon>
  </v-btn>
  <v-btn icon @click="dialog=!dialog">
    <v-icon>mdi-anvil</v-icon>
  </v-btn>
{{dialog}}
  <v-menu  transition="slide-y-transition"
      bottom>
             <v-btn
               slot="activator"
               icon
             >
               <v-icon>mdi-dots-vertical</v-icon>
             </v-btn>

             <v-list>
               <v-list-tile
                   @click=""
               >
                 <v-list-tile-title>{{$t('main.settings')}}</v-list-tile-title>
               </v-list-tile>
             </v-list>
           </v-menu>


</v-toolbar>

</v-layout>

</v-content>
<v-dialog v-model="dialog" scrollable max-width="600px">

      <v-card>
        <v-card-title>Select Country</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 500px;">
          <v-stepper v-model="e6" vertical>
     <v-stepper-step :complete="e6 > 1" step="1">
       Select an app
       <small>Summarize if needed</small>
     </v-stepper-step>

     <v-stepper-content step="1">
       <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
       <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
       <v-btn flat>Cancel</v-btn>
     </v-stepper-content>

     <v-stepper-step :complete="e6 > 2" step="2">Configure analytics for this app</v-stepper-step>

     <v-stepper-content step="2">
       <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
       <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
       <v-btn flat>Cancel</v-btn>
     </v-stepper-content>

     <v-stepper-step :complete="e6 > 3" step="3">Select an ad format and name ad unit</v-stepper-step>

     <v-stepper-content step="3">
       <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
       <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
       <v-btn flat>Cancel</v-btn>
     </v-stepper-content>

     <v-stepper-step step="4">View setup instructions</v-stepper-step>
     <v-stepper-content step="4">
       <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
       <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
       <v-btn flat>Cancel</v-btn>
     </v-stepper-content>
   </v-stepper>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-app>
</template>

<script>
import * as svgLib from 'svg.js'
import * as panZoom from 'svg.panzoom.js'
import * as serialPort from 'serialport'
import * as electron from 'electron'
import * as t from 'theorem.js'
import { mapGetters, mapActions } from 'vuex'

console.log(process)

export default {
  name: 'App',
  components: {

  },
  data () {
    return {
      dialog:false,
      isMax:null,
      drawer:true,
      image:null,
      distance:1,
      units:'mm',
       e6: 1
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
    changeUnit(){
      if (this.units=='mm'){
        this.units='in'
        this.distance=t.convert(this.distance,'distance','mm','in').toFixed(3)
      }else if (this.units=='in') {
        this.units='mm'
      this.distance=t.convert(this.distance,'distance','in','mm').toFixed(3)
      }
    },
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
