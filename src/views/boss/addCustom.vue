<template>
    <div class="addCustom_container">
        <Cell-group>
            <Field
                v-model="name"
                label="姓名"
            />
            <Cell title="性别" is-link @click="choseGender"/>
            <Cell title="年龄" is-link @click="choseGender"/>
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
                >
                </Field>
                <ul class="estate_list">
                    <li v-for="item in estateLists">
                        {{item.sName}}
                    </li>
                </ul>
            </div>
            <Cell title="户型" is-link @click="choseHouseType"/>
            <Field
                v-model="phone"
                label="面积"
            />
            <Cell title="房屋类型" is-link @click="choseHouse"/>
            <Cell title="居住类型" is-link @click="choseLiveType"/>
            <Cell title="装修类型" is-link @click="choseDesign"/>
            <Cell title="施工区域" is-link @click="choseRemark"/>
            <Field
                v-model="message"
                label="施工内容"
                type="textarea"
                placeholder="请输入~"
                rows="2"
                autosize
            />
        </Cell-group>
        <Cell-group>
            <Cell title="查看记录" is-link @click="choseGender"/>
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
            <Picker show-toolbar :columns="genderActions" @cancel="handleGenderCancel" @confirm="handleGenderConfirm" @change="handleGenderSelect" />
        </Popup>
         <Popup v-model="houseTypeShow" position="bottom">
            <Picker show-toolbar :columns="houseTypeActions" @cancel="handleHouseTypeCancel" @confirm="handleHouseTypeConfirm" @change="handleHouseTypeSelect" />
        </Popup>
        <Popup v-model="liveTypeShow" position="bottom">
            <Picker show-toolbar :columns="liveTypeActions" @cancel="handleLiveTypeCancel" @confirm="handleLiveTypeConfirm" @change="handleLiveTypeSelect" />
        </Popup>
        <Popup v-model="houseShow" position="bottom">
            <Picker show-toolbar :columns="houseActions" @cancel="handleHouseCancel" @confirm="handleHouseConfirm" @change="handleHouseSelect" />
        </Popup>
        <Popup v-model="designShow" position="bottom">
            <Picker show-toolbar :columns="designActions" @cancel="handleDesignCancel" @confirm="handleDesignConfirm" @change="handleDesignSelect" />
        </Popup>
        <Popup v-model="remarkShow" position="bottom">
            <Picker show-toolbar :columns="remarkActions" @cancel="handleRemarkCancel" @confirm="handleRemarkConfirm" @change="handleRemarkSelect" />
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
                name: '',
                mobile: '',
                phone: '',
                message: '',
                address: '',
                plot: '',
                genderShow: false,
                houseTypeShow: false,
                houseShow: false,
                liveTypeShow: false,
                designShow: false,
                remarkShow: false,
                genderActions: [
                    '男',
                    '女'
                ],
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
                estateLists: []
            };
        },
        created() {
            this.getEstate();
        },
        methods: {
            handleAdd() {
                let params = {
                    'iSource': '', // 客户来源
                    'sUsername': '', // 客户姓名
                    'sMobile': '', // 手机号
                    'TelPhone': '', // 家庭固定电话
                    'region': '', // 区域
                    'iXiaoqu': '', // 小区ID
                    'sAddress': '', // 客户地址
                    'sRemarks': '', // 施工大概内容
                    'introducerUid': '', // 推荐人姓名
                    'coordinatorUid': '', // 一起配合的同事
                    'housetype': '', // 房屋类型
                    'iDesign': '', // 装修类型
                    'sRemarkIds': '', // 施工区域
                    'huxing': '', //一室一厅一卫
                    'livetype': '', // 居住属性
                    'acreage': '', // 房屋面积
                    'age': '', // 客户年龄
                    'sex': '', // 客户性别
                }
                postAddCustomer(params).then(
                    res => {
                        console.log('res', res); 
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
            handleGenderConfirm() {
                this.genderShow = false;
            },
            handleGenderSelect() {

            },
            /* 房屋类型 */
            choseHouseType() {
                this.houseTypeShow = true;
            },
            handleHouseTypeCancel() {
                this.houseTypeShow = false;
            },
            handleHouseTypeConfirm() {
                this.houseTypeShow = false;
            },
            handleHouseTypeSelect() {

            },
            /* 施工区域 */
            choseHouse() {
                this.houseShow = true;
            },
            handleHouseCancel() {
                this.houseShow = false;
            },
            handleHouseConfirm() {
                this.houseShow = false;
            },
            handleHouseSelect() {

            },
            /* 性别 */
            choseLiveType() {
                this.liveTypeShow = true;
            },
            handleLiveTypeCancel() {
                this.liveTypeShow = false;
            },
            handleLiveTypeConfirm() {
                this.liveTypeShow = false;
            },
            handleLiveTypeSelect() {

            },
            /* 装修类型 */
            choseDesign() {
                this.designShow = true;
            },
            handleDesignCancel() {
                this.designShow = false;
            },
            handleDesignConfirm() {
                this.designShow = false;
            },
            handleDesignSelect() {

            },
            /* 施工区域 */
            choseRemark() {
                this.remarkShow = true;
            },
            handleRemarkCancel() {
                this.remarkShow = false;
            },
            handleRemarkConfirm() {
                this.remarkShow = false;
            },
            handleRemarkSelect() {

            },
            getEstate() {
                let params = {
                    'keywords': ''
                }
                getEstate(params).then(
                    res => {
                        this.estateLists = res.value
                        console.log('res', res);
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
            background: red;
            li {
                line-height: 40px;
                padding-right: 15px;
            }
        }
    }
</style>
