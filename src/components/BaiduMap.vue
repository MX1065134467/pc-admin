<template>
  <div>
    <el-dialog
      width="70%"
      height="20%"
      :before-close="cancel"
      :closable="false"
      :mask-closable="false"
      :visible="visible"
      :close-on-click-modal="false"
    >
      <span>
        <baidu-map
          v-bind:style="mapStyle"
          class="bm-view"
          ak="AkZyWsvUeKq3FBciMM0v4V1OG6mKKrBk"
          :center="center"
          :zoom="zoom"
          :scroll-wheel-zoom="true"
          @click="getClickInfo"
          @moving="syncCenterAndZoom"
          @moveend="syncCenterAndZoom"
          @zoomend="syncCenterAndZoom"
        >
          <bm-view style="width: 100%; height:500px;"></bm-view>
          <bm-marker
            :position="{ lng: markerPosition.lng, lat: markerPosition.lat }"
            :dragging="true"
            animation="BMAP_ANIMATION_BOUNCE"
          >
          </bm-marker>
          <bm-control :offset="{ width: '10px', height: '10px' }">
            <bm-auto-complete v-model="keyword" :sugStyle="{ zIndex: 999999 }">
              <input
                type="text"
                placeholder="请输入搜索关键字"
                class="serachinput"
              />
            </bm-auto-complete>
          </bm-control>
          <bm-local-search
            :keyword="keyword"
            :auto-viewport="true"
            style="width:0px;height:0px;overflow: hidden;"
          ></bm-local-search> </baidu-map
      ></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  BaiduMap,
  BmControl,
  BmView,
  BmAutoComplete,
  BmLocalSearch,
  BmMarker
} from 'vue-baidu-map'
export default {
  name: 'BaiduMapComponent',
  components: {
    BaiduMap,
    BmControl,
    BmView,
    BmAutoComplete,
    BmLocalSearch,
    BmMarker
  },
  data () {
    return {
      showMapComponent: this.value,
      keyword: '',
      mapStyle: {
        width: '100%',
        height: this.mapHeight + 'px'
      },
      center: { lng: 108.892022, lat: 34.232123 },
      markerPosition: { lng: 108.892022, lat: 34.232123 },
      zoom: 15
    }
  },
  props: {
    visible: Boolean,
    value: {
      type: Boolean,
      default: false
    },
    mapHeight: {
      type: Number,
      default: 500
    }
  },
  created () {},
  watch: {},
  methods: {
    /***
     * 地图点击事件。
     */
    getClickInfo (e) {
      this.markerPosition.lng = e.point.lng
      this.markerPosition.lat = e.point.lat
    },
    syncCenterAndZoom (e) {
      const { lng, lat } = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      this.zoom = e.target.getZoom()
    },
    /***
     * 确认
     */
    confirm: function () {
      this.$emit('map-confirm', this.markerPosition)
    },
    /***
     * 取消
     */
    cancel: function () {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.serachinput {
  width: 300px;
  box-sizing: border-box;
  padding: 9px;
  border: 1px solid #dddee1;
  line-height: 20px;
  font-size: 16px;
  height: 38px;
  color: #333;
  position: relative;
  border-radius: 4px;
  -webkit-box-shadow: #666 0px 0px 10px;
  -moz-box-shadow: #666 0px 0px 10px;
  box-shadow: #666 0px 0px 10px;
}
</style>
