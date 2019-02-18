import * as serial from 'serialport'


const state = {
  count:0,
  listPorts: [],
  selectedPort:null
}

const getters= {
  assignPort: (state) => {
    if (state.selectedPort){
      return new serial(state.selectedPort,{
        autoOpen: false,
        baudRate: 57700
      })
    }else {
      return false
    }
  }
}

const actions = {
  getPorts: ({ commit }) => {
    serial.list((err, ports) =>{
      commit('getPorts', ports )
      console.log(ports);
    })
  },
  selectPort: ({ commit }) => commit('selectPort')
}

const mutations = {

  getPorts (state, ports){
    state.listPorts = ports
  },
  selectPort (state, port){
    state.selectedPort = port
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
