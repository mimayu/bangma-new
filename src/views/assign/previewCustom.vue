<template>
    <div class="addCustom_container">
        <Cell-group>
            <Cell title="订单号" :value="aCustomerInfo.iCustomerId || '-'"/>
            <Cell title="姓名" :value="aCustomerInfo.sUsername" />
            <Cell title="性别" :value="aCustomerInfo.sex === 'F' ? '女':'男'"/>
            <Cell title="年龄" :value="aCustomerInfo.age > 0 ?  aCustomerInfo.age:'-'"/>
            <Cell title="手机" :value="aCustomerInfo.sMobile || '-'"/>
            <Cell title="家庭电话" :value="aCustomerInfo.sTelPhone || '-'"/>
            <Cell title="住址" :value="aCustomerInfo.sAddress || '-'"/>
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
            <Cell title="业务员" value="董春华"/>
            <Cell title="订单状态" :value="aCustomerInfo.iStatus_name || '-'"/>
        </Cell-group>
        <!--Cell-group>
            <Cell title="客户来源" value="百度"/>
            <Cell title="刷新PSR" value="许祥春"/>
            <Cell title="推荐人" value="陆卫卫"/>
        </Cell-group-->



        <viewer :images="images" class="img-view">
            <img v-for="src in images" :src="aCustomerInfo.img_url+src.path" :key="src.path">
        </viewer> 
  




        <!--Button type="primary" size="large" @click="handleAdd">保存</Button-->

        <Popup v-model="genderShow" position="bottom">
            <Picker show-toolbar :columns="genderActions" @cancel="handleGenderCancel" @confirm="handleGenderConfirm" />
        </Popup>

        <Popup v-model="ageShow" position="bottom">
            <Picker show-toolbar :columns="ageActions" @cancel="handleAgeCancel" @confirm="handleAgeConfirm" />
        </Popup>

         <Popup v-model="houseTypeShow" position="bottom">
            <Picker show-toolbar :columns="houseTypeActions" @cancel="handleHouseTypeCancel" @confirm="handleHouseTypeConfirm" />
        </Popup>

        <Popup v-model="liveTypeShow" position="bottom">
            <Picker show-toolbar :columns="liveTypeActions" @cancel="handleLiveTypeCancel" @confirm="handleLiveTypeConfirm" />
        </Popup>

        <Popup v-model="houseShow" position="bottom">
            <Picker show-toolbar :columns="houseActions" @cancel="handleHouseCancel" @confirm="handleHouseConfirm" />
        </Popup>

        <Popup v-model="designShow" position="bottom">
            <Picker show-toolbar :columns="designActions" @cancel="handleDesignCancel" @confirm="handleDesignConfirm" />
        </Popup>
        <Popup v-model="remarkShow" position="bottom">
            <Picker show-toolbar :columns="remarkActions" @cancel="handleRemarkCancel" @confirm="handleRemarkConfirm" />
        </Popup>
    </div>
</template>

<script>
    import { getEstate } from '@/server';
    import { Cell, CellGroup, Button, Field, Toast, Popup, Picker } from 'vant';
    import { getCustomerInfo } from '@/server';

    export default {
        name: 'visit',
        components: {
            Cell,
            CellGroup,
            Button,
            Field,
            Toast,
            Popup, 
            Picker
        },
        data() {
            return {
                name: '', // 姓名
                mobile: '', // 家庭电话
                phone: '', // 手机
                message: '', // 施工内容
                address: '', // 住址
                plot: '', // 小区名称
                plotId: '', // 小区id
                gender: '', // 性别选择
                age: '', // 年龄选择
                houseArea: '', // 房屋面积
                houseType: '', // 户型
                house: '', // 房屋类型
                houseLive: '', // 居住类型
                houseDesign: '', // 装修类型
                houseRemark: '', // 施工区域
                genderShow: false,
                ageShow: false,
                houseTypeShow: false,
                houseShow: false,
                liveTypeShow: false,
                designShow: false,
                remarkShow: false,
                genderActions: [
                    '男',
                    '女'
                ],
                ageActions: [],
                houseTypeActions: [
                    '一室一厅一卫',
                    '两室一厅一卫',
                    '两室两厅一卫',
                    '三室两厅一卫',
                    '三室两厅二卫',
                    '四室两厅二卫'
                ],
                houseActions: [
                    '电梯公寓',
                    '老式公房',
                    '别墅',
                    '办公用房',
                    '店铺门面',
                    '其它类型'
                ],
                liveTypeActions: [
                    '自住用房',
                    '二手交易',
                    '租赁用房',
                    '其它属性'
                ],
                designActions: [
                    '整装设计',
                    '局部翻新'
                ],
                remarkActions: [
                    '卫生间',
                    '卫生洁具',
                    '厨房间',
                    '集成吊顶',
                    '橱柜',
                    '阳台',
                    '石膏板',
                    '套装门',
                    '铝合金门窗',
                    '主材',
                    '其它',
                    '露台'
                ],
                estateLists: [],
                estateValues: [],
                estateShow: false,
                aCustomerInfo: [],
                images:[],
                iCustomerId: '',
            };
        },
        created() {
            this.createAge();
            this.getEstate();
            this.iCustomerId = this.$route.params.id || 3;
            this.getCustomerInfo();
        },
        methods: {
            /*
            * 创建年龄选项
            */
            createAge() {
                let ageActions = [];
                for(let i = 20; i < 100 ; i++) {
                    ageActions.push(i);
                }
                this.ageActions = ageActions;
            },
            /*
            * 提交创建
            */
            getCustomerInfo() {
                let params = {
                    'iCustomerId': this.iCustomerId
                }
                console.log(params);
                getCustomerInfo(params).then(
                    res => {
                        if(res.success == 1) {
                            this.aCustomerInfo = res.aCustomerInfo;
                            this.images = res.images;
                            console.log('this.aCustomerInfo', this.aCustomerInfo); 
                        }
                    }
                )
            },
            /* 性别 */
            choseGender() {
                this.genderShow = true;
            },
            handleGenderCancel() {
                this.genderShow = false;
            },
            handleGenderConfirm(value) {
                this.gender = value;
                this.genderShow = false;
            },
            /* 年龄 */
            choseAge() {
                this.ageShow = true;
            },
            handleAgeCancel() {
                this.ageShow = false;
            },
            handleAgeConfirm(value) {
                this.age = value;
                this.ageShow = false;
            },
            /* 房屋类型 */
            choseHouseType() {
                this.houseTypeShow = true;
            },
            handleHouseTypeCancel() {
                this.houseTypeShow = false;
            },
            handleHouseTypeConfirm(value) {
                this.houseType = value;
                this.houseTypeShow = false;
            },
            /* 房屋类型 */
            choseHouse() {
                this.houseShow = true;
            },
            handleHouseCancel() {
                this.houseShow = false;
            },
            handleHouseConfirm(value) {
                this.house = value;
                this.houseShow = false;
            },
            /* 居住类型 */
            choseLiveType() {
                this.liveTypeShow = true;
            },
            handleLiveTypeCancel() {
                this.liveTypeShow = false;
            },
            handleLiveTypeConfirm(value) {
                this.houseLive = value;
                this.liveTypeShow = false;
            },
            /* 装修类型 */
            choseDesign() {
                this.designShow = true;
            },
            handleDesignCancel() {
                this.designShow = false;
            },
            handleDesignConfirm(value) {
                this.houseDesign = value;
                this.designShow = false;
            },
            /* 施工区域 */
            choseRemark() {
                this.remarkShow = true;
            },
            handleRemarkCancel() {
                this.remarkShow = false;
            },
            handleRemarkConfirm(value) {
                this.houseRemark = value;
                this.remarkShow = false;
            },
            getEstate() {
                let params = {
                    'keywords': ''
                }
                getEstate(params).then(
                    res => {
                        this.estateLists = res.value;
                        this.estateValues = res.value;
                    }
                )
            },
            /*
            * 处理聚焦
            */
            handleFocus() {
                this.estateShow = true;
            },
            /*
            * 处理失焦
            */
            handleBlur() {
                this.estateShow = false;
            },
            /*
            * 处理文字变化
            */
            handleChange(value) {
                this.estateLists = this.estateValues.filter(item => item.sName.includes(value));
            },
            /*
            * 处理小区点击
            */
            handleChose(item) {
                this.plot = item.sName;
                this.plotId = item.iId
            },
            /*
            * 处理查看记录
            */
            handleCheckRecord() {
                console.log('1');
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
