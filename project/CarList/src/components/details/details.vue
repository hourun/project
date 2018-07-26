<template>
    <div class="wrap">
        <div class="details">
            <!-- <router-view></router-view> -->
        <!-- {{detailsList}} -->
            <div class="photo" @click="clicks(detailsList.SerialID)">
                <img :src="detailsList.CoverPhoto" alt="">
                <h4>{{detailsList.pic_group_count}}张照片</h4>
            </div>
            <div class="price">
                <dl>
                    <dt>
                        <h5>{{detailsList.market_attribute?detailsList.market_attribute.dealer_price:''}}</h5>
                        <h6>指导价 : {{detailsList.market_attribute?detailsList.market_attribute.official_refer_price:''}}</h6>
                    </dt>
                    <dd class="inquiry" @click="Inquiry">
                        {{detailsList.BottomEntranceTitle}}
                    </dd>
                </dl>
            </div>
            <div class="petailsTabel">
                <div class="top">
                    <p v-for="(v,i) in detailsTabel" @click="tabels(i)" :key="i">{{v}}</p>
                </div>
                <div class="tabelContent" v-for="(v,i) in tabList" :key="i">
                    <!-- {{v.car_name}} -->
                    <div class="title">
                        <span>{{v.exhaust_str}}/</span>
                        <span>{{v.max_power_str}}</span>
                        <span>{{v.inhale_type}}</span>
                    </div>
                    <div class="Dcontent">
                        <div class="contentTop">
                            <p><span>{{v.market_attribute.year}}款 </span>{{v.car_name}}</p>
                            <h5>
                                <span>{{v.horse_power}}马力</span>
                                <span>{{v.gear_num}}档</span>
                                <span>{{v.trans_type}}</span>
                            </h5>
                            <div class="money">
                                <span>指导价：{{v.market_attribute.official_refer_price}}</span>
                                <b>{{v.market_attribute.dealer_price_min}}</b>
                                <!-- <b>{{{v.market_attribute.dealer_price_min}}起</b> -->
                            </div>
                        </div>
                        <div class="contentBottom">询问底价</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <p>询问底价</p>
            <h5>本地经销商为你报价</h5>
        </div>
    </div>
</template>

<script>
import Route from '../../router/index.js'
export default {
  name: 'App',
  data() {
    return {
      detailsTabel: ["全部", "2018", "2017"],
      detailsList: {},
      tabList: [],
      list: []
    }
  },
  created() {
    console.log()
    fetch(`https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID=${this.$route.params.id}`).then(res => res.json()).then(res => {
      this.detailsList = res.data
      this.tabList = res.data.list
      this.list = res.data.list
    })
  },
  methods: {
    tabels(i) {
      let yearList = ["全部"]
      let carList = { '全部': [] }
      this.tabList.forEach(item => {
        let year = item.market_attribute.year;
        if (yearList.indexOf(year) != -1) {
          carList[year].push(item)
        } else {
          yearList.push(item);
          carList[year] = [item]
        }
        carList['全部'].push(item)

      });
      // console.log(yearList,carList)
      // console.log(yearList,carList,i,this.tabList)
      let sortCar = (arr) => {
        return arr.sort((a, b) => {
          if (a.exhaust < b.exhaust) {
            return -1;
          } else if (a.exhaust > b.exhaust) {
            return 1
          } else {
            if (a.max_power < b.max_power) {
              return -1
            } else if (a.max_power > b.max_power) {
              return 1
            } else {
              return b.inhale_type - a.inhale_type
            }
          }
        })
      }
      for (let i in carList) {
        carList[i] = sortCar(carList[i])
      }
      // this.tabList = carList['全部'].market_attribute
      if (i == 0) {
        this.tabList = this.list
      } else if (i == 1) {
        this.tabList = carList[2018]
      } else if (i == 2) {
        this.tabList = carList[2017]
      }
    },
    clicks(id) {
      this.$router.push(`/photos/${id}`)
    },
    Inquiry(id) {
      this.$router.push(`/Inquiry/${id}`)

    }
  }
}
</script>

<style src="./details.css">
</style>
