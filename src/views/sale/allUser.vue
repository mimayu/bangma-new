<template>
    <div class="allUser_container">
        <Row class="header">
            <Col span="8">
                <Cell title="筛选" is-link arrow-direction="down" @click="choseType"/>
            </Col>
            <Col span="8">
                <Cell title="时间" is-link arrow-direction="down" @click="choseTime" />
            </Col>
            <Col span="8">
                <Cell title="搜索" />
            </Col>
        </Row>
        <div class="content">
            <Cell-group class="group">
                <Cell title="订单号">
                    <template>
                        <div class="custom_wrap">
                            <span class="order_id">003652</span>
                            <span class="status">基检未约</span>
                        </div>
                    </template>
                </Cell>
                <Cell title="姓名" value="毛女士" />
                <Cell title="手机号" value="13774387155" />
                <Cell title="地址" value="交通西路108弄4号2308室" />
                <Cell title="施工内容" value="需求信息，刷新+局装；需要做的有两套" />
                <Cell title="预约时间" value="-" />
                <div class="van-cell btn_wrap">
                    <button plain type="primary" class="assign_btn" >预约</button>
                </div>
            </Cell-group>
        </div>

        <Popup v-model="timeShow" position="bottom">
            <datetime-picker
                @confirm="handleComfirm"
                @cancel="handleCancel"
                v-model="currentDate"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
            />
        </Popup>
        <Popup v-model="typeShow" position="bottom">
            <Picker show-toolbar :columns="typeLists" @cancel="handleTypeCancel" @confirm="handleTypeComfirm" @change="handleTypeSelect" />
        </Popup>
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, DatetimePicker, Row, Col, Picker, Toast } from 'vant';
    import footerNav from "../../components/footerNav"; // 引入页脚

    export default {
        name: 'visit',
        components: {
            Cell,
            CellGroup,
            Popup,
            Picker,
            DatetimePicker,
            Row,
            Col,
            Toast,
            footerNav: footerNav
        },
        data() {
            return {
                minHour: 10,
                maxHour: 20,
                minDate: new Date(),
                maxDate: new Date(2019, 10, 1),
                currentDate: new Date(),
                typeShow: false,
                timeShow: false,
                typeLists: [ 
                    '基检未约',
                    '基检确认',
                    '基检再约',
                    '签约取消',
                    '签约等待',
                    '签约成功',
                    '派工完成',
                    '完工验收',
                    '完工付款',
                    '审核完成',
                    '已结算',
                    '签约失败',
                    '合同取消'
                ],
                imgArray: [],
                imgNumber: 0,
                settings: {
                    uploadUrl: '/api/do_upload/',
                    compress: true,
                    compressionRatio: 20,
                    data: [],
                    max: 9,
                    maxSize: 5 * 1024, // 5MB
                    typeArray: ['jpeg', 'jpg', 'png', 'gif'],
                }
            };
        },
        methods: {
            choseType() {
                this.typeShow = true;
            },
            choseTime() {
                this.timeShow = true;
            },
            handleComfirm() {

            },
            handleCancel() {

            },
            handleTypeComfirm() {
                this.typeShow = false;
            },
            handleTypeCancel() {
                this.typeShow = false;
            },
            handleTypeSelect() {

            }
        }
    }
</script>

<style lang="scss">
    .allUser_container {
        display: flex;
        flex-direction: column;
        background-color: #f6f6f6;
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
        .van-cell__title, .van-field .van-cell__title {
            max-width: 100px;
        }
        .van-cell__title, .van-cell__value{
            text-align: left;
        }
        .btn_wrap {
            justify-content: flex-end;
        }
        .assign_btn {
            border: none;
            padding: 8px;
            outline: none;
            margin: 0;
            background: red;
            border-radius: 5px;
        }
        .custom_wrap {
            display: flex;
        }
        .order_id {
            flex: 1;
        }
        .status {
            width: 60px;
            text-align: center;
        }
    }
</style>
