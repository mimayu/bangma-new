<template>
    <div class="allUser">
        <Row>
            <Col span="8">
                <Cell title="筛选" is-link arrow-direction="down" />
            </Col>
            <Col span="8">
                <Cell title="时间" is-link arrow-direction="down" @click="choseTime" />
            </Col>
            <Col span="8">
                <Cell title="搜索" />
            </Col>
        </Row>
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
        <Popup v-model="typeShow" position="top">
            <ul>
                <li v-for="item in typeLists">
                    {{item.name}}
                </li>
            </ul>
        </Popup>
        <footerNav></footerNav>
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, DatetimePicker, Row, Col } from 'vant';
    import footerNav from "../../components/footerNav"; // 引入页脚
    import detectionList from "../../components/detectionList"; // 引入用户列表

    export default {
        name: 'visit',
        components: {
            Cell,
            CellGroup,
            Popup,
            DatetimePicker,
            Row,
            Col,
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
                    {
                        name: '基检未约',
                        type: 1
                    },
                    {
                        name: '基检确认',
                        type: 2
                    },
                    {
                        name: '基检再约',
                        type: 103
                    },
                    {
                        name: '签约取消',
                        type: 3
                    },
                    {
                        name: '签约等待',
                        type: 4
                    },
                    {
                        name: '签约成功',
                        type: 5
                    },
                    {
                        name: '派工完成',
                        type: 6
                    },
                    {
                        name: '开工进场',
                        type: 7
                    },
                    {
                        name: '完工验收',
                        type: 8
                    },
                    {
                        name: '完工付款',
                        type: 9
                    },
                    {
                        name: '审核完成',
                        type: 10
                    },
                    {
                        name: '已结算',
                        type: 11
                    },
                    {
                        name: '签约失败',
                        type: 101
                    },
                    {
                        name: '合同取消',
                        type: 102
                    },
                ]
            };
        },
        methods: {
            choseTime() {
                this.timeShow = true;
            },
            handleComfirm() {

            },
            handleCancel() {
                
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
