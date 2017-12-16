<template>
  <div>
    <m-header class="header"></m-header>
    <router-view class="main"/>
    <m-footer></m-footer>
  </div>
</template>

<script>
import mHeader from '@/components/header/'
import mFooter from '@/components/footer/'

export default {
  components: {
    mHeader,
    mFooter
  }
}
</script>

<style lang="stylus" scoped>
.main
  width 1400px
  margin auto
  padding 20px 0 0
</style>


