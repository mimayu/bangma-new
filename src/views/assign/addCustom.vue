<template>
    <div class="addCustom_container">
        <Cell-group>
            <Field
                v-model="name"
                label="姓名"
            />
            <Cell title="性别" :value="gender" is-link @click="choseGender"/>
            <Cell title="年龄" :value="age" is-link @click="choseAge"/>
            <Field
                v-model="mobile"
                label="手机"
            />
            <Field
                v-model="phone"
                label="家庭电话"
            />
            <Field
                v-model="address"
                label="住址"
            />
            <div class="estate">
                <Field
                    v-model="plot"
                    label="小区名称"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    v-on:input="handleChange"
                >
                </Field>
                <transition name="fade">
                    <ul class="estate_list" v-show="estateShow">
                        <li v-for="item in estateLists" @click="handleChose(item)">
                            {{item.sName}}
                        </li>
                    </ul>
                </transition>
            </div>
            <Cell title="户型" :value="houseType" is-link @click="choseHouseType"/>
            <Field
                v-model="houseArea"
                label="面积"
            />
            <Cell title="房屋类型" :value="house" is-link @click="choseHouse"/>
            <Cell title="居住类型" :value="houseLive" is-link @click="choseLiveType"/>
            <Cell title="装修类型" :value="houseDesign" is-link @click="choseDesign"/>
            <Cell title="施工区域" :value="houseRemark" is-link @click="choseRemark"/>
            <Field
                v-model="message"
                label="施工内容"
                type="textarea"
                placeholder="请输入"
                rows="2"
                autosize
            />
        </Cell-group>
        <Cell-group>
            <Cell title="查看记录" value="" is-link @click="handleCheckRecord" class="check-record"/>
        </Cell-group>
        <Cell-group>
            <Cell title="订单号" value="003652"/>
            <Cell title="接单日期" value="2018-12-11"/>
            <Cell title="业务员" value="董春华"/>
            <Cell title="订单状态" value="基检未约"/>
            <Cell title="预约时间" value="-"/>
        </Cell-group>
        <Cell-group>
            <Cell title="客户来源" value="百度"/>
            <Cell title="刷新PSR" value="许祥春"/>
            <Cell title="推荐人" value="陆卫卫"/>
        </Cell-group>
        <Button type="primary" size="large" @click="handleAdd">保存</Button>

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
    import { postAddCustomer } from '@/server';

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
            };
        },
        created() {
            this.createAge();
            this.getEstate();
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
            handleAdd() {
                let params = {
                    'sUsername': this.name, // 客户姓名
                    'sMobile': this.mobile, // 手机号
                    'TelPhone': this.phone, // 家庭固定电话
                    'region': this.plot, // 区域
                    'iXiaoqu': this.plotId, // 小区ID
                    'sAddress': this.address, // 客户地址
                    'sRemarks': this.message, // 施工大概内容
                    'housetype': this.house, // 房屋类型
                    'iDesign': this.houseDesign, // 装修类型
                    'sRemarkIds': this.houseRemark, // 施工区域
                    'huxing': this.houseType, //一室一厅一卫
                    'livetype': this.houseLive, // 居住属性
                    'acreage': this.houseArea, // 房屋面积
                    'age': this.age, // 客户年龄
                    'sex': this.gender, // 客户性别
                    'iSource': '', // 客户来源
                    'introducerUid': '', // 推荐人姓名
                    'coordinatorUid': '', // 一起配合的同事
                    'doAction': 'add'
                }
                postAddCustomer(params).then(
                    res => {
                        if(res.success == 1) {
                            Toast('创建客户成功');
                            console.log('res', res); 
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
    }
</style>
