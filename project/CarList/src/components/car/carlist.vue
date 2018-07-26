  <template>
    <div id="car">
        <div class="left">
          <div class="leftCont" v-for="vList in navList">
              <span :id='vList.letter'>{{vList.letter}}</span>
              <div class="content" v-for="vCar in vList">
                  <dl v-for="v in vCar" @click="tabNav(v.MasterID)">
                      <dt v-on:click="toggle">
                          <img v-lazy="v.CoverPhoto" alt="">
                      </dt>
                      <dd>
                          <p>
                            {{v.Name}}
                          </p>
                      </dd>
                  </dl>
              </div>
          </div>
            <div class="markCont" v-show="isShow">
              <!-- ref="markCont" -->
              <div class="markPart" v-for="v in twoList">
                <span>{{v.GroupName}}</span>
                <dl class="markList" v-for="val in v.GroupList" @click="goDetial(val.SerialID)">
                    <dt>
                      <img v-lazy="val.Picture" alt="">
                    </dt>
                    <dd>
                      <p>{{val.AliasName}}</p>
                      <span>{{val.DealerPrice}}</span>
                    </dd>
                </dl>
              </div>
            </div>
        </div>
        <div class="right">
          <div class="ri" v-for="Rig in nav">
              <p><a :href="'#' + Rig">{{Rig}}</a></p>
          </div>
        </div>
    </div>
  </template>

  <script>
import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      navList: [],
      nav: [], // 21个字母
      twoList: [],
      isShow: false
    }
  },

  created() {
    axios.get('https://baojia.chelun.com/v2-car-getMasterBrandList.html?_1530705936096').then(res => {
      this.start(res.data.data)
    })
  },
  methods: {
    start(list) {
      list.map(v => {
        if (this.nav.indexOf(v.Spelling.slice(0, 1)) === -1) {
          this.nav.push(v.Spelling.slice(0, 1))
        } //去重取21个字母
      })
      this.nav.map((val) => { //遍历字母
        let carType = {
          letter: val,
          carData: []
        }
        list.map(v => {
          if (v.Spelling.slice(0, 1) === val) {
            carType.carData.push(v)
          }
        })
        this.navList.push(carType)
      })
    },
    tabNav(id) {
      axios.get(`https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html?MasterID=${id}`)
        .then(res => {
          this.twoList = res.data.data
        })
    },
    toggle: function () {
      this.isShow = !this.isShow;
    },
    goDetial(id) {
      this.$router.push(`/details/${id}`)
    }
  }
}
</script>

  <style src="./carlist.css">
</style>
