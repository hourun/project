<template>
    <div class="carK">
        <div class="carKAll" @click="gophotos">全部车款</div>
        <div class="carCenter">
            <div class="centerT" >
                <p v-for="(v,i) in titleList" @click="carK(i)" :key="i">{{v}}</p>
            </div>
            <div class="centerC">
                <div class="centerO" v-for="(v,i) in carKList"  :key="i">
                    <!-- {{v}} -->
                    <p>
                       <span>{{v.exhaust_str}}/</span>
                       <span>{{v.max_power_str}}</span>
                       <span>{{v.inhale_type}}</span>
                    </p>
                    <div class="cent">
                        <dl>
                            <dt>
                                <h4>
                                    <span>{{v.market_attribute.year}}</span>
                                    <span>{{v.car_name}}</span>

                                </h4>
                                <h5>
                                    <span>{{v.horse_power}}马力</span>
                                    <span>{{v.gear_num}}档</span>
                                </h5>
                            </dt>
                            <dd>
                                <h3>{{v.market_attribute.dealer_price_min}}起</h3>
                                <h6>指导价 {{v.market_attribute.official_refer_price}}</h6>
                            </dd>
                        </dl>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
     export default {
      name: 'App',
      data(){
        return {
            titleList : ['2018','2017'],
            carKList : []
           }
        },
        created() {
            fetch('https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID=2593&_1530882209099').then(res=>res.json()).then(res=>{
               this.carKList = res.data.list
               console.log(res.data.list)
            })
        },
        methods:{
            carK(i){
                let yearList = ['2018']
                let carKList = {'2018' : []}
                this.carKList.forEach(item => {
                    let year = item.market_attribute.year;
                    if(yearList.indexOf(year) != -1){
                        carKList[year].push(item)
                        console.log(carKList[year].push(item))
                    }else{
                        yearList.push(item);
                        carKList[year] = [item]
                    }
                    carKList['2018'].push(item)

                });
                // console.log(yearList,carKList)
                // console.log(yearList,carKList,i,this.carKList)
                let sortCar = (arr)=>{
                    return arr.sort((a,b)=>{
                        if(a.exhaust < b.exhaust){
                            return -1;
                        }else if(a.exhaust > b.exhaust){
                            return 1
                        }else{
                            if(a.max_power < b.max_power){
                                return -1
                            }else if(a.max_power > b.max_power){
                                return 1
                            }else{
                                return b.inhale_type - a.inhale_type
                            }
                        }
                    })
                }
                for(let i in carKList){
                    carKList[i] = sortCar(carKList[i])
                }
                // this.carKList = carKList['2018'].market_attribute
                if(i == 0){
                    this.carKList = this.list
                }else if(i == 1){
                    this.carKList = carKList[2017]
                }
            },
            gophotos(){
                this.$router.push(`/photos/${this.$route.params.id}`)
            }
        }
    }
</script>
<style src="./carK.css">

</style>
