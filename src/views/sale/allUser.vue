<template>
    <div class="allUser">
       全部客户ddd
    <footerNav></footerNav>
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, DatetimePicker } from 'vant';
    import footerNav from "../../components/footerNav"; // 引入页脚

    export default {
        name: 'visit',
        components: {
            // filtrate: filtrate,
            // detectionList: detectionList,
            footerNav: footerNav
        },
        data() {
            return {
                // minHour: 10,
                // maxHour: 20,
                // minDate: new Date(),
                // maxDate: new Date(2019, 10, 1),
                // currentDate: new Date(),
                // show: false
            };
        },
        methods: {
            choseTime() {
                // this.show = !this.show;
            }
        }
    }
</script>

<style lang="scss" scoped>
  .allUser {
    background-color: #f6f6f6;
    }
    .header_btn {
    height: 44px;
    line-height: 44px;
    background-color: #f6f6f6;
    padding: 0 10px;
    }
    .header_btn img {
    width: 14px;
    height: 7px;
    }
    .header_btn .search {
    float: right;
    }
    .header_btn .search img {
    width: 15px;
    height: 16px;
    }
    .order {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px;
    }
</style>
