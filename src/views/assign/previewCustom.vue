<template>
    <div class="addCustom_container">
        <Cell-group>
            <Cell title="订单号" :value="aCustomerInfo.iCustomerId || '-'"/>
            <Cell title="姓名" :value="aCustomerInfo.sUsername" />
            <Cell title="性别" :value="aCustomerInfo.sex === 'F' ? '女':'男'"/>
            <Cell title="年龄" :value="aCustomerInfo.age > 0 ?  aCustomerInfo.age:'-'"/>
            <Cell title="手机" :value="aCustomerInfo.sMobile || '-'"/>
            <Cell title="家庭电话" :value="aCustomerInfo.sTelPhone || '-'"/>
            <Cell title="区域" :value="aCustomerInfo.region_name || '-'"/>
            <Cell title="小区" :value="aCustomerInfo.sXiaoqu || '-'"/>
            <Cell title="住址" :value="aCustomerInfo.sAddress || '-'"/>

            <Cell title="房屋类型" :value="aCustomerInfo.housetype_name || '-'"/>
            <Cell title="房屋户型" :value="aCustomerInfo.huxing_name || '-'"/>
            <Cell title="居住属性" :value="aCustomerInfo.livetype_name || '-'"/>
            <Cell title="房屋面积" :value="aCustomerInfo.acreage || '-'"/>
            <Cell
                title="施工内容"
                type="textarea"
                rows="2"
                :value="aCustomerInfo.sRemarks || '-'"
                autosize
            />
        </Cell-group>

        <Cell-group>
            <Cell title="接单日期" :value="aCustomerInfo.tOrderDate || '-'"/>
            <Cell title="业务员" :value="aCustomerInfo.sale_name || '-'"/>
            <Cell title="订单状态" :value="aCustomerInfo.iStatus_name || '-'"/>
        </Cell-group>
        <Cell-group>
            <Cell title="客户来源" :value="aCustomerInfo.iSource_name || '-'"/>
            <Cell title="配合人" :value="aCustomerInfo.coordinatorName || '-'"/>
            <Cell title="推荐人" :value="aCustomerInfo.introducerName || '-'"/>
        </Cell-group>

        <Cell-group v-if="aCustomerInfo.iStatus === 2">
            <Cell title="预约日期" :value="aCustomerInfo.dateYuyue || '-'"/>
        </Cell-group>
        <Cell-group v-if="(aCustomerInfo.iStatus>=4 && aCustomerInfo.iStatus<=11)||aCustomerInfo.iStatus === 101 || aCustomerInfo.iStatus === 102">
            <Cell title="上门日期" :value="aCustomerInfo.dateShangmen || '-'"/>
            <Cell title="上门反馈" :value="aCustomerInfo.shangmenContent || '-'"/>
        </Cell-group>
        <Cell-group v-if="(aCustomerInfo.iStatus>=5 && aCustomerInfo.iStatus<=11)||aCustomerInfo.iStatus === 102">
            <Cell title="签约日期" :value="aCustomerInfo.dateOrder || '-'"/>
            <Cell title="预计开工日期" :value="aCustomerInfo.dateYujiKaigong || '-'"/>
            <Cell title="签约金额" :value="aCustomerInfo.orderFee || '-'"/>
            <Cell title="签约定金" :value="aCustomerInfo.orderDingjin || '-'"/>
        </Cell-group>
        <Cell-group v-if="aCustomerInfo.iStatus >= 6">
            <Cell title="施工工长" :value="aCustomerInfo.iForeman_name || '-'"/>
        </Cell-group>    
        <Cell-group v-if="aCustomerInfo.iStatus >= 7 && aCustomerInfo.iStatus<=11">
            <Cell title="开工日期" :value="aCustomerInfo.dateKaigong || '-'"/>
            <Cell title="预计完工日期" :value="aCustomerInfo.dateYujiWangong || '-'"/>
            <Cell title="首付金额" :value="aCustomerInfo.orderSoufu || '-'"/>
        </Cell-group>
        <Cell-group v-if="aCustomerInfo.iStatus >= 8 && aCustomerInfo.iStatus<=11">    
            <Cell title="完工日期" :value="aCustomerInfo.dateWangong || '-'"/>
        </Cell-group>
        <Cell-group v-if="aCustomerInfo.iStatus >= 9 && aCustomerInfo.iStatus<=11"> 
            <Cell title="尾款金额" :value="aCustomerInfo.orderWeikuan || '-'"/>
            <Cell title="收尾款日期" :value="aCustomerInfo.dateWeikuan || '-'"/>
        </Cell-group>
        <Cell-group v-if="aCustomerInfo.iStatus === 3 || aCustomerInfo.iStatus === 102">
            <Cell title="取消日期" :value="aCustomerInfo.dateQuxiao || '-'"/>
            <Cell title="取消原因" :value="aCustomerInfo.quxiaoContent || '-'"/>
        </Cell-group>
        <Cell-group v-if="aCustomerInfo.iStatus === 103">    
            <Cell title="再约日期" :value="aCustomerInfo.dateZaiyue || '-'"/>
        </Cell-group>
        <Cell-group v-if="aCustomerInfo.followup_total >= 1">
            <Cell title="查看跟进记录" value="" is-link @click="handleCheckRecord" class="check-record"/>
        </Cell-group>

        <viewer :images="images" class="img-view">
            <img v-for="src in images" :src="aCustomerInfo.img_url+src.path" :key="src.path">
        </viewer> 
  

    </div>
</template>

<script>
    import { Cell, CellGroup, Toast, Popup, Picker } from 'vant';
    import { getCustomerInfo } from '@/server';

    export default {
        name: 'visit',
        components: {
            Cell,
            CellGroup,
            Toast,
            Popup, 
            Picker
        },
        data() {
            return {
                aCustomerInfo: [],
                images:[],
                iCustomerId: '',
            };
        },
        created() {
            this.iCustomerId = this.$route.params.id || 0;
            this.getCustomerInfo();
        },
        methods: {
            /*
            * 提交创建
            */
            getCustomerInfo() {
                let params = {
                    'iCustomerId': this.iCustomerId
                }
                getCustomerInfo(params).then(
                    res => {
                        if(res.success == 1) {
                            this.aCustomerInfo = res.aCustomerInfo;
                            this.images = res.images;
                            //console.log('this.aCustomerInfo', this.aCustomerInfo); 
                        }
                    }
                )
            },
            /*
            * 处理查看记录
            */
            handleCheckRecord() {
                this.$router.push(
                    {
                        name: 'followupList',
                        params: {
                            iCustomerId: this.iCustomerId
                        }
                    }
                )
            }
        }
    }
</script>

<style lang="scss">
    .addCustom_container {
        .estate {
            position: relative;
        }
        .estate_list {
            position: absolute;
            width: calc(100% - 90px);
            max-height: 200px;
            overflow-y: auto;
            z-index: 99;
            left: 105px;
            background: #eee;
            font-size: 12px;
            padding-left: 4px;
            li {
                line-height: 40px;
                padding-right: 15px;
            }
        }
        .fade-enter, .fade-leave-active {
            opacity: 0
        }
        .fade-enter-active, .fade-leave-active {
            transition: all .3s ease-in-out
        }
        .van-cell__title, .van-field .van-cell__title {
            max-width: 100px;
        }
        .van-cell__title, .van-cell__value{
            text-align: left;
        }
        .check-record {
            text-align: right;
        }
        .img-view {
            height:155px;
            border:1px dashed #ccc;
            margin:16px;
            padding:6px;
            img {
                width: 70px;
                height: 70px;
                float:left;
                padding:4px;
            }
        }
    }
</style>
