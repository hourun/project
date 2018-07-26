//index.js
//获取应用实例
const app = getApp()
import {getMusicList} from '../../utils/net';

Page({
    data: {
        list: [],
   
        
        playList: [{
            src: 'http://dl.stream.qqmusic.qq.com/C400002XxBWy1qFQxJ.m4a?vkey=FD84365D227D19FBEF69FD61821941BE33976F1A828F5FD9970C97378DE5A0264A0B59C1DFB47E3663138C2A38898C6720A83E6B879A323A&guid=8757550236&uin=1485888732&fromtag=66',
            url: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001bXuUa31nwzZ.jpg?max_age=2592000',
            musicName: '陷阱',
            people: '王北车'
          }, {
            src: 'http://dl.stream.qqmusic.qq.com/C400002PHnDq19IITK.m4a?vkey=627E9B7BB3E3D7EEA7089EE18C38F123B000E130291CAC3821B426E1F0A1F619C135B44AF7881DB0999CCE2B31D207A8A57F09EF979BDD57&guid=8757550236&uin=1485888732&fromtag=66',
            url: 'https://y.gtimg.cn/music/photo_new/T002R90x90M000003eyd0o3lYmxM.jpg?max_age=2592000',
            musicName: '明白了',
            people: '乐思妍'
          }, {
            src: 'http://dl.stream.qqmusic.qq.com/C400001UjSM03qjpTD.m4a?vkey=EC60F912BBD1AA6D8A0804B48F17CE966C2FEE876FEFE455279F0BCD39DBD6208FE95F96084FD6CAE623CD55C43C12D457C077E662ABC127&guid=8757550236&uin=1485888732&fromtag=66',
            url: 'https://y.gtimg.cn/music/photo_new/T002R90x90M000002O4q192lEA83.jpg?max_age=2592000',
            musicName: '年少有为',
            people: '李荣浩'
          }, {
            src: 'http://dl.stream.qqmusic.qq.com/C400003qsw8s3aLt6h.m4a?vkey=1A7EB368774B3D95442DD8900903ABA4A4F24693C5D63EEFACFABAA410E790BDC9A706179C2CAA50946BC6C065F7769AD2FA38CB7494527D&guid=8757550236&uin=1485888732&fromtag=66',
            url: 'https://y.gtimg.cn/music/photo_new/T002R90x90M0000007RsC94WipzY.jpg?max_age=2592000',
            musicName: '亲爱的蚊子',
            people: '孟文豪'
          }, {
            src: 'http://dl.stream.qqmusic.qq.com/C4000025oC6o2wuKEn.m4a?vkey=D53CE154CB34D43B9F3A04F2627C47FFBB1E25F0FDEF70DEB314D35A951E3FC22B60AE2221F7C54558DB8A4E3D712152B2914EB498FF79E5&guid=8757550236&uin=1485888732&fromtag=66',
            url: 'https://y.gtimg.cn/music/photo_new/T002R90x90M0000016NiGO0dVXZ7.jpg?max_age=2592000',
            musicName: '魔鬼中的天使',
            people: '田馥甄'
          }, {
            src: 'http://dl.stream.qqmusic.qq.com/C400003NIlHn4Zb9Ow.m4a?vkey=822793A749C433075DB07E61110A1717A0CB14E17470FFBB241A2647365ED49E35FFAE6385F358B1E0C2F30ACFA3D8121B3DD3B422CEBA33&guid=8757550236&uin=1485888732&fromtag=66',
            url: 'https://y.gtimg.cn/music/photo_new/T002R90x90M000003f2hbk2tRzph.jpg?max_age=2592000',
            musicName: '往后余生',
            people: '冯心仪'
          }, {
            src: 'http://dl.stream.qqmusic.qq.com/C400000F0lmz1cBq4c.m4a?vkey=B79A6111346B87173722DCD389E098129A2F1BD624FA3BC4A651F3C6F3CFA4D147742E16401E0D322DB6BE8D282B9775585BFF7101EB1DB1&guid=8757550236&uin=1485888732&fromtag=66',
            url: 'https://y.gtimg.cn/music/photo_new/T002R90x90M000000I5jJB3blWeN.jpg?max_age=2592000',
            musicName: '对不起',
            people: '周杰伦'
          }, {
            src: 'http://dl.stream.qqmusic.qq.com/C400000nNzj03CNUIT.m4a?vkey=50B483294AA6529948AB8ACE2ACE82F61455A6E10FD799DD245653A9376E3AA752CC3D8CAD6B5D0E5F93D3F804A7B9EE7BE415A7CC50C3B8&guid=8757550236&uin=1485888732&fromtag=66',
            url: 'https://y.gtimg.cn/music/photo_new/T002R90x90M000001eyHlv2fu50T.jpg?max_age=2592000',
            musicName: '你要的全拿走',
            people: '胡彦斌'
          }, {
            src: 'http://dl.stream.qqmusic.qq.com/C400000wZkdC4EXhs4.m4a?vkey=D94DC187B0159E41BC3831AEE6273E10D45BB43F88CF4923E63D19CB835E99914EFFABA81D2ED105889F8D5CB53C504323352DAA04AB1B58&guid=8757550236&uin=1485888732&fromtag=66',
            url: 'https://y.gtimg.cn/music/photo_new/T002R90x90M000001ZQzSM3NaSpP.jpg?max_age=2592000',
            musicName: '烟火里的尘埃',
            people: '宁静'
          }, {
            src: 'http://dl.stream.qqmusic.qq.com/C400000MZvLw2EtXnh.m4a?vkey=C29BED32C110D53A86FD7546AEAE595C01113D67DAFAAF60879767D334AC304E10C9351ED83E8B0A23A2D0CFA36408CA27990C8BC1FA4FF5&guid=8757550236&uin=1485888732&fromtag=66',
            url: 'https://y.gtimg.cn/music/photo_new/T002R90x90M000001ZQzSM3NaSpP.jpg?max_age=2592000',
            musicName: '离人愁',
            people: '陈学冬'
          }, {
            src: 'http://dl.stream.qqmusic.qq.com/C400003CcntB4WKpYv.m4a?vkey=FB85F1017205701A19F867121D17E751FB5EDD6293F027D837AE9925E334D45929719A17CF4647CE2E6C8B174F99227FFAA6FDC0940847C7&guid=8757550236&uin=1485888732&fromtag=66',
            url: 'https://y.gtimg.cn/music/photo_new/T002R90x90M000000tEPEw46vmSj.jpg?max_age=2592000',
            musicName: 'Unpredictable',
            people: '易烊千玺'
          }, {
            src: 'http://dl.stream.qqmusic.qq.com/C400002Jry2m0WeTza.m4a?vkey=2DADBC47C2621F95A7A88121D1C2B37BEA554A4DCBFDD2935D6A2F5E319A2BD664E297AC8113F337D320A803B49C59B36574B71EBEC009DF&guid=8757550236&uin=1485888732&fromtag=66',
            url: 'https://y.gtimg.cn/music/photo_new/T002R90x90M000004fAhFe0fdHYF.jpg?max_age=2592000',
            musicName: '自渡',
            people: '陈粒'
          }, {
            src: 'http://dl.stream.qqmusic.qq.com/C400000xZ2Ez01hyFK.m4a?vkey=3E1B489C7404AFEB061C504469354ADD457BB694056CC0520BDE2DBA8D78A10FCB3E55E1DCE703164EA1E956372FB3CA50BE204FD8AF7A70&guid=8757550236&uin=1485888732&fromtag=66',
            url: 'https://y.gtimg.cn/music/photo_new/T002R90x90M000001Zgpn305vkeD.jpg?max_age=2592000',
            musicName: '知道不知道',
            people: '胡夏'
          }, {
            src: 'http://dl.stream.qqmusic.qq.com/C400001bYzr83sVgGX.m4a?vkey=407390ABB612BB88E5031EA04FE0ED5DC985AE25F3932CA63FCAE2067036E6C33EEED70D306970E01C255BA59E1499D72C9772BCEB89C9D4&guid=8757550236&uin=1485888732&fromtag=66',
            url: 'https://y.gtimg.cn/music/photo_new/T002R90x90M000001Xve1B0SanpJ.jpg?max_age=2592000',
            musicName: '花不语',
            people: '邓论'
          }, {
            src: 'http://dl.stream.qqmusic.qq.com/C400002Fjdnk0zz1T6.m4a?vkey=E1A9B74B361D74F80F03D23B92124FA0A60C85FCD374F6A8783825FFC3285DDB20D06907C619CF9CC0DDD42B524B2404E51B56029D6897F7&guid=8757550236&uin=1485888732&fromtag=66',
            url: 'https://y.gtimg.cn/music/photo_new/T002R90x90M000002uANIy0B5VS1.jpg?max_age=2592000',
            musicName: '傲红尘',
            people: '尤长靖'
          }, {
             src: 'http://dl.stream.qqmusic.qq.com/C400003wM1ZF3t87w8.m4a?vkey=1845F16382BCD14F3D375C89719B26EE425F661A44C4F88B6F94F25CEFE4EADA3159868BCC06F16223ED588A19AC866A74EC81CFC72BF653&guid=8757550236&uin=1485888732&fromtag=66',
            url: 'https://y.gtimg.cn/music/photo_new/T002R90x90M000001Xve1B0SanpJ.jpg?max_age=2592000',
            musicName: '白夜梦',
            people: '陈奕龙'
          }, {
            src: 'http://dl.stream.qqmusic.qq.com/C400000BG3vy051uJ3.m4a?vkey=62DA7968744420CFB16DD488D672220AB216EFDC0C090EDC37E25BEE7088E6BCE71726A9CC687E6E25D238593BE0D6E3190C9CE8BB0B8504&guid=8757550236&uin=1485888732&fromtag=66',
            url: 'https://y.gtimg.cn/music/photo_new/T002R90x90M0000042FmhQ2gVjXA.jpg?max_age=2592000',
            musicName: 'We Are',
            people: 'Rich Edwards'
          }]
    },
    click(e){
        console.log('e...', e);
        let index = e.currentTarget.dataset.index;
      //console.log(index)
       
        // 缓存
      wx.setStorageSync('list', this.data.playList);
        // 路由跳转
        wx.navigateTo({
            //url: '/pages/detail/detail',
            url: '../detail/detail?index='+index,
        })
    },
  
})